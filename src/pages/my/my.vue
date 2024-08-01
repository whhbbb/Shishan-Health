<template>
  <CustomNavbar
    showLogo
    position="left"
  />
    <Mycontent />
  <TabBar :selected="4" />
</template>

<script setup>
import CustomNavbar from '../../components/CustomNavbar.vue'
import Mycontent from './components/MyContent.vue'
import { onShow } from "@dcloudio/uni-app";
import { getCurrentInstance } from 'vue'

onShow(()=>{
    const curPages = getCurrentPages()[0];  // 获取当前页面实例
    if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {  
      curPages.getTabBar().setData({  
        selected: 4   // 表示当前菜单的索引，该值在不同的页面表示不同
      });  
    }
})
</script>

<style lang="scss">
</style>