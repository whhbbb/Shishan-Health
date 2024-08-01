<template>
  <view class="page" :style="{ filter: isDarkened ? 'brightness(0.5)' : 'brightness(1)' }">
    <CustomNavbar position="left" showLogo/>
    <scroll-view @scrolltolower="onScrolltolower" class="scroll-view"
       scroll-y>
      <HomeContent />
    </scroll-view>
  </view>
  <TabBar @chooseWay="handleChooseWay" :selected="0" />
</template>

<script setup>

import CustomNavbar from '../../components/CustomNavbar.vue'
import HomeContent from './components/HomeContent.vue'
import { onShow,onHide } from "@dcloudio/uni-app";
import { getCurrentInstance, ref } from 'vue'

const isDarkened = ref(false);

const onScrolltolower = () => {
  console.log('触底了')
  uni.$emit('scrolltolower')
}

const handleChooseWay = () => {
  isDarkened.value = !isDarkened.value;
}

onShow(() => {
  const curPages = getCurrentPages()[0];  // 获取当前页面实例
  if (typeof curPages.getTabBar === 'function' && curPages.getTabBar()) {
    curPages.getTabBar().setData({
      selected: 0   // 表示当前菜单的索引，该值在不同的页面表示不同
    });
  }
})
onHide(()=>{
  isDarkened.value = false
})
</script>

<style lang="scss">
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fa;
}

.scroll-view {
  padding-bottom: 100rpx;
}
.page{
  transition: filter 0.3s ease;
}
</style>
