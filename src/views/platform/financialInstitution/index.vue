<template>
  <div class="control-board">
    <my-table :hasTable="false"   title="项目查询" icon="component">
      <div slot="header-content" class="header-content">
        <span>企业名称：</span>
        <el-select v-model="value8" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" class="button">查询</el-button>
      </div>
      <div slot="information" class="information">
        <div class="card">
          <div class="title">企业基本信息</div>
          <div class="card-cont">
            <div class="list"><span class="label">公司名称：</span><span class="cont"> 广东华农温氏畜牧股份有限公司</span></div>
            <div class="list borderRight0"><span class="label">交易数据：</span><span class="cont"></span></div>
          </div>
          <div class="card-cont">
            <div class="list"><span class="label">资金需求量：</span><span class="cont">300,000,000</span></div>
            <div class="list borderRight0"><span class="label">入网评级：</span><el-rate
              v-model="value5"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate></div>
          </div>
          <div class="card-cont">
            <div class="list borderRight0"><span class="label">正在执行项目：</span><span></span></div>
          </div>
        </div>
        <div class="card">
          <div class="title">企业详情</div>
          <div class="details">广东华农温氏畜牧股份有限公司是在原广东温氏食品集团养猪公司基础上，由广东温氏食品集团、华南农业大学科技实业发展总公司、新兴食品集团有限公司等于2002年7月共同出资发起成立的，以种猪育种和肉猪生产为主的专业化公司。原种猪、猪苗、肉猪、饲料的生产和销售（由下属分支机构凭许可证经营）。水果、蔬菜、花卉的种植、收购、销售及其相关副产品销售（涉及前置审批的凭相关许可证经营）。</div>
          <div class="title borderTop1">项目详情</div>
          <div class="details">广东华农温氏畜牧股份有限公司是在原广东温氏食品集团养猪公司基础上，由广东温氏食品集团、华南农业大学科技实业发展总公司、新兴食品集团有限公司等于2002年7月共同出资发起成立的，以种猪育种和肉猪生产为主的专业化公司。原种猪、猪苗、肉猪、饲料的生产和销售（由下属分支机构凭许可证经营）。水果、蔬菜、花卉的种植、收购、销售及其相关副产品销售（涉及前置审批的凭相关许可证经营）。</div>

        </div>
      </div>
    </my-table>
    <my-table :showMarkNumber="null" :showStatus="null" :columns="columns" :showDetail="true"  title="项目管理" icon="component">
<div slot="header-content" style="padding-top: 20px"></div>
    </my-table>

  </div>
</template>

<script type="text/ecmascript-6">
  import myTable from '@/components/table'
  export default{
    data(){
      return {
        value5: 3.7,
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        columns: [
          {
            label: '企业',
            prop: 'date'
          },
          {
            label: '收款',
            prop: 'name'
          },
          {
            label: '还款记录',
            prop: 'name'
          }
        ],
        value8: ''
      }
    },
    components: {
      myTable
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .control-board {
    margin: 20px 20px 36px 20px;
    .header-content{
      padding:30px 0;
      border-bottom:1px solid #dddddd;
      span{
        font-size:14px;
        color: #101010;
        &.pl25{
          padding-left: 25px;
        }
      }
      .button{
        margin-left: 25px;
      }
    }
    .information{
      border:1px solid #dddddd;
      margin:-10px 20px 20px 20px;
      .card{
        font-size:16px;
        color: #888888;
        .title{
          padding:0 20px;
          border-bottom:1px solid #dddddd;

          background: #f9f9f9;
          color: #333333;
          &.borderTop1{
            border-top:1px solid #dddddd;
          }
        }
        .details{
          line-height:20px;
          padding:20px 20px;
          text-indent:32px;
        }
        .card-cont{
          display: flex;
          flex-wrap:wrap;
          flex-flow: row;

          .list{
            padding: 0 20px;
            box-sizing: border-box;
            display:flex;
            align-items:center;/*垂直居中*/
            //justify-content: center;/*水平居中*/
            flex:1;
            height:47px;
            border-right: 1px solid #dddddd;
            border-bottom:1px solid #dddddd;
            &.borderRight0{
              border-right:0;
            }
            &.borderBottom0{
              border-bottom:0;
            }
            .label{
              color: #333333;
            }
            .cont{

            }
          }
        }
      }
    }
  }
</style>

