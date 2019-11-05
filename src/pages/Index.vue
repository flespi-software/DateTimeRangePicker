<template>
  <q-page class="flex flex-center">
    <date-range class="q-ma-sm" v-model="dateRange" :mode="0" :theme="{color: 'white', bgColor: 'grey-9'}"/>
    <vue-flat-pickr class="q-ma-sm" v-model="date" :theme="{color: 'white', bgColor: 'grey-9'}" :config="{enableTime: true, time_24hr: true, inline: true}"/>
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
      date: new Date()
    }
  },
  components: { DateRange, VueFlatPickr }
}
</script>
