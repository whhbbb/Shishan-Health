<template>
  <view class="aboutUs">
    <view class="img">
      <image src="../../../static/log.png"></image>
    </view>
    <view class="content">
      学术晚茶，打造身边的学术交流平台。学术晚茶是提供学术攻略的平台，分享高质量的学术活动信息，还提供丰富有趣的学术活动报道和科普文章供用户阅读。</view
    >
  </view>
</template>
huodong
<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style lang="scss">
.aboutUs {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .img {
    width: 100%;
    text-align: center;
    margin-top: 60rpx;

    image {
      width: 200rpx;
      height: 200rpx;
      // background: rgb(25, 178, 243);
      opacity: 1;
      border-radius: 16px;
    }
  }

  .content {
    margin: 40rpx;
    line-height: 1.5;
    color: rgb(74, 73, 73);
  }
}
</style>
