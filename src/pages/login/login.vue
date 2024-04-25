<script setup lang="ts">
//
import { Base64 } from 'js-base64'
import randomWord from '@/utils/random'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { logInAPI } from '@/services/logIn'

type logInInfo = {
  username: string
  password: string
}

const logInInfo = ref<logInInfo>({
  username: '',
  password: '',
})

// 暂时登录
const logIn = () => {
  console.log(remPassword.value)
  console.log(logInInfo.value)
  if (logInInfo.value.username == '') {
    uni.showToast({
      title: '用户名不能为空！',
      icon: 'none',
      duration: 1000,
    })
    return
  }
  if (logInInfo.value.password == '') {
    uni.showToast({
      title: '密码不能为空！',
      icon: 'none',
      duration: 1000,
    })
    return
  } else {
    logInAPI({
      username: logInInfo.value.username,
      password: logInInfo.value.password,
    }).then((res) => {
      console.log(logInInfo.value)
      console.log(res)
      if (res.code === 200) {
        uni.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 1000,
        })
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/index/index',
          })
        }, 2000)
        // 存储token
        uni.setStorageSync('token', res.token)
        //存密码
        if (remPassword.value) {
          wx.setStorage({
            key: 'userPass_username',
            data: logInInfo.value.username,
          })
          wx.setStorage({
            key: 'userPass_password',
            data: randomWord(99) + Base64.encode(logInInfo.value.password),
          })
          console.log(randomWord(99) + Base64.encode(logInInfo.value.password))
        }
      } else {
        uni.showToast({
          title: '密码错误',
          icon: 'error',
          duration: 1000,
        })
      }
    })
  }
  // uni.showToast({
  //   title: '登录成功',
  //   icon: 'success',
  //   duration: 1000
  // })
  // setTimeout(() => {
  //   uni.switchTab({
  //     url: '/pages/index/index'
  //   })
  // }, 2000)
}

// 获取code登陆凭证
let code = ''
onLoad(async () => {
  wx.getStorage({
    key: 'userPass_password',
    success: function (res) {
      console.log(res.data)
      console.log(Base64.decode(res.data.slice(99)))
      logInInfo.value.password = Base64.decode(res.data.slice(99))
    },
    fail: function () {
      logInInfo.value.password = ''
    },
  })
  const res = await wx.login()
  console.log(res)
  code = res.code
  wx.getStorage({
    key: 'userPass_username',
    success: function (res) {
      console.log(res.data)
      logInInfo.value.username = res.data
      remPassword.value = true
    },
    fail: function () {
      logInInfo.value.username = ''
    },
  });

})

// 获取用户手机号码
const onGetphonenumber = (ev: any) => {
  console.log(ev)
}
//记住密码
const remPassword = ref(false)
const remPasswordChange = () => {
  remPassword.value = !remPassword.value
}

</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="../../static/LOGO.png"></image>
      <view class="title">学术晚茶</view>
    </view>
    <view class="lowwer">
      <view class="login-content">
        <view class="input">
          <uni-easyinput type="text" v-model="logInInfo.username" placeholder="用户名" />
        </view>
        <view class="input">
          <uni-easyinput type="password" v-model="logInInfo.password" placeholder="密码" />
        </view>
      </view>
      <view class="login">
        <button class="button phone" @tap="logIn">
          <text class="icon icon-phone"></text>
          登录
        </button>
        <label class="rempass">
          <checkbox value="remPassword" :checked="remPassword" @click="remPasswordChange" color="#06afe3" style="
                transform: scale(0.55);
              " />记住密码
        </label>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.viewport {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 95%;

  .logo {
    margin-bottom: 60rpx;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 60rpx;
      color: #0077b6;
      margin-top: 20rpx;
    }

    image {
      width: 220rpx;
      height: 220rpx;
      margin-top: 10vh;
    }
  }

  .lowwer {
    margin-top: 150rpx;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .login-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 20rpx;

      .input {
        width: 100%;
        margin-bottom: 30rpx;
      }
    }

    .login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .button {
        width: 100%;
        border-radius: 200rpx;
        background-color: rgb(214, 243, 251);
        color: #0077b6;
        margin-bottom: 10rpx;
      }

      .rempass {
        font-size: 20rpx;
        display: flex;
        align-items: center;
      }
    }
  }
}

:deep(.is-input-border) {
  border-radius: 200rpx !important;
  border: 1px solid rgb(13, 152, 232) !important;
}

:deep(.uni-easyinput__content-input) {
  padding-left: 40rpx !important;
  height: 90rpx !important;
  font-size: 30rpx !important;
}

