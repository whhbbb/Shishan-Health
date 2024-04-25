<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>

<template>
  <!-- 顶部占位 -->
  <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top!+ 8 + 'px' }">
    <!-- ...省略 -->
    学术晚茶
  </view>
</template>

<style lang="scss">
.navbar {
  // padding-top: 47px;
  padding-bottom: 30rpx;
  box-shadow: 0 0 20px #e5e4e4;
  color: #000;
  font-size: 40rpx;
  background-color: #fff;
  text-align: center;
}
</style>
