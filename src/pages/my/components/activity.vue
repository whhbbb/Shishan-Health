<template>
  <view v-if="isLogin" class="my-activity">
    <navigator
      class="activity-details-item"
      v-for="item in activities"
      :key="item.id"
      :url="`/pages/activity/ActivityDetails?id=${item.id}`"
    >
      <view class="activity-details-item-title">
        <view class="title">{{ item.title }}</view>
      </view>
      <view class="activity-details-item-contents">
        <view class="activity-details-item-content">
          <view class="sponsor"> 发起学院：{{ item.sponsorCollege }} </view>
          <view class="activity-details-item-content-time">
            <image class="img" src="../../../static/activity/clock.png" />{{ item.time }}
          </view>
          <view class="activity-details-item-content-address">
            <image class="img" src="../../../static/activity/address.png" />{{ item.address }}
          </view>
        </view>
        <view class="activity-details-item-status">
          <view class="population">
            <image class="img" src="../../../static/activity/User.png"></image>
            {{ item.population }} / {{ item.limitPopulation }}
          </view>
          <view class="status">
            {{ item.status }}
          </view>
        </view>
      </view>
    </navigator>
  </view>

  <view class="noLogin" v-else>
    <uni-icons type="person" size="90"></uni-icons>
    <view @click="goLogin">尚未登陆 , 点击登录</view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getMyActivityAPI } from '@/services/my'
type Activity = {
  id: number
  title: string
  status: string
  time: string
  address: string
  img?: string
  // 报名人数和限制人数
  population?: number
  limitPopulation?: number
  // 发起学院
  sponsorCollege: string
}
const activities = ref<Activity[]>([])

const getMyActivity = async () => {
  uni.showLoading({
    title: '加载中',
  })
  const res = await getMyActivityAPI()
  uni.hideLoading()
  console.log(res)
  if (res.data.length > 0) {
    res.data.forEach((item: any) => {
      activities.value.push({
        id: item.activityId,
        title: item.userImg2,
        status: item.status == 1 ? '进行中' : '已结束',
        time: item.lat,
        address: item.address,
        sponsorCollege: item.hbKeyword,
        population: item.hbNum,
        limitPopulation: item.hot,
      })
    })
  } else {
    uni.showToast({
      title: '暂无活动',
      icon: 'none',
    })
  }
}
const isLogin = ref<boolean>(true)
onLoad(() => {
  if (uni.getStorageSync('token')) {
    getMyActivity()
  } else {
    isLogin.value = false
  }
})
const goLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login',
  })
}
</script>
<style lang="scss">
.my-activity {
  width: 90%;
  margin: 0 auto;

  .activity-details-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 260rpx;
    border-bottom: 1px solid #d6d6d6;

    .activity-details-item-title {
      font-size: 30rpx;
      font-weight: bolder;
      color: #333;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      margin-bottom: 20rpx;
    }

    .activity-details-item-contents {
      display: flex;
      justify-content: space-between;
      width: 100%;

      .activity-details-item-content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex: 1;

        .sponsor {
          margin-bottom: 10rpx;
          font-size: 30rpx;
          color: black;
          margin-bottom: 20rpx;
        }

        .activity-details-item-content-time {
          margin-bottom: 10rpx;
          font-size: 26rpx;
          color: #767575;

          .img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }

        .activity-details-item-content-address {
          font-size: 26rpx;
          color: #767575;

          .img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }
      }

      .activity-details-item-status {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-around;
        width: 200rpx;

        .population {
          margin-bottom: 10rpx;
          font-size: 26rpx;
          color: #666;

          .img {
            width: 32rpx;
            height: 32rpx;
            margin-right: 10rpx;
            // color: black;
          }
        }

        .status {
          font-size: 26rpx;
          color: #666;
        }
      }
    }
  }
}
.noLogin {
  padding: 40px;
  text-align: center;
}
</style>