//勾选协议 抖动动画
// .animation-shake {
//   animation-delay: 0s;
//   animation-duration: 0.1s;
//   animation-iteration-count: infinite;
//   animation-name: shake;
//   animation-play-state: running;
//   animation-timing-function: ease-in-out;
// }

// @keyframes shake {
//   0% {
//     transform: translate(0, 0) rotate(0deg);
//   }

//   2% {
//     transform: translate(-4px, 0) rotate(0deg);
//   }

//   4% {
//     transform: translate(2px, 0) rotate(0deg);
//   }

//   6% {
//     transform: translate(-3px, 0) rotate(0deg);
//   }

//   8% {
//     transform: translate(9px, 0) rotate(0deg);
//   }

//   10% {
//     transform: translate(2px, 0) rotate(0deg);
//   }

//   12% {
//     transform: translate(-6px, 0) rotate(0deg);
//   }

//   14% {
//     transform: translate(-7px, 0) rotate(0deg);
//   }

//   16% {
//     transform: translate(2px, 0) rotate(0deg);
//   }

//   18% {
//     transform: translate(7px, 0) rotate(0deg);
//   }

//   20% {
//     transform: translate(-1px, 0) rotate(0deg);
//   }

//   22% {
//     transform: translate(-10px, 0) rotate(0deg);
//   }

//   24% {
//     transform: translate(-10px, 0) rotate(0deg);
//   }

//   26% {
//     transform: translate(3px, 0) rotate(0deg);
//   }

//   28% {
//     transform: translate(-5px, 0) rotate(0deg);
//   }

//   30% {
//     transform: translate(4px, 0) rotate(0deg);
//   }

//   32% {
//     transform: translate(-6px, 0) rotate(0deg);
//   }

//   34% {
//     transform: translate(-2px, 0) rotate(0deg);
//   }

//   36% {
//     transform: translate(-6px, 0) rotate(0deg);
//   }

//   38% {
//     transform: translate(-2px, 0) rotate(0deg);
//   }

//   40% {
//     transform: translate(4px, 0) rotate(0deg);
//   }

//   42% {
//     transform: translate(8px, 0) rotate(0deg);
//   }

//   44% {
//     transform: translate(-3px, 0) rotate(0deg);
//   }

//   46% {
//     transform: translate(-10px, 0) rotate(0deg);
//   }

//   48% {
//     transform: translate(4px, 0) rotate(0deg);
//   }

//   50% {
//     transform: translate(-6px, 0) rotate(0deg);
//   }

//   52% {
//     transform: translate(6px, 0) rotate(0deg);
//   }

//   54% {
//     transform: translate(-8px, 0) rotate(0deg);
//   }

//   56% {
//     transform: translate(5px, 0) rotate(0deg);
//   }

//   58% {
//     transform: translate(9px, 0) rotate(0deg);
//   }

//   60% {
//     transform: translate(7px, 0) rotate(0deg);
//   }

//   62% {
//     transform: translate(1px, 0) rotate(0deg);
//   }

//   64% {
//     transform: translate(2px, 0) rotate(0deg);
//   }

//   66% {
//     transform: translate(-2px, 0) rotate(0deg);
//   }

//   68% {
//     transform: translate(-7px, 0) rotate(0deg);
//   }

//   70% {
//     transform: translate(-1px, 0) rotate(0deg);
//   }

//   72% {
//     transform: translate(-6px, 0) rotate(0deg);
//   }

//   74% {
//     transform: translate(5px, 0) rotate(0deg);
//   }

//   76% {
//     transform: translate(0, 0) rotate(0deg);
//   }

//   78% {
//     transform: translate(9px, 0) rotate(0deg);
//   }

//   80% {
//     transform: translate(-3px, 0) rotate(0deg);
//   }

//   82% {
//     transform: translate(8px, 0) rotate(0deg);
//   }

//   84% {
//     transform: translate(-2px, 0) rotate(0deg);
//   }

//   86% {
//     transform: translate(-1px, 0) rotate(0deg);
//   }

//   88% {
//     transform: translate(-3px, 0) rotate(0deg);
//   }

//   90% {
//     transform: translate(4px, 0) rotate(0deg);
//   }

//   92% {
//     transform: translate(0, 0) rotate(0deg);
//   }

//   94% {
//     transform: translate(4px, 0) rotate(0deg);
//   }

//   96% {
//     transform: translate(2px, 0) rotate(0deg);
//   }

//   98% {
//     transform: translate(-2px, 0) rotate(0deg);
//   }
// }
// </style>
