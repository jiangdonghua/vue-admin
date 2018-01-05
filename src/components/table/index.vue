<template>
  <div class="table">
    <div class="title">
      <svg-icon :icon-class="icon" class="icon"/>
      {{title}}
    </div>
    <div class="table-layout">
      <slot name="header-content"></slot>
      <el-table
        :data="tableData"
        border stripe
        style="width: 100%" v-if="hasTable" @selection-change="selectChange" >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column v-for="(column,index) in columns" :label="column.label" :key="index"
                         :prop="column.prop" align="center" sortable>
        </el-table-column>
        <el-table-column :label="showMarkNumber" align="center" v-if="showMarkNumber" sortable>
          <template slot-scope="scope">
            <span class="numberMark">{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" v-if="showStatus">
          <template slot-scope="scope">
            <span
              :class="scope.row.status === 'reject' ? 'Danger' :scope.row.status === 'pending' ?  'Warning':'Success'"> {{scope.row.status === 'reject' ? showStatus.reject : scope.row.status === 'pending' ? showStatus.pending : showStatus.success}}</span>
            <!--<el-tag :type="scope.row.status === 0 ? 'success' :scope.row.status === 1 ?  'danger':'info'">{{scope.row.status===0?'到港可提':scope.row.status===1?'运输中':'北港收购'}}</el-tag>-->
          </template>
        </el-table-column>
        <!--<el-table-column label="状态" align="center" v-if="showStatus">-->
          <!--<template slot-scope="scope">-->
            <!--<span-->
              <!--:class="scope.row.status === 0 ? 'Danger' :scope.row.status === 1 ?  'Warning':'Success'"> {{scope.row.status === 0 ? showStatus.success : scope.row.status === 1 ? showStatus.pending : showStatus.reject}}</span>-->
            <!--&lt;!&ndash;<el-tag :type="scope.row.status === 0 ? 'success' :scope.row.status === 1 ?  'danger':'info'">{{scope.row.status===0?'到港可提':scope.row.status===1?'运输中':'北港收购'}}</el-tag>&ndash;&gt;-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="操作" align="center" v-if="showDetail">
          <template slot-scope="scope">
            <el-button
              type="success"
              class="detail-btn"
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">查看详情
            </el-button>
            <el-button
              type="warning"
              class="detail-btn"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              type="danger"
              class="detail-btn"
              size="mini"
              @click="handleDel(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--label="货物状态" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<span :class="statusColor"> {{status }}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

      </el-table>

    </div>
    <slot name="information"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      tableData: {
        type: Array,
        default: function () {
          return []
        }
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      hasTable:{
        type: Boolean,
        default: true
      },
      showStatus: {
        type: Object,
        default: function () {
          return {}
        }
      },
      showMarkNumber: {
        type: String,
        default: '金额'
      },
      showDetail: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '货物查询'
      },
      icon: {
        type: String,
        default: 'documentation'
      }
    },
    data() {
      return {}
    },
    created(){
    },
    filters: {},
    computed: {},
    methods: {
      handleEdit(index, row) {
        //console.log(index, row);
        this.$emit('handleEdit',index,row)
      },
      handleDetail(index, row) {
        //console.log(index, row);
        this.$emit('handleDetail',index,row)
      },
      handleDel(index, row) {
        //console.log(index, row);
        this.$emit('handleDel',index,row)
      },
      selectChange(sels){
          this.$emit('selectChange',sels)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .table {
    margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-radius: 6px;
    .title {
      height: 45px;
      line-height: 45px;
      padding-left: 10px;
      font-size: 18px;
      color: #333333;
      background-color: #eeeeee;
      .icon {
        margin: 0 10px;
      }
    }
    .table-layout {
      padding: 0 20px 30px 20px;
      .detail-btn {
        //color: #428bca;
        //border: 1px solid #428bca;
      }
    }

    .Danger {
      color: #FA5555;
    }
    .Warning {
      color: #EB9E05;
    }
    .Success {
      color: #67C23A;
    }
    .Info {
      color: #878D99;
    }
    .blue {
      background-color: blue;
    }
    .numberMark {
      color: #ed4e2a;
    }
  }

</style>
