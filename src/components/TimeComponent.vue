<template>
  <q-input dense filled square
    v-model="input"
    ref="input"
    mask="##"
    input-style="text-align: center"
    :bg-color="`${color}`"
    :rules="[ validationRule ]"
    @blur="onBlur"
  />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TimeComponent',
  props: {
    modelValue: {
      type: String,
      required: true,
      validator (modelValue) {
        return /^\d\d$/.test(modelValue)   // 2-digit string
      }
    },
    max: {
      type: Number,
      default () { return 59 },
      validator (max) {
        return [23, 59].includes(max)
      }
    },
    scroll: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'grey'
    }
  },
  emits: ['update:modelValue'],
  data () {
    return {
      crossZero: false,                 // cross zero flag for scrolling, for desktop
      input: this.modelValue,           // value dislayed in qInput
      timeComponent: this.modelValue,   // actual value of time component
      touchClientY: 0,                  // touch start, for mobile
      touchTimer: null                  // timer for measuring touch duration, for mobile
    }
  },
  mounted () {
    if (this.scroll) {
      if (this.$q.platform.is.desktop) {
        this.$refs.input.$el.addEventListener("wheel", this.onScroll, {passive: false})
        return
      }
      if (this.$q.platform.is.mobile) {
        this.$refs.input.$el.addEventListener("touchstart", this.onTouchStart)
        this.$refs.input.$el.addEventListener("touchend", this.onTouchEnd)
      }
    }
  },
  watch: {
    modelValue() {
      this.input = this.timeComponent = this.modelValue
    },
    timeComponent () {
      this.$emit('update:modelValue', this.timeComponent)
    }
  },
  methods: {
    onBlur (event) {
      if (!event.target.value) {
        // user deleted everything from the input, set default value
        this.input = this.timeComponent = '00'
        return
      }
      const value = +event.target.value
      if (value < 0 || value > this.max) {
        this.input = this.timeComponent
        return
      }
      if (value === 0) {
        this.input = this.timeComponent = '00'
        return
      }
      if (value < 10) {
        this.input = this.timeComponent = '0' + event.target.value
        return
      }
      this.timeComponent = event.target.value
    },
    onLongTouch () {
      this.touchClientY = 0
      this.$refs.input.$el.focus()
    },
    onScroll (event) {
      event.preventDefault()
      if (event.deltaY < 0) {
        // scrolling up
        this.processUp()
      } else if (event.deltaY > 0) {
        // scrolling down
        this.processDown()
      }
      this.timeComponent = this.input
    },
    onTouchEnd (event) {
      if (event.changedTouches && event.changedTouches[0]) {
        event.preventDefault()
        const clientY = event.changedTouches[0].clientY
        if (this.touchTimer) {
          clearTimeout(this.touchTimer)
        }
        if (this.touchClientY !== 0 && clientY > this.touchClientY) {
          this.processDown()
        } else if (this.touchClientY !== 0 && clientY < this.touchClientY) {
          this.processUp()
        }
        this.touchClientY = 0
        this.timeComponent = this.input
      }
    },
    onTouchStart (event) {
      event.preventDefault()
      this.touchTimer = setTimeout(this.onLongTouch, 500)
      if (event.changedTouches && event.changedTouches[0]) {
        this.touchClientY = event.changedTouches[0].clientY
      }
    },
    processUp () {
      const current = +this.input
      if (current >= this.max) {
        // cross zero and continue growing
        if (this.crossZero === true) {
          this.input = '00'
          this.crossZero = false
        } else {
          this.input = '' + this.max
          this.crossZero = true
        }
      } else {
        if (current >= 9) {
          this.input = '' + (current + 1)
        } else {
          this.input = '0' + (current + 1)
        }
        this.crossZero = false
      }
    },
    processDown () {
      const current = +this.input
      if (current <= 0) {
        if (this.crossZero === true) {
          this.input = '' + this.max
          this.crossZero = false
        } else {
          this.crossZero = true
          this.input = '00'
        }
      } else {
        if (current >= 11) {
          this.input = '' + (current - 1)
        } else {
          this.input = '0' + (current - 1)
        }
        this.crossZero = false
      }
    },
    validationRule (val) {
      const value = +val
      if (value <= this.max && value >= 0) {
        return true
      }
      return `Expected values 00 - ${this.max}`
    }
  }
})
</script>
