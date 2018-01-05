<template>
  <figure>
    <my-charts
               :options="pie"
               ref="pie"
               auto-resize
    ></my-charts>

  </figure>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import 'echarts/lib/chart/pie'
  import pie from '@/mock/pie.js'
  export default{
    data(){
      return{
        pie,
        connected: false,
      }
    },

    mounted () {
      let dataIndex = -1
      let pie = this.$refs.pie
      let dataLen = pie.options.series[0].data.length
      setInterval(() => {
        pie.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex
        })
        dataIndex = (dataIndex + 1) % dataLen
        pie.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex
        })
        // 显示 tooltip
        pie.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex
        })
      }, 3000)
      this.connected = true
    },
    components: {
      myCharts
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .half{
    height: 400px;
    width: 400px;
  }
</style>
