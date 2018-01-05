<template>
<div class="big-title">
  {{title}}
</div>
</template>

<script type="text/ecmascript-6">

    export default{
        props:{
            title:{
                type:String,
                default:'采购商平台'
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.big-title{
  height:70px;
  line-height: 70px;
  font-size: 22px;
  color: #333333;
  padding:0 20px;
  margin-top:60px;
}
</style>
