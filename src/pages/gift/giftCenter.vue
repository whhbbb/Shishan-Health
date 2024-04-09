<template>
  <view class="container">
    <!-- tab导航栏 -->
    <scroll-view
      scroll-x="true"
      class="nav"
      :scroll-left="navScrollLeft"
      scroll-with-animation="true"
    >
      <view
        v-for="(navItem, idx) in navData"
        :key="idx"
        class="nav-item"
        :class="{ active: currentTab === idx }"
        @tap="switchNav(idx)"
      >
        {{ navItem.text }}
      </view>
    </scroll-view>

    <swiper :current="currentTab" duration="300" @change="switchTab">
      <swiper-item v-for="(tabItem, idx) in tabData" :key="idx" class="tab-content">
        <view v-if="idx === 0">
          <!-- 第一个页面的内容 -->
          <view>
            <view class="content">
              <view class="left">
                <block v-for="(item, index) in list" :key="index">
                  <view @click="goToGoodsDetail(item.id)" class="item" v-if="index % 2 === 0">
                    <image class="item-img" :src="item.coverPicture" mode="widthFix"></image>
                    <view class="item-title-box">
                      <view class="item-title goodsname">{{ item.name }}</view>
                    </view>
                    <view class="item-title-box">
                      <view class="item-title">{{ item.introduce }}</view>
                    </view>
                    <view class="name">
                      <image class="item-ava" src="../../static/gifts/R-C.jpg"></image>
                      <text class="name-title">{{ item.price }}</text>
                      <view class="heart">
                        <text></text>
                      </view>
                    </view>
                  </view>
                </block>
              </view>
              <view class="right">
                <block v-for="(item, index) in list" :key="index">
                  <view @click="goToGoodsDetail(item.id)" class="item" v-if="index % 2 === 1">
                    <image class="item-img" :src="item.coverPicture" mode="widthFix"></image>
                    <view class="item-title-box">
                      <view class="item-title goodsname">{{ item.name }}</view>
                    </view>
                    <view class="item-title-box">
                      <view class="item-title">{{ item.introduce }}</view>
                    </view>
                    <view class="name">
                      <image class="item-ava" src="../../static/gifts/R-C.jpg"></image>
                      <text class="name-title">{{ item.price }}</text>
                      <view class="heart">
                        <text></text>
                      </view>
                    </view>
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>

        <view v-else-if="idx === 1">
          <!-- 第二个页面的内容 -->
          <view><order-list></order-list></view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
import orderList from './components/orderList.vue'

import { ref, reactive, computed } from 'vue'
import { getGiftList } from '@/services/gift'
import { onLoad, onShow } from '@dcloudio/uni-app'

//过审
// 获取当前时间点
// const currentTime = ref(new Date())

// 计算2023年11月17号的时间点
// const targetDate = new Date('2023-11-23')

// 判断当前时间是否已经过了2023年11月18号
// import { getAudit } from '@/services/Audit'
// const isPastTargetDate = ref<boolean>(true)
// const getA = async () => {
//   const res = await getAudit()
//   console.log(res)
//   isPastTargetDate.value = res.data
//   if (!isPastTargetDate.value) {
//     uni.showToast({
//       title: '推荐礼品功能尚未实现，敬请期待~',
//       icon: 'none',
//       duration: 2000,
//       complete: function () {
//         setTimeout(function () {
//           uni.switchTab({
//             url: '/pages/index/index',
//           })
//         }, 2000) // 在弹窗关闭后，延迟2秒执行页面跳转
//       },
//     })
//   } else {
//     getGiftLists()
//   }
// }
onLoad(() => {
  // getA()
  // 获取宽度
  getGiftLists()
  wx.getSystemInfo({
    success(res) {
      screenW.value = res.windowWidth
      console.log(res.windowWidth) // 屏幕宽度
      const singleNavWidth = res.windowWidth / 5
      navScrollLeft.value = (currentTab.value - 2) * singleNavWidth
    },
  })
})
onShow(() => {
  // getA()
  getGiftLists()
})
//页面滑动切换
const screenW = ref<number>()
const navScrollLeft = ref(0)
const currentTab = ref(0)
const navData = ref([{ text: '积分商城' }, { text: '兑换记录' }])
const tabData = ref([0, 1]) // 两个页面的索引

