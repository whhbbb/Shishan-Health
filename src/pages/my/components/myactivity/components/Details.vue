<template>
  <view v-if="isLogin && hasActivity" class="my-activity">
    <navigator class="activity-details-item" v-for="item in activities" :key="item.id" :url="item.url">
      <view class="img-view">
        <image :src="item.img" mode="scaleToFill" />
      </view>

      <view class="info-view">

        <view class="title">
          <span class="title-content">
            {{ item.title }}
          </span>
        </view>

        <view class="detail-info">

          <!-- <view class="sponsor"> 发起学院：{{ item.sponsorCollege }} </view> -->

          <view class="activity-details-item-content-time">
            <view>
              <image class="img" src="../../../static/bottomBar/sign-in-black.png" />
            </view>
            <view>{{ item.time }}</view>
          </view>

          <view class="activity-details-item-content-address">
            <image class="img" src="../../../static/activity/loco.png" />{{ item.address }}
          </view>
          <view v-if="item.status=='审核中'||item.status=='待修改'" class="status warn">
            {{ item.status }}
          </view>
          <view v-else-if="item.status=='审核通过'" class="status success">
            {{ item.status }}
          </view>
          <view v-else-if="item.status=='进行中'" class="status success">
            {{ item.status }}
          </view>
          <view v-else class="status warn">
            {{ item.status }}
          </view>

          <!-- <view class="population">
                <image class="img" src="../../../static/activity/User.png"></image
                >{{ item.population }} / {{ item.limitPopulation }}
              </view>

              <view class="activity-class">
                <uni-tag v-if="item.sort == 1" type="primary" text="学术晚茶" />
                <uni-tag v-else type="success" text="学术社区" />
              </view> -->
        </view>
      </view>

    </navigator>
  </view>

  <view class="no-activity" v-else-if="isLogin && !hasActivity">
    <view>暂无活动</view>
  </view>

  <view class="noLogin" @click="goLogin" v-else>
    <uni-icons type="person" size="90"></uni-icons>
    <view>尚未登陆 , 点击登录</view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { onMounted } from 'vue'
import { getMyActivityAPI, getMyAddActivityAPI } from '@/services/my'
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
  url: string
  sort: number
}
const props = defineProps({
  state: {
    type: Number,
    default: 0
  },
  refresh: {
    type: Boolean,
    default: false
  }
})
const activities = ref<Activity[]>([])

const getMyActivity = async () => {
  uni.showLoading({
    title: '加载中',
  })
  let res;
  if (props.state == 0) {
    res = await getMyActivityAPI()
  } else {
    res = await getMyAddActivityAPI()
  }
  uni.hideLoading()
  activities.value = []
  if (res.data.length > 0) {
    res.data.forEach((item: any) => {
      activities.value.push({
        id: item.id,
        title: item.userImg2,
        status: props.state == 0 ? (item.status == 1 ? '进行中' : '已结束') : (item.state == 1 ? '审核中' : item.state == 2 ? '审核通过' : '待修改'),
        time: item.lat,
        address: item.address,
        sponsorCollege: item.hbKeyword,
        population: item.hbNum,
        limitPopulation: item.hot,
        url: props.state == 0 ? (`/pages/activity/ActivityDetails?id=${item.activityId}`) : (item.state == 2 ? `/pages/activity/ActivityDetails?id=${item.id}` : `/pages/activity/ActivityEdit?id=${item.id}`),
        sort: item.sort,
        img: item.lng
      })
    })
  } else {
    // uni.showToast({
    //   title: '暂无活动',
    //   icon: 'none',
    // })
    hasActivity.value = false
  }
}
// 是否登录
const isLogin = ref<boolean>(true)
// 有无活动
const hasActivity = ref<boolean>(true)
onMounted(() => {
  if (uni.getStorageSync('token')) {
    getMyActivity()
  } else {
    isLogin.value = false
  }
})
onShow(() => {
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
  width: 82%;
  margin: 20rpx auto;

  .activity-details-item {
    background-color: #fff;
    box-shadow: 0 0 20px #e5e4e4;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    padding: 30rpx;
    border-radius: 20rpx;
    margin-bottom: 30rpx;

    .img-view {
      margin: auto 0;
      width: 40%;
      height: 320rpx;
      margin-right: 32rpx;

      image {
        border-radius: 8rpx;
      }
    }

    .info-view {

      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;

      .title {
        font-size: 30rpx;
        color: #000000;
        margin-bottom: 30rpx;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      .detail-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;

        .sponsor {
          margin-bottom: 10rpx;
          font-size: 30rpx;
          margin-bottom: 20rpx;
        }

        .activity-details-item-content-time {
          position: relative;
          font-size: 25rpx;
          width: 200rpx;
          color: #666666;
          overflow: hidden;
          margin-bottom: 20rpx;
          display: flex;
          flex-direction: row;

          .img {
            position: relative;
            top: 0;
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }

        .activity-details-item-content-address {
          font-size: 25rpx;
          color: #666666;

          .img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }

        .status{
          margin-top: 10rpx;
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          color: #666666;
          font-size: 28rpx;
          font-weight: bold;
        }
        .warn{
          color: #f4cb34;
        }
        .success{
          color: #0077b6;
        }
      }

    }
  }
}

.no-activity {
  padding: 40px;
  text-align: center;
}

.noLogin {
  padding: 40px;
  text-align: center;
}
</style>