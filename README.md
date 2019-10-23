# DateTimeRangePicker
> Date time range picker component based on [Flatpickr](https://flatpickr.js.org) and [Quasar](https://v0-17.quasar-framework.org/). Contains flatpickr wrapper and date-time picker.

## Installation
```bash
# npm
npm install git+https://github.com/flespi-software/DateTimeRangePicker.git --save
```

## Prerequisites:

- [Node.js](https://nodejs.org/en/) (>=9.x)
- npm version 5+ and [Git](https://git-scm.com/)
- [Quasar](https://v0-17.quasar-framework.org/) (^0.17.0)
- [Vue](https://vuejs.org/) (^2.5.0)

## Run examples on your localhost
* Clone this repo
* You should have quasar (^0.17.0) pre-installed
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
In quasar.config.js
```js
  framework: {
    components: [
      'QBtnToggle'
    ]
  }
```

```html
<template>
  <div>
    <date-range v-model="date"/>
  </div>
</template>

<script>
  import DateRange from 'datetimerangepicker'

  export default {
    data () {
      return {
        date: [new Date()],
      }
    },
    components: {
      DateRange
    }
  }
</script>
```
### Available props
The component accepts these props:

| Attribute        | Type                                            | Default              | Description           |
| :---             | :---:                                           | :---:                | :---                  |
| v-model / value  | Array                                           | `[new Date()]`               | RangeValue (required) |
| mode             | Number{0,1,2,3}                              | `0`                  | Component mode: `0` - Single date picker, `1` - week picker, `2` - month picker, `3` - custom range picker|
| theme           | Object                                           | `{color:'dark', bgColor:'white', modeSwitch:true}` | `color` - text color, `bgColor` - background color, `modeSwitch` - need show switch mode buttons |

### Available events
The component accepts these props:

| Event        | Payload                                            | Description      |
| :---             | :---:                                           | :---             |
| input  | `Array` | Selected dates timestamps array |
| change:mode  | `Number` | New component mode |

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

  export default {
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
  }
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

| Attribute        | Type                                            | Default              | Description      |
| :---             | :---:                                           | :---:                | :---             |
| v-model / value  | String / Date Object / Array / Timestamp / null | `null`               | Date-picker value (required) |
| config           | Object                                          | `{wrap:false}`       | Flatpickr configuration [options](https://chmln.github.io/flatpickr/options/)|
| events           | Array                                           | Array of useful events  | Customise the [events](https://chmln.github.io/flatpickr/events/) to be emitted|

## License
[MIT](LICENSE) License
