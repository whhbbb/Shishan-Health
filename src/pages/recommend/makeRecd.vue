<template>
  <!-- <view v-if="isPastTargetDate" class="container">
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
  </view> -->
  <view class="wrapper">
    <view class="theme">
      <textarea
        auto-focus="true"
        auto-height="true"
        class="title"
        placeholder="输入活动主题"
        @input="getTInput"
      ></textarea>
    </view>
    <view class="line"></view>
    <view class="detail">
      <textarea
        maxlength="-1"
        auto-height="true"
        class="desc"
        placeholder="分享你的想法..."
        @input="getInput"
      ></textarea>
    </view>
    <view class="recommend">
      <view @tap="publish" class="btn">发布推荐</view>
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
  const res = await newRecommend({
    id: null,
    content: desc.value,
    lecturerName: person.value,
    theme: title.value,
  })
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
  } else if (desc.value === '') {
    uni.showToast({
      title: '请填写推荐理由',
      icon: 'none',
    })
  } else {
    sendC()
  }
}
</script>
<style lang="scss">
page{
  width: 100%;
  height: 100%;
}
.wrapper{
  width: 100%;
  padding: 25rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  .theme{
    font-size: large;
    width: 88%;
  }
  .line{
    width: 100%;
    height: 1px;
    background-color: #e5e5e5;
    margin: 25rpx auto;
  }
  .detail{
    height: 72vh;
    overflow: scroll;
    width: 88%;
    .desc{
      width: 100%;
    }
  }
  .recommend{
    margin-top: 20rpx;
    display: flex;
    justify-content: center;
    z-index: 1000;
    width: 88%;
    .btn{
      width: 50%;
      height: 100rpx;
      background-color: rgb(214, 243, 251);
      color: #0077b6;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50rpx;
    }
  }
}
</style>
