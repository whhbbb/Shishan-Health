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
    <XsSwiper class="swiper"></XsSwiper>
    <HomeContent />
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.scroll-view {
  display: flex;
  flex: 1;

  .swiper {
    padding-top: 20px;
  }
}
</style>
