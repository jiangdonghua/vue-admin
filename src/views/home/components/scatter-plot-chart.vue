<template>
    <figure>
      <my-charts
        :options="scatter"
        ref="scatter"
        auto-resize
      ></my-charts>
    </figure>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import 'echarts/lib/chart/scatter'
  import 'echarts/lib/component/tooltip'
  import scatter from '@/mock/scatter'
    export default{
      data(){
          return{
              scatter
          }
      },
      components: {
        myCharts
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
