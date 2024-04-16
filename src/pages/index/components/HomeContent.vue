<template>
  <view class="category">
    <view class="join">
      <view class="sub-title" @click="tapJoin">
        已预约
        <image
          class="sub-title-img"
          src="../../../static/bottomBar/Vector.png"
        />
      </view>
      <view class="sign-in" @click="tapSignIn">
        <image
        class="sign-in-img"
          src="../../../static/bottomBar/sign-in.png"
        />
        签到
      </view>
    </view>
    <view class="example">
      <view class="title"></view>
      <view class="time"></view>
      <view class="college"></view>
    </view>
  </view>
  <view class="activity">
    <view class="activity-box">
      <view class="activity-box-content">活动一览</view>
      <view class="activity-box-select">
        <uni-data-select
          v-model="status"
          :localdata="(statusList as any)"
          @change="change"
          placeholder="全部"
          :clear="false"
        >
        </uni-data-select>
      </view>
    </view>
      <view class="activity-details">
        <navigator
          class="activity-details-item"
          v-for="item in activities"
          :key="item.id"
          :url="`/pages/activity/ActivityDetails?id=${item.id}`"
        >
        <view class="img-view">
          <image
            :src="item.img"
            mode="scaleToFill"
          />
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
                <view><image class="img" src="../../../static/bottomBar/sign-in.png" /></view>
                <view>{{ item.time }}</view>
              </view>

              <view class="activity-details-item-content-address">
                <image class="img" src="../../../static/activity/loco.png" />{{ item.address }}
              </view>


              <!-- <view class="population">
                <image class="img" src="../../../static/activity/User.png"></image
                >{{ item.population }} / {{ item.limitPopulation }}
              </view>

              <view class="status">
                {{ item.status }}
              </view>

              <view class="activity-class">
                <uni-tag v-if="item.sort == 1" type="primary" text="学术晚茶" />
                <uni-tag v-else type="success" text="学术社区" />
              </view> -->
            </view>
          </view>

        </navigator>
      </view>
      <view class="loading-text">
        <uni-load-more :status="finish"></uni-load-more>
      </view>
  </view>
</template>

<script setup lang="ts">
import { getHomeContentAPI, giftIsShow } from '@/services/HomeContent'
import { onLoad, onShow, onHide } from '@dcloudio/uni-app'
import { ref, reactive } from 'vue'
const status = ref<string>('全部')
const statusN = ref<Number>(0)
// 当前所有的页数
const pageNum = ref<number>(1)
const pageSize= 10
const totalNum=ref<number>(0)
const finish=ref<string>('more')
// 表示当前所在的类别
const nowList=ref<number>(0)
// const query = uni.createSelectorQuery().in(this)
// query.select('.scroll-view').boundingClientRect((data)=>{
//   this.height=`height:${data.height}px;`;
// }).exec()
const statusList = ref([
  { value: 0, text: '全部' },
  { value: 1, text: '进行中' },
  { value: 2, text: '已结束' },
  { value: 3, text: '精选' },
])
const change = (e: any,tag=1) => {
  if(tag===1){
    finish.value='more'
    activities.value = []
    pageNum.value=1
  }
  console.log(e)
  nowList.value=e;
  if (e === 0) {
    statusN.value = 0
    getHomeContent(0, 0, 0,pageNum.value)
  } else if (e === 1) {
    statusN.value = 1
    getHomeContent(1, 2, 1,pageNum.value)
  } else if (e === 2) {
    statusN.value = 2
    getHomeContent(1, 2, 2,pageNum.value)
  } else {
    statusN.value = 3
    getHomeContent(2, 2, 1,pageNum.value)
  }
}
type Category = {
  id: number
  text: string
  icon: string
  url: any
}
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
  // 活动种类
  sort: number
}
const activities = ref<Activity[]>([])

// 点击已预约
const tapJoin = () => {
  uni.navigateTo({
    url: '/pages/my/components/myactivity/activity',
  })
}

// 点击签到
const tapSignIn = () => {
  uni.navigateTo({
    url: '/pages/activity/ActivitySignIn',
  })
}

