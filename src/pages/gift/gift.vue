<template>
  <div class="main" :style="{ paddingBottom: safeAreaInsets?.bottom!+ 0 + 'px' }">
    <view class="swiper-wrapper">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item v-for="(url, index) in goodsdata.imgs" :key="index" @click="previewImage">
          <image :src="url" mode="aspectFill" class="image_detail" />
        </swiper-item>
      </swiper>
    </view>

    <scroll-view class="scroll-view" :scroll-y="true">
      <view class="detail">
        <!-- <text class="price">{{ goodsdata.price }}积分</text> -->
        <view class="title-view">
          <view class="title">{{ goodsdata.name }}</view>
          <view class="right-part">
            <view class="need-score">
              <image
                class="score-img"
                src="../../static/gifts/score.png"
                mode="scaleToFill"
              />
              <text>{{ goodsdata.price }}积分</text>
            </view>
          </view>
        </view>
        <uni-tag
          class="tag"
          :text="`总库存：${goodsdata.allnums}`"
          size="mini"
          :inverted="true"
          type="success"
        />
        <text class="text-remark">{{ goodsdata.introduce }}</text>
      </view>
      <view class="temp"></view>
    </scroll-view>

    <view class="detail-nav" :style="{ bottom: safeAreaInsets?.bottom!+ 0 + 'px' }">
      <view class="num-box">
        <uni-number-box
          class="numchooseBox"
          @blur="blur"
          :max="maxNum"
          v-model="goodsnum"
        ></uni-number-box>
      </view>
      <view class="score-box">
        <image
          class="score-img"
          src="../../static/gifts/blue-score.png"
        />
        <view class="scorenum">{{ scoreres }}</view>
        <view class="text">立即兑换</view>
      </view>
      <!-- <button :disabled="goodsnum == 0" class="button-red" @click="immeBuy" formType="submit">
        立即兑换
      </button> -->
    </view>
  </div>
</template>

<script setup lang="ts">
// import { ref, reactive } from 'vue'
// import { onLoad } from '@dcloudio/uni-app';

// onLoad(() => {
//   uni.showToast({
//     title: '礼品中心部分功能尚未实现，敬请期待~',
//     icon: 'none',
//     duration: 2000,
//     complete: function () {
//       setTimeout(function () {
//         uni.switchTab({
//           url: '/pages/index/index'
//         });
//       }, 2000); // 在弹窗关闭后，延迟2秒执行页面跳转
//     }
//   })
// })

import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref, computed, watch } from 'vue'
import { getGiftDetail, exchangeGift } from '@/services/gift'
import { getPersonalInf } from '@/services/personalInf'
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const props = defineProps<{
  id: number
}>()

const goodsnum = ref<number>(0)
const goodsdata = ref<any>({})

const getGiftDetails = async (id) => {
  const res = await getGiftDetail(id)
  console.log(res.data)
  goodsdata.value = res.data
}
const getMyCredit = async () => {
  const res = await getPersonalInf()
  console.log(res.data.credit)
  mycredit.value = res.data.credit
}
const mycredit = ref<number>(1)
const blur = (e) => {
  console.log(e)
  if (e.detail.value > goodsdata.value.allnums) {
    uni.showToast({
      title: '兑换数量超出库存',
      icon: 'none',
      duration: 1000,
    })
  }
}
const maxNum = computed(() => {
  if (mycredit.value == 0) {
    return 0
  }
  return goodsdata.value.allnums
})
const scoreres = computed(() => {
  return (goodsnum.value * goodsdata.value.price).toFixed(2)
})
// watch([goodsnum.value, () => goodsdata.value.price], ([newgoodsnum]) => {
//   scoreres.value = newgoodsnum * goodsdata.value.price;
// });
onShow(() => {
  if (uni.getStorageSync('token')) {
    getMyCredit()
  }
})
onLoad(() => {
  if (uni.getStorageSync('token')) {
    console.log(props.id)
    getGiftDetails(props.id)
    getMyCredit()
  } else {
    wx.showToast({
      title: '您尚未登录，请先登录',
      icon: 'none',
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }, 1000)
      },
    })
  }
})

const indicatorDots = true
const autoplay = true
const interval = 3000
const duration = 1000

const previewImage = (e) => {
  var current = e.target.dataset.src
  console.log(current)
  wx.previewImage({
    current: current,
    urls: goodsdata.value.imgs,
  })
}

