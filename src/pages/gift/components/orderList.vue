<template>
  <view v-if="isLogin" class="order-list">
    <view v-if="orders.length !== 0" v-for="order in orders" :key="order.id" class="order-item">
      <view class="inner-top">
        <image :src="order.coverPicture" class="order-image" />
        <view class="order-content1">
          <text class="order-name">{{ order.name }}</text>
          <text class="order-time">{{ order.createTime }}</text>
        </view>
        <view class="order-content2">
          <view class="order-amount">
            <image
              class="order-content-image"
              src="../../../static/gifts/score.png"
              mode="scaleToFill"
            />
            <text>{{ order.total }}</text>
          </view>
          <text class="order-time">x{{ order.nums }}</text>
        </view>
      </view>
      <view class="inner-bottom">
        <view v-if="order.state == 1" class="order-status">
          <image
            class="status-img"
            src="../../../static/gifts/not-get.png"
            mode="scaleToFill"
          />
          未领取</view>
        <view v-else class="order-status">
          <image
            class="status-img"
            src="../../../static/gifts/get.png"
            mode="scaleToFill"
          />
          已领取</view>
      </view>
    </view>
    <view class="noLogin" v-else>
      <uni-icons type="wallet" size="90"></uni-icons>
      <view>兑换记录为空</view>
    </view>
  </view>
  <view class="noLogin" v-else>
    <uni-icons type="person" size="90"></uni-icons>
    <view @click="goLogin">尚未登陆 , 点击登录</view>
  </view>
</template>

<script setup lang="ts">
import { getGiftHistory } from '@/services/gift'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'
onLoad(() => {
  console.log('onload??')
  if (uni.getStorageSync('token')) {
    getHistory()
  } else {
    isLogin.value = false
  }
})
onShow(() => {
  if (uni.getStorageSync('token')) {
    getHistory()
  }
})
const isLogin = ref<boolean>(true)
const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
const getHistory = async () => {
  const res = await getGiftHistory()
  console.log(res)
  orders.value = res.rows
}
const orders = ref([])
</script>

<style lang="scss">
.order-list {
  width: 100%;
  margin: 0 auto;
  padding: 50rpx;

  .order-item {
    display: flex;
    flex-direction: column;
    padding: 15rpx;
    padding-bottom: 30rpx;
    margin-bottom: 2vh;
    border-bottom: 1px solid #f0f0f0;

    .inner-top {
      display: flex;

      .order-image {
        width: 100rpx;
        height: 100rpx;
        margin-right: 15rpx;
        border-radius: 15rpx;
      }

      .order-content1 {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .order-name{
          font-size: 32rpx;
          font-weight: bold;
          color: #333;
        }
        .order-time{
          font-size: 24rpx;
          color: #666;
        }
      }
      .order-content2{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-items: flex-end;
        .order-amount{
          display: flex;
          align-items: center;
          font-size: 35rpx;
          font-weight: bold;
          .order-content-image{
            width: 35rpx;
            height: 35rpx;
            margin-right: 10rpx;
          }
        }
        .order-time{
          font-size: 24rpx;
          color: #666;
        }
      }

    }
    .inner-bottom{
      margin-top: 15rpx;
      padding: 10rpx;
      background-color: rgb(243, 245, 246);
      border-radius: 8rpx;
      font-size: 26rpx;
      .order-status{
        display: flex;
        align-items: center;
        .status-img{
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
}
</style>
