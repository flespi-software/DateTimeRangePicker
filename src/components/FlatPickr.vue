<template>
  <div :class="[`${currentTheme.bgColor === 'white' ? '' : 'flatpickr__theme-dark'}`]">
    <input ref="input" type="text" data-input :disabled="disabled" @input="onInput" :style="{display: config && config.inline ? 'none' : ''}">
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as Flatpickr from 'flatpickr/dist/flatpickr.js'

// import 'flatpickr/dist/flatpickr.css'
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

export default defineComponent({
  name: 'FlatPickr',
  props: {
    modelValue: {
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
    },
    theme: {
      type: Object,
      default () {
        return {
          color: 'grey-9',
          bgColor: 'white',
          modeSwitch: true
        }
      }
    }
  },
  data () {
    let defaultTheme = {
      color: 'grey-9',
      bgColor: 'white',
      modeSwitch: true
    }
    return {
      currentTheme: Object.assign({}, defaultTheme, this.theme),
      fp: null
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
      safeConfig.defaultDate = this.modelValue || safeConfig.defaultDate
      this.fp = new Flatpickr(this.getElem(), safeConfig)
      this.fpInput().addEventListener('blur', this.onBlur)
      this.fp.hourElement && this.fp._bind(this.fp.hourElement, 'blur', this.onBlur, { capture: true })
      this.fp.minuteElement && this.fp._bind(this.fp.minuteElement, 'blur', this.onBlur, { capture: true })
      this.fp.secondElement && this.fp._bind(this.fp.secondElement, 'blur', this.onBlur, { capture: true })
    },
    destroy () {
      if (this.fp) {
        this.fpInput().removeEventListener('blur', this.onBlur)
        this.fp.destroy()
        this.fp = null
      }
    },
    getElem () {
      return this.config.wrap ? this.$el.parentNode : this.$refs.input
    },
    getValue () {
      return Array.isArray(this.modelValue) ? [...this.fp.selectedDates] : this.fp.selectedDates[0]
    },
    onInput (event) {
      let newValue = this.getValue()
      if (!this.hasChanges(newValue, this.modelValue)) { return false }
      if (Array.isArray(this.modelValue)) {
        // this is timerange mode - emit new range value event for the parent
        this.$emit('update:range', newValue)
      } else {
        // this is timepicker mode - update modelValue
        this.$emit('update:modelValue', newValue)
      }
    },
    fpInput () {
      return this.fp.altInput || this.fp.input
    },
    onBlur (event) {
      this.onInput(event)
      this.$emit('blur', this.getValue())
    },
    hasChanges (newValue, oldValue) {
      if (
        Array.isArray(newValue) && Array.isArray(oldValue) &&
        newValue.every((val, index) => val && oldValue[index] && Math.floor(val.valueOf() / 1000) === Math.floor(oldValue[index].valueOf() / 1000))
      ) { return false }
      if (newValue.valueOf() === oldValue.valueOf()) { return false }
      return true
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
    modelValue (newValue, oldValue) {
      if (!this.hasChanges(newValue, oldValue)) { return false }
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
  beforeUnmount () {
    this.destroy()
  }
})
</script>
<style lang="sass">
@use "sass:color"
.flatpickr__theme-dark
  $calendarBackground: #565656
  $calendarBorderColor: color.adjust($calendarBackground, $blackness: 100%)
  $monthForeground: #fff
  $monthBackground: #565656
  $weekdaysBackground: transparent
  $weekdaysForeground: #fff
  $dayForeground: rgba(white, 0.95)
  $dayHoverBackground: color.adjust($calendarBackground, $lightness: 20%)
  $todayColor: #eee
  $today_fg_color: #565656
  $selectedDayBackground: #666
  @import "../css/themes/datetimerange/flatpickr"
  .flatpickr-calendar.arrowTop:before,.flatpickr-calendar.arrowTop:after
    display: none
  .flatpickr-monthSelect-month
    color: $monthForeground
    &.selected
      background-color: $selectedDayBackground
      color: $monthForeground
</style>
