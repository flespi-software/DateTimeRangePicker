<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="q-pa-md" style="min-width: 200px">
        <div class="q-gutter-md">
          <q-select v-model="selectedColor" :options="options" label="Color" />
        </div>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp}}</div>
        <div>{{timestampFormatted}}</div>
        <date-time-picker v-model="timestamp" :theme="{color: `${selectedColor}`}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{timestampRange[0]}}, {{timestampRange[1]}}]</div>
        <div>{{timestampRangeFormatted[0]}}</div>
        <div>{{timestampRangeFormatted[1]}}</div>
        <date-range-picker v-model="timestampRange" :theme="{color: `${selectedColor}`}"/>
      </div>
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #dddddd; margin: 3px">
        <div>[{{modalTimestampRange[0]}}, {{modalTimestampRange[1]}}]</div>
        <div>{{modalTimestampRangeFormatted[0]}}</div>
        <div>{{modalTimestampRangeFormatted[1]}}</div>
        <date-range-modal class="on-left" v-model="modalTimestampRange" :theme="{color: `${selectedColor}`}"/>
      </div>
    </div>
    <div class="row">
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp1}}</div>
        <div>{{date1}}</div>
        <date-time-picker v-model="timestamp1" :theme="{color: 'grey'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp2}}</div>
        <div>{{date2}}</div>
        <date-time-picker v-model="timestamp2" :theme="{color: 'blue-grey'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp3}}</div>
        <div>{{date3}}</div>
        <date-time-picker v-model="timestamp3" :theme="{color: 'teal'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp4}}</div>
        <div>{{date4}}</div>
        <date-time-picker v-model="timestamp4" :theme="{color: 'brown'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>{{timestamp5}}</div>
        <div>{{date5}}</div>
        <date-time-picker v-model="timestamp5"/>
      </div>
    </div>
    <div class="row">
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{interval1[0]}}, {{interval1[1]}}]</div>
        <div>{{intervalFormatted1[0]}}</div>
        <div>{{intervalFormatted1[1]}}</div>
        <date-range-picker v-model="interval1" :theme="{color: 'grey'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{interval2[0]}}, {{interval2[1]}}]</div>
        <div>{{intervalFormatted2[0]}}</div>
        <div>{{intervalFormatted2[1]}}</div>
        <date-range-picker v-model="interval2" :theme="{color: 'blue-grey'}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{interval3[0]}}, {{interval3[1]}}]</div>
        <div>{{intervalFormatted3[0]}}</div>
        <div>{{intervalFormatted3[1]}}</div>
        <date-range-picker v-model="interval3" :mode="0" :theme="{color: 'teal', modeSwitch: false}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{interval4[0]}}, {{interval4[1]}}]</div>
        <div>{{intervalFormatted4[0]}}</div>
        <div>{{intervalFormatted4[1]}}</div>
        <date-range-picker v-model="interval4" :mode="2" :theme="{color: 'brown', modeSwitch: false}"/>
      </div>
      <div class="flex flex-center column" style="margin: 3px">
        <div>[{{interval5[0]}}, {{interval5[1]}}]</div>
        <div>{{intervalFormatted5[0]}}</div>
        <div>{{intervalFormatted5[1]}}</div>
        <date-range-picker v-model="interval5"/>
      </div>
    </div>
    <div class="row">
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #9e9e9e; margin: 3px">
        <div>[{{modalRange1[0]}}, {{modalRange1[1]}}]</div>
        <div>{{modalRangeFomatted1[0]}}</div>
        <div>{{modalRangeFomatted1[1]}}</div>
        <date-range-modal v-model="modalRange1" :theme="{color: 'grey'}"/>
      </div>
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #607d8b; margin: 3px">
        <div>[{{modalRange2[0]}}, {{modalRange2[1]}}]</div>
        <div>{{modalRangeFomatted2[0]}}</div>
        <div>{{modalRangeFomatted2[1]}}</div>
        <date-range-modal v-model="modalRange2"  :theme="{color: 'blue-grey'}"/>
      </div>
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #009688; margin: 3px">
        <div>[{{modalRange3[0]}}, {{modalRange3[1]}}]</div>
        <div>{{modalRangeFomatted3[0]}}</div>
        <div>{{modalRangeFomatted3[1]}}</div>
        <date-range-modal v-model="modalRange3" :theme="{color: 'teal'}"/>
      </div>
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #795548; margin: 3px">
        <div>[{{modalRange4[0]}}, {{modalRange4[1]}}]</div>
        <div>{{modalRangeFomatted4[0]}}</div>
        <div>{{modalRangeFomatted4[1]}}</div>
        <date-range-modal v-model="modalRange4" :theme="themeWithButton"/>
      </div>
      <div class="flex flex-center column" style="min-width: 300px; min-height: 300px; background-color: #e91e63; margin: 3px">
        <div>[{{modalRange5[0]}}, {{modalRange5[1]}}]</div>
        <div>{{modalRangeFomatted5[0]}}</div>
        <div>{{modalRangeFomatted5[1]}}</div>
        <date-range-modal v-model="modalRange5"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { date } from 'quasar'
