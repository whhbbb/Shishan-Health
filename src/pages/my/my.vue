<script setup lang="ts">
import { useMemberStore } from '@/stores'
import { ref, computed } from 'vue'
import { getPersonalInf } from '@/services/personalInf'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getLaunchPermissionAPI } from '@/services/ActivityLaunch'
//过审
// 获取当前时间点
const currentTime = ref(new Date())

// 计算2023年11月17号的时间点
const targetDate = new Date('2023-11-23')

// 用户权限字段
const isLaunch = ref<boolean>(false)

// 判断当前时间是否已经过了2023年11月17号
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(true)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
}

type person = {
  name: string
  id: string
  img: string
  // 学院
  college: string
  credit?: number
}
const islogin = ref(false)
const my = ref<person>({
  name: '',
  id: '',
  img: '../../static/my/headpic.png',
  college: '',
})

const handleNavigate = () => {
  // if (isPastTargetDate.value) {
  if (uni.getStorageSync('token')) {
    uni.navigateTo({
      url: '/pages/my/components/editUser',
    })
  } else {
    uni.navigateTo({
      url: '/pages/login/login',
    })
  }
  // }
}

const getPersonal = async () => {
  const res = await getPersonalInf()
  console.log(res)
  my.value.name = res.data.nickName
  // my.value.img=res.data.img
  my.value.college = res.data.dept.deptName
  my.value.img = res.data.avatar === '' ? '../../static/my/headpic.png' : res.data.avatar
  my.value.credit = res.data.credit
}

// 判断用户是否有发起活动的权限
const getLaunchPermission = async () => {
  const res = await getLaunchPermissionAPI()
  if(res.code ===200){
    isLaunch.value = true
  }
}

onShow(() => {
  getA()
  const token = uni.getStorageSync('token')
  islogin.value = token ? true : false
  if (token) {
    getPersonal()
  }
  getLaunchPermission()
})
</script>

<template>
  <!-- 个人中心 -->
  <view class="personal">
    <navigator class="personal-header" @click="handleNavigate">
      <view v-if="islogin" class="personal-header-left">
        <image class="personal-header-left-img" :src="my.img" />
        <view class="personal-header-left-text">
          <view class="personal-header-left-text-name">
            <!-- {{ memberStore.memberInfo.name }} -->
            {{ my.name }}
          </view>
          <view class="personal-header-left-text-college">
            <!-- 学号：{{ memberStore.memberInfo.id }} -->
            {{ my.college }}
          </view>
        </view>
      </view>
      <view v-else class="personal-header-left">
        <image class="personal-header-left-img" src="../../static/my/headpic.png" />
        <view class="personal-header-left-text">
          <view class="personal-header-left-text-name"> 暂未登录 </view>
          <view class="personal-header-left-text-college"> 去登陆！ </view>
        </view>
      </view>
      <navigator v-if="islogin" class="credit" :url="`/pages/my/components/history?creditNum=${my.credit}`">
        <image
        class="credit-img"
          src="../../static//gifts/blue-score.png"
          mode="scaleToFill"
        />
        <view class="credit-num">
          {{ my.credit }}
        </view>
        <view class="credit-right">
          <image
            class="credit-right-img"
            src="../../static/my/blue-arrow-right.png"
            mode="heightFix"
          />
        </view>
      </navigator>
    </navigator>
    <view class="personal-content">
      <navigator class="personal-content-item" url="/pages/my/components/myactivity/activity">
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-activity.png" />
          <view class="personal-content-item-left-text"> 我的活动 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator>
      <!-- <navigator class="personal-content-item" url="/pages/my/components/integral">
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-integral.png" />
          <view class="personal-content-item-left-text"> 积分规则 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator> -->
      <navigator class="personal-content-item" url="/pages/my/components/contactUs">
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-call.png" />
          <view class="personal-content-item-left-text"> 联系我们 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator>
      <navigator class="personal-content-item" url="/pages/my/components/aboutUs">
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-us.png" />
          <view class="personal-content-item-left-text"> 关于我们 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator>
      <navigator
        v-if="isPastTargetDate"
        class="personal-content-item"
        url="/pages/my/components/feedBack"
      >
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-email.png" />
          <view class="personal-content-item-left-text"> 意见反馈 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator>
      <navigator
        v-if="isLaunch"
        class="personal-content-item"
        url="/pages/activity/ActivityLaunch"
      >
        <view class="personal-content-item-left">
          <image class="personal-content-item-left-img" src="../../static/my/user-activity.png" />
          <view class="personal-content-item-left-text"> 发起活动 </view>
        </view>
        <view class="personal-content-item-right">
          <image class="personal-content-item-right-img" src="../../static/my/arrow-right.png" />
        </view>
      </navigator>
    </view>
  </view>
</template>

<style lang="scss">
//
// 个人中心
//
.personal {
  width: 82%;
  margin: 50rpx auto;
  height: 100%;

  .personal-header {
    width: 100%;
    height: 200rpx;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid #f5f5f5;
    margin-bottom: 20rpx;

    .personal-header-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .personal-header-left-img {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }

      .personal-header-left-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        margin-left: 20rpx;

        .personal-header-left-text-name {
          margin-bottom: 10rpx;
          font-size: 34rpx;
          font-weight: bold;
          color: #333;
        }

        .personal-header-left-text-college {
          font-size: 30rpx;
          color: #999;
        }
      }
    }
    .credit{
      min-width: 25%;
      padding: 15rpx;
      height: 40%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(214, 244, 251);
      border-radius: 20rpx;
      .credit-img{
        width: 30rpx;
        height: 30rpx;
        margin-right: 8rpx;
      }
      .credit-num{
        font-size: 35rpx;
        color: #0077b6;
      }
      .credit-right{
        display: flex;
        align-items: center;
        margin-left: 18rpx;
        .credit-right-img{
          height: 25rpx;
        }
      }
    }
  }

  .personal-content {
    width: 100%;
    height: 400rpx;
    background-color: #fff;
    margin-top: 20rpx;

    .personal-content-item {
      width: 100%;
      height: 120rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f5f5f5;

      .personal-content-item-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .personal-content-item-left-img {
          width: 40rpx;
          height: 40rpx;
        }

        .personal-content-item-left-text {
          font-size: 30rpx;
          color: #333;
          margin-left: 20rpx;
        }
      }

      .personal-content-item-right {
        .personal-content-item-right-img {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }
  }
}
</style>
