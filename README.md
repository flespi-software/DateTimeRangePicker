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

## DateRangePicker component

![Screenshot](/misc/DateRangePicker.png?raw=true "DateRangePicker")

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
    <date-range-picker v-model="interval" :theme="{color: 'grey'}"/>
  </div>
</template>

<script>
  import DateRangePicker from 'datetimerangepicker'
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      const currentTimestamp = Math.floor(Date.now() / 1000)
      return {
        interval: [currentTimestamp - 86399, currentTimestamp]
      }
    },
    components: {
      DateRangePicker
    }
  })
</script>
```
### Available props
The component accepts these props:

| Attribute             | Type                                            | Default              | Description           |
| :---                  | :---:                                           | :---:                | :---                  |
| v-model / modelValue  | Array                                           | `[Math.floor(Date.now() / 1000) - 86399, Math.floor(Date.now() / 1000)]` | Timestams range in seconds (required) |
| mode                  | Number{0,1,2}                              | `1`                  | Component mode: `0` - Single date picker, `1` - custom range picker, `2` - manual formatted date or timestamp mode|
| theme                 | Object                                           | `{color:'grey', firstDayOfWeek:1, modeSwitch:true, timeScrolls: true}` | `color` - overall component's color, from quasar color palette, `firstDayOfWeek` - first date of the week for qDate component, `modeSwitch` - show switch mode buttons, `timeScrolls` - enable/disable scrolling for hours, minutes and seconds inputs |

### Available events
The component fires these events:

| Event              | Payload Type                                    | Description      |
| :---               | :---:                                           | :---             |
| update:modelValue  | Array | Array of two timestamps (in seconds) [timestampFrom, timestampTo + 0.999]  |
| change:mode        | Number | Component's mode is switched |

## DateTimePicker component

![Screenshot](/misc/DateTimePicker.png?raw=true "DateTimePicker")

### Usage
```html
<template>
  <div>
    <date-time-picker v-model="timestamp" :theme="{color: 'grey'}"/>
  </div>
</template>

<script>
  import { DateTimePicker } from 'datetimerangepicker'
  import { defineComponent } from 'vue'

  export default defineComponent({
    data () {
      return {
        timestamp: Math.floor(Date.now() / 1000)
      }
    },
    components: {
      DateTimePicker
    }
  })
</script>
```

### Available props
The component accepts these props:

| Attribute             | Type                                            | Default              | Description      |
| :---                  | :---:                                           | :---:                | :---             |
| v-model / modelValue  | Number | `Math.floor(Date.now() / 1000)`               | Timestamp in seconds (required) |
| theme                 | Object                                           | `{color:'grey', firstDayOfWeek:1, modeSwitch:true, timeScrolls: true}` | `color` - overall component's color, from quasar color palette, `firstDayOfWeek` - first date of the week for qDate component, `modeSwitch` - show switch mode buttons, `timeScrolls` - enable/disable scrolling for hours, minutes and seconds inputs |

### Available events
The component fires these events:

| Event              | Payload Type  | Description      |
| :---               | :---:         | :---             |
| update:modelValue  | Number        | Selected timestamp (in seconds)  |

## DateRangeModal component

![Screenshot](/misc/DateRangeModal.png?raw=true "DateRangeModal buttons")
![Screenshot](/misc/DateRangeModalOpened.png?raw=true "DateRangeModal dialog opened")
![Screenshot](/misc/DateRangeModalWithButon.png?raw=true "DateRangeModal dialog with button opened")

```html
<template>
  <div>
    <date-range-modal v-model="interval" :theme="myTheme"/>
  </div>
</template>

<script>
  import { DateRangeModal } from 'datetimerangepicker'
  import { defineComponent } from 'vue'

  const myTheme = {
    color: 'grey',
    button: {
      closeModal: true,
      icon: 'mdi-airballoon-outline',
      label: 'My label',
      tooltip: 'This is tooltip for my custom button'
    }
  }

  export default defineComponent({
    data () {
      const currentTimestamp = Date.now()
      return {
        myTheme,
        interval: [currentTimestamp - 86399999, currentTimestamp]
      }
    },
    components: {
      DateRangeModal
    }
  })
</script>
```

### Available props
The component accepts these props:

| Attribute             | Type                                            | Default              | Description           |
| :---                  | :---:                                           | :---:                | :---                  |
| v-model / modelValue  | Array                                           | `[Date.now() - 86399000, Date.now()]` | Timestams range in millisecond (required) |
| theme                 | Object                                           | `{color:'grey', firstDayOfWeek:1, modeSwitch:true, timeScrolls: true}` | `color` - overall component's color, from quasar color palette, `firstDayOfWeek` - first date of the week for qDate component, `modeSwitch` - show switch mode buttons, `timeScrolls` - enable/disable scrolling for hours, minutes and seconds inputs, `button` - add custom button with the following settings: `closeModal` - close modal when button is clicked, `icon` - button icon, `label` - button label, `tooltip` - button tooltip |

### Available events
The component fires these events:

| Event              | Payload Type  | Description      |
| :---               | :---:         | :---             |
| update:modelValue  | Array        | Selected timestamps' range (in millisecond)  |
| click:customButton | -            | Custom button clicked |

## License
[MIT](LICENSE) License
