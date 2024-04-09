<template>
  <view v-if="isPastTargetDate" class="container">
    <view class="text-view">请输入活动主题</view>
    <textarea
      auto-focus="true"
      auto-height="true"
      class="title"
      placeholder="活动主题"
      @input="getTInput"
    />
    <view class="text-view">请输入活动主讲人</view>

    <textarea auto-height="true" class="person" placeholder="活动主讲人" @input="getPInput" />
    <view class="text-view">请输入推荐内容</view>

    <textarea
      maxlength="-1"
      auto-height="true"
      class="desc"
      placeholder="推荐内容"
      @input="getInput"
    />
    <view class="b-view" :style="{ bottom: safeAreaInsets?.bottom!+ 30 + 'px' }">
      <button type="primary" @click="publish">发布推荐</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { newRecommend } from '@/services/recommed'
import { onLoad, onShow } from '@dcloudio/uni-app'
//过审
// 获取当前时间点
const currentTime = ref(new Date())

// 计算2023年11月17号的时间点
const targetDate = new Date('2023-11-25')

// 判断当前时间是否已经过了2023年11月18号
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(false)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
}
onLoad(() => {
  getA()
})
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()

const title = ref('')
const person = ref('')
const desc = ref('')

const getTInput = (e) => {
  title.value = e.detail.value
}
const getPInput = (e) => {
  person.value = e.detail.value
}
const getInput = (e) => {
  desc.value = e.detail.value
}
const sendC = async () => {
  console.log({
    id: null,
    content: desc.value,
    lecturerName: person.value,
    theme: title.value,
  })
  const res = await newRecommend({
    id: null,
    content: desc.value,
    lecturerName: person.value,
    theme: title.value,
  })
  console.log(res)
  if (res.code == 200) {
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/recommend/recommend' })
          title.value = ''
          person.value = ''
          desc.value = ''
        }, 1000)
      },
    })
  } else {
    console.log('提交失败！')
    uni.showToast({
      title: '提交失败！',
      icon: 'error',
      duration: 1000,
    })
  }
}
const publish = () => {
  if (title.value === '') {
    uni.showToast({
      title: '请填写活动主题！',
      icon: 'none',
    })
    return
  } else if (person.value === '') {
    uni.showToast({
      title: '请填写活动发起人姓名',
      icon: 'none',
    })
  } else if (getInput.value === '') {
    uni.showToast({
      title: '请填写推荐理由',
      icon: 'none',
    })
  } else {
    sendC()
  }
}
</script>
<style>
.container {
  padding-top: 20rpx;
  padding-bottom: 40%;
}
textarea {
  margin: 30rpx auto;
  width: 85vw;
  border: 1px solid #d6d6d6;
  border-radius: 10rpx;
  padding: 10rpx;
}
.title {
  height: 90rpx !important;
}
.person {
  height: 90rpx !important;
}
.desc {
  min-height: 300rpx;
}
.text-view {
  font-size: 30rpx;
  color: #666;
  margin-left: 30rpx;
}
.b-view {
  z-index: 99;
  width: 90%;
  position: fixed;
  bottom: 30rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>
