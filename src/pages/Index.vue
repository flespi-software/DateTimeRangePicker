<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center column">
      <div>{{new Date(dateRange[0])}}</div>
      <div>{{new Date(dateRange[1])}}</div>
      <date-range class="q-ma-sm" v-model="dateRange" :mode="mode" @change:mode="(m) => { mode = m }" :theme="{color: 'white', bgColor: 'grey-9'}"/>
    </div>
    <div class="flex flex-center column">
      <div>{{date}}</div>
      <vue-flat-pickr class="q-ma-sm" v-model="date" :theme="{color: 'white', bgColor: 'grey-9'}" :config="{enableTime: true, time_24hr: true, inline: true}"/>
    </div>
  </q-page>
</template>

<script>
import DateRange from '../components/DateRangePicker'
import VueFlatPickr from '../components/FlatPickr'
export default {
  name: 'PageIndex',
  data () {
    return {
      dateRange: [Date.now() - 200000000, Date.now() - 100000000],
      date: new Date(),
      mode: 0
    }
  },
  components: {
    DateRange,
    VueFlatPickr
  }
}
</script>
