<template>
  <figure>
    <my-charts
      :options="barStack"
      ref="barStack"
      auto-resize
    ></my-charts>
  </figure>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import 'echarts/lib/chart/bar'
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  import barStack from '@/mock/barstack'
  export default{
    data(){
      return {
        barStack
      }
    },
    components: {
      myCharts
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

