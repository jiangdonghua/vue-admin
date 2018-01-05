<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="header-icon" :class="className"></span>
      <span class="header-title">{{title}}</span>
      <span class="header-sets" v-if="show"><i class="el-icon" :class="toggleClass" @click="toggleShow"></i><i class="el-icon el-icon-edit"></i><i
        class="el-icon el-icon-refresh" @click="refresh"></i><i class="el-icon el-icon-close"></i>
   </span>
    </div>
    <div class="body" v-loading="loading">
    <slot name="body-container"></slot>
    </div>
  </el-card>
</template>

<script type="text/ecmascript-6">
  export default{
    props: {
      show:{
          type:Boolean,
          default:true
      },
      title: {
        type: String,
        default: "卡片名称"
      },
      className: {
        type: String,
        default: 'el-icon-bell'
      },

    },
    data(){
        return {
          iconShow:true,
          loading: false
        }
    },
    computed:{
      toggleClass(){
         return this.iconShow?'el-icon-arrow-down':'el-icon-arrow-up'
      }
    },
    methods:{
      toggleShow(){
          this.iconShow=!this.iconShow
      },
      refresh(){
          this.loading=true
        setTimeout(() => {
          this.loading=false
        }, 2000);
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .box-card {
    .header-icon {
      float: left;
      display: inline-block !important;
      font-size: 18px;
      margin-right: 5px;
      color: #666;
      padding-bottom:3px;
    }
    .header-title{

    }
    .header-sets {
      float: right;
      .el-icon {
        margin-left: 5px;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
</style>
