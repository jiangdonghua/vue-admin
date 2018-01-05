<template>
  <div class="control-board">
    <my-table :tableData="tableData" :columns="columns" :showStatus="showStatus" :showMarkNumber="null">
      <div slot="header-content" class="header-content">
        <span>合同号：</span>
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
    </my-table>
    <my-table :tableData="tableData1" :columns="columns1" title="库存查询" :showStatus="null" :showMarkNumber="null">
      <div slot="header-content" class="header-content">
        <span>港口：</span>
        <el-select v-model="value8" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <span class="pl25">时间：</span>
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
    </my-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import myTable from '@/components/table'
  export default{
    data(){
      return {
        showStatus:{
            success:'到港可提',
            pending:'运输中',
             reject:'北港收购'
        },
        tableData: [
          {
            date: 'SFIE0097997',
            name: '东百供应链管理有限公司',
            status: 0
          }, {
            date: 'SFIE0097997',
            name: '东百供应链管理有限公司',
            status: 1
          }, {
            date: 'SFIE0097997',
            name: '东百供应链管理有限公司',
            status: 2
          }],
        columns: [
          {
            label: '合同号',
            prop: 'date'
          },
          {
            label: '卖方企业',
            prop: 'name'
          }
        ],
        tableData1: [
          {
            warehouse: '锦州港',
            quantity: '100',
            category:'玉米',
            grade:'A级',
          }, {
            warehouse: '锦州港',
            quantity: '200',
            category:'玉米',
            grade:'A级',
          }, {
            warehouse: '锦州港',
            quantity: '300',
            category:'玉米',
            grade:'A级'
          }],
        columns1: [
          {
            label: '仓库',
            prop: 'warehouse'
          },
          {
            label: '数量（吨）',
            prop: 'quantity'

          },
          {
            label: '品类',
            prop: 'category'

          },
          {
            label: '等级',
            prop: 'grade'

          }

//          {
//            label: '操作',
//            operations: [{
//              label: '查看',
//              func: this.disableTag
//            }, {
//              label: '编辑',
//              func: this.checkMountedUser
//            }, {
//              label: '删除',
//              func: this.editTag
//            }]
//          }
        ],
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
  }
</style>
