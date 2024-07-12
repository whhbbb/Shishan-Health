<script setup lang="ts">
//
import CustomNavbar from './components/CustomNavbar.vue'
import HomeContent from './components/HomeContent.vue'

const onScrolltolower = () => {
  console.log('触底了')
  uni.$emit('scrolltolower')
}
</script>

<template>
  <CustomNavbar />
  <scroll-view @scrolltolower="onScrolltolower" class="scroll-view" scroll-y>
    <HomeContent />
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: rgb(188, 212, 141);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  padding-bottom: 40rpx;
}
</style>
