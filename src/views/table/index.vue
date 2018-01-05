<template>
  <div class="control-board">
    <my-table :tableData="list" :showDetail="true" :columns="columns" :showStatus="showStatus" :showMarkNumber="null"
                border fit highlight-current-row
              @handleDel="handleDel" @handleEdit="handleEdit" @handleDetail="handleDetail" @selectChange="selectChange">
      <div slot="header-content" class="header-content">
        <span>合同号：</span>

        <el-input
          clearable="true"
          placeholder="请输入内容"
          v-model.trim="listQuery.order_number"
        >
        </el-input>
        <el-button type="primary" class="button" @click="handleFilter">查询</el-button>
        <el-button type="primary" class="button" @click="handleAdd">新增</el-button>
      </div>

    </my-table>
    <div class="toolbar">
      <el-button type="danger"  class="detail-btn" size="mini"  @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination class="pagination"
        v-show="!listLoading"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="listQuery.page"
        :page-sizes="[5, 10, 20]"
        :page-size="listQuery.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormVisible" width="30%" v-bind:title="title" :close-on-click-modal="false">

      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="合同号" :label-width="formLabelWidth" prop="order_number">
          <el-input v-model="form.order_number" auto-complete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="卖方企业" :label-width="formLabelWidth" prop="company">
          <el-input v-model="form.company" auto-complete="off" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
          <el-select v-model.lazy="form.status"
                     placeholder="状态" :disabled="disabled">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click.native="cancel" v-if="title==='详情'">确 定</el-button>
        <el-button type="primary" @click.native="handleUpdate" :loading="editLoading" v-if="title==='编辑'">确 定

        </el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading" v-if="title==='新增'">确 定

        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script type="text/ecmascript-6">
  import myTable from '@/components/table'
  import {fetchList, fetchPv, deleteList, editList,addList,batchRemoveList,refreshList} from '@/api/article'
  export default{
    data(){
      return {
        listLoading: true,
        list: null,
        total: null,
        listQuery: {
          page: 1,
          limit: 5,
          title: undefined,
          order_number: ''
        },
        tableKey: 0,
        form: {
          id: '',
          order_number: '',
          company: '',
          status: ''
        },
        formLabelWidth: '80px',
        dialogFormVisible: false,
        disabled: false,
        editLoading: false,
        title: '',
        rules: {
          order_number: [
            {
              required: true,
              message: "请输入订单名",
              trigger: 'blur'
            }],
          company: [
            {
              required: true,
              message: "请输入company名",
              trigger: 'blur'
            }
          ],
          status: [
            {
              required: true,
              message: "请输入status",
              trigger: 'change'
            }
          ]

        },
        showStatus: {
          success: '到港可提',
          pending: '运输中',
          reject: '北港收购'
        },
        columns: [
          {
            label: 'id',
            prop: 'id'
          },
          {
            label: '合同号',
            prop: 'order_number'
          },
          {
            label: '卖方企业',
            prop: 'company'
          },
        ],
        options: [
          {
            value: 'success',
            label: '到港可提'
          }, {
            value: 'pending',
            label: '运输中'
          }, {
            value: 'reject',
            label: '北港收购'
          }],
        value: '',
        sels:[] //列表选中列
      }
    },
    created(){
      this.getList()
    },
    computed: {
      placeholder()
      {
        return this.form.status === 'reject' ? this.showStatus.reject : this.form.status === 'pending' ? this.showStatus.pending : this.showStatus.success
      }

    },
    methods: {
      getList(){
        this.listLoading = true

        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleFilter(){
        this.listQuery.page = 1
        this.getList()
      },
      cancel(){
        this.$refs.ruleForm.resetFields()
        this.dialogFormVisible = false

      },
      handleDetail(row, index){
        this.title = '详情'
        this.dialogFormVisible = true
        this.form = Object.assign({}, index);
        this.disabled = true

      },
      handleUpdate(){

        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", '提示', {}).then(() => {
              this.editLoading = true

              let para = Object.assign({}, this.form)
              console.log(para)
              editList(para).then((res) => {
                this.editLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })

                this.dialogFormVisible = false
                this.$refs.ruleForm.resetFields()
                this.getList()
              })

            })
          } else {
            console.log('error')
            return false;
          }
        })
      },
      handleDel(row, index){
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true
          let para = {id: index.id}
          deleteList(para).then((res) => {
            this.listLoading = false
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          })

        }).catch(() => {
          return false
        })
      },
      handleEdit(row, index){
        this.title = '编辑'
        this.disabled = false
        this.dialogFormVisible = true
        this.form = Object.assign({}, index);

      },
      handleAdd(){
          this.form={}
        this.dialogFormVisible = true
          this.title='新增'
        this.disabled = false



      },
      addSubmit(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.$confirm("确认提交吗？", '提示', {}).then(() => {
              this.editLoading = true
              let para = Object.assign({}, this.form)
              addList(para).then((res) => {
                this.editLoading = false
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                //this.$refs.ruleForm.resetFields()
                this.getList()
                this.dialogFormVisible = false
              })

            })
          } else {
            console.log('error')
            return false;
          }
        })
      },
      selectChange(sels){
          this.sels=sels
      },
      batchRemove(){
          var ids=this.sels.map((item=>item.id)).join()
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveList(para).then((res) => {
            this.listLoading = false;
            console.log(res)
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList()
          });
        }).catch(() => {

        });

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
    .header-content {
      padding: 30px 0;
      .el-input {
        width: 180px;

        .el-input__inner {
          -webkit-appearance: normal;
        }
      }
      span {
        font-size: 14px;
        color: #101010;
        &.pl25 {
          padding-left: 25px;
        }
      }
      .button {
        margin-left: 25px;
      }

    }
    .toolbar{
      margin-bottom:20px;
      display: flex;
      justify-content:  space-between;
      .detail-btn{
        width: 80px;
        flex:0 0 80px;
      }
    }
  }
</style>
