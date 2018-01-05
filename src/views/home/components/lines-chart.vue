<template>
  <main>
    <my-charts class="echart"
    :options="map"
    ref="map"
    auto-resize
    ></my-charts>
    <button @click="convert">Convert to image</button>
    <aside
      :class="{ modal: true, open }"
      @click="close"
    >
      <img
        v-if="img.src"
        :src="img.src"
        :width="img.width"
      >
    </aside>
  </main>
</template>

<script type="text/ecmascript-6">
  import myCharts from '@/components/charts/echarts.vue'
  import 'echarts/lib/chart/map'
  import 'echarts/lib/chart/lines'
  import 'echarts/lib/component/geo'

  import map from '@/mock/map.js'

  import chinaMap from '@/mock/china.json'
  myCharts.registerMap('china', chinaMap)

  export default{
      data(){
          return{
            map,
            img: {},
            open: false,
          }
      },
    methods:{
      convert(){
        let map=this.$refs.map
        let {width,height}=map
        this.img={
            src:map.getDataURL({
              pixelRatio:window.devicePixelRatio||1
            }),
          width,
          height
        }
        this.open=true
      },
      close(){
          this.open=false
        this.$refs.map.refresh()
      }


    },
    mounted(){
     // console.log(this.map)
    },
    components: {
      myCharts
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .modal{
    display :none;
    position :fixed;
    top :0;
    right: 0;
    bottom: 0;
    left :0;
    z-index: 3333;
    background-color: rgba(0, 0, 0, .2);
    &.open{
      display :block;
    }
  }

img{
  position :absolute;
  top :50%;
  left :50%;
  transform: translate(-50%, -50%);
  max-width :80vw;
  border :2px solid #fff;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(0, 0, 0, .2);
}
  button{
    display: block;
    margin: 10px auto 0 auto;
    border: 1px solid #4fc08d;
    border-radius :2em;
    background-color: #fff;
    color :#42b983;
    cursor:pointer;
    font :inherit;
    transition: opacity .3s;
    &:focus{
      outline :none;
      box-shadow :0 0 1px #4fc08d;
    }
    &:active{
      background: rgba(79, 192, 141, .2);
    }
    &[disabled]{
      opacity: .5;
      cursor :not-allowed;
    }
  }









</style>
