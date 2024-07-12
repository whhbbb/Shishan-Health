<script setup lang="ts">
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)
</script>

<template>
  <!-- 顶部占位 -->
  <view class="navbar-wrapper">
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top! + 8 + 'px' }">
      <!-- ...省略 -->
      <image
        class="check-icon"
        src="../../../static/image/check.png"
        mode="scaleToFill"
      />
      狮山健康
    </view>
    <view class="img">
      <image
        src="../../../static/image/tabbar.jpg"
        mode="widthFix"
      />
    </view>
  </view>
</template>

<style lang="scss">
.navbar-wrapper {
  position: relative;
  height: fit-content;
  .navbar {
    // padding-top: 47px;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 30rpx;
    color: #fff;
    background-color: transparent;
    font-size: 35rpx;
    text-align: center;
    .check-icon{
      width: 35rpx;
      height: 35rpx;
      margin-right: 10rpx;
    }
  }
  .img{
    position: absolute;
    width: 100%;
    top: 0;
    image{
      border-radius: 0 0 20rpx 20rpx;
    }
  }
}
</style>
