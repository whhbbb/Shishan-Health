<template>
  <PageSkeleton v-if="showSkeleton" />
  <view v-else class="container">
    <!-- tab导航栏 -->
    <view class="nav">
      <navigator class="nav-item" url="/pages/gift/components/orderList" open-type="navigate" hover-class="none">
        <view class="change">
          兑换记录
        </view>
      </navigator>
      <navigator class="credit" :url="`/pages/my/components/history?creditNum=${credit}`">
        <image class="credit-img" src="../../static//gifts/blue-score.png" mode="scaleToFill" />
        <view class="credit-num">
          {{ credit }}
          <!-- 10000 -->
        </view>
        <view class="credit-right">
          <image class="credit-right-img" src="../../static/my/blue-arrow-right.png" mode="heightFix" />
        </view>
      </navigator>
    </view>
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
</template>

<script setup lang="ts">
import PageSkeleton from './PageSkeleton.vue'
import { ref, reactive, computed } from 'vue'
import { getGiftList } from '@/services/gift'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getPersonalInf } from '@/services/personalInf'

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
const credit = ref()
const list = ref([])
// 是否显示骨架屏
const showSkeleton = ref(true)

const getPersonal = async () => {
  const res = await getPersonalInf()
  console.log(res)
  credit.value = res.data.credit
}
onShow(() => {
  // getA()
  getGiftLists()
  getPersonal()
})

const getGiftLists = async () => {
  const res = await getGiftList()
  showSkeleton.value = false
  console.log(res.rows)
  list.value = res.rows
}
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

<style scoped lang="scss">
/**index.wxss**/
page {
  width: 100%;
  height: 100%;
}

.container {
  width: 90%;
  margin: 0 auto;
  height: 100vh;
  padding-top: 40rpx;
}

.nav {
  /* 设置tab-nav宽高度 */
  width: 100%;
  height: 105rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .nav-item {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    .change{
      text-align: center;
      width: 160rpx;
      padding: 16rpx;
      border-radius: 15rpx;
      background-color: rgb(214, 244, 251);
      font-size: 30rpx;
      color: #0077b6;
      box-shadow: 0 0 20px #e5e4e4;
    }
  }

  .credit {
    display: flex;
    justify-content: end;
    padding: 40rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(214, 244, 251);
    border-radius: 20rpx;
    box-shadow: 0 0 20px #e5e4e4;

    .credit-img {
      width: 30rpx;
      height: 30rpx;
      margin-right: 8rpx;
    }

    .credit-num {
      font-size: 35rpx;
      color: #0077b6;
    }

    .credit-right {
      display: flex;
      align-items: center;
      margin-left: 18rpx;

      .credit-right-img {
        height: 25rpx;
      }
    }
  }
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


.item {
  background-color: #fff;
  margin-bottom: 20rpx;
  display: inline-block;
  width: 96%;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 0 20px #e5e4e4;
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

.content {
  display: flex;
  justify-content: space-between;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }
}
</style>
