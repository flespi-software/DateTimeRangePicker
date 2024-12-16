<template>
  <div :class="`bg-${currentTheme.color}-6`" class="outer_contour">
    <div class="text-center q-my-sm" v-if="currentTheme.modeSwitch">
      <q-btn-toggle flat dense spread
        v-model="dateRangeMode"
        :options="dateRangeModeOptions"
        :toggle-text-color="`${currentTheme.color}-3`"
        :text-color="`${currentTheme.color}-10`"
        @update:model-value="dateRangeModeChanged"
      />
    </div>
    <div v-if="dateRangeMode === DATE_RANGE_MODE_RANGE">
      <q-date minimal range square flat bordered no-unset
        v-model="selectedDates"
        :first-day-of-week="`${currentTheme.firstDayOfWeek}`"
        :color="`${currentTheme.color}-8`"
        :class="`bg-${currentTheme.color}-6`"
        class="calendar"
      />
      <div class="row relative-position">
        <div class="col-6 range_time">
          <div class="row justify-center range_date">{{ from.date }}</div>
          <div class="row justify-center range_time_contour">
            <time-component scroll
              v-model="from.hours"
              :max="23"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
            <span class="time_separator">:</span>
            <time-component scroll
              v-model="from.minutes"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
            <span class="time_separator">:</span>
            <time-component scroll
              v-model="from.seconds"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
          </div>
        </div>
        <div class="date_separator">&mdash;</div>
        <div class="col-6 range_time">
          <div class="row justify-center range_date">{{ to.date }}</div>
          <div class="row justify-center range_time_contour">
            <time-component scroll
              v-model="to.hours"
              :max="23"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
            <span class="time_separator">:</span>
            <time-component scroll
              v-model="to.minutes"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
            <span class="time_separator">:</span>
            <time-component scroll
              v-model="to.seconds"
              :color="`${currentTheme.color}`"
              class="range_time_component"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="dateRangeMode === DATE_RANGE_MODE_DAY" style="min-width: 299px;">
      <q-date minimal square flat bordered no-unset
        v-model="selectedDates"
        :first-day-of-week="`${currentTheme.firstDayOfWeek}`"
        :color="`${currentTheme.color}-8`"
        :class="`bg-${currentTheme.color}-6`"
        class="calendar"
      />
    </div>
    <div v-if="dateRangeMode === DATE_RANGE_MODE_MANUAL" class="full-width q-px-md" style="min-width: 299px;">
      <q-btn-toggle flat spread
        v-model="manualFormat"
        class="q-mb-sm"
        :options="manualOptions"
        :color="currentTheme.color"
        :toggle-text-color="`${currentTheme.color}-3`"
        :text-color="`${currentTheme.color}-10`"
      />
      <template v-if="manualFormat === MANUAL_FORMAT">
        <q-input outlined dense
          v-model="manualFrom"
          debounce="500"
          class="q-field--with-bottom"
          label="From"
          :color="`${currentTheme.color}`"
          :bg-color="`${currentTheme.color}-1`"
          :label-color="`${currentTheme.color}`"
          mask="####/##/## ##:##:##"
          fill-mask="0"
          :key="0"
        />
        <q-input outlined dense
          v-model="manualTo"
          debounce="500"
          class="q-field--with-bottom"
          label="To"
          :color="`${currentTheme.color}`"
          :bg-color="`${currentTheme.color}-1`"
          :label-color="`${currentTheme.color}`"
          mask="####/##/## ##:##:##"
          fill-mask="0"
          :key="1"
        />
      </template>
      <template v-else-if="manualFormat === MANUAL_TIMESTAMP">
        <q-input outlined dense
          v-model.number="timestampFrom"
          type="number"
          label="From"
          :color="`${currentTheme.color}`"
          :bg-color="`${currentTheme.color}-1`"
          :label-color="`${currentTheme.color}`"
          :key="2"
          :rules="[val => validateTimestampsRule(val)]"
        />
        <q-input outlined dense
          v-model.number="timestampTo"
          type="number"
          label="To"
          :color="`${currentTheme.color}`"
          :bg-color="`${currentTheme.color}-1`"
          :label-color="`${currentTheme.color}`"
          :key="3"
          :rules="[val => validateTimestampsRule(val)]"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import TimeComponent from './TimeComponent.vue'

const DATE_RANGE_MODE_DAY = 0,
      DATE_RANGE_MODE_RANGE = 1,
      DATE_RANGE_MODE_MANUAL = 2,
      MANUAL_FORMAT = 0,
      MANUAL_TIMESTAMP = 1

