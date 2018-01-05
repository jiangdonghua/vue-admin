<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name:{{name}}</div>-->
    <!--<div class="dashboard-text">role:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <el-row class="content" :gutter="20">
      <el-col :span="12" class="line-chart">
        <el-card class="box-card">
          <line-chart :chart-data="lineChartData" :height="height" :width="width"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <card style="height:390px">
          <div slot="body-container" class="body-container">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="用户管理" name="first">
                <ul>
                  <li v-for="(item,index) in system" class="tag-li">
                    <div class="cont clearfix">
                      <span :class="item.icon" class="label-info"></span>
                      <div class="desc">

                        {{item.text}}
                        <span v-if="item.type==='pending'">
                        <el-tag type="danger" size="small">Take action</el-tag>
                      </span>
                        <span v-if="item.type==='success'">
                        <el-tag type="success" size="small">success</el-tag>
                      </span>
                      </div>
                      <div class="date">
                        {{item.rateTime | formatTime}}


                      </div>
                    </div>

                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
              <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            </el-tabs>
          </div>
        </card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><lines-chart class="echart" ></lines-chart></el-col>
      <el-col :span="12"><lines-chart1 class="echart"></lines-chart1></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"> <pie-chart class="echart"></pie-chart></el-col>
      <el-col :span="12"> <barstack-chart class="echart"></barstack-chart></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><connect-chart class="echart1"></connect-chart></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12"><scatter-chart class="echart"></scatter-chart></el-col>
      <el-col :span="12"><bar-chart class="echart"></bar-chart></el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <full-calendar class="test-fc" :events="fcEvents"
                       lang="zh"
                       first-day='1'
                       @changeMonth="changeMonth"
                       @eventClick="eventClick"
                       @dayClick="dayClick"
                       @moreClick="moreClick">
          <template slot="fc-event-card" slot-scope="p">
            <p><i class="fa">sadfsd</i> {{ p.event.title }} test</p>
          </template>
        </full-calendar>
      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  //import { mapGetters } from 'vuex'
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/Line-chart'
  import LinesChart from './components/lines-chart'
  import LinesChart1 from './components/lines-chart1'
  import pieChart from './components/pie-chart'
  import connectChart from './components/connectable-chart'
  import scatterChart from './components/scatter-plot-chart'
  import barChart from './components/bar-chart'
  import barstackChart from './components/barstack-chart'
  import Card from '@/components/card/card'
  import {formatTime} from 'utils/index'
  import ElRow from "element-ui/packages/row/src/row"
  import moment from  'moment'
  const lineChartData = {
    newVisitis: {
      expectedData: [12, 100, 120, 161, 134, 105, 160],
      actualData: [39, 120, 82, 91, 154, 162, 140]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    },
    benefit: {
      expectedData: [230, 140, 241, 142, 345, 150, 160],
      actualData: [110, 82, 91, 154, 162, 240, 130]
    },
    honer: {
      expectedData: [130, 150, 141, 142, 145, 150, 260],
      actualData: [120, 82, 91, 164, 162, 140, 230]
    },
  }
  const Notifications = {
    system: [
      {
        icon: 'el-icon-bell',
        text: 'You have 4 pending tasks. ',
        rateTime: 1512438741084,
        type: 'pending'
      },
      {
        icon: 'el-icon-star-off',
        text: 'Database server #12 overloaded. Please fix the issue. Please fix the issue ',
        rateTime: 1512438722184
      },
      {
        icon: 'el-icon-bell',
        text: 'New order received. Please take care of it.',
        rateTime: 1512435742184,
        type: 'success'
      },
      {
        icon: 'el-icon-star-on',
        text: 'Web server hardware needs to be upgraded.  ',
        rateTime: 1512106742184
      },
    ]
  }
  let demoEvents = [
    {
      title    : '敲代码',
      start    : '2018-01-21',
      //end      : '2018-01-27',
      cssClass : 'family!important',

    },
    {
      title    : '张全蛋请假',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },
    {
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },
    {
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },{
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },{
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },


    {
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },
    {
      title    : 'Sunny 725-727',
      start    : '2018-01-25',
      end      : '2018-01-27',
      cssClass : 'family!important'
    },
    {
      title : 'Lunfel 726-727',
      start : '2018-01-06',
      end : '2018-01-07',
      cssClass : ['home!important', 'work!important'],
    },
    {
      title : 'Lunfel 2/27-2/28',
      start : '2017-02-27',
      end : '2017-02-28'
    },
    {
      title : 'Lunfel 2/27-2/28',
      start : '2017-02-27',
      end : '2017-02-28'
    },
    {
      title : 'Lunfel 2/27-2/28',
      start : '2017-02-27',
      end : '2017-02-28'
    },
    {
      title : 'Lunfel 2/26-3/05',
      start : '2017-02-26',
      end : '2017-03-05'
    },
    {
      title : 'Lunfel 1/27-1/28',
      start : '2017-01-27',
      end : '2017-01-28'
    },
    {
      title : 'Lunfel 1/27-2/2',
      start : '2017-01-27',
      end : '2017-02-02'
    },
    {
      title : 'Lunfel 3/27-3/28',
      start : '2017-03-27',
      end : '2017-03-28'
    },
  ];

  export default {
    name: 'home',
    computed: {
//    ...mapGetters([
//      'name',
//      'roles'
//    ])
    },
    data(){
      return {
        lineChartData: lineChartData.newVisitis,
        height: '350px',
        width: '100%',
        activeName: 'first',
        system: Notifications.system,
        name:'Sunny!',
        fcEvents : demoEvents
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSetLineChartData(type){
        this.lineChartData = lineChartData[type]
      },
      changeMonth(start, end, current) {
        console.log('changeMonth', start, end, current)
      },
      eventClick (event, jsEvent, pos) {
        console.log('eventClick', event, jsEvent, pos)
      },
      dayClick(day, jsEvent) {
        console.log('dayClick', day, jsEvent)
      },
      moreClick (day, events, jsEvent) {
        console.log('moreCLick', day, events, jsEvent)
      }
    },
    filters: {
      formatTime(time){

        //console.log(time)
        return formatTime(time)
      }
    },
    created(){
      //console.log(this.formatTime)
    },
    components: {
      ElRow, PanelGroup,
      Card,
      LineChart,
      LinesChart,
      LinesChart1,
      pieChart,
      connectChart,
      scatterChart,
      barChart,
      barstackChart,
     'full-calendar': require('vue-fullcalendar')
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  figure {
    border: 1px solid rgba(0, 0, 0, .1);
    border-radius: 8px;
    box-shadow: 0 0 45px rgba(0, 0, 0, .2);
    padding: 1.5em 2em;
  }

  /*@import "src/styles/card.scss";*/
  .dashboard-container {
    padding: 0 10px;
    margin-top: 20px;
    .content {
      margin-top: 20px;
      .body-container {
        .tag-li {
          background-color: #fafafa;
          margin-bottom: 7px;
          .cont {
            .label-info {
              float: left;
              margin-right: -100%;
              padding: 5px 4px 6px 5px;
              vertical-align: middle;
              text-align: center;
            }
            .desc {
              float: left;
              display: inline-block;
              margin-right: 100px;
              margin-left: 35px;
              padding-top: 4px;
              padding-bottom: 5px;
              overflow: hidden;
            }
            .date {
              float: right;
              width: 100px;
              margin-left: -100px;
              padding: 4px 9px 5px 4px;
              text-align: right;
              font-style: italic;
              color: #c1cbd0;
              font-size: 14px;
            }
          }

        }
      }
    }
    .echart {
      margin: 30px 0;
      // width: 48%;
      //float: left;
      min-height: 350px;
      height: 350px;
    }
    .echart1 {
      margin-bottom: 30px;
      //width: 100%;
     // float: left;
      min-height: 400px;
      height: 440px;
    }

  }
</style>
