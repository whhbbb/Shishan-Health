<template>
  <view class="wrapper">
    <view class="credit-sum">
      <view class="credit-sum-content">
        <view class="credit-num">{{ props.creditNum }}</view>
        积分
      </view>
      <navigator class="credit-role" url="/pages/my/components/integral">
        积分规则
        <image
          class="credit-role-img"
          src="../../../static/my/black-arrow-right.png"
          mode="heightFix"
        />
      </navigator>
    </view>
    <view class="credit-details">
      <view class="month-details" v-for="history in historys" :key="history.month">
        <view class="month">{{ history.month }}</view>
        <view class="history-details" v-for="item in history.details" :key="item.id">
          <view class="history-content">
            <view class="history-title">{{ CType(item.creditType) }}</view>
            <view class="history-time">{{ item.createTime }}</view>
          </view>
          <view class="history-credit">{{ editCredit(item.creditType,item.creditNum) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import { getCreidHistory } from '@/services/gift'

// 记录的字段
interface History {
  creditType: number
  createTime: string
  creditNum: number
}

// 获取props
const props = defineProps<{
  creditNum: string
}>()
const historys = ref([])

// 获取积分历史
const getCreditH = async () => {
  const res = await getCreidHistory()
  console.log(res.rows)
  historys.value = sortGroupBy(groupBy(res.rows))
}
// 积分类型
const CType = (n:number) => {
  if (n == 2) {
    return '参加活动'
  } else if (n == 3) {
    return '意见反馈'
  } else if (n == 4) {
    return '推荐活动'
  } else {
    return '积分兑换'
  }
}
// 积分数值
const editCredit = (n:number,num:number) => {
  if(n==5){
    return num
  }else{
    return '+'+num
  }
}
//根据日期按月分组记录
const groupBy = (array:History[]) => {
  const map = new Map()
  array.forEach((item) => {
    const key = item.createTime.slice(0, 7)
    if (map.has(key)) {
      map.get(key).push(item)
    } else {
      map.set(key, [item])
    }
  })
  return map
}
// 对groupby的结果进行排序
const sortGroupBy = (map:Map<string, History[]>) => {
  const keys = Array.from(map.keys())
  keys.sort((a, b) => {
    return a > b ? -1 : 1
  })
  return keys.map((key) => {
    return {
      month: key,
      details: map.get(key),
    }
  })
}



onLoad(() => {
  if (!uni.getStorageSync('token')) {
    uni.showToast({
      title: '您未登录！',
      icon: 'none',
      duration: 1000,
    })
    return
  }
  getCreditH()
})
onShow(() => {
  if (!uni.getStorageSync('token')) {
    uni.showToast({
      title: '您未登录！',
      icon: 'none',
      duration: 1000,
    })
    return
  }
})
</script>

<style lang="scss">
.wrapper{
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding-top: 50rpx;
  .credit-sum{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 60rpx;
    width: 100%;
    height: 160rpx;
    border-radius: 20rpx;
    box-shadow: 0 0 20px #e5e4e4;
    .credit-sum-content{
      display: flex;
      align-items: center;
      .credit-num{
        font-size: 55rpx;
        font-weight: bold;
        margin-right: 10rpx;
      }
    }
    .credit-role{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 30rpx;
      .credit-role-img{
        height: 25rpx;
        margin-left: 8rpx;
      }
    }
  }
  .credit-details{
    display: flex;
    flex-direction: column;
    padding: 30rpx;
    margin-top: 30rpx;
    border-radius: 20rpx;
    box-shadow: 0 0 20px #e5e4e4;
    min-height: 100rpx;
    .month-details{
      display: flex;
      flex-direction: column;
      .month{
        font-size: 35rpx;
        padding-bottom: 20rpx;
        border-bottom: 1.5px solid #e5e4e4;
        margin-bottom: 20rpx;
      }
      .history-details{
        display: flex;
        padding: 0 30rpx;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
        .history-content{
          display: flex;
          flex-direction: column;
          .history-title{
            font-size: 32rpx;
            color: #333;
          }
          .history-time{
            font-size: 25rpx;
            color: #999;
          }
        }
        .history-credit{
          display: flex;
          align-items: center;
          font-size: 38rpx;
          color: #000;
        }
      }
    }
  }
}
</style>
