<template>
  <view v-if="isPastTargetDate" class="feedback">
    <view class="feedback-item">
      <view class="feedback-content">
        <view class="feedback-content-item">
          <view class="feedback-content-item-title">问题描述</view>
          <view class="feedback-content-item-input">
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="请描述您的问题"
              v-model="feedBack.problem"
            ></textarea>
          </view>
        </view>
        <view class="feedback-content-item">
          <view class="feedback-content-item-title">上传图片</view>
          <uni-file-picker
            limit="9"
            mode="grid"
            file-mediatype="image"
            @select="select"
            @delete="deleteImg"
          />
        </view>
        <view class="feedback-content-item">
          <view class="feedback-content-item-title">联系人姓名</view>
          <view class="feedback-content-item-input">
            <uni-easyinput
              v-model="feedBack.name"
              type="text"
              placeholder="请输入您的名字"
              @confirm=""
              next
            />
          </view>
        </view>
        <view class="feedback-content-item">
          <view class="feedback-content-item-title">联系方式</view>
          <view class="feedback-content-item-input">
            <uni-easyinput
              v-model="feedBack.contact"
              type="text"
              placeholder="请输入您的联系方式"
              @confirm=""
              done
            />
          </view>
        </view>
      </view>
      <view class="feedback-btn">
        <button class="btn" type="primary" size="default" @tap="submit">提交</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { postFeedbackAPI } from '@/services/feedBack'
import { ref, reactive, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
//过审
// 获取当前时间点
const currentTime = ref(new Date())

// 计算2023年11月17号的时间点
const targetDate = new Date('2023-11-23')

// 判断当前时间是否已经过了2023年11月17号
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(false)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
  console.log(isPastTargetDate.value)
  // if (!isPastTargetDate.value) {
  //   uni.showToast({
  //     title: '意见反馈部分功能尚未实现，敬请期待~',
  //     icon: 'none',
  //     duration: 1000
  //   })
  // }
  if (!uni.getStorageSync('token')) {
    uni.showToast({
      title: '您未登录！',
      icon: 'none',
      duration: 1000,
    })
  }
}
onLoad(() => {
  getA()
})
onShow(() => {
  // getA()
  // console.log(isPastTargetDate.value)
})
type img = {
  now: string
  temp: string
}
type postContent = {
  content: string
  phone: string
  picture: string
  name: string
  id: string
}
type feedBackContent = {
  problem: string
  contact: string
  img: Array<img>
  name: string
}

const feedBack = ref<feedBackContent>({
  problem: '',
  contact: '',
  img: [],
  name: '',
})

const validatePhone = (phone: string) => {
  const reg = /^1\d{10}$/
  return reg.test(phone)
}

const deleteImg = (e: any) => {
  const index = e.index
  console.log(e)
  feedBack.value.img.forEach((item, index) => {
    if (item.temp === e.tempFilePath) {
      feedBack.value.img.splice(index, 1)
    }
  })
}
const select = (e: any) => {
  console.log(e)
  const tempFilePaths = e.tempFilePaths
  uploadFiles(tempFilePaths, 0)
}

const uploadFiles = async (tempFilePaths: any, i: any) => {
  const res = await uni.uploadFile({
    url: 'https://www.academictime.cn:3166/system/common/upload',
    filePath: tempFilePaths[i],
    header: {
      Authorization: 'Bearer ' + uni.getStorageSync('token'),
      'Content-Type': 'multipart/form-data',
    },
    name: 'file',
    success: (res) => {
      console.log(res)
      const resData = JSON.parse(res.data)
      feedBack.value.img.push({ now: resData.msg, temp: tempFilePaths[i] })
    },
    fail: () => {
      console.log('fail')
      uni.showToast({
        title: '上传失败',
        icon: 'none',
      })
    },
  })
}

const postFeedback = async (data: postContent) => {
  const res = await postFeedbackAPI(data)
  console.log(res)
  if (res.code == 200) {
    wx.showToast({
      title: res.msg,
      icon: 'success',
      duration: 2000,
      complete: function () {
        setTimeout(function () {
          uni.switchTab({
            url: '/pages/my/my',
          })
        }, 2000)
      },
    })
  } else if (res.code == 401) {
    uni.showToast({
      title: '您未登录！',
      icon: 'none',
      duration: 1000,
    })
  } else {
    wx.showToast({
      title: res.msg,
      icon: 'none',
      duration: 2000,
    })
  }
}

const submit = () => {
  console.log(feedBack.value)
  let imgString = feedBack.value.img.map((item) => item.now).join('&')
  console.log(imgString)
  if (feedBack.value.problem === '') {
    uni.showToast({
      title: '请填写问题描述',
      icon: 'none',
    })
    return
  } else if (feedBack.value.name === '') {
    uni.showToast({
      title: '请填写联系人姓名',
      icon: 'none',
    })
  } else if (feedBack.value.contact === '') {
    uni.showToast({
      title: '请填写联系方式',
      icon: 'none',
    })
  } else if (!validatePhone(feedBack.value.contact)) {
    uni.showToast({
      title: '请填写正确的联系方式',
      icon: 'none',
    })
  } else {
    postFeedback({
      name: feedBack.value.name,
      phone: feedBack.value.contact,
      content: feedBack.value.problem,
      picture: imgString,
      id: '',
    })
  }
}
</script>
<style lang="scss">
.feedback {
  // height: 100vh;
  overflow-y: scroll;
  width: 90%;
  margin: 0 auto;

  .feedback-item {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 20rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .feedback-content {
      width: 100%;
      height: 95%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .feedback-content-item {
        margin-top: 5%;
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        // margin-bottom: 60rpx;

        .feedback-content-item-title {
          font-size: 28rpx;
          font-weight: 600;
          color: #5d5c5c;
          margin-bottom: 20rpx;
        }

        .feedback-content-item-input {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          textarea {
            width: 100%;
            height: 200rpx;
            border: 1px solid #eee;
            border-radius: 10rpx;
            padding: 20rpx;
            box-sizing: border-box;
            font-size: 28rpx;
            color: #5d5c5c;
            resize: none;
          }

          .feedback-content-item-input-img {
            width: 100%;
            height: 200rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;

            image {
              width: 200rpx;
              height: 200rpx;
              border: 1px solid #eee;
              border-radius: 10rpx;
            }
          }
        }
      }
    }

    .feedback-btn {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-bottom: 30rpx;

      .btn {
        margin-top: 70rpx;
        width: 40%;
        font-size: 35rpx;
      }
    }
  }
}
</style>
