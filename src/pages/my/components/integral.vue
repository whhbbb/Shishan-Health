<template>
  <div>
    <view class="myCredit">
      <uni-icons class="myC" type="person-filled" size="30"></uni-icons>
      <view class="myC">我的积分：</view>
      <view class="myC creditNum">{{ credit }}</view>
    </view>
    <view class="separate"></view>
    <view class="aboutUs">
      <view class="img">
        <uni-icons type="list" size="80"></uni-icons>
      </view>
      <view class="content title">-------积分规则-------</view>
      <view class="content">签到后获得1积分</view>
      <view class="content"> 意见反馈可积1分</view>
      <view class="content">有效推荐可积1分</view>
      <view class="content">内容采纳再积2分</view>
    </view>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// onLoad(()=>{
//   uni.showToast({
//     title:'积分部分功能尚未实现，敬请期待~',
//     icon:'none',
//     duration:2000,
//     complete: function () {
//       setTimeout(function () {
//         uni.switchTab({
//           url: '/pages/index/index'
//         });
//       }, 2000); // 在弹窗关闭后，延迟2秒执行页面跳转
//     }
//   })
// })

import { getPersonalInf } from '@/services/personalInf'
const credit = ref(0)
const getPersonal = async () => {
  const res = await getPersonalInf()
  console.log(res)
  credit.value = res.data.credit
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
  getPersonal()
})
</script>
<style lang="scss">
.aboutUs {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .img {
    width: 100%;
    text-align: center;
    margin-top: 60rpx;
  }

  .content {
    margin-top: 40rpx;
    line-height: 1.5;
    text-align: center;
    color: rgb(74, 73, 73);
  }
}
.separate {
  height: 20rpx;
  background-color: whitesmoke;
  margin: 10rpx 0;
  width: 100%;
}
.title {
  font-size: 40rpx;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: black;
  text-align: justify;
  font-weight: bold;
  text-shadow: #558abb 1px 0 20rpx;
}
.myCredit {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 200rpx;
}
.myC {
  line-height: 200rpx;
}
.creditNum {
  font-size: 50rpx;
  text-shadow: 2rpx 2rpx 4rpx #558abb, 0 0 1em #558abb, 0 0 0.2em #558abb;
}
</style>
