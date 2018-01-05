<template>
  <main>
    <el-card class="card">
    <figure class="half">
      <my-charts
        :options="c1"
        group="radiance"
        ref="c1"
        auto-resize
      />
    </figure>
    <figure class="half" style="margin-left: 2%;">
      <my-charts
        :options="c2"
        group="radiance"
        ref="c2"
        auto-resize
      />
    </figure>
      <p>
        <input
          id="connect"
          type="checkbox"
          v-model="connected"
        >
        <label for="connect">Connected</label>
      </p>
    </el-card>

  </main>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import {c1, c2}  from '@/mock/connect.js'

  export default{
    data(){
      return {
        c1, c2,
        connected:true
      }
    },
    watch: {
      connected: {
        handler (value) {
          myCharts[value ? 'connect' : 'disconnect']('radiance')
        }
      }
    },
    components: {
      myCharts
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .card{
    background:ghostwhite;
  }
  .half {
    display: inline-block;
    height: 400px;
    width: 48%;
  }
  p{
    text-align: center;
  }
  figure{
    margin:0;
  }
</style>