const switchNav = (idx: number) => {
  const singleNavWidth = screenW.value / 2
  navScrollLeft.value = (idx - 2) * singleNavWidth
  if (currentTab.value === idx) {
    return false
  } else {
    currentTab.value = idx
  }
  // getA()
  getGiftLists()
}
const switchTab = (e: any) => {
  const cur = e.detail.current
  const singleNavWidth = screenW.value / 2
  currentTab.value = cur
  navScrollLeft.value = (cur - 2) * singleNavWidth
  // getA()
  getGiftLists()
}

const getGiftLists = async () => {
  const res = await getGiftList()
  console.log(res.rows)
  list.value = res.rows
}

const list = ref([])
const goToGoodsDetail = (id) => {
  // if (uni.getStorageSync('token')) {
  //   console.log(id)
  //   console.log('去商品详情页')
  uni.navigateTo({
    url: '/pages/gift/gift?id=' + id,
  })
  // } else {
  //   uni.showToast({
  //     title: '您尚未登录，请先登录',
  //     icon: 'none',
  //     duration: 1000,
  //     complete: () => {
  //       setTimeout(() => {
  //         uni.navigateTo({
  //           url: '/pages/login/login',
  //         })
  //       }, 1000)
  //     },
  //   })
  // }
}
</script>

<style scoped>
/**index.wxss**/
page {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100vh;
  padding-top: 80rpx;
}

.nav {
  /* 设置tab-nav宽高度 */
  height: 80rpx;
  width: 100%;

  /* 假如您需要并排放置两个带边框的框，
  可通过将 box-sizing 设置为 "border-box"。 */
  box-sizing: border-box;

  overflow: hidden;

  /* 居中 */
  line-height: 80rpx;

  background: #f7f7f7;

  font-size: 16px;

  /* 规定段落中的文本不进行换行： */
  white-space: nowrap;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.nav-item {
  width: 50%;
  display: inline-block;
  text-align: center;
}

.nav-item.active {
  color: #428ffb;
}

.tab-box {
  background: rgb(31, 201, 96);
  /* 这里设置成nav的高度 */
  padding-top: 80rpx;
  height: 100%;
  box-sizing: border-box;
}

.tab-content {
  /* 裁剪 div 元素中内容的左/右边缘 - 如果溢出元素的内容区域的话： */
  overflow-y: scroll;
}

/*
.container {
  padding: 10rpx;
} */

.content {
  text-align: justify;
}

.item {
  background-color: #fff;
  margin: 10rpx 3%;
  margin-bottom: 20rpx;
  display: inline-block;
  width: 96%;
  border-radius: 20rpx;
  overflow: hidden;
}

.item-ava {
  width: 40rpx;
  height: 40rpx;
  border-radius: 20rpx;
}

.heart {
  width: 30rpx;
  height: 26rpx;
  margin-right: 8rpx;
}

.heart {
  display: flex;
  align-items: center;
}

.item-img {
  width: 100%;
}

.item-title {
  font-size: 24rpx;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-family: 'PingFang SC-Medium';
  color: #1e1e1e;
  margin: 15rpx;
  line-height: 27rpx;
}
.goodsname {
  font-size: 30rpx;
  line-height: 35rpx;
}
.item .name {
  display: flex;
  padding: 0 15rpx;
  margin-top: 20rpx;
  padding-bottom: 10rpx;
  align-items: center;
  font-size: 22rpx;
  color: #1e1e1e;
  font-family: 'PingFang SC-Medium';
}

.name image {
  flex: 0 0 auto;
}

.item-title-box {
  display: flex;
  position: relative;
}

.name-title {
  flex: 1;
  margin-left: 18rpx;
  margin-right: 20rpx;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.name text:last-child {
  color: #c4c4c4;
  text-decoration: underline;
  line-height: 10rpx;
}

.left,
.right {
  display: inline-block;
  vertical-align: top;
  width: 49%;
}
</style>
