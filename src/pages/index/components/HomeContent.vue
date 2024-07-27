<template>
  <view class="main">
    <view class="sport-content">
      <view class="step-num">

      </view>
      <view class="main-content">
        <view class="other-content">
          <view class="item">

          </view>
          <view class="item"></view>
        </view>
        <view class="exercise-prescription">

        </view>
      </view>
    </view>
    <view class="search">

    </view>
    <view class="recommend">

    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style lang="scss">
.main{
  margin-top: 70rpx;
  display: flex;
  flex-direction: column;
  padding: 0 30rpx;
  .sport-content{
    display: flex;
    justify-content: space-between;
    .step-num{
      width: 300rpx;
      height: 300rpx;
      background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
      border-radius: 20rpx;
      border: 1px solid #fff;
      margin-right: 30rpx;
    }
    .main-content{
      flex: 1;
      height: 300rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .other-content{
        display: flex;
        justify-content: space-between;
        .item{
          width: 170rpx;
          height: 140rpx;
          background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
          border-radius: 20rpx;
        }
      }
      .exercise-prescription{
        height: 140rpx;
        background-image: linear-gradient(to right, #e5f9f2, #f7faf9);
        border-radius: 20rpx;
      }
    }
  }
  .search{
    height: 100rpx;
    background-color: rgb(190, 188, 188);
    border-radius: 20rpx;
    margin-top: 30rpx;
  }
  .recommend{
    height: 45vh;
    background-color: rgb(190, 188, 188);
    border-radius: 20rpx;
    margin-top: 30rpx;
  }
}
</style>