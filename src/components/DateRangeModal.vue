<template>
  <div class="q-v-date-range-picker on-left">
    <q-btn flat dense
      icon="mdi-chevron-left"
      @click="prevHandler">
      <q-tooltip>Previous time range</q-tooltip>
    </q-btn>

    <q-btn flat
      style="min-width: 124px; font-size: .8rem; line-height: .8rem;"
      class="q-pa-none"
      @click="$refs.dateRangePickerModal.toggle()">
      <div>
        <div>{{ rangeFromFormatted }}</div>
        <div style="font-size: .5rem">|</div>
        <div>{{ rangeToFormatted }}</div>
      </div>
      <q-tooltip>Change time</q-tooltip>
    </q-btn>

    <q-btn flat dense
      icon="mdi-chevron-right"
      @click="nextHandler">
      <q-tooltip>Next time range</q-tooltip>
    </q-btn>
    <q-dialog no-route-dismiss
      ref="dateRangePickerModal"
      content-class="modal-date-range"
      content-style="z-index: 90000;">
      <q-card>
        <q-card-section
          class="no-scroll q-pa-none"
          :class="{[`bg-${theme.color}-5`]: true}">
          <div class="flex flex-center">
            <date-range-picker
              class="q-ma-sm"
              :mode="mode"
              v-model="interval"
              :theme="theme"
              @change:mode="(m) => { mode = m }"
              @error="flag => applyDisabled = flag"
            />
          </div>
        </q-card-section>
        <q-card-actions :align="currentTheme.button ? 'between' : 'right'" :class="{[`bg-${theme.color}-5`]: true}">
          <q-btn flat dense
            v-if="currentTheme.button"
            :icon="currentTheme.button.icon ? currentTheme.button.icon : ''"
            :label="currentTheme.button.label ? currentTheme.button.label : ''"
            :color="`${theme.color}-10`"
            @click="$emit('click:customButton'), currentTheme.button.closeModal ? $refs.dateRangePickerModal.hide() : () => {}">
            <q-tooltip v-if="currentTheme.button.tooltip">{{ currentTheme.button.tooltip }}</q-tooltip>
          </q-btn>
          <div>
            <q-btn flat
              label="close"
              :color="`${theme.color}-10`"
              @click="$refs.dateRangePickerModal.hide()"
            />
            <q-btn flat
              label="apply"
              :color="`${theme.color}-10`"
              @click="dateRangeModalApply"
              :disable="applyDisabled"
            />
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>


  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { date, debounce } from 'quasar'
import DateRangePicker from './DateRangePicker.vue'

const { formatDate } = date

const defaultTheme = {
  color: 'pink',
  firstDayOfWeek: 1,
  modeSwitch: true,
  timeScrolls: true
}

const DATE_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss'

export default defineComponent({
  name: 'DateRangeModal',
  components: {
    DateRangePicker
  },
  emits: [
    'click:customButton',
    'update:modelValue'
  ],
  props: {
    modelValue: {
      type: Array,  // [timestampFrom, timestampTo], ms
      required: true,
      default () {
        const currentTimestamp = Date.now()
        return [currentTimestamp - 86399000, currentTimestamp]
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
    rangeFromFormatted () {
      // formatted begin of the interval, to be displayed on the modal's button
      return formatDate(this.modelValue[0], DATE_TIME_FORMAT)
    },
    rangeToFormatted () {
      // formatted end of the interval, to be displayed on the modal's button
      return formatDate(this.modelValue[1], DATE_TIME_FORMAT)
    }
  },
  data () {
    const currentTheme = Object.assign({}, defaultTheme, this.theme)
    const timestampFrom = Math.floor(this.modelValue[0] / 1000)
    const timestampTo = Math.floor(this.modelValue[1] / 1000)
    return {
      applyDisabled: false,                   // disable Apply button for the dialog
      currentTheme,
      interval: [timestampFrom, timestampTo], // seconds, model value for DateRangePicker component
      mode: 0                                 // currently selected mode of DateRangePicker component
    }
  },
  created () {
    this.debouncedUpdateModel = debounce(this.updateModel, 300)
  },
  watch: {
    modelValue () {
      const timestampFrom = Math.floor(this.modelValue[0] / 1000)
      const timestampTo = Math.floor(this.modelValue[1] / 1000)
      this.interval = [timestampFrom, timestampTo]
    },
    theme (theme) {
      this.currentTheme = Object.assign({}, this.defaultTheme, theme)
    }
  },
  methods: {
    dateRangeModalApply () {
      // convert to ms and update v-model of the parent component with newly selected interval
      this.updateModel([this.interval[0] * 1000, this.interval[1] * 1000])
      // close the modal
      this.$refs.dateRangePickerModal.hide()
    },
    nextHandler () {
      // calculate delta in ms to display the same interval of time forward to the future
      const delta = this.modelValue[1] - this.modelValue[0] // ms
      // add one ms to the current end of the interval to avoid overlapping of time intervals
      const newFrom = this.modelValue[1] + 1 // ms
      const newTo = newFrom + delta
      // update interval to be displayed by the DateRangePicker
      this.interval = [Math.floor(newFrom / 1000), Math.floor(newTo / 1000)]
      // update model value of the parent component
      this.debouncedUpdateModel([newFrom, newTo])
    },
    prevHandler () {
      // calculate delta in ms to display the same interval of time back to the past
      const delta = this.modelValue[1] - this.modelValue[0] // ms
      // subtract one ms from the current begin of the interval to avoid overlapping of time intervals
      const newTo = this.modelValue[0] - 1 // ms
      const newFrom = newTo - delta
      // update interval to be displayed by the DateRangePicker
      this.interval = [Math.floor(newFrom / 1000), Math.floor(newTo / 1000)]
      // update model value of the parent component
      this.debouncedUpdateModel([newFrom, newTo])
    },
    updateModel (interval) {
      // interval is expected to be [timestampFrom, timestampTo] in ms
      this.$emit('update:modelValue', interval)
    }
  }
})
</script>

<style lang="sass">
.q-v-date-range-picker
  width: 180px
  height: 46px
  margin: 1px 0 1px 5px
  .q-btn--dense
    padding-left: 0
    padding-right: 0
  .q-btn__content
    padding: 4px 0 4px 0
.modal-date-range
  .q-dialog__inner--minimized
    padding: 6px
</style>