const applyExchange = async (data) => {
  const res = await exchangeGift(data)
  console.log(res)
  if (res.code == 200) {
    if (res.data == 3) {
      uni.showToast({
        title: '兑换成功！',
        icon: 'success',
        duration: 2000,
        complete: function () {
          setTimeout(function () {
            getGiftDetails(props.id)
            getMyCredit()
            goodsnum.value = 0
            // uni.navigateTo({
            //   url: '/pages/gift/giftCenter',
            // })
          }, 2000) // 在弹窗关闭后，延迟2秒执行页面跳转
        },
      })
    }
    if (res.data == 2) {
      uni.showToast({
        title: '余额不足！',
        icon: 'error',
        duration: 2000,
      })
    }
    if (res.data == 1) {
      uni.showToast({
        title: '库存不足！',
        icon: 'error',
        duration: 2000,
      })
    }
  }
}
const immeBuy = () => {
  console.log('购买')
  if (mycredit.value < goodsnum.value * goodsdata.value.price) {
    uni.showToast({
      title: '剩余积分不足',
      icon: 'error',
      duration: 1000,
    })
    return
  }
  wx.showModal({
    title: '确认兑换',
    content: '确定要兑换吗？',
    success(res) {
      if (res.confirm) {
        //用户点击了确认按钮
        applyExchange({
          id: null,
          goodsId: goodsdata.value.id,
          nums: goodsnum.value,
        })
      } else if (res.cancel) {
        // 用户点击了取消按钮
        console.log('用户取消了兑换')
      }
    },
  })
}
</script>
<style scoped lang="scss">
page {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main{
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
}
/* 直接设置swiper属性 */
.swiper-wrapper{
  margin-top: 20rpx;
  height: 800rpx;
  width: 100%;
  .swiper{
    width: 82%;
    height: 100%;
    margin: 0 auto;
    border-radius: 20rpx;
  }
}
swiper-item image {
  width: 100%;
  height: 100%;
}
.separate {
  height: 20rpx;
  background-color: whitesmoke;
  margin-top: 10rpx;
  width: 100%;
}
.scroll-view {
  height: 100%;
  width: 82%;
  margin: 0 auto;
  background-color: #fff;
}
.goodsimg {
  height: 600rpx;
  width: 100%;
  display: flex;
  justify-content: space-around;
}
.detail {
  display: flex;
  flex-direction: column;
  margin: 15rpx 10rpx 0;
}
.detail .title {
  font-size: 40rpx;
  color: black;
  text-align: justify;
}
.detail .price {
  color: red;
  font-size: 40rpx;
  margin: 10rpx;
  margin-top: 30rpx;
}
.title-view {
  margin: 10rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .right-part {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .need-score {
      display: flex;
      align-items: center;
      font-size: 25rpx;
      .score-img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 5rpx;
      }
    }
  }
}
.tag {
  margin-bottom: 10rpx;
}
.line_flag {
  width: 80rpx;
  height: 1rpx;
  display: inline-block;
  margin: 20rpx auto;
  background-color: gainsboro;
  text-align: center;
}
.line {
  width: 100%;
  height: 2rpx;
  display: inline-block;
  margin: 20rpx 0rpx;
  background-color: gainsboro;
  text-align: center;
}
.detail-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 100;
  width: 82%;
  margin: 0 auto;
  height: 100rpx;
  border-top: 1rpx solid #f0f0f0;
  .num-box{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
  }
  .score-box{
    background-color: #D4EDF5;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rpx;
    margin-left: 20rpx;
    .score-img{
      width: 30rpx;
      height: 30rpx;
    }
    .scorenum{
      color: #0077B6;
      font-size: 30rpx;
      font-weight: bold;
      margin-left: -20rpx;
    }
    .text{
      font-size: 30rpx;
      font-weight: bold;
      margin: 10rpx;
      color: #0077B6;
    }
  }
}
.goodsdimg {
  margin-bottom: 7px;
}
.image_detail {
  width: 100%;
}
.detail-nav image {
  width: 70rpx;
  height: 50rpx;
  margin: 20rpx 40rpx;
}
.line_nav {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
}
/* 占位 */
.temp {
  height: 100rpx;
}
text {
  display: block;
  /* height: 50rpx; */
  line-height: 50rpx;
  /* font-size: 30rpx; */
  margin: 10rpx;
}
.text-remark {
  display: block;
  font-size: 27rpx;
}
.num-box {
  font-size: 27rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.score-box {
  width: 82%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.scorenum {
  color: #f44336;
  display: block;
  font-size: 30rpx;
  margin: 10rpx;
}
.numchooseBox {
  margin: auto 0;
}
</style>
