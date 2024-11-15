# DateTimeRangePicker
> Date time range picker component based on [Flatpickr](https://flatpickr.js.org) and [Quasar](https://quasar-framework.org/). Contains flatpickr wrapper and date-time picker.

## Installation
```bash
# npm
npm install git+https://github.com/flespi-software/DateTimeRangePicker.git --save
```

## Prerequisites:

- [Node.js](https://nodejs.org/en/) (>=16.x)
- npm version 5+ and [Git](https://git-scm.com/)
- [Quasar](https://quasar.dev/) (^2.17.1)
- [Vue](https://vuejs.org/) (^3.4.18)

## Run examples on your localhost
* Clone this repo
* You should have quasar (^2.17.1) pre-installed
* Install dependencies `npm install`
* Run webpack dev server `quasar dev`
* This should open the demo page at `http://localhost:8080` in your default web browser

## DateTimeRangePicker component

![Screenshot](/misc/component.png?raw=true "DateTimeRangePicker")

### Features
* ES6 Javascript
* Vue.js
* Writing .vue files
* Rollup
* NPM ecosystems

### Usage

```html
<template>
  <div>
    <date-range v-model="date"/>
  </div>
</template>

<script>
  import DateRange from 'datetimerangepicker'
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        date: [new Date()],
      }
    },
    components: {
      DateRange
    }
  })
</script>
```
### Available props
The component accepts these props:

| Attribute             | Type                                            | Default              | Description           |
| :---                  | :---:                                           | :---:                | :---                  |
| v-model / modelValue  | Array                                           | `[new Date()]`               | RangeValue (required) |
| mode                  | Number{0,1,2,3,4}                              | `0`                  | Component mode: `0` - Single date picker, `1` - week picker, `2` - month picker, `3` - custom range picker, `4` - manual formated or timestamp mode|
| theme                 | Object                                           | `{color:'grey-9', bgColor:'white', modeSwitch:true}` | `color` - text color, `bgColor` - background color, `modeSwitch` - need show switch mode buttons(it works mode autodetect if enabled, else you can use $refs.range.getModeByRange(range)) |

### Available events
The component accepts these props:

| Event              | Payload                                            | Description      |
| :---               | :---:                                           | :---             |
| update:modelValue  | `Array` | Selected dates timestamps array |
| error              | `Boolean` | Error in time range. |
| change:mode        | `Number` | New component mode |

## Flatpickr wrapper
![Screenshot](/misc/wrapper.png?raw=true "Flatpickr wrapper")
### Usage
```html
<template>
  <div>
    <vue-flat-pickr v-model="date" :config="config" />
  </div>
</template>

<script>
  import { VueFlatPickr } from 'datetimerangepicker'
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        date: new Date(),
        config: {
          wrap: true, // set wrap to true only when using 'input-group'
          altFormat: 'M j, Y',
          altInput: true,
          dateFormat: 'Y-m-d',
          locale: Hindi, // locale for this instance only
        }
      }
    },
    components: {
      VueFlatPickr
    }
  })
</script>
```
### Events
* The component can emit all possible events, you can listen to them in your component
```html
<vue-flat-pickr v-model="date" @on-change="doSomethingOnChange" @on-close="doSomethingOnClose" />
```
* Events names has been converted to kebab-case.
* You can still pass your methods in `:config` like original flatpickr do.

### Available props
The component accepts these props:

| Attribute             | Type                                            | Default              | Description      |
| :---                  | :---:                                           | :---:                | :---             |
| v-model / modelValue  | String / Date Object / Array / Timestamp / null | `null`               | Date-picker value (required) |
| config                | Object                                          | `{wrap:false}`       | Flatpickr configuration [options](https://chmln.github.io/flatpickr/options/)|
| events                | Array                                           | Array of useful events  | Customise the [events](https://chmln.github.io/flatpickr/events/) to be emitted|
| theme                 | Object                                          | `{color:'grey-9', bgColor:'white'}` | `color` - text color, `bgColor` - background color |
## License
[MIT](LICENSE) License
