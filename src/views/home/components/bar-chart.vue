<template>
  <figure>
    <my-charts
      :options="bar"
      ref="bar"
      auto-resize
    ></my-charts>
    <button @click="loadChart">load</button>
  </figure>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import 'echarts/lib/chart/bar'
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  import { initial as barInit, async as barAsync } from '@/mock/bar'
  export default{
    data(){
      return {
        bar: barInit,
        seconds: -1,
      }
    },
    methods: {
      loadChart(){
        this.seconds = 2
        let bar = this.$refs.bar
        bar.showLoading({
          text: "正在加载",
          color: "#4ea397",
          maskColor: "rgba(255,255,255,0.4)"
        })
        let time = setInterval(() => {
          this.seconds--
          if (this.seconds === 0) {
            clearInterval(time)
            bar.hideLoading()
            bar.mergeOptions(barAsync)
          }
        }, 1000)
      }
    },
    created(){
       // console.log(this.bar)
    },
    components: {
      myCharts
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

