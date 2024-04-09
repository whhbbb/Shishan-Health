<template>
  <view v-if="isPastTargetDate" class="user">
    <navigator class="avatar item" :url="`/pages/my/components/userImage?userAvatar=${user.img}`">
      <view>头像</view>
      <view class="user-avatar texts">
        <image class="img" :src="user.img" />
        <image src="../../../static/my/arrow-right.png" />
      </view>
    </navigator>
    <view class="item">
      <view>名字</view>
      <view class="texts">
        <text class="text1">{{ user.name }}</text>
      </view>
    </view>
    <view class="item">
      <view>学院</view>
      <view class="texts">
        <text class="text1">{{ user.college }}</text>
      </view>
    </view>
    <view class="item">
      <view>学号</view>
      <view class="texts">
        <text class="text1">{{ user.studentId }}</text>
      </view>
    </view>
    <view class="item">
      <view>用户名</view>
      <view class="texts">
        <text class="text1" v-if="!isDisabled">{{ user.nickName }}</text>
        <uni-easyinput class="text2" v-else v-model="editedUser.nickName" />
      </view>
    </view>
    <view class="item">
      <view>电话</view>
      <view class="texts">
        <text class="text1" v-if="!isDisabled">{{ user.phonenumber }}</text>

        <uni-easyinput v-else class="text2" v-model="editedUser.phonenumber" />
      </view>
    </view>
    <view class="btns">
      <button @tap="changeUserInfo" v-if="!isDisabled">修改个人资料</button>
      <view v-if="isDisabled">
        <button @tap="saveEdit">保存</button>
        <button @tap="cancelEdit">取消修改</button>
      </view>
      <button @click="editPassword">修改密码</button>
      <button @tap="logout">退出登录</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getPersonalInf, changePersonalInf } from '@/services/personalInf'
// type userInfo = {
//   name: string
//   studentId: string
//   img?: string
//   // 学院
//   college: string
// }
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(false)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
}
const isDisabled = ref<Boolean>(false)
const user = ref<any>({})

const editedUser = ref<any>({})

const colleges = ref<any>([])
const getPersonal = async () => {
  const res = await getPersonalInf()
  console.log(res)
  user.value.name = res.data.name
  // user.value.img=res.data.img
  user.value.college = res.data.dept.deptName
  user.value.studentId = res.data.userName
  user.value.nickName = res.data.nickName
  user.value.phonenumber = res.data.phonenumber
  user.value.img = res.data.avatar === '' ? '../../../static/my/headpic.png' : res.data.avatar
  editedUser.value = res.data
}
onLoad(() => {
  getA()
})
onShow(() => {
  getA()
  getPersonal()
})

const changeUserInfo = () => {
  getPersonal()
  isDisabled.value = !isDisabled.value
}

const saveEdit = () => {
  if (!/^1[3456789]\d{9}$/.test(editedUser.value.phonenumber)) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
    })
    return false
  }
  if (editedUser.value.nickName && editedUser.value.phonenumber) {
    console.log(editedUser.value)
    changePersonalInf(editedUser.value).then((res) => {
      console.log(res)
      if (res.code == 500) {
        uni.showToast({
          title: '违规操作！',
          icon: 'none',
        })
        return false
      }
      getPersonal()
    })
    isDisabled.value = !isDisabled.value
  } else {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
    })
  }
}

const cancelEdit = () => {
  isDisabled.value = !isDisabled.value
}

const logout = () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除token
        uni.removeStorageSync('token')
        uni.showToast({
          title: '退出成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login',
          })
        }, 2000)
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}
const editPassword = () => {
  uni.navigateTo({
    url: '/pages/my/components/editPassword',
  })
}
</script>
<style lang="scss">
.user {
  width: 90%;
  margin: 0 auto;

  .item {
    display: flex;
    width: 100%;
    height: 130rpx;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e5e3e3;

    .texts {
      max-width: 65%;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      align-items: center;

      .text1 {
        margin-right: 5rpx;
        color: #8e8d8d;
      }

      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }

  .avatar {
    height: 200rpx;

    .user-avatar {
      .img {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }

  .btns {
    border-bottom: none;
    display: flex;
    flex-direction: column;
    button {
      margin-top: 20rpx;
      width: 100%;
      background-color: #eeeded;
    }
  }
}
</style>
