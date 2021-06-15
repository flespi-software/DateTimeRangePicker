<template>
  <div class="relative-position flex flex-center" :class="[`bg-${currentTheme.bgColor}`]" style="max-width: 310px;">
    <div class="fit text-center q-my-sm" v-if="currentTheme.modeSwitch">
      <q-btn-toggle :value="dateRangeMode" @input="dateRangeModeChange" :options="dateRangeModeOptions" :color="currentTheme.bgColor" text-color="grey" :toggle-text-color="currentTheme.color" flat dense/>
    </div>
    <div v-if="dateRangeMode === DATE_RANGE_MODE_MANUAL" class="full-width q-px-md">
      <q-btn-toggle v-model="manualFormat" class="q-mb-sm" :options="manualOptions" :color="currentTheme.bgColor" text-color="grey" :toggle-text-color="currentTheme.color" flat spread></q-btn-toggle>
      <template v-if="manualFormat === MANUAL_FORMAT">
        <q-input v-model="manualFrom" debounce="300" class="q-field--with-bottom" label="From" outlined :bg-color="currentTheme.color" :color="currentTheme.bgColor" dense mask="##/##/#### ##:##:##" fill-mask="0" :key="0"/>
        <q-input v-model="manualTo" debounce="300" class="q-field--with-bottom" label="To" outlined :bg-color="currentTheme.color" :color="currentTheme.bgColor" dense mask="##/##/#### ##:##:##" fill-mask="0" :key="1"/>
      </template>
      <template v-else-if="manualFormat === MANUAL_TIMESTAMP">
        <q-input v-model.number="timestampFrom" type="number" label="From" outlined :bg-color="currentTheme.color" :color="currentTheme.bgColor" dense :key="2" :rules="[val => val <= 9999999999 || 'Wrong timestamp']"/>
        <q-input v-model.number="timestampTo" type="number" label="To" outlined :bg-color="currentTheme.color" :color="currentTheme.bgColor" dense :key="3" :rules="[val => val <= 9999999999 || 'Wrong timestamp']"/>
      </template>
    </div>
    <template v-else>
      <div class="time-range-input__wrapper q-mb-sm">
        <flat-pickr
          :value="currentDateRangeModel"
          @input="currentDateRangeModelChangeHandler"
          :config="dateRangeConfig"
          :theme="currentTheme"
        />
      </div>
      <div v-if="dateRangeMode === DATE_RANGE_MODE_CURRENT" class="time-range-input__wrapper q-mb-sm row">
        <div class="time-range-input__time wrapper__begin col-5">
          <div class="time__label" :class="[`text-${currentTheme.color}`]">{{formatDate(currentDateRangeModel[0].valueOf(), 'DD/MM/YYYY')}}</div>
          <flat-pickr
            :value="currentBeginTime"
            @input="beginTimeChangeHandler"
            :config="timeConfig"
            :theme="currentTheme"
          />
        </div>
        <div class="col-2 text-center" :class="[`text-${currentTheme.color}`]" style="line-height: 31px; font-size: 1.4rem; padding-top: 22px;">&ndash;</div>
        <div class="time-range-input__time wrapper__end col-5">
          <div class="time__label" :class="[`text-${currentTheme.color}`]">{{currentDateRangeModel[1] ? formatDate(currentDateRangeModel[1].valueOf(), 'DD/MM/YYYY') : formatDate(Date.now(), 'DD/MM/YYYY')}}</div>
          <flat-pickr
            :value="currentEndTime"
            @input="endTimeChangeHandler"
            :config="timeConfig"
            :theme="currentTheme"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { date } from 'quasar'
import flatPickr from './FlatPickr.vue'
import WeekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect'
import MonthSelect from 'flatpickr/dist/plugins/monthSelect/index'
import ScrollPlugin from 'flatpickr/dist/plugins/scrollPlugin'
import 'flatpickr/dist/plugins/monthSelect/style.css'

const DATE_RANGE_MODE_DAY = 0,
  DATE_RANGE_MODE_WEEK = 1,
  DATE_RANGE_MODE_MONTH = 2,
  DATE_RANGE_MODE_CURRENT = 3,
  DATE_RANGE_MODE_MANUAL = 4,
  MANUAL_FORMAT = 0,
  MANUAL_TIMESTAMP = 1

