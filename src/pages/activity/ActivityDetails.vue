<template>
  <view class="detail">
    <view class="top">
      <view class="detail-title">
        {{ data0.userImg2 }}
      </view>
      <view class="detail-content">
        <view class="status">
          {{ data0.isEnd }}
        </view>
        <view class="population">
          <image class="img" src="../../static/activity/User.png" />{{ data0.hbNum }}/{{
            data0.hot
          }}
        </view>
        <view class="detail-class">
          <uni-tag v-if="data0.sort == 1" type="primary" text="学术晚茶" />
          <uni-tag v-else type="success" text="学术社区" />
        </view>
      </view>
    </view>
    <view class="middle">
      <view class="sponsor"> 发起学院：{{ data0.hbKeyword }} </view>
      <view class="time">
        <image class="img" src="../../static/activity/clock.png" />{{ data0.lat }}
      </view>
      <view class="address">
        <image class="img" src="../../static/activity/address.png" />{{ data0.address }}
      </view>
      <view class="address">
        <image class="img" src="../../static/activity/address.png" />线上地址：{{
          data0.cityname == '' ? '无' : data0.cityname
        }}
      </view>
    </view>
    <view class="bottom">
      <view class="sponsor-intro">
        <view class="title"> 主讲人简介： </view>
        <view class="intro">
          {{ data0.img }}
        </view>
      </view>
      <view class="activity-intro">
        <view class="title"> 活动简介： </view>
        <view class="intro">
          {{ data0.details }}
        </view>
      </view>
    </view>
    <view class="footer">
      <view class="activity-btn">
        <div class="btn hhh" v-if="data0.isClose === 0">
          <button type="default" class="hhh-btn">报名未开始</button>
          <span class="span">报名开始时间为：{{ data0.startTime }}</span>
        </div>
        <button
          type="primary"
          v-else-if="data0.isApplication.length === 0 && data0.isClose === 1"
          class="btn"
          @click="applyon"
        >
          报名
        </button>
        <button
          type="default"
          v-else-if="data0.isApplication.length > 0 && data0.isClose === 1"
          class="btn"
        >
          已报名
        </button>
        <button type="default" v-else class="btn">报名截止</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { http } from '../../utils/http'
import { ref, reactive } from 'vue'
import { onHide, onLoad } from '@dcloudio/uni-app'
type DataProps = {
  id: number
  userImg2: string
  isEnd: string
  isClose: number
  hbNum: number
  hot: number
  hbKeyword: string
  lat: string
  address: string
  img: string
  details: string
  isApplication: Array<any>
  is_close: number
  startTime: string
  sort: number
  cityname: string
}

const data0 = ref<DataProps>()
const props = defineProps<{
  id: number
}>()
let AId=props.id;
const getDetailsAPI = (data: any) => {
  return http<any>({
    url: data,
    method: 'GET',
  })
}
const applyAPI = (data: any) => {
  return http<any>({
    method: 'POST',
    url: '/system/useractivity',
    data,
  })
}
const getDetails = async (url: string) => {
  uni.showLoading({
    title: '加载中',
  })
  const res = await getDetailsAPI(url)
  uni.hideLoading()
  console.log(res)
  data0.value = res.data
  data0.value.isEnd = res.data.isEnd == 1 ? '进行中' : '已结束'
  data0.value.isApplication = res.data.isApplication === null ? [] : res.data.isApplication
}
const apply = async (data: any) => {
  const res = await applyAPI(data)
  if (res.code === 200) {
    wx.showToast({
      title: res.msg,
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index',
          })
        }, 2000)
      },
    })
    data0.value.is_close = 1
  } else {
    wx.showToast({
      title: res.msg,
      icon: 'none',
      duration: 2000,
    })
  }
}

onLoad(async (options) => {
  let obj = wx.getLaunchOptionsSync()
  let query = null
  let url = `/system/activity/${props.id}`
  console.log(props.id+"11111")
  if (options.scene || obj.query.scene) {
    console.log('options.scene', options)
    console.log('obj.query.scene', obj.query)
    // 这里是用开发者工具模拟的时候要先用 encodeURIComponent 编译，模拟真实传递参数的效果，项目发布审核的时候这句话要注释掉
    // query = options ? encodeURIComponent(options.scene) : encodeURIComponent(obj.query.scene);
    query = options ? decodeURIComponent(options.scene) : decodeURIComponent(obj.query.scene)
    console.log(query)
    AId=query;
    url = `/system/activity/${query}`
  }
  getDetails(url)
})
onHide(() => {})
//报名函数
const applyon = () => {
  if (uni.getStorageSync('token')) {
    wx.showModal({
      title: '确认报名',
      content: '确定要报名吗？',
      success(res) {
        if (res.confirm) {
          //用户点击了确认按钮
          apply({
            activityId: AId,
          })
          const url = `/system/activity/${AId}`
          getDetails(url)
        } else if (res.cancel) {
          // 用户点击了取消按钮
          console.log('用户取消了报名')
        }
      },
    })
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
}
</script>

<style lang="scss">
.detail {
  // overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .detail-title {
      font-size: 44rpx;
      // font-weight: bold;
      margin: 10rpx 0 0 10rpx;
      margin-bottom: 15rpx;
    }

    .detail-content {
      display: flex;
      justify-content: space-between;
      margin: 0 10rpx 10rpx 10rpx;

      .status {
        font-size: 30rpx;
        color: #ff0000;

        .img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }

      .population {
        font-size: 30rpx;
        color: #000000;

        .img {
          width: 30rpx;
          height: 30rpx;
          margin-right: 10rpx;
        }
      }
    }
  }

  .middle {
    height: 500rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-bottom: 60rpx;

    .sponsor {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 30rpx;
      color: #000000;
      border-bottom: 1px solid #d6d6d6;
    }

    .time {
      font-size: 30rpx;
      color: #000000;
      flex: 1;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d6d6d6;

      .img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }

    .address {
      font-size: 30rpx;
      color: #000000;
      flex: 1;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #d6d6d6;

      .img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }
  }

  .bottom {
    flex: 1;

    .sponsor-intro {
      margin-bottom: 80rpx;

      .title {
        font-size: 30rpx;
        color: grey;
        margin-bottom: 10rpx;
      }

      .intro {
        font-size: 30rpx;
        color: #000000;
      }
    }

    .activity-intro {
      .title {
        font-size: 30rpx;
        color: grey;
        margin-bottom: 10rpx;
      }

      .intro {
        font-size: 30rpx;
        color: #000000;
      }
    }
  }

  .footer {
    .activity-btn {
      margin-bottom: 45rpx;
      display: flex;
      justify-content: center;

      .btn {
        width: 40%;
        margin-top: 50rpx;
        font-size: 38rpx;
      }
      .hhh {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        .hhh-btn {
          width: 40%;
          margin-bottom: 10rpx;
        }
        .span {
          text-align: center;
          color: #6b6a6a;
          font-size: 15px;
          // margin-bottom: 10rpx;
        }
      }
    }
  }
}

.code-view {
  margin: 20rpx auto;
  padding-bottom: 30rpx;
}
</style>
