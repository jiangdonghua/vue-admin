<template>
  <div class="control-board">
    <div class="box">
      <p>今日回款金额（元）：</p>
      <p class="numberMark">800,000,000</p>
    </div>
    <my-table :tableData="tableData" :columns="columns" :showStatus="null" :showDetail="true" title="今日应收"
              showMarkNumber="收款金额"
              ref="myTable" @row="row">
      <div slot="header-content" class="header-content">
        <span>今日应收账款（元）：</span>
        <span class="numberMark">135,000</span>
      </div>
    </my-table>
    <my-table :tableData="tableData1" :columns="columns1" title="今日应付" :showStatus="null" :showDetail="true"
              showMarkNumber="付款金额">
      <div slot="header-content" class="header-content">
        <span>今日应付账款（元）：</span>
        <span class="numberMark">535,000</span>
      </div>
    </my-table>

    <el-dialog title="详情" :visible.sync="dialogFormVisible">
      <el-form :model="dialogData" style="display: flex;">
        <div style="flex: 1; flex: 0 0 80px;">
          <div v-for="item in labels">
            {{item.label}}:
          </div>
        </div>
        <div style="flex: 1;">
          <div v-for="item in dialogData"> {{item}}</div>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import myTable from '@/components/table'
  export default{
    data(){
      return {
        dialogFormVisible: false,
        dialogData: [],
        showStatus: {
          success: '到港可提',
          pending: '运输中',
          reject: '北港收购'
        },
        tableData: [
          {
            date: '1SFIE0097997',
            name: 'ZYCG-佳木斯-深粮10000吨1',
            company: '深粮1',
            money: '14555',
          }, {
            date: '2SFIE0097997',
            name: 'ZYCG-佳木斯-深粮10000吨2',
            company: '深粮2',
            money: '24555'
          }, {
            date: '3SFIE0097997',
            name: 'ZYCG-佳木斯-深粮10000吨3',
            company: '深粮3',
            money: '34555'
          }],
        columns: [
          {
            label: '合同号',
            prop: 'date'
          },
          {
            label: '订单名称',
            prop: 'name'
          },
          {
            label: '付款企业',
            prop: 'company'
          },
//          {
//            label: '收款金额',
//            prop: 'money'
//          }
        ],
        tableData1: [
          {
            date: 'OR00000794',
            name: 'ZY-彰武-丰源-深粮3300吨',
            company: '延安丰源',
            money: '44555',
          }, {
            date: 'OR00000794',
            name: 'ZY-彰武-丰源-深粮3300吨',
            company: '延安丰源',
            money: '44555'
          }, {
            date: 'OR00000794',
            name: 'ZY-彰武-丰源-深粮3300吨',
            company: '延安丰源',
            money: '44555'
          }],
        columns1: [
          {
            label: '合同号',
            prop: 'date'
          },
          {
            label: '订单名称',
            prop: 'name'
          },
          {
            label: '收款企业',
            prop: 'company'
          },
//          {
//            label: '付款金额',
//            prop: 'money'
//          }
        ],
        labels: [
          {
            label: '合同号'
          },
          {
            label: '订单名称',
          },
          {
            label: '收款企业',
          },
          {
            label: '付款金额',
          },
        ]
      }
    },
    mounted(){
      // console.log(this.$refs.myTable)
    },
    methods: {
      row(row, index){
        this.dialogData = index
        this.dialogFormVisible = true
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
    .box {
      background: #fcf3e1;
      border-left: 6px solid #fcb322;
      font-size: 18px;
      color: #333333;
      padding: 15px;
      margin-bottom: 20px;
      line-height: 24px;

    }
    .header-content {
      color: #101010;
      padding: 30px 0;
      span {
        font-size: 16px;

        &.pl25 {
          padding-left: 25px;
        }
      }
      .button {
        margin-left: 25px;
      }
    }
    .numberMark {
      color: #ed4e2a;
    }

  }
</style>