const { extractDate, formatDate } = date

const defaultTheme = {
  color: 'pink',
  firstDayOfWeek: 1,
  modeSwitch: true,
  timeScrolls: true
}

export default defineComponent({
  name: 'DateRangePicker',
  components: {
    TimeComponent
  },
  props: {
    mode: {
      type: Number,
      default () { return DATE_RANGE_MODE_RANGE },
      validator (mode) {
        return [0, 1, 2].includes(mode)
      }
    },
    modelValue: {
      type: Array,
      required: true,
      default () {
        const currentTimestamp = Math.floor(Date.now() / 1000)
        return [currentTimestamp - 86399, currentTimestamp]
      },
      validator (modelValue) {
        return modelValue.length === 2 && typeof modelValue[0] === 'number' && typeof modelValue[1] === 'number'
      }
    },
    theme: {
      type: Object,
      default () {
        return defaultTheme
      }
    }
  },
  computed: {
    manualFrom: {
      get () {
        return formatDate(this.modelValue[0] * 1000, 'YYYY/MM/DD HH:mm:ss')
      },
      set (from) {
        const dateFromDate = extractDate(from, 'YYYY/MM/DD HH:mm:ss')
        const timestampFrom = +formatDate(dateFromDate, 'X')
        this.from = Object.assign(this.from, this.decomposeTimestampToModelValues(timestampFrom))
        this.syncSelectedDates()
      }
    },
    manualTo: {
      get () {
        return formatDate(this.modelValue[1] * 1000, 'YYYY/MM/DD HH:mm:ss')
      },
      set (to) {
        const dateToDate = extractDate(to, 'YYYY/MM/DD HH:mm:ss')
        const timestampTo = +formatDate(dateToDate, 'X')
        this.to = Object.assign(this.to, this.decomposeTimestampToModelValues(timestampTo))
        this.syncSelectedDates()
      }
    },
    timestampFrom: {
      get () {
        return this.modelValue[0]
      },
      set (from) {
        this.from = Object.assign(this.from, this.decomposeTimestampToModelValues(from))
        this.syncSelectedDates()
      }
    },
    timestampTo: {
      get () {
        return this.modelValue[1]
      },
      set (to) {
        this.to = Object.assign(this.to, this.decomposeTimestampToModelValues(to))
        this.syncSelectedDates()
      }
    }
  },
  data () {
    const currentTheme = Object.assign({}, defaultTheme, this.theme)
    const dateRangeMode = currentTheme.modeSwitch ? this.getModeByRange(this.modelValue) : this.mode
    const selectedDates = this.initSelectedDates(dateRangeMode)
    return {
      currentTheme,
      dateRangeMode,
      dateRangeModeOptions: [
        { label: 'Day', value: DATE_RANGE_MODE_DAY },
        { label: 'Range', value: DATE_RANGE_MODE_RANGE },
        { label: 'Manual', value: DATE_RANGE_MODE_MANUAL }
      ],
      DATE_RANGE_MODE_DAY,
      DATE_RANGE_MODE_RANGE,
      DATE_RANGE_MODE_MANUAL,
      MANUAL_FORMAT,
      MANUAL_TIMESTAMP,
      manualOptions: [
        { label: 'Format', value: MANUAL_FORMAT },
        { label: 'Timestamp', value: MANUAL_TIMESTAMP }
      ],
      manualFormat: MANUAL_FORMAT,
      selectedDates,
      from: {
        date: formatDate(this.modelValue[0] * 1000, 'YYYY/MM/DD'),
        hours: formatDate(this.modelValue[0] * 1000, 'HH'),
        minutes: formatDate(this.modelValue[0] * 1000, 'mm'),
        seconds: formatDate(this.modelValue[0] * 1000, 'ss')
      },
      to: {
        date: formatDate(this.modelValue[1] * 1000, 'YYYY/MM/DD'),
        hours: formatDate(this.modelValue[1] * 1000, 'HH'),
        minutes: formatDate(this.modelValue[1] * 1000, 'mm'),
        seconds: formatDate(this.modelValue[1] * 1000, 'ss')
      },
    }
  },
  watch: {
    from: {
      deep: true,
      handler () {
        this.updateModel()
      }
    },
    to: {
      deep: true,
      handler () {
        this.updateModel()
      }
    },
    selectedDates (newValue) {
      if (newValue) {
        if (typeof newValue === 'string') {
          // "2024/12/12"
          this.from.date = this.to.date = newValue
        } else if (typeof newValue === 'object' && newValue.from && newValue.to) {
          // {"from":"2024/12/06","to":"2024/12/07"}
          this.from.date = newValue.from
          this.to.date = newValue.to
        }
        this.updateModel()
      }
    },
    theme (theme) {
      this.currentTheme = Object.assign({}, defaultTheme, theme)
    },
  },
  methods: {
    dateRangeModeChanged (mode) {
      this.dateRangeMode = mode
      this.$emit('change:mode', mode)
      if (mode === DATE_RANGE_MODE_DAY) {
        // update v-model of qDate component to show one day
        this.selectedDates = this.from.date
        // update time from and time to to be 00:00:00 - 23:59:59
        this.from.hours = this.from.minutes =  this.from.seconds = '00'
        this.to.hours = '23'
        this.to.minutes = this.to.seconds = '59'
        this.updateModel()
      }
    },
    decomposeTimestampToModelValues(timestamp) {
      const timestampMs = timestamp * 1000
      return {
        date: formatDate(timestampMs, 'YYYY/MM/DD'),
        hours: formatDate(timestampMs, 'HH'),
        minutes: formatDate(timestampMs, 'mm'),
        seconds: formatDate(timestampMs, 'ss')
      }
    },
    getModeByRange (range) {
      const fromComponents = this.decomposeTimestampToModelValues(range[0])
      const toComponents = this.decomposeTimestampToModelValues(range[1])
      if (fromComponents.date !== toComponents.date) {
        return DATE_RANGE_MODE_RANGE
      }
      if (fromComponents.hours === '00' && fromComponents.minutes === '00' && fromComponents.seconds === '00' &&
          toComponents.hours === '23' && toComponents.minutes === '59' && toComponents.seconds === '59') {
        return DATE_RANGE_MODE_DAY
      }
      return DATE_RANGE_MODE_RANGE
    },
    initSelectedDates (dateRangeMode) {
      // initialize selectedDates field as v-model for qDate component
      if (dateRangeMode === DATE_RANGE_MODE_DAY) {
        // if just one date is selected - string in format 'YYYY/MM/DD'
        return formatDate(this.modelValue[0] * 1000, 'YYYY/MM/DD')
      }
      if (dateRangeMode === DATE_RANGE_MODE_RANGE) {
        const dateFrom = formatDate(this.modelValue[0] * 1000, 'YYYY/MM/DD')
        const dateTo = formatDate(this.modelValue[1] * 1000, 'YYYY/MM/DD')
        if (dateFrom === dateTo) {
          // if just one date is selected - string in format 'YYYY/MM/DD'
          return dateFrom
        }
        // if date range is selected - object in format {from: 'YYYY/MM/DD', to: 'YYYY/MM/DD'}
        return { from: dateFrom, to: dateTo }
      }
    },
    syncSelectedDates () {
      // sync qDate v-model with the currently selected date
      if (this.from.date === this.to.date) {
        this.selectedDates = this.from.date
      } else {
        this.selectedDates = {
          from:  this.from.date,
          to: this.to.date
        }
      }
    },
    updateModel () {
      // update component's modelValue: [timestampFrom, timestampTo]
      const dateFromDate = extractDate(this.from.date, 'YYYY/MM/DD')
      const dateToDate = extractDate(this.to.date, 'YYYY/MM/DD')
      dateFromDate.setHours(+this.from.hours, +this.from.minutes, +this.from.seconds)
      dateToDate.setHours(+this.to.hours, +this.to.minutes, +this.to.seconds)
      const timestampFrom = +formatDate(dateFromDate, 'X')
      const timestampTo = +formatDate(dateToDate, 'X')
      this.$nextTick(() => {
        // adjust timestamp sp that To always was bigger than From, and add 0.999 ms to the end timestamp to cope with backend issue
        this.$emit('update:modelValue', (timestampTo > timestampFrom) ? [timestampFrom, timestampTo + 0.999] : [timestampTo, timestampFrom + 0.999])
      })
    },
    validateTimestampsRule (val) {
      return (val <= 9999999999 && val === Math.abs(val))
        || 'Wrong timestamp'
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
.range_date
  width: 100%
  text-align: center
  font-size: 0.9em
  font-weight: bold
.range_time
  padding: 0
.range_time_contour
  margin: auto
  padding: 1px
.range_time_component
  padding: 0
  width: 40px
  height: 30px
.time_separator
  height: 40px
  color: black
  line-height: 40px
  font-weight: bold
.date_separator
  font-weight: bold
  position: absolute
  top: 30px
  left: 140px
</style>