export default {
  name: 'DateRangePicker',
  props: {
    value: {
      type: Array,
      required: true,
      default () { return [Date.now()] }
    },
    mode: {
      type: Number,
      default () { return DATE_RANGE_MODE_DAY },
      validator (mode) {
        return [0, 1, 2, 3, 4].includes(mode)
      }
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
    let currentDateRangeModel = this.value.map(timestamp => new Date(timestamp))
    let defaultTheme = {
      color: 'grey-9',
      bgColor: 'white',
      modeSwitch: true
    }
    return {
      defaultTheme,
      currentTheme: Object.assign({}, defaultTheme, this.theme),
      currentDateRangeModel,
      dateRangeConfig: {
        mode: 'single',
        inline: true,
        locale: {
          firstDayOfWeek: 1
        }
      },
      timeConfig: {
        enableTime: true,
        noCalendar: true,
        time_24hr: true,
        enableSeconds: true,
        inline: true,
        minuteIncrement: 1
      },
      currentBeginTime: currentDateRangeModel[0],
      currentEndTime: currentDateRangeModel[1],
      dateRangeMode: this.mode,
      dateRangeModeOptions: [
        { label: 'Day', value: DATE_RANGE_MODE_DAY },
        { label: 'Week', value: DATE_RANGE_MODE_WEEK },
        { label: 'Month', value: DATE_RANGE_MODE_MONTH },
        { label: 'Range', value: DATE_RANGE_MODE_CURRENT },
        { label: 'Manual', value: DATE_RANGE_MODE_MANUAL }
      ],
      DATE_RANGE_MODE_DAY,
      DATE_RANGE_MODE_WEEK,
      DATE_RANGE_MODE_MONTH,
      DATE_RANGE_MODE_CURRENT,
      DATE_RANGE_MODE_MANUAL,
      MANUAL_FORMAT,
      MANUAL_TIMESTAMP,
      manualOptions: [
        { label: 'Format', value: MANUAL_FORMAT },
        { label: 'Timestamp', value: MANUAL_TIMESTAMP }
      ],
      manualFormat: MANUAL_FORMAT
    }
  },
  computed: {
    manualFrom: {
      get () {
        return this.dateToManual(this.currentDateRangeModel[0])
      },
      set (from) {
        this.$set(this.currentDateRangeModel, 0, this.manualToDate(from))
        this.update()
      }
    },
    manualTo: {
      get () {
        return this.dateToManual(this.currentDateRangeModel[1])
      },
      set (to) {
        this.$set(this.currentDateRangeModel, 1, this.manualToDate(to))
        this.update()
      }
    },
    timestampFrom: {
      get () {
        return Math.floor(this.currentDateRangeModel[0].valueOf() / 1000)
      },
      set (from) {
        this.$set(this.currentDateRangeModel, 0, new Date(from * 1000))
        this.update()
      }
    },
    timestampTo: {
      get () {
        return Math.floor(this.currentDateRangeModel[1].valueOf() / 1000)
      },
      set (to) {
        this.$set(this.currentDateRangeModel, 1, new Date(to * 1000))
        this.update()
      }
    },
    hasError () {
      return this.currentDateRangeModel[1] <= this.currentDateRangeModel[0] || (this.manualFormat === MANUAL_TIMESTAMP && (this.timestampFrom > 9999999999 || this.timestampTo > 9999999999))
    }
  },
  methods: {
    formatDate: date.formatDate,
    dateRangeModeChange (mode) {
      this.dateRangeMode = mode
      let config = {
        inline: true,
        locale: this.dateRangeConfig.locale,
        plugins: [ new ScrollPlugin() ]
      }
      if (this.dateRangeMode === DATE_RANGE_MODE_DAY) {
        config.mode = 'single'
      } else if (this.dateRangeMode === DATE_RANGE_MODE_WEEK) {
        config.plugins.push(new WeekSelect({}))
      } else if (this.dateRangeMode === DATE_RANGE_MODE_MONTH) {
        config.plugins.push(new MonthSelect({}))
      } else if (this.dateRangeMode === DATE_RANGE_MODE_CURRENT) {
        config.mode = 'range'
      }
      this.dateRangeConfig = config
      let currentDateRangeModel = this.getValue(this.currentDateRangeModel, this.dateRangeMode)
      this.currentBeginTime = currentDateRangeModel[0]
      this.currentEndTime = currentDateRangeModel[1]
      this.currentDateRangeModel = currentDateRangeModel
      this.$emit('change:mode', mode)
      this.update()
    },
    update () {
      if (this.hasError) {
        return this.$emit('error', true)
      }
      this.$emit('error', false)
      let value = this.getValue(this.currentDateRangeModel, this.dateRangeMode)
      if (!value) { return }
      value = value.map(date => date.valueOf())
      if (value) { this.$emit('input', value) }
    },
    getValue (range, mode) {
      range = range.map(date => new Date(date.valueOf()))
      if (mode === DATE_RANGE_MODE_DAY) {
        let curr = range[0]
        let start = new Date(curr.setHours(0, 0, 0, 0))
        let end = new Date(curr.setHours(23, 59, 59, 999))
        range = [start, end]
      } else if (mode === DATE_RANGE_MODE_WEEK) {
        let getCurr = () => new Date(range[0].valueOf())
        let curr = getCurr()
        let currentDay = curr.getDay()
        if (this.dateRangeConfig.locale && this.dateRangeConfig.locale.firstDayOfWeek) {
          let firstDayOfWeek = this.dateRangeConfig.locale.firstDayOfWeek
          currentDay = currentDay ? currentDay - firstDayOfWeek : 6
        }
        let first = curr.getDate() - currentDay
        let last = curr.getDate() + (6 - currentDay)
        let firstday = new Date(getCurr().setDate(first))
        firstday.setHours(0, 0, 0, 0)
        let lastday = new Date(getCurr().setDate(last))
        lastday.setHours(23, 59, 59, 999)
        range = [firstday, lastday]
      } else if (mode === DATE_RANGE_MODE_MONTH) {
        let date = new Date(range[0].valueOf() + 86400000), y = date.getUTCFullYear(), m = date.getUTCMonth()
        let firstday = new Date(y, m, 1)
        firstday.setHours(0, 0, 0, 0)
        let lastday = new Date(y, m + 1, 1)
        lastday.setHours(0, 0, 0, 0)
        lastday = new Date(lastday - 1)
        range = [firstday, lastday]
      } else if (mode === DATE_RANGE_MODE_CURRENT) {
        let begin = this.currentBeginTime
        let end = this.currentEndTime
        let first = range[0]
        let last = range[1]
        if (!first || !last || !begin || !end) { return undefined }
        first.setHours(begin.getHours(), begin.getMinutes(), begin.getSeconds(), 0)
        last.setHours(end.getHours(), end.getMinutes(), end.getSeconds())
        range = [first, last]
      }
      return range
    },
    currentDateRangeModelChangeHandler (range) {
      range = this.getValue(range, this.dateRangeMode)
      if (!range) { return }
      this.currentBeginTime = range[0]
      this.currentEndTime = range[1]
      this.currentDateRangeModel = range
      this.update()
    },
    beginTimeChangeHandler (val) {
      this.currentBeginTime = val
      this.update()
    },
    endTimeChangeHandler (val) {
      this.currentEndTime = val
      this.update()
    },
    manualToDate (timestring) {
      const [date, time] = timestring.split(' ')
      const [day, month, year] = date.split('/')
      const [hours, minutes, seconds] = time.split(':')
      const result = new Date()
      result.setMonth(month - 1)
      result.setYear(year)
      result.setHours(hours)
      result.setMinutes(minutes)
      result.setSeconds(seconds)
      result.setDate(day)
      return result
    },
    dateToManual (d) {
      return date.formatDate(d, 'DD/MM/YYYY HH:mm:ss')
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (
        Array.isArray(newValue) && Array.isArray(oldValue) &&
        newValue.every((val, index) => val && oldValue[index] && Math.floor(val.valueOf() / 1000) === Math.floor(oldValue[index].valueOf() / 1000))
      ) { return }
      if (newValue.valueOf() === oldValue.valueOf()) { return false }
      let currentDateRangeModel = newValue.map(timestamp => new Date(timestamp))
      this.currentBeginTime = currentDateRangeModel[0]
      this.currentEndTime = currentDateRangeModel[1]
      this.currentDateRangeModel = currentDateRangeModel
    },
    mode: {
      handler  (mode, oldMode) {
        if (mode === oldMode) { return }
        this.dateRangeModeChange(mode)
      },
      immediate: true
    },
    theme (theme) {
      this.currentTheme = Object.assign({}, this.defaultTheme, theme)
    }
  },
  components: { flatPickr }
}
</script>

<style lang="stylus">
  .date-range-wrapper:after
    content ''
    position absolute
    left 42%
    top 100%
    width 0
    height 0
    border-left 20px solid transparent
    border-right 20px solid transparent
    border-top 20px solid #e8e8e8
    clear both
  .time-range-input__wrapper
    .time-range-input__time
      .flatpickr-calendar
        width 100%
      .time__label
        font-size .8rem
        font-weight bold
        padding-left 5px
    input[data-input]
      display none
</style>
