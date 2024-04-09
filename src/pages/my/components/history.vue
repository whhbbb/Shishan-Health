<template>
  <view class="noHistory" v-if="history.length == 0">
    <view class="noH">暂无记录……</view>
  </view>
  <view v-else>
    <uni-list v-for="(item, index) in history" :key="index">
      <uni-list-item
        :title="item.creditNum > 0 ? '+' + item.creditNum : item.creditNum"
        :note="item.createTime"
        :rightText="CType(item.creditType)"
        style="padding: 2vh 0"
      >
        <template v-slot:header>
          <uni-icons
            v-if="item.creditType == 2"
            style="margin-right: 2vw"
            class="icons"
            type="flag-filled"
            color="#92aff0"
            size="25"
          ></uni-icons>
          <uni-icons
            v-else-if="item.creditType == 3"
            style="margin-right: 2vw"
            class="icons"
            type="chatboxes-filled"
            color="#f1e9e4"
            size="25"
          ></uni-icons>
          <uni-icons
            v-else-if="item.creditType == 4"
            style="margin-right: 2vw"
            class="icons"
            type="hand-up-filled"
            color="#c5daf0"
            size="25"
          ></uni-icons>
          <uni-icons
            v-else
            style="margin-right: 2vw"
            class="icons"
            type="gift-filled"
            color="#f5c7c3"
            size="25"
          ></uni-icons>
        </template>
      </uni-list-item>
    </uni-list>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import { getCreidHistory } from '@/services/gift'
const getCreditH = async () => {
  const res = await getCreidHistory()
  console.log(res.rows)
  history.value = res.rows
}
const history = ref([])
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
const CType = (n) => {
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
</script>

<style>
.noHistory {
  display: flex;
  justify-content: space-around;
  height: 100vh;
  box-shadow: inset 2px 2px 4px rgb(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.1);
}
.noH {
  color: #000;
  margin: auto;
}
</style>
