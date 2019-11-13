<template>
  <div :class="[`${currentTheme.bgColor === 'white' ? '' : 'flatpickr__theme-dark'}`]">
    <input ref="input" :key="drawFlag" type="text" data-input :disabled="disabled" @input="onInput" :style="{display: config && config.inline ? 'none' : ''}">
  </div>
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
      return this.config.wrap ? this.$el.parentNode : this.$refs.input
    },
    getValue () {
      return Array.isArray(this.value) ? [...this.fp.selectedDates] : this.fp.selectedDates[0]
    },
    onInput (event) {
      this.$nextTick(() => {
        let newValue = this.getValue()
        if (!this.hasChanges(newValue, this.value)) { return false }
        this.$emit('input', newValue)
      })
    },
    fpInput () {
      return this.fp.altInput || this.fp.input
    },
    onBlur (event) {
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
    value (newValue, oldValue) {
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
  beforeDestroy () {
    this.destroy()
  }
}
</script>
<style lang="stylus">
  .flatpickr__theme-dark
    $calendarBackground = #565656
    $calendarBorderColor = darken(#565656, 50%)
    $monthForeground = #fff
    $monthBackground = #565656
    $weekdaysBackground = transparent
    $weekdaysForeground = #fff
    $dayForeground = alpha(white, 0.95)
    $dayHoverBackground = lighten($calendarBackground, 25%)
    $todayColor = #eee
    $today_fg_color = #565656
    $selectedDayBackground = #666
    @require "../css/themes/datetimerange/flatpickr.styl"
    .flatpickr-monthSelect-month
      color $monthForeground
      &.selected
        background-color $selectedDayBackground
        color $monthForeground
</style>
