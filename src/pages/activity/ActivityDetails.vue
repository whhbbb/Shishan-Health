<template>
  <view class="container">
    <view class="detail">
      <view class="img-wrapper">
        <image class="img" :src="data0.lng" />
      </view>
      <view class="top">
        <view class="detail-title">
          {{ data0.userImg2 }}
        </view>
        <!-- <view class="detail-content">
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
      </view> -->
      </view>
      <view class="middle">
        <view class="sponsor">
          <image class="img" src="../../static/activity/loco.png" />
          {{ data0.hbKeyword }}
        </view>
        <view class="time">
          <image class="img" src="../../static/bottomBar/sign-in-black.png" />{{ data0.lat }}
        </view>
        <!-- <view class="address">
        <image class="img" src="../../static/activity/address.png" />{{ data0.address }}
      </view>
      <view class="address">
        <image class="img" src="../../static/activity/address.png" />线上地址：{{
          data0.cityname == '' ? '无' : data0.cityname
        }}
      </view> -->
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
    </view>
    <view class="footer">
      <view class="footer-inner">
        <view class="footer-info">
          <view>
            {{ data0.hbNum }}/{{ data0.hot }}
          </view>
          <view v-if="data0.isClose == 2">还有0天截止</view>
          <view v-else-if="data0.isClose == 1" class="start">
            <view>报名截止倒计时：</view>
            <view>{{ countDown }}</view>
          </view>
          <view v-else-if="data0.isClose == 0" class="start">
            <view>报名开始时间为：</view>
            <view>{{ data0.startTime }}</view>
          </view>
        </view>
        <view class="activity-btn">
          <button class="btn" v-if="data0.isClose === 0" type="default">报名未开始</button>
          <button type="default" v-else-if="data0.isApplication.length === 0 && data0.isClose === 1" class="btn"
            @click="applyon">
            报名
          </button>
          <button type="default" v-else-if="data0.isApplication.length > 0 && data0.isClose === 1" class="btn-active">
            已报名
          </button>
          <button type="default" v-else-if="data0.isClose == 2" class="btn">报名截止</button>
        </view>
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
  lng: string
}

const countDown = ref<string>()
const data0 = ref<DataProps>()
const props = defineProps<{
  id: number
}>()
let AId = props.id;
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

function parseDateForIOS(dateString) {
  // 将日期字符串中的连字符(-)替换为斜杠(/)
  dateString = dateString.replace(/-/g, '/');

  // 如果日期字符串包含时间部分，则将时间部分以空格分隔，并移除秒和时区信息
  if (dateString.includes(' ')) {
    const [datePart, timePart] = dateString.split(' ');
    dateString = `${datePart} ${timePart.split(':')[0]}:${timePart.split(':')[1]}`;
  }

  return new Date(dateString);
}

// 写一个实时倒计时
const countTime = () => {
  let now = new Date().getTime()
  let endTime = parseDateForIOS(data0.value.lat).getTime()-2*60*60*1000
  // endTime前两个小时
  let time = endTime - now
  let day = Math.floor(time / (24 * 3600 * 1000))
  let hour = Math.floor((time % (24 * 3600 * 1000)) / (3600 * 1000))
  let minute = Math.floor((time % (3600 * 1000)) / (60 * 1000))
  let second = Math.floor((time % (60 * 1000)) / 1000)
  return `${day}天${hour}时${minute}分${second}秒`
}

onLoad(async (options) => {
  let obj = wx.getLaunchOptionsSync()
  let query = null
  let url = `/system/activity/${props.id}`
  console.log(props.id + "11111")
  if (options.scene || obj.query.scene) {
    console.log('options.scene', options)
    console.log('obj.query.scene', obj.query)
    // 这里是用开发者工具模拟的时候要先用 encodeURIComponent 编译，模拟真实传递参数的效果，项目发布审核的时候这句话要注释掉
    // query = options ? encodeURIComponent(options.scene) : encodeURIComponent(obj.query.scene);
    query = options ? decodeURIComponent(options.scene) : decodeURIComponent(obj.query.scene)
    console.log(query)
    AId = query;
    url = `/system/activity/${query}`
  }
  await getDetails(url)
  countDown.value=countTime()
  setInterval(() => {
    countDown.value=countTime()
  }, 1000)
})
onHide(() => { })
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
.container {
  display: flex;
  flex-direction: column;
}

.detail {
  // overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 82%;
  margin: 0 auto;
  flex: 1;
  padding-bottom: 174rpx;
  overflow: hidden;

  .img-wrapper {
    margin-top: 20rpx;
    width: 100%;
    height: 70vh;
    background-color: #6b6a6a;
    border-radius: 15rpx;

    .img {
      width: 100%;
      height: 100%;
      border-radius: 15rpx;
    }
  }

  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 35rpx;
    margin-bottom: 15rpx;

    .detail-title {
      font-size: 38rpx;
      // font-weight: bold;
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
    height: 140rpx;
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

      .img {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }

    .time {
      font-size: 30rpx;
      color: #000000;
      flex: 1;
      display: flex;
      align-items: center;

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


}

.footer {
  height: 150rpx;
  color: #0077B6;
  font-size: 26rpx;
  padding: 30rpx 0 30rpx 0;
  justify-content: space-evenly;
  position: fixed;
  bottom: 0;
  box-shadow: 0px -0.5px 0.5rpx #E7E8E9;
  background-color: #F5F6F7;
  width: 100%;

  .footer-inner {
    margin: 0 auto;
    width: 82%;
    display: flex;
    justify-content: space-between;
    .footer-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 40%;
      .start{
        font-size: 20rpx;
      }
    }
    .activity-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 60%;

      .btn {
        width: 100%;
        height: 90rpx;
        color: #0077B6;
        border-radius: 40rpx;
        background-color: hsl(194, 84%, 51%, 15%);
        font-size: 35rpx;
        font-weight: bold;
      }
      .btn-active{
        width: 100%;
        height: 90rpx;
        color: #666666;
        border-radius: 40rpx;
        background-color: #d9d9d9;
        font-size: 35rpx;
        font-weight: bold;
      }
    }
  }
}

.code-view {
  margin: 20rpx auto;
  padding-bottom: 30rpx;
}
</style>
