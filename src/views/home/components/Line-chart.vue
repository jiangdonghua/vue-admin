<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let eCharts=require("echarts/lib/echarts")
  //import eCharts from 'echarts'
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  require('echarts/theme/macarons')
  import {debounce} from '@/utils/index'
  export default{
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object
      }
    },
    data(){
      return {
        chart: null
      }
    },
    mounted(){
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    watch:{
      chartData:{
        deep:true,
        handler(val){
          this.setOptions(val)
        }
      }
    },
    methods:{
      setOptions({expectedData,actualData}={}){
        this.chart.setOption({
          title:{
            text:"关系图",
            subtext: '数据来自xxx有限公司',
            x:'center',
            align:'center',
            textStyle :{
              color:'#777'
            },
//                top:'5px'
            //left:'20px'

          },
          xAxis: { // x 轴
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            boundaryGap: false, //坐标轴两边留白策略
            axisTick: { //坐标轴刻度相关设置
              show: false //是否显示坐标轴刻度
            }
          },
          grid: { //直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴。
            left: 10,
            right: 10,
            bottom: 20,
            top: 60,
            containLabel: true //grid 区域是否包含坐标轴的刻度标签 true这常用于『防止标签溢出』的场景，标签溢出指的是，标签长度动态变化时，可能会溢出容器或者覆盖其他组件。
          },
          tooltip: { //提示框组件
            trigger: 'axis',//触发类型。坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。 item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            axisPointer: { //坐标轴指示器配置项
              type: 'cross' //此时坐标系会自动选择显示哪个轴的 axisPointer
            },
            padding: [5, 10] //提示框浮层内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距。
          },
          yAxis: {
            name: '产量(kg)',
            axisTick: {
              show: false
            }
          },
          legend: { //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
            data: ['预期', '实际'], //图例的数据数组。
            top:'7px',
            x:'right'
            // data: [{如果要设置单独一项的样式，也可以把该项写成配置项对象。此时必须使用 name 属性对应表示系列的 name。
            // name: '系列1',
            // 强制设置图形为圆。
            // icon: 'circle',
            // 设置文本为红色
            /// textStyle: {
            //  color: 'red'
            //}
            // }]
          },
          series: [{ //系列列表。每个系列通过 type 决定自己的图表类型
            name: '预期', itemStyle: { //折线拐点标志的样式。
              normal: {
                color: '#FF005A',
                lineStyle: { //线条样式。
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: false,//是否平滑曲线显示
            type: 'line', //折线/面积图展现数据的变化趋势; bar柱状/条形图来表现数据的大小;pie 柱状/条形图表现不同类目的数据在总和中的占比;scatter 散点（气泡）图。effectScatter 带有涟漪特效动画的散点（气泡）图。利用动画特效可以将某些想要突出的数据进行视觉突出。radar 雷达图雷达图主要用于表现多变量的数据，例如球员的各个属性分析。依赖 radar 组件。;tree 树图主要用来可视化树形数据结构，是一种特殊的层次类型，具有唯一的根节点，左子树，和右子树。treemap 是一种常见的表达『层级数据』『树状数据』的可视化形式。它主要用面积的方式，便于突出展现出『树』的各层级中重要的节点。;下钻（drill down）：点击后才展示子层级;boxplot 箱形图;candlestick  K线图;heatmap 热力图主要通过颜色去表现数值的大小，必须要配合 visualMap 组件使用。;map 地图;parallel 平行坐标系的系列。;graph 用于展现节点以及节点之间的关系数据。sankey 是一种特殊的流图, 它主要用来表示原材料、能量等如何从初始形式经过中间过程的加工、转化到达最终形式。;funnel漏斗图;gauge 仪表盘;pictorialBar 象形柱图;themeRiver 主题河流;custom自定义系列
            data: expectedData, //系列中的数据内容数组。
            animationDuration: 2800, //初始动画的时长
            animationEasing: 'cubicInOut' //缓动效果
          },
            {
              name: '实际',
              smooth: false,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: { //区域填充样式。
                    color: '#f3f8ff'
                  }
                }
              },
              data: actualData,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      },
      initChart(){
        this.chart=eCharts.init(this.$el,'macarons') //初始化echarts实例
        this.setOptions(this.chartData) // 使用刚指定的配置项和数据显示图表。
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
