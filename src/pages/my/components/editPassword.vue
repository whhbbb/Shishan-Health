<template>
  <view class="viewport">
    <view class="logo">
      <image src="../../static/log.png"></image>
    </view>
    <view class="login-content">
      <uni-easyinput class="input" v-model="usedPassword" type="password" placeholder="旧密码" />
      <uni-easyinput class="input" v-model="newPassword" type="password" placeholder="新密码" />
    </view>
    <view class="login">
      <button class="button phone" @tap="edit">
        <text class="icon icon-phone"></text>
        修改
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { changePassword } from '@/services/personalInf'

const usedPassword = ref('')
const newPassword = ref('')

const editPassword = async () => {
  const res = await changePassword({
    oldpassword: usedPassword.value,
    password: newPassword.value,
  })
  if (res.code === 200 && res.msg !== '密码错误') {
    uni.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 1000,
    })
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index',
      })
    }, 1000)
    wx.removeStorage({key:'userPass_password'})
  } else if (res.msg === '密码错误') {
    uni.showToast({
      title: '原密码错误',
      icon: 'error',
      duration: 1000,
    })
  } else {
    uni.showToast({
      title: '修改失败',
      icon: 'error',
      duration: 1000,
    })
  }
}

const edit = () => {
  if (usedPassword.value === '') {
    uni.showToast({
      title: '请输入旧密码',
      icon: 'error',
    })
    return
  } else if (newPassword.value === '') {
    uni.showToast({
      title: '请输入新密码',
      icon: 'error',
    })
    return
  } else if (newPassword.value === usedPassword.value) {
    uni.showToast({
      title: '新旧密码相同',
      icon: 'error',
    })
    return
  } else {
    editPassword()
  }
}
</script>
<style scoped lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20rpx 40rpx;

  .login-content {
    width: 80%;
    height: 300rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20rpx;

    .input {
      width: 100%;
    }
  }
}

.logo {
  flex: 1;
  text-align: center;
  margin-bottom: 60rpx;

  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 10vh;
  }
}

.login {
  width: 90%;
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;

    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #06afe3;
  }

  .wechat {
    background-color: #06c05f;

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;

      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }

    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}
</style>
