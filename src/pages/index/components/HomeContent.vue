<template>
  <view class="main">
    <view class="tools">
      <navigator url="/pages/ranking/ranking" class="tools-item rank">
        <image src="../../../static/image/rank.png" mode="scaleToFill" />
        <view class="content">
          <view class="title">
            排行榜
          </view>
          <view class="intro">
            实时查看排名
          </view>
        </view>
      </navigator>
      <navigator url="/pages/clock-in/clockIn" class="tools-item check">
        <image src="../../../static/image/daka.png" mode="scaleToFill" />
        <view class="content">
          <view class="title">
            我要打卡
          </view>
          <view class="intro">
            记录每日生活
          </view>
        </view>
      </navigator>
    </view>
  </view>
  <view class="other">
  </view>
  <view class="other">

  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style lang="scss">
.main {
  width: 100%;
  height: 800rpx;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  .tools {
    height: 350rpx;
    // background-color: aqua;
    width: 90%;
    display: flex;
    justify-content: space-between;

    .tools-item {
      width: 45%;
      height: 100%;
      background-color: rgb(222, 232, 194);
      border-radius: 20rpx;
      box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      image {
        width: 40%;
        height: 40%;
        margin-bottom: 20rpx;
      }

      .content{
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          font-size: 35rpx;
          font-weight: bold;
          color: #333;
        }
        .intro{
          font-size: 25rpx;
          color: #9c9b9b;
        }
      }

      // &.rank{
      //   background-color: #f00;
      // }
      // &.check{
      //   background-color: #0f0;
      // }
    }
  }
}
.other{
    margin: 30rpx auto;
    height: 400rpx;
    width: 90%;
    background-color: rgb(222, 232, 194);
    border-radius: 20rpx;
    box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
  }
</style>