<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container"></sidebar>
    <navbar class="navbar-container"></navbar>
    <div class="main-container">{{title}}
      <big-title :title="title"></big-title>
     <div class="breadHamburger-container">
       <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
       <breadcrumb></breadcrumb>
     </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout/components'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import BigTitle from '@/components/BigTitle'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    Hamburger,
    Breadcrumb,
    BigTitle,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    opt(){
      this.$router.options.forEach((item)=>{
        //item.meta.role[0]==='admin'?'贸易商平台':item.meta.role[0]==='super'?'采购商平台':'金融机构平台'
      })
    },
    title(){
        let quanxian=''
      this.$router.options.routes.forEach((item)=>{
        if(item.meta&&item.meta.role){
           quanxian=item.meta.role[0]
        }

        //console.log(item)
      })
      return quanxian==='admin'?'贸易商平台':quanxian==='super'?'采购商平台':'金融机构平台'
    }
  },
created(){
      //console.log(this.$router.options)

},
  methods:{
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .breadHamburger-container{
    background-color: #eeeeee;
    border-bottom: solid 1px #e6e6e6;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px 0 20px;
    }
  }

}
</style>
