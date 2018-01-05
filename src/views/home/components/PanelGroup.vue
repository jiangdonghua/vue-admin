<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :span="4">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="details">
            <div class="percent">
              <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
              <div class="numbers">+66%</div>
            </div>
            <div class="info">
              <div class="title">User</div>
              <count-to :start-val="0" :end-val="2017" :duration="3600" class="numbers"></count-to>
            </div>
          </div>
          <el-progress :text-inside="true" :stroke-width="10" :percentage="66" :show-text="false"></el-progress>
        </div>


    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="details">
          <div class="percent">
            <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
            <div class="numbers">+66%</div>
          </div>
          <div class="info">
            <div class="title">User</div>
            <count-to :start-val="1000" :end-val="2317" :duration="2600" class="numbers"></count-to>
          </div>
        </div>
        <el-progress :text-inside="true" :stroke-width="10" :percentage="36" :show-text="false"></el-progress>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="details">
          <div class="percent">
            <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
            <div class="numbers">+26%</div>
          </div>
          <div class="info">
            <div class="title">User</div>
            <count-to :start-val="1000" :end-val="2017" :duration="2600" class="numbers"></count-to>
          </div>
        </div>
        <el-progress :text-inside="true" :stroke-width="10" :percentage="66" :show-text="false"></el-progress>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="details">
          <div class="percent">
            <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
            <div class="numbers">-16%</div>
          </div>
          <div class="info">
            <div class="title">User</div>
            <count-to :start-val="1000" :end-val="247" :duration="2600" class="numbers"></count-to>
          </div>
        </div>
        <el-progress :text-inside="true" :stroke-width="10" :percentage="60" status="exception" :show-text="false"></el-progress>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('benefit')">
        <div class="details">
          <div class="percent">
            <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
            <div class="numbers">-46%</div>
          </div>
          <div class="info">
            <div class="title">User</div>
            <count-to :start-val="1000" :end-val="2017" :duration="2600" class="numbers"></count-to>
          </div>
        </div>
        <el-progress :text-inside="true" :stroke-width="10" :percentage="30" status="exception" :show-text="false"></el-progress>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="card-panel" @click="handleSetLineChartData('honer')">
        <div class="details">
          <div class="percent">
            <img src="../../../assets/user-chart.png" alt="" width="40" height="20">
            <div class="numbers">+96%</div>
          </div>
          <div class="info">
            <div class="title">User</div>
            <count-to :start-val="1000" :end-val="2137" :duration="2600" class="numbers"></count-to>
          </div>
        </div>
        <el-progress :text-inside="true" :stroke-width="10" :percentage="100" status="success" :show-text="false"></el-progress>
      </div>
    </el-col>
  </el-row>

</template>

<script type="text/ecmascript-6">
import CountTo from 'vue-count-to'
  export default{
    components:{
      CountTo
    },
    methods:{
      handleSetLineChartData(type){
          this.$emit('handleSetLineChartData',type)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group{
  .card-panel{
    clear: both;
    padding: 10px;
    margin: 0px;
    margin-bottom: 5px;
    background-color: #F6F6F6;
    border: 1px solid #dedede;
    border-radius: 4px;
    line-height: 18px;
    cursor: pointer;
    .details{
      color: #777;
      text-align: center;
      margin-bottom:5px;
      font-size:0;
      .percent{
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
        .numbers{
          font-size:16px;
        }
      }
      .info{
        display: inline-block;
        .title{
          font-size:14px;
          margin-bottom:5px;
        }
        .numbers{
          font-size: 20px;
        }
      }

    }

  }
}
</style>
