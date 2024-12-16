<template>
  <div class="outer_contour">
		<q-date minimal square flat bordered no-unset
			v-model="selectedDate"
			:first-day-of-week="`${currentTheme.firstDayOfWeek}`"
			:color="`${currentTheme.color}-8`"
			:class="`bg-${currentTheme.color}-3`"
			class="calendar"
			/>
			<div class="row" :class="`bg-${currentTheme.color}-3`">
        <time-component
          v-model="hours"
          :max="23"
          :scroll="`${currentTheme.timeScrolls}` ? true : false"
          :color="`${currentTheme.color}`"
          class="time_component"
        />
				<span class="separator">:</span>
        <time-component
          v-model="minutes"
          :scroll="`${currentTheme.timeScrolls}` ? true : false"
          :color="`${currentTheme.color}`"
          class="time_component"
        />
				<span class="separator">:</span>
        <time-component
          v-model="seconds"
          :scroll="`${currentTheme.timeScrolls}` ? true : false"
          :color="`${currentTheme.color}`"
          class="time_component"
        />
			</div>
		</div>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import TimeComponent from './TimeComponent.vue'

const { extractDate, formatDate } = date
const defaultTheme = {
  color: 'pink',
  firstDayOfWeek: 1,
  timeScrolls: true
}

export default defineComponent({
  name: 'DateTimePicker',
  components: {
    TimeComponent
  },
  props: {
    modelValue: {
      type: Number,
      required: true,
      default: Math.floor(Date.now() / 1000)
    },
    theme: {
      type: Object,
      default () {
        return defaultTheme
      }
    }
  },
  data () {
    return {
      currentTheme: Object.assign({}, defaultTheme, this.theme),
      selectedDate: formatDate(this.modelValue * 1000, 'YYYY/MM/DD'), // date string in format YYYY/MM/DD returned by qDate component
      hours: formatDate(this.modelValue * 1000, 'HH'),                // two-digit string
      minutes: formatDate(this.modelValue * 1000, 'mm'),              // two-digit string
      seconds: formatDate(this.modelValue * 1000, 'ss')               // two-digit string
    }
  },
  watch: {
    selectedDate (newValue) {
      if (newValue) {
        this.updateModel()
      }
    },
    hours () {
      this.updateModel()
    },
    minutes () {
      this.updateModel()
    },
    seconds () {
      this.updateModel()
    },
    theme (theme) {
      this.currentTheme = Object.assign({}, defaultTheme, theme)
    }
  },
  methods: {
    updateModel () {
      const dateSelected = extractDate(this.selectedDate, 'YYYY/MM/DD')
      dateSelected.setHours(+this.hours, +this.minutes, +this.seconds)
      const timestamp = +formatDate(dateSelected, 'X')
      this.$nextTick(() => {
        this.$emit('update:modelValue', timestamp)
      })
    }
  }
})
</script>
<style lang="sass">
.outer_contour
  border-radius: 3px 3px 6px 6px
  overflow: hidden
.calendar
  width: 299px
.time_component
  width: 97px
  height: 40px
.separator
  height: 40px
  color: black
  line-height: 40px
  font-weight: bold
</style>
