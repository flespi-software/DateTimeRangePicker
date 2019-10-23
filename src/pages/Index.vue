<template>
  <q-page class="flex flex-center">
    <date-range class="q-ma-sm" v-model="date" :mode="0"/>
    <!-- <vue-flat-pickr class="q-ma-sm" v-model="date"/> -->
  </q-page>
</template>

<style>
</style>

<script>
import DateRange from '../components/DateRangePicker'
// import VueFlatPickr from '../components/FlatPickr'
export default {
  name: 'PageIndex',
  data () {
    return {
      date: [Date.now() - 200000000, Date.now() - 100000000]
    }
  },
  components: { DateRange }
}
</script>
