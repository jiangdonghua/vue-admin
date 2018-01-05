<template>
  <div class="echarts" ref="geoLines"></div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let eCharts = require("echarts/lib/echarts")
  import Vue from 'vue'
  import debounce from 'lodash.debounce'
  // enumerating ECharts events for now
  const ACTION_EVENTS = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
    'brush',
    'brushselected'
  ]
  const MOUSE_EVENTS = [
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousedown',
    'mouseup',
    'globalout'
  ]
  export default{

    props: {
      theme: [String, Object],
      options: Object,
      initOptions: Object,
      group: String,
      autoResize: Boolean,
      watchShallow: Boolean,
    },
    data(){
      return {
        chart: null
      }
    },
    computed: {
      // Only recalculated when accessed from JavaScript.
      // Won't update DOM on value change because getters
      // don't depend on reactive values
      width: {
        cache: false,
        get(){
          return this.delegateGet('width', 'getWidth')
        }
      },
      height: {
        cache: false,
        get(){
          return this.delegateGet('height', 'getHeight')
        }
      },
      isDisposed: {
        cache: false,
        get(){
          return this.delegateGet('isDisposed', 'isDisposed')
        }
      },
      computedOptions: {
        cache: false,
        get(){
          return this.delegateGet('computedOptions', 'getOption')
        }
      }
    },
    mounted(){
      //console.log(this.options)
      if (this.options) {
        this.init()
      }
    },
    watch: {
      group(group){
        this.chart.group = group
      }
    },
    methods: {
      // just delegates ECharts methods to Vue component
      delegateGet(name, method){
        if (!this.chart) {
          Vue.util.warn(`Cannot get [${name}] before the chart is initialized. Set prop [options] first.`, this)
        }
        return this.chart[method]
      },
      delegateMethod(name, ...arg){
        if (!this.chart) {
          Vue.util.warn(`Cannot call [${name}] before the chart is initialized. Set prop [options] first.`, this)
        }
        return this.chart[name](...arg)
      },
      //销毁实例，实例销毁后无法再被使用。
      dispose(){
        this.delegateMethod('dispose')
      },
      //清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。
      clear(){
        this.delegateMethod('clear')
      },
      //导出联动的图表图片，返回一个 base64 的 url，可以设置为Image的src。导出图片中每个图表的相对位置跟容器的相对位置有关。
      getConnectedDataURL(options){
        return this.delegateMethod('getConnectedDataURL', options)
      },
      //导出图表图片，返回一个 base64 的 URL，可以设置为Image的src。
      getDataURL(options){
        return this.delegateMethod('getDataURL', options)
      },
      //隐藏动画加载效果。
      hideLoading(){
        this.delegateMethod('hideLoading')
      },
      //显示加载动画效果。可以在加载数据前手动调用改接口显示加载动画，在数据加载完成后调用 hideLoading 隐藏加载动画。
      showLoading(type, options){
        this.delegateMethod('showLoading', type, options)
      },
      //判断给定的点是否在指定的坐标系或者系列上
      containPixel(finder, value){
        return this.delegateMethod('containPixel', finder, value)
      },
      //转换像素坐标值到逻辑坐标系上的点。是 convertToPixel 的逆运算。
      convertFromPixel(finder, value){
        return this.delegateMethod('convertFromPixel', finder, value)
      },
      //转换坐标系上的点到像素坐标值
      // finder 用于指示『使用哪个坐标系进行转换』。//value 要被转换的值。
      convertToPixel(finder, value){
        return this.delegateMethod('convertToPixel', finder, value)
      },
      //触发图表行为，例如图例开关legendToggleSelect, 数据区域缩放dataZoom，显示提示框showTip等等
      dispatchAction(payload){
        this.delegateMethod('dispatchAction', payload)
      },
      // use explicit params to reduce transpiled size for now改变图表尺寸，在容器大小发生改变时需要手动调用。
      resize(options){
        this.delegateMethod('resize', options)
      },
      // provide a explicit merge option method
      //设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表。如果开启动画的话，ECharts 找到两组数据之间的差异然后通过合适的动画去表现数据的变化。
      mergeOptions(options, notMerge, lazyUpdate){
        this.delegateMethod('setOption', options, notMerge, lazyUpdate)
      },
      //创建一个 ECharts 实例
      init(){
        if (this.chart) {
          return
        }
        let chart = eCharts.init(this.$el, this.theme, this.initOptions)
        if (this.group) {
          chart.group = this.group
        }
        chart.setOption(this.options, true)
        ACTION_EVENTS.forEach(event => {
          chart.on(event, params => {
            this.$emit(event, params)
          })
        })
        MOUSE_EVENTS.forEach(event => {
          chart.on(event, params => {
            this.$emit(event, params)
            // for backward compatibility, may remove in the future
            this.$emit('chart' + event, params)
          })
        })
        if (this.autoResize) {
          this.__resizeHanlder = debounce(() => {
            this.chart.resize()
          }, 100)
          window.addEventListener('resize', this.__resizeHanlder)
        }
        this.chart = chart
      },
      destroy(){
        if (this.autoResize) {
          window.removeEventListener('resize', this.__resizeHanlder)
        }
        this.dispose()
        this.chart = null
      },
      refresh(){
        this.destroy()
        this.init()
      }
    },
    created(){
      this.$watch('options', options => {
        if (!this.chart && options) {
          this.init()
        } else {
          this.chart.setOption(this.options, true)
        }
      }, {deep: !this.watchShallow})
      let watched = ['theme', 'initOptions', 'autoResize', 'watchShallow']
      watched.forEach(prop => {
        this.$watch(prop, () => {
          this.refresh()
        }, {deep: true})
      })
    },
    activated(){
      if (this.autoResize) {
        this.chart && this.chart.resize()
      }
    },
    beforeDestroy(){
      if (!this.chart) {
        return
      }
      this.destroy()
    },
//    多个图表实例实现联动。
    connect(group){
      if (typeof group !== 'string') {
        group = group.map(chart => chart.chart)
      }
    },
    //解除图表实例的联动，如果只需要移除单个实例，可以将通过将该图表实例 group 设为空。
    disconnect(group){
      eCharts.disConnect(group)
    },
    //注册可用的地图，必须在包括 geo 组件或者 map 图表类型的时候才能使用。
    registerMap(...args){
      eCharts.registerMap(...args)
    },
    //注册主题，用于初始化实例的时候指定。
    registerTheme(...args){
      eCharts.registerTheme(...args)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
