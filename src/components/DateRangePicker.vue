<template>
  <div class="relative-position flex flex-center" :class="[`bg-${currentTheme.bgColor}`, `${currentTheme.bgColor === 'white' ? '' : 'flatpickr__theme-dark'}`]" style="max-width: 310px;">
    <div class="fit text-center q-mb-sm" v-if="currentTheme.modeSwitch">
      <q-btn-toggle :value="dateRangeMode" @change="dateRangeModeChange" :options="dateRangeModeOptions" :color="currentTheme.bgColor" text-color="grey" :toggle-text-color="currentTheme.color" flat rounded/>
    </div>
    <div class="time-range-input__wrapper q-mb-sm">
      <flat-pickr
        :value="currentDateRangeModel"
        @input="currentDateRangeModelChangeHandler"
        :config="dateRangeConfig"
      />
    </div>
    <div v-if="dateRangeMode === DATE_RANGE_MODE_CURRENT" class="time-range-input__wrapper q-mb-sm row">
      <div class="time-range-input__time wrapper__begin col-5">
        <div class="time__label" :class="[`text-${currentTheme.color}`]">{{formatDate(currentDateRangeModel[0].valueOf(), 'DD/MM/YYYY')}}</div>
        <flat-pickr
          :value="currentBeginTime"
          @input="beginTimeChangeHandler"
          :config="{
            enableTime: true,
            noCalendar: true,
            time_24hr: true,
            enableSeconds: true,
            inline: true
          }"
        />
      </div>
      <div class="col-2 text-center" :class="[`text-${currentTheme.color}`]" style="line-height: 31px; font-size: 1.4rem; padding-top: 22px;">&ndash;</div>
      <div class="time-range-input__time wrapper__end col-5">
        <div class="time__label" :class="[`text-${currentTheme.color}`]">{{currentDateRangeModel[1] ? formatDate(currentDateRangeModel[1].valueOf(), 'DD/MM/YYYY') : formatDate(Date.now(), 'DD/MM/YYYY')}}</div>
        <flat-pickr
          :value="currentEndTime"
          @input="endTimeChangeHandler"
          :config="{
            enableTime: true,
            noCalendar: true,
            time_24hr: true,
            enableSeconds: true,
            inline: true
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { date } from 'quasar'
import flatPickr from './FlatPickr.vue'
import WeekSelect from 'flatpickr/dist/plugins/weekSelect/weekSelect'
import MonthSelect from 'flatpickr/dist/plugins/monthSelect/index'
import 'flatpickr/dist/plugins/monthSelect/style.css'
// import 'flatpickr/dist/flatpickr.css'

const DATE_RANGE_MODE_DAY = 0,
  DATE_RANGE_MODE_WEEK = 1,
  DATE_RANGE_MODE_MONTH = 2,
  DATE_RANGE_MODE_CURRENT = 3

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
        return [0, 1, 2, 3].includes(mode)
      }
    },
    theme: {
      type: Object,
      default () {
        return {
          color: 'dark',
          bgColor: 'white',
          modeSwitch: true
        }
      }
    }
  },
  data () {
    let currentDateRangeModel = this.value.map(timestamp => new Date(timestamp))
    let defaultTheme = {
      color: 'dark',
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
        maxDate: 'today',
        locale: {
          firstDayOfWeek: 1
        }
      },
      currentBeginTime: currentDateRangeModel[0],
      currentEndTime: currentDateRangeModel[1],
      dateRangeMode: this.mode,
      dateRangeModeOptions: [
        { label: 'Day', value: DATE_RANGE_MODE_DAY },
        { label: 'Week', value: DATE_RANGE_MODE_WEEK },
        { label: 'Month', value: DATE_RANGE_MODE_MONTH },
        { label: 'Range', value: DATE_RANGE_MODE_CURRENT }
      ],
      DATE_RANGE_MODE_DAY,
      DATE_RANGE_MODE_WEEK,
      DATE_RANGE_MODE_MONTH,
      DATE_RANGE_MODE_CURRENT
    }
  },
  methods: {
    formatDate: date.formatDate,
    dateRangeModeChange (mode) {
      this.dateRangeMode = mode
      let config = {
        inline: true,
        maxDate: 'today',
        locale: this.dateRangeConfig.locale
      }
      if (this.dateRangeMode === DATE_RANGE_MODE_DAY) {
        config.mode = 'single'
      } else if (this.dateRangeMode === DATE_RANGE_MODE_WEEK) {
        config.plugins = [new WeekSelect({})]
      } else if (this.dateRangeMode === DATE_RANGE_MODE_MONTH) {
        config.plugins = [new MonthSelect({})]
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
        let newDate = new Date()
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
        if (lastday > newDate) {
          lastday = newDate
        }
        range = [firstday, lastday]
      } else if (mode === DATE_RANGE_MODE_MONTH) {
        let newDate = new Date()
        let date = new Date(range[0].valueOf() + 86400000), y = date.getUTCFullYear(), m = date.getUTCMonth()
        let firstday = new Date(y, m, 1)
        firstday.setHours(0, 0, 0, 0)
        let lastday = new Date(y, m + 1, 1)
        lastday.setHours(0, 0, 0, 0)
        lastday = new Date(lastday - 1)
        if (lastday > newDate) {
          lastday = newDate
        }
        range = [firstday, lastday]
      } else if (mode === DATE_RANGE_MODE_CURRENT) {
        let begin = this.currentBeginTime
        let end = this.currentEndTime
        let first = range[0]
        let last = range[1]
        if (!first || !last) { return undefined }
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
      this.currentBeginTime = val && val[0]
      this.update()
    },
    endTimeChangeHandler (val) {
      this.currentEndTime = val && val[0]
      this.update()
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue.every((val, index) => val === oldValue[index])) return
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
  .time-range-input__wrapper
    width 307px
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