import DateTimePicker from 'src/components/DateTimePicker.vue'
import DateRangePicker from 'src/components/DateRangePicker.vue'
import DateRangeModal from 'src/components/DateRangeModal.vue'

const themeWithButton = {
  color: 'brown',
  button: {
    closeModal: true,
    icon: 'mdi-airballoon-outline',
    label: 'My label',
    tooltip: 'This is tooltip for my custom button'
  }
}

export default defineComponent({
  name: 'PageIndex',
  data () {
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const currentDate = new Date().setHours(0, 0, 0, 0)
    return {
      modalTimestampRange: [currentTimestamp * 1000 - 86399999, currentTimestamp * 1000],
      timestampRange: [currentTimestamp - 86399, currentTimestamp],
      timestamp: currentTimestamp,
      options: [
        'grey', 'blue-grey', 'teal', 'brown', 'pink', 'green', 'yellow', 'red', 'blue', 'light-blue', 'indigo', 'purple', 'deep-purple', 'cyan', 'orange', 'deep-orange', 'amber'
      ],
      selectedColor: 'orange',
      themeWithButton,
      timestamp1: currentTimestamp,
      timestamp2: currentTimestamp,
      timestamp3: currentTimestamp,
      timestamp4: currentTimestamp,
      timestamp5: currentTimestamp,
      interval1: [currentTimestamp - 86399, currentTimestamp],
      interval2: [currentTimestamp - 86399, currentTimestamp],
      interval3: [currentTimestamp, currentTimestamp],
      interval4: [currentTimestamp - 86399, currentTimestamp],
      interval5: [currentTimestamp - 86399, currentTimestamp],
      modalRange1: [currentTimestamp * 1000 - 86399999, currentTimestamp * 1000],
      modalRange2: [currentTimestamp * 1000 - 86399999, currentTimestamp * 1000],
      modalRange3: [currentTimestamp * 1000 - 86399999, currentTimestamp * 1000],
      modalRange4: [currentTimestamp * 1000 - 86399999, currentTimestamp * 1000],
      modalRange5: [currentDate, currentDate + 86399999],
      mode: 0
    }
  },
  computed: {
    timestampFormatted () {
      return date.formatDate(this.timestamp * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    timestampRangeFormatted () {
      return [date.formatDate(this.timestampRange[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.timestampRange[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalTimestampRangeFormatted () {
      return [date.formatDate(this.modalTimestampRange[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalTimestampRange[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    date1 () {
      return date.formatDate(this.timestamp1 * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    date2 () {
      return date.formatDate(this.timestamp2 * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    date3 () {
      return date.formatDate(this.timestamp3 * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    date4 () {
      return date.formatDate(this.timestamp4 * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    date5 () {
      return date.formatDate(this.timestamp5 * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    },
    intervalFormatted1 () {
      return [date.formatDate(this.interval1[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.interval1[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    intervalFormatted2 () {
      return [date.formatDate(this.interval2[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.interval2[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    intervalFormatted3 () {
      return [date.formatDate(this.interval3[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.interval3[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    intervalFormatted4 () {
      return [date.formatDate(this.interval4[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.interval4[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    intervalFormatted5 () {
      return [date.formatDate(this.interval5[0] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.interval5[1] * 1000, 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalRangeFomatted1 () {
      return [date.formatDate(this.modalRange1[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalRange1[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalRangeFomatted2 () {
      return [date.formatDate(this.modalRange2[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalRange2[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalRangeFomatted3 () {
      return [date.formatDate(this.modalRange3[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalRange3[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalRangeFomatted4 () {
      return [date.formatDate(this.modalRange4[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalRange4[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    },
    modalRangeFomatted5 () {
      return [date.formatDate(this.modalRange5[0], 'YYYY-MM-DDTHH:mm:ss.SSSZ'), date.formatDate(this.modalRange5[1], 'YYYY-MM-DDTHH:mm:ss.SSSZ')]
    }
  },
  components: {
    DateTimePicker,
    DateRangePicker,
    DateRangeModal
  }
})
</script>

