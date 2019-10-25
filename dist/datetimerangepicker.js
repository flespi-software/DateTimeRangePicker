!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("quasar"),require("flatpickr"),require("flatpickr/dist/flatpickr.css"),require("flatpickr/dist/plugins/weekSelect/weekSelect"),require("flatpickr/dist/plugins/monthSelect/index"),require("flatpickr/dist/plugins/monthSelect/style.css")):"function"==typeof define&&define.amd?define(["exports","quasar","flatpickr","flatpickr/dist/flatpickr.css","flatpickr/dist/plugins/weekSelect/weekSelect","flatpickr/dist/plugins/monthSelect/index","flatpickr/dist/plugins/monthSelect/style.css"],t):t((e=e||self).datetimerangepicker={},e.quasar,e.Flatpickr,null,e.WeekSelect,e.MonthSelect)}(this,function(e,t,a,r,i,n){"use strict";a=a&&a.hasOwnProperty("default")?a.default:a,i=i&&i.hasOwnProperty("default")?i.default:i,n=n&&n.hasOwnProperty("default")?n.default:n;var l=["onChange","onClose","onDestroy","onMonthChange","onOpen","onYearChange"];var p,o=function(e,t,a,r,i,n,l,o,p,c){"boolean"!=typeof l&&(p=o,o=l,l=!1);var d,f="function"==typeof a?a.options:a;if(e&&e.render&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns,f._compiled=!0,i&&(f.functional=!0)),r&&(f._scopeId=r),n?(d=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,p(e)),e&&e._registeredComponents&&e._registeredComponents.add(n)},f._ssrRegister=d):t&&(d=l?function(){t.call(this,c(this.$root.$options.shadowRoot))}:function(e){t.call(this,o(e))}),d)if(f.functional){var k=f.render;f.render=function(e,t){return d.call(t),k(e,t)}}else{var h=f.beforeCreate;f.beforeCreate=h?[].concat(h,d):[d]}return a},c=o({render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("input",{key:e.drawFlag,attrs:{type:"text","data-input":"",disabled:e.disabled},on:{input:e.onInput}})},staticRenderFns:[]},void 0,{name:"flatpickr",props:{value:{default:null,required:!0,validator:function(e){return null===e||e instanceof Date||"string"==typeof e||e instanceof String||e instanceof Array||"number"==typeof e}},config:{type:Object,default:function(){return{wrap:!1,defaultDate:null}}},events:{type:Array,default:function(){return l}},disabled:{type:Boolean,default:!1}},data:function(){return{fp:null,drawFlag:0}},mounted:function(){this.init()},methods:{init:function(){var n=this;if(!this.fp){var t=Object.assign({},this.config);this.events.forEach(function(i){var e;t[i]=(e=t[i]||[],Array.isArray(e)?e:[e]).concat(function(){for(var e,t,a=[],r=arguments.length;r--;)a[r]=arguments[r];(e=n).$emit.apply(e,[(t=i,t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())].concat(a))})}),t.defaultDate=this.value||t.defaultDate,this.fp=new a(this.getElem(),t),this.fpInput().addEventListener("blur",this.onBlur)}},destroy:function(){this.fp&&(this.fpInput().removeEventListener("blur",this.onBlur),this.fp.destroy(),this.fp=null)},redraw:function(){this.drawFlag+=1},getElem:function(){return this.config.wrap?this.$el.parentNode:this.$el},getValue:function(){return[].concat(this.fp.selectedDates)},onInput:function(e){var t=this;this.$nextTick(function(){t.$emit("input",t.getValue())})},fpInput:function(){return this.fp.altInput||this.fp.input},onBlur:function(e){this.$emit("blur",this.getValue())}},watch:{config:{deep:!0,handler:function(e){this.fp&&(this.destroy(),this.init())}},value:function(e,a){return!(Array.isArray(e)&&Array.isArray(a)&&e.every(function(e,t){return e&&a[t]&&e.valueOf()===a[t].valueOf()}))&&(e.valueOf()!==a.valueOf()&&void(this.fp&&this.fp.setDate(e,!0)))},disabled:function(e){this.fp&&(e?this.fpInput().setAttribute("disabled",e):this.fpInput().removeAttribute("disabled"))}},beforeDestroy:function(){this.destroy()}},void 0,!1,void 0,void 0,void 0),d={name:"DateRangePicker",props:{value:{type:Array,required:!0,default:function(){return[Date.now()]}},mode:{type:Number,default:function(){return 0},validator:function(e){return[0,1,2,3].includes(e)}},theme:{type:Object,default:function(){return{color:"dark",bgColor:"white",modeSwitch:!0}}}},data:function(){var e=this.value.map(function(e){return new Date(e)}),t={color:"dark",bgColor:"white",modeSwitch:!0};return{defaultTheme:t,currentTheme:Object.assign({},t,this.theme),currentDateRangeModel:e,dateRangeConfig:{mode:"single",inline:!0,maxDate:"today",locale:{firstDayOfWeek:1}},currentBeginTime:e[0],currentEndTime:e[1],dateRangeMode:this.mode,dateRangeModeOptions:[{label:"Day",value:0},{label:"Week",value:1},{label:"Month",value:2},{label:"Range",value:3}],DATE_RANGE_MODE_DAY:0,DATE_RANGE_MODE_WEEK:1,DATE_RANGE_MODE_MONTH:2,DATE_RANGE_MODE_CURRENT:3}},methods:{formatDate:t.date.formatDate,dateRangeModeChange:function(e){this.dateRangeMode=e;var t={inline:!0,maxDate:"today",locale:this.dateRangeConfig.locale};0===this.dateRangeMode?t.mode="single":1===this.dateRangeMode?t.plugins=[new i({})]:2===this.dateRangeMode?t.plugins=[new n({})]:3===this.dateRangeMode&&(t.mode="range"),this.dateRangeConfig=t;var a=this.getValue(this.currentDateRangeModel,this.dateRangeMode);this.currentBeginTime=a[0],this.currentEndTime=a[1],this.currentDateRangeModel=a,this.$emit("change:mode",e),this.update()},update:function(){var e=this.getValue(this.currentDateRangeModel,this.dateRangeMode);e&&(e=e.map(function(e){return e.valueOf()}))&&this.$emit("input",e)},getValue:function(e,t){if(e=e.map(function(e){return new Date(e.valueOf())}),0===t){var a=e[0],r=new Date(a.setHours(0,0,0,0)),i=new Date(a.setHours(23,59,59,999));e=[r,i]}else if(1===t){var n=function(){return new Date(e[0].valueOf())},l=n(),o=new Date,p=l.getDay();if(this.dateRangeConfig.locale&&this.dateRangeConfig.locale.firstDayOfWeek){var c=this.dateRangeConfig.locale.firstDayOfWeek;p=p?p-c:6}var d=l.getDate()-p,f=l.getDate()+(6-p),k=new Date(n().setDate(d));k.setHours(0,0,0,0);var h=new Date(n().setDate(f));h.setHours(23,59,59,999),o<h&&(h=o),e=[k,h]}else if(2===t){var s=new Date,m=new Date(e[0].valueOf()+864e5),u=m.getUTCFullYear(),_=m.getUTCMonth(),g=new Date(u,_,1);g.setHours(0,0,0,0);var b=new Date(u,_+1,1);b.setHours(0,0,0,0),s<(b=new Date(b-1))&&(b=s),e=[g,b]}else if(3===t){var y=this.currentBeginTime,x=this.currentEndTime,w=e[0],v=e[1];if(!w||!v)return;w.setHours(y.getHours(),y.getMinutes(),y.getSeconds(),0),v.setHours(x.getHours(),x.getMinutes(),x.getSeconds()),e=[w,v]}return e},currentDateRangeModelChangeHandler:function(e){(e=this.getValue(e,this.dateRangeMode))&&(this.currentBeginTime=e[0],this.currentEndTime=e[1],this.currentDateRangeModel=e,this.update())},beginTimeChangeHandler:function(e){this.currentBeginTime=e&&e[0],this.update()},endTimeChangeHandler:function(e){this.currentEndTime=e&&e[0],this.update()}},watch:{value:function(e,a){if(!e.every(function(e,t){return e===a[t]})){var t=e.map(function(e){return new Date(e)});this.currentBeginTime=t[0],this.currentEndTime=t[1],this.currentDateRangeModel=t}},mode:{handler:function(e,t){e!==t&&this.dateRangeModeChange(e)},immediate:!0},theme:function(e){this.currentTheme=Object.assign({},this.defaultTheme,e)}},components:{flatPickr:c}},f="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var k={};var h=o({render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"relative-position flex flex-center",class:["bg-"+e.currentTheme.bgColor,"white"===e.currentTheme.bgColor?"":"flatpickr__theme-dark"],staticStyle:{"max-width":"310px"}},[e.currentTheme.modeSwitch?a("div",{staticClass:"fit text-center q-mb-sm"},[a("q-btn-toggle",{attrs:{value:e.dateRangeMode,options:e.dateRangeModeOptions,color:e.currentTheme.bgColor,"text-color":"grey","toggle-text-color":e.currentTheme.color,flat:"",rounded:""},on:{change:e.dateRangeModeChange}})],1):e._e(),a("div",{staticClass:"time-range-input__wrapper q-mb-sm"},[a("flat-pickr",{attrs:{value:e.currentDateRangeModel,config:e.dateRangeConfig},on:{input:e.currentDateRangeModelChangeHandler}})],1),e.dateRangeMode===e.DATE_RANGE_MODE_CURRENT?a("div",{staticClass:"time-range-input__wrapper q-mb-sm row"},[a("div",{staticClass:"time-range-input__time wrapper__begin col-5"},[a("div",{staticClass:"time__label",class:["text-"+e.currentTheme.color]},[e._v(e._s(e.formatDate(e.currentDateRangeModel[0].valueOf(),"DD/MM/YYYY")))]),a("flat-pickr",{attrs:{value:e.currentBeginTime,config:{enableTime:!0,noCalendar:!0,time_24hr:!0,enableSeconds:!0,inline:!0}},on:{input:e.beginTimeChangeHandler}})],1),a("div",{staticClass:"col-2 text-center",class:["text-"+e.currentTheme.color],staticStyle:{"line-height":"31px","font-size":"1.4rem","padding-top":"22px"}},[e._v("–")]),a("div",{staticClass:"time-range-input__time wrapper__end col-5"},[a("div",{staticClass:"time__label",class:["text-"+e.currentTheme.color]},[e._v(e._s(e.currentDateRangeModel[1]?e.formatDate(e.currentDateRangeModel[1].valueOf(),"DD/MM/YYYY"):e.formatDate(Date.now(),"DD/MM/YYYY")))]),a("flat-pickr",{attrs:{value:e.currentEndTime,config:{enableTime:!0,noCalendar:!0,time_24hr:!0,enableSeconds:!0,inline:!0}},on:{input:e.endTimeChangeHandler}})],1)]):e._e()])},staticRenderFns:[]},function(e){e&&e("data-v-60ec83fb_0",{source:".date-range-wrapper:after{content:'';position:absolute;left:42%;top:100%;width:0;height:0;border-left:20px solid transparent;border-right:20px solid transparent;border-top:20px solid #e8e8e8;clear:both}.flatpickr__theme-dark .flatpickr-calendar{background:0 0;opacity:0;display:none;text-align:center;visibility:hidden;padding:0;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;position:absolute;width:307.875px;box-sizing:border-box;touch-action:manipulation;background:#565656;box-shadow:1px 0 0 #2b2b2b,-1px 0 0 #2b2b2b,0 1px 0 #2b2b2b,0 -1px 0 #2b2b2b,0 3px 13px rgba(0,0,0,.08)}.flatpickr__theme-dark .flatpickr-calendar.inline,.flatpickr__theme-dark .flatpickr-calendar.open{opacity:1;max-height:640px;visibility:visible}.flatpickr__theme-dark .flatpickr-calendar.open{display:inline-block;z-index:99999}.flatpickr__theme-dark .flatpickr-calendar.animate.open{animation:fpFadeInDown .3s cubic-bezier(.23,1,.32,1)}.flatpickr__theme-dark .flatpickr-calendar.inline{display:block;position:relative;top:2px}.flatpickr__theme-dark .flatpickr-calendar.static{position:absolute;top:calc(100% + 2px)}.flatpickr__theme-dark .flatpickr-calendar.static.open{z-index:999;display:block}.flatpickr__theme-dark .flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+1) .flatpickr-day.inRange:nth-child(7n+7){box-shadow:none!important}.flatpickr__theme-dark .flatpickr-calendar.multiMonth .flatpickr-days .dayContainer:nth-child(n+2) .flatpickr-day.inRange:nth-child(7n+1){box-shadow:-2px 0 0 #e6e6e6,5px 0 0 #e6e6e6}.flatpickr__theme-dark .flatpickr-calendar .hasTime .dayContainer,.flatpickr__theme-dark .flatpickr-calendar .hasWeeks .dayContainer{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.flatpickr__theme-dark .flatpickr-calendar .hasWeeks .dayContainer{border-left:0}.flatpickr__theme-dark .flatpickr-calendar.showTimeInput.hasTime .flatpickr-time{height:40px;border-top:1px solid #2b2b2b}.flatpickr__theme-dark .flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr__theme-dark .flatpickr-calendar:after,.flatpickr__theme-dark .flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:'';height:0;width:0;left:22px}.flatpickr__theme-dark .flatpickr-calendar.rightMost:after,.flatpickr__theme-dark .flatpickr-calendar.rightMost:before{left:auto;right:22px}.flatpickr__theme-dark .flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr__theme-dark .flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr__theme-dark .flatpickr-calendar.arrowTop:after,.flatpickr__theme-dark .flatpickr-calendar.arrowTop:before{bottom:100%}.flatpickr__theme-dark .flatpickr-calendar.arrowTop:before{border-bottom-color:#2b2b2b}.flatpickr__theme-dark .flatpickr-calendar.arrowTop:after{border-bottom-color:#565656}.flatpickr__theme-dark .flatpickr-calendar.arrowBottom:after,.flatpickr__theme-dark .flatpickr-calendar.arrowBottom:before{top:100%}.flatpickr__theme-dark .flatpickr-calendar.arrowBottom:before{border-top-color:#2b2b2b}.flatpickr__theme-dark .flatpickr-calendar.arrowBottom:after{border-top-color:#565656}.flatpickr__theme-dark .flatpickr-calendar:focus{outline:0}.flatpickr__theme-dark .flatpickr-wrapper{position:relative;display:inline-block}.flatpickr__theme-dark .flatpickr-months{display:flex}.flatpickr__theme-dark .flatpickr-months .flatpickr-month{background:#565656;color:#fff;fill:#fff;height:34px;line-height:1;text-align:center;position:relative;user-select:none;overflow:hidden;flex:1}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:0;height:34px;padding:10px;z-index:3;color:#fff;fill:#fff}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month.flatpickr-disabled,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month.flatpickr-disabled{display:none}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month i,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month i{position:relative}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month.flatpickr-prev-month,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month.flatpickr-prev-month{left:0}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month.flatpickr-next-month,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month.flatpickr-next-month{right:0}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month:hover,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month:hover{color:#eee}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month:hover svg,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month:hover svg{fill:#f64747}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month svg,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month svg{width:14px;height:14px}.flatpickr__theme-dark .flatpickr-months .flatpickr-next-month svg path,.flatpickr__theme-dark .flatpickr-months .flatpickr-prev-month svg path{transition:fill .1s;fill:inherit}.flatpickr__theme-dark .numInputWrapper{position:relative;height:auto}.flatpickr__theme-dark .numInputWrapper input,.flatpickr__theme-dark .numInputWrapper span{display:inline-block}.flatpickr__theme-dark .numInputWrapper input{width:100%}.flatpickr__theme-dark .numInputWrapper input::-ms-clear{display:none}.flatpickr__theme-dark .numInputWrapper input::-webkit-inner-spin-button,.flatpickr__theme-dark .numInputWrapper input::-webkit-outer-spin-button{margin:0;-webkit-appearance:none}.flatpickr__theme-dark .numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;cursor:pointer;border:1px solid rgba(255,255,255,.15);box-sizing:border-box}.flatpickr__theme-dark .numInputWrapper span:hover{background:rgba(169,169,169,.1)}.flatpickr__theme-dark .numInputWrapper span:active{background:rgba(169,169,169,.2)}.flatpickr__theme-dark .numInputWrapper span:after{display:block;content:\"\";position:absolute}.flatpickr__theme-dark .numInputWrapper span.arrowUp{top:0;border-bottom:0}.flatpickr__theme-dark .numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(255,255,255,.6);top:26%}.flatpickr__theme-dark .numInputWrapper span.arrowDown{top:50%}.flatpickr__theme-dark .numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(255,255,255,.6);top:40%}.flatpickr__theme-dark .numInputWrapper span svg{width:inherit;height:auto}.flatpickr__theme-dark .numInputWrapper span svg path{fill:rgba(255,255,255,.5)}.flatpickr__theme-dark .numInputWrapper:hover{background:rgba(169,169,169,.05)}.flatpickr__theme-dark .numInputWrapper:hover span{opacity:1}.flatpickr__theme-dark .flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;padding:7.48px 0 0 0;line-height:1;height:34px;display:inline-block;text-align:center;transform:translate3d(0,0,0)}.flatpickr__theme-dark .flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;margin-left:.5ch;padding:0}.flatpickr__theme-dark .flatpickr-current-month span.cur-month:hover{background:rgba(169,169,169,.05)}.flatpickr__theme-dark .flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr__theme-dark .flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:#fff}.flatpickr__theme-dark .flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:#fff}.flatpickr__theme-dark .flatpickr-current-month input.cur-year{background:0 0;box-sizing:border-box;color:inherit;cursor:text;padding:0 0 0 .5ch;margin:0;display:inline-block;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr__theme-dark .flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr__theme-dark .flatpickr-current-month input.cur-year[disabled],.flatpickr__theme-dark .flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(255,255,255,.5);background:0 0;pointer-events:none}.flatpickr__theme-dark .flatpickr-current-month .flatpickr-monthDropdown-months{appearance:menulist;background:#565656;border:none;border-radius:0;box-sizing:border-box;color:inherit;cursor:pointer;font-size:inherit;font-family:inherit;font-weight:300;height:auto;line-height:inherit;margin:-1px 0 0 0;outline:0;padding:0 0 0 .5ch;position:relative;vertical-align:initial;-webkit-box-sizing:border-box;-webkit-appearance:menulist;-moz-appearance:menulist;width:auto}.flatpickr__theme-dark .flatpickr-current-month .flatpickr-monthDropdown-months:active,.flatpickr__theme-dark .flatpickr-current-month .flatpickr-monthDropdown-months:focus{outline:0}.flatpickr__theme-dark .flatpickr-current-month .flatpickr-monthDropdown-months:hover{background:rgba(169,169,169,.05)}.flatpickr__theme-dark .flatpickr-current-month .flatpickr-monthDropdown-months .flatpickr-monthDropdown-month{background-color:#565656;outline:0;padding:0}.flatpickr__theme-dark .flatpickr-weekdays{background:0 0;text-align:center;overflow:hidden;width:100%;display:flex;align-items:center;height:28px}.flatpickr__theme-dark .flatpickr-weekdays .flatpickr-weekdaycontainer{display:flex;flex:1}.flatpickr__theme-dark span.flatpickr-weekday{cursor:default;font-size:90%;background:#565656;color:#fff;line-height:1;margin:0;text-align:center;display:block;flex:1;font-weight:bolder}.flatpickr__theme-dark .dayContainer,.flatpickr__theme-dark .flatpickr-weeks{padding:1px 0 0 0}.flatpickr__theme-dark .flatpickr-days{position:relative;overflow:hidden;display:flex;align-items:flex-start;width:307.875px}.flatpickr__theme-dark .flatpickr-days:focus{outline:0}.flatpickr__theme-dark .dayContainer{padding:0;outline:0;text-align:left;width:307.875px;min-width:307.875px;max-width:307.875px;box-sizing:border-box;display:inline-block;display:-ms-flexbox;display:flex;flex-wrap:wrap;-ms-flex-wrap:wrap;-ms-flex-pack:justify;justify-content:space-around;transform:translate3d(0,0,0);opacity:1}.flatpickr__theme-dark .dayContainer+.dayContainer{box-shadow:-1px 0 0 #2b2b2b}.flatpickr__theme-dark .flatpickr-day{background:0 0;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:rgba(255,255,255,.95);cursor:pointer;font-weight:400;width:14.2857143%;flex-basis:14.2857143%;max-width:39px;height:39px;line-height:39px;margin:0;display:inline-block;position:relative;justify-content:center;text-align:center}.flatpickr__theme-dark .flatpickr-day.inRange,.flatpickr__theme-dark .flatpickr-day.nextMonthDay.inRange,.flatpickr__theme-dark .flatpickr-day.nextMonthDay.today.inRange,.flatpickr__theme-dark .flatpickr-day.nextMonthDay:focus,.flatpickr__theme-dark .flatpickr-day.nextMonthDay:hover,.flatpickr__theme-dark .flatpickr-day.prevMonthDay.inRange,.flatpickr__theme-dark .flatpickr-day.prevMonthDay.today.inRange,.flatpickr__theme-dark .flatpickr-day.prevMonthDay:focus,.flatpickr__theme-dark .flatpickr-day.prevMonthDay:hover,.flatpickr__theme-dark .flatpickr-day.today.inRange,.flatpickr__theme-dark .flatpickr-day:focus,.flatpickr__theme-dark .flatpickr-day:hover{cursor:pointer;outline:0;background:grey;border-color:grey}.flatpickr__theme-dark .flatpickr-day.today{border-color:#eee}.flatpickr__theme-dark .flatpickr-day.today:focus,.flatpickr__theme-dark .flatpickr-day.today:hover{border-color:#eee;background:#eee;color:#565656}.flatpickr__theme-dark .flatpickr-day.endRange,.flatpickr__theme-dark .flatpickr-day.endRange.inRange,.flatpickr__theme-dark .flatpickr-day.endRange.nextMonthDay,.flatpickr__theme-dark .flatpickr-day.endRange.prevMonthDay,.flatpickr__theme-dark .flatpickr-day.endRange:focus,.flatpickr__theme-dark .flatpickr-day.endRange:hover,.flatpickr__theme-dark .flatpickr-day.selected,.flatpickr__theme-dark .flatpickr-day.selected.inRange,.flatpickr__theme-dark .flatpickr-day.selected.nextMonthDay,.flatpickr__theme-dark .flatpickr-day.selected.prevMonthDay,.flatpickr__theme-dark .flatpickr-day.selected:focus,.flatpickr__theme-dark .flatpickr-day.selected:hover,.flatpickr__theme-dark .flatpickr-day.startRange,.flatpickr__theme-dark .flatpickr-day.startRange.inRange,.flatpickr__theme-dark .flatpickr-day.startRange.nextMonthDay,.flatpickr__theme-dark .flatpickr-day.startRange.prevMonthDay,.flatpickr__theme-dark .flatpickr-day.startRange:focus,.flatpickr__theme-dark .flatpickr-day.startRange:hover{background:#666;box-shadow:none;color:#fff;border-color:#666}.flatpickr__theme-dark .flatpickr-day.endRange.startRange,.flatpickr__theme-dark .flatpickr-day.selected.startRange,.flatpickr__theme-dark .flatpickr-day.startRange.startRange{border-radius:50px 0 0 50px}.flatpickr__theme-dark .flatpickr-day.endRange.endRange,.flatpickr__theme-dark .flatpickr-day.selected.endRange,.flatpickr__theme-dark .flatpickr-day.startRange.endRange{border-radius:0 50px 50px 0}.flatpickr__theme-dark .flatpickr-day.endRange.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr__theme-dark .flatpickr-day.selected.startRange+.endRange:not(:nth-child(7n+1)),.flatpickr__theme-dark .flatpickr-day.startRange.startRange+.endRange:not(:nth-child(7n+1)){box-shadow:-10px 0 0 #666}.flatpickr__theme-dark .flatpickr-day.endRange.startRange.endRange,.flatpickr__theme-dark .flatpickr-day.selected.startRange.endRange,.flatpickr__theme-dark .flatpickr-day.startRange.startRange.endRange{border-radius:50px}.flatpickr__theme-dark .flatpickr-day.inRange{border-radius:0;box-shadow:-5px 0 0 grey,5px 0 0 grey}.flatpickr__theme-dark .flatpickr-day.flatpickr-disabled,.flatpickr__theme-dark .flatpickr-day.flatpickr-disabled:hover,.flatpickr__theme-dark .flatpickr-day.nextMonthDay,.flatpickr__theme-dark .flatpickr-day.notAllowed,.flatpickr__theme-dark .flatpickr-day.notAllowed.nextMonthDay,.flatpickr__theme-dark .flatpickr-day.notAllowed.prevMonthDay,.flatpickr__theme-dark .flatpickr-day.prevMonthDay{color:rgba(255,255,255,.3);background:0 0;border-color:transparent;cursor:default}.flatpickr__theme-dark .flatpickr-day.flatpickr-disabled,.flatpickr__theme-dark .flatpickr-day.flatpickr-disabled:hover{cursor:not-allowed;color:rgba(255,255,255,.1)}.flatpickr__theme-dark .flatpickr-day.week.selected{border-radius:0;box-shadow:-5px 0 0 #666,5px 0 0 #666}.flatpickr__theme-dark .flatpickr-day.hidden{visibility:hidden}.flatpickr__theme-dark .rangeMode .flatpickr-day{margin-top:1px}.flatpickr__theme-dark .flatpickr-weekwrapper{float:left}.flatpickr__theme-dark .flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;box-shadow:1px 0 0 #2b2b2b}.flatpickr__theme-dark .flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%;line-height:28px}.flatpickr__theme-dark .flatpickr-weekwrapper span.flatpickr-day,.flatpickr__theme-dark .flatpickr-weekwrapper span.flatpickr-day:hover{display:block;width:100%;max-width:none;color:rgba(255,255,255,.3);background:0 0;cursor:default;border:none}.flatpickr__theme-dark .flatpickr-innerContainer{display:block;display:flex;box-sizing:border-box;overflow:hidden}.flatpickr__theme-dark .flatpickr-rContainer{display:inline-block;padding:0;box-sizing:border-box}.flatpickr__theme-dark .flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;box-sizing:border-box;overflow:hidden;display:flex}.flatpickr__theme-dark .flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr__theme-dark .flatpickr-time .numInputWrapper{flex:1;width:40%;height:40px;float:left}.flatpickr__theme-dark .flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(255,255,255,.95)}.flatpickr__theme-dark .flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:rgba(255,255,255,.95)}.flatpickr__theme-dark .flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr__theme-dark .flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr__theme-dark .flatpickr-time input{background:0 0;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;color:rgba(255,255,255,.95);font-size:14px;position:relative;box-sizing:border-box;-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.flatpickr__theme-dark .flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr__theme-dark .flatpickr-time input.flatpickr-minute,.flatpickr__theme-dark .flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr__theme-dark .flatpickr-time input:focus{outline:0;border:0}.flatpickr__theme-dark .flatpickr-time .flatpickr-am-pm,.flatpickr__theme-dark .flatpickr-time .flatpickr-time-separator{height:inherit;float:left;line-height:inherit;color:rgba(255,255,255,.95);font-weight:700;width:2%;user-select:none;align-self:center}.flatpickr__theme-dark .flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr__theme-dark .flatpickr-time .flatpickr-am-pm:focus,.flatpickr__theme-dark .flatpickr-time .flatpickr-am-pm:hover,.flatpickr__theme-dark .flatpickr-time input:focus,.flatpickr__theme-dark .flatpickr-time input:hover{background:#888}.flatpickr__theme-dark .flatpickr-input[readonly]{cursor:pointer}@-moz-keyframes fpFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}@-webkit-keyframes fpFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}@-o-keyframes fpFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}@keyframes fpFadeInDown{from{opacity:0;transform:translate3d(0,-20px,0)}to{opacity:1;transform:translate3d(0,0,0)}}.flatpickr__theme-dark .flatpickr-monthSelect-month{color:#fff}.flatpickr__theme-dark .flatpickr-monthSelect-month.selected{background-color:#666;color:#fff}.time-range-input__wrapper{width:307px}.time-range-input__wrapper .time-range-input__time .flatpickr-calendar{width:100%}.time-range-input__wrapper .time-range-input__time .time__label{font-size:.8rem;font-weight:700;padding-left:5px}.time-range-input__wrapper input[data-input]{display:none}",map:void 0,media:void 0})},d,void 0,!1,void 0,function(e){return function(e,t){return function(e,t){var a=f?t.media||"default":e,r=k[a]||(k[a]={ids:new Set,styles:[]});if(!r.ids.has(e)){r.ids.add(e);var i=t.source;if(t.map&&(i+="\n/*# sourceURL="+t.map.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),r.element||(r.element=document.createElement("style"),r.element.type="text/css",t.media&&r.element.setAttribute("media",t.media),void 0===p&&(p=document.head||document.getElementsByTagName("head")[0]),p.appendChild(r.element)),"styleSheet"in r.element)r.styles.push(i),r.element.styleSheet.cssText=r.styles.filter(Boolean).join("\n");else{var n=r.ids.size-1,l=document.createTextNode(i),o=r.element.childNodes;o[n]&&r.element.removeChild(o[n]),o.length?r.element.insertBefore(l,o[n]):r.element.appendChild(l)}}}(e,t)}},void 0);e.DateRangePicker=h,e.VueFlatPickr=c,e.default=h,Object.defineProperty(e,"__esModule",{value:!0})});
//# sourceMappingURL=datetimerangepicker.js.map
