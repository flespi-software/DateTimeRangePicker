<template>
  <input :key="drawFlag" type="text" data-input :disabled="disabled" @input="onInput">
</template>

<script>
import Flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.css'
const includedEvents = [
  'onChange',
  'onClose',
  'onDestroy',
  'onMonthChange',
  'onOpen',
  'onYearChange'
]
const camelToKebab = (string) => { return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() }
const arrayify = (obj) => { return Array.isArray(obj) ? obj : [obj] }

export default {
  name: 'flatpickr',
  props: {
    value: {
      default: null,
      required: true,
      validator (value) {
        return value === null || value instanceof Date || typeof value === 'string' || value instanceof String || value instanceof Array || typeof value === 'number'
      }
    },
    config: {
      type: Object,
      default: () => ({
        wrap: false,
        defaultDate: null
      })
    },
    events: {
      type: Array,
      default: () => includedEvents
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fp: null,
      drawFlag: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.fp) return
      let safeConfig = Object.assign({}, this.config)
      this.events.forEach((hook) => {
        safeConfig[hook] = arrayify(safeConfig[hook] || []).concat((...args) => {
          this.$emit(camelToKebab(hook), ...args)
        })
      })
      safeConfig.defaultDate = this.value || safeConfig.defaultDate
      this.fp = new Flatpickr(this.getElem(), safeConfig)
      this.fpInput().addEventListener('blur', this.onBlur)
    },
    destroy () {
      if (this.fp) {
        this.fpInput().removeEventListener('blur', this.onBlur)
        this.fp.destroy()
        this.fp = null
      }
    },
    redraw () {
      this.drawFlag += 1
    },
    getElem () {
      return this.config.wrap ? this.$el.parentNode : this.$el
    },
    getValue () {
      return [...this.fp.selectedDates]
    },
    onInput (event) {
      this.$nextTick(() => {
        this.$emit('input', this.getValue())
      })
    },
    fpInput () {
      return this.fp.altInput || this.fp.input
    },
    onBlur (event) {
      this.$emit('blur', this.getValue())
    }
  },
  watch: {
    config: {
      deep: true,
      handler (newConfig) {
        if (this.fp) {
          this.destroy()
          this.init()
        }
      }
    },
    value (newValue, oldValue) {
      if (
        Array.isArray(newValue) && Array.isArray(oldValue) &&
        newValue.every((val, index) => val && oldValue[index] && val.valueOf() === oldValue[index].valueOf())
      ) { return false }
      if (newValue.valueOf() === oldValue.valueOf()) { return false }
      this.fp && this.fp.setDate(newValue, true)
    },
    disabled (newState) {
      if (!this.fp) { return }
      if (newState) {
        this.fpInput().setAttribute('disabled', newState)
      } else {
        this.fpInput().removeAttribute('disabled')
      }
    }
  },
  beforeDestroy () {
    this.destroy()
  }
}
</script>
