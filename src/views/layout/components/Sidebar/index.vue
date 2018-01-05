<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#35363a" text-color="#999999" active-text-color="#ffffff">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
  //import store from 'store'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      //'permission_routers'
    ]),
    routes() {
      return this.$router.options.routes
      //return this.store.state.permission.routers
      //return this.permission_routers
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted(){
   // console.log(this.$router.options.routes)
  },
}
</script>