const getHomeContent = async (type: number, state: number, isEnd: number,pageNum=1,pageSize=10) => {
  // 获取首页内容
  let res
  uni.showLoading({
    title: '加载中',
  })
  finish.value='loading'
  if (type === 0) {
    res = await getHomeContentAPI({state:2,pageNum:pageNum,pageSize:pageSize})
  } else if (type == 1) {
    res = await getHomeContentAPI({ state: state, isEnd: isEnd,pageNum:pageNum,pageSize:pageSize })
  } else {
    res = await getHomeContentAPI({ type: type, state: state,pageNum:pageNum,pageSize:pageSize })
  }
  uni.hideLoading()
  finish.value='more'
  if (res.code === 200) {
    totalNum.value=res.total
    let innerActivities = res.rows.map((item: any) => ({
      id: item.id,
      title: item.userImg2,
      img:item.lng,
      status: item.isEnd == 1 ? '进行中' : '已结束',
      time: item.lat,
      address: item.address,
      sponsorCollege: item.hbKeyword,
      population: item.hbNum,
      limitPopulation: item.hot,
      sort: item.sort,
    }))
    activities.value.push(...innerActivities)
    if (activities.value.length === 0) {
      uni.showToast({
        title: '暂无活动',
        icon: 'none',
      })
      finish.value='no-more'
    }
    if(pageNum * pageSize >= totalNum.value){
      finish.value='no-more'
      // uni.showToast({ icon: 'none', title: '没有更多数据了~' })
    }
  } else {
    uni.showToast({
      title: '查询失败',
      icon: 'none',
    })
  }
}
// 分页查询
const onScrolltolower =() => {
  if(pageNum.value * pageSize >= totalNum.value){
    finish.value='no-more'
    return uni.showToast({ icon: 'none', title: '没有更多数据了~' })
  }else{
    pageNum.value += 1;
  }
  change(nowList.value,2)
}
onLoad(() => {
  console.log('onLoad!!!')
  uni.onNetworkStatusChange((res) => {
    if (!res.isConnected) {
      uni.showToast({
        title: '网络已断开',
        icon: 'none',
      })
    }
  })
  getHomeContent(0, 0, 0)
  uni.$on('scrolltolower', onScrolltolower)
})
onHide(() => {})
// onShow(() => {
//   if (statusN.value === 0) {
//     getHomeContent(0, 0, 0)
//   } else if (statusN.value === 1) {
//     getHomeContent(1, 2, 1)
//   } else if (statusN.value === 2) {
//     getHomeContent(1, 2, 2)
//   } else {
//     getHomeContent(2, 2, 1)
//   }
// })
</script>

<style lang="scss">
.category {
  width: 82%;
  margin: 50rpx auto;
  display: flex;
  flex-direction: column;
  .join{
    display: flex;
    justify-content: space-between;
    .sub-title {
      font-size: 40rpx;
      font-weight: bold;
      color: #333;
      display: flex;
      align-items: center;
      .sub-title-img {
        color: #908f8f;
        width: 18rpx;
        height: 25rpx;
        margin-left: 10rpx;
      }
    }
    .sign-in{
      width: 180rpx;
      height: 80rpx;
      border-radius: 10rpx;
      background-color: #D9D9D9;
      display: flex;
      justify-content: center;
      align-items: center;
      .sign-in-img {
        width: 55rpx;
        height: 55rpx;
        margin-right: 6rpx;
      }
    }
  }
}

.activity {
  // height: 50%;
  display: flex;
  flex-direction: column;
  min-height: 100rpx;
  .activity-box {
    display: flex;
    justify-content: space-between;
    width: 82%;
    margin: 0rpx auto;

    .activity-box-content {
      font-size: 30rpx;
      font-weight: bold;
      padding-top: 20rpx;
      color: #333;
    }

    .activity-box-select {
      float: right;
      width: 160rpx;
      z-index: 99;
    }
  }


  .activity-details {
    width: 82%;
    margin: 20rpx auto;

    .activity-details-item {
      background-color: #fff;
      box-shadow: 0 0 20px #d9d9d9;
      height:372rpx;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      width: 100%;
      padding: 30rpx;
      border-radius: 20rpx;
      margin-bottom: 30rpx;

      .img-view{
        width:40%;
        height:100%;
        margin-right:32rpx;
        border-radius: 10rpx;
      }
      .info-view{

        flex:1;
        height: 100%;

        .title{
          font-size: 30rpx;
          color: #000000;
          margin-bottom: 30rpx;
          overflow:hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        }
        .detail-info{
          display: flex;
          flex-direction:column ;

          .sponsor {
            margin-bottom: 10rpx;
            font-size: 30rpx;
            margin-bottom: 20rpx;
          }

          .activity-details-item-content-time {
            position:relative;
            font-size: 27rpx;
            width:200rpx;
            color: #666666;
            overflow: hidden;
            margin-bottom: 20rpx;
            display: flex;
            flex-direction: row;
            .img {
              position: relative;
              top:0;
              width: 30rpx;
              height: 30rpx;
              margin-right: 10rpx;
            }
          }

          .activity-details-item-content-address {
            font-size: 27rpx;
            color: #666666;

            .img {
              width: 30rpx;
              height: 30rpx;
              margin-right: 10rpx;
            }
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



        .activity-details-item-content {
          display: flex;
          justify-content: center;
          flex-direction: column;
          flex: 1;


    }
  }

</style>
