<template>
  <view class="details">
    <view class="header">
      <view class="title">{{ item.title }}</view>
      <view class="time">{{ item.createTime }}</view>
    </view>
    <view class="ql-editor" id="content" ref="contentRef" v-html="item.content"></view>
    <view class="foot">
      <view class="foot-main">
        <image class="foot-img" src="../../../static/log.png" mode="scaleToFill" />
        <view class="foot-text">学术晚茶</view>
      </view>
      <view class="foot-icons">
        <view class="icon-view">
          <uni-icons type="eye-filled" size="20"></uni-icons>
          <text class="post-like-font">{{ item.viewsNums }}</text>
        </view>
        <view class="icon-view">
          <uni-icons
            v-if="!item.tblLike"
            @tap.stop="likeUp(item.id, item.tblLike)"
            type="heart"
            size="20"
          ></uni-icons>
          <uni-icons
            v-else
            type="heart-filled"
            size="20"
            @tap.stop="likeUp(item.id, item.tblLike)"
            color="red"
          ></uni-icons>
          <text class="post-like-font">{{ item.likeCount }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import '@/styles/quill.bubble.css'
import '@/styles/quill.snow.css'
import '@/styles/quill.core.css'
import { ref, reactive } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getColumnsDetailAPI, likeUpAPI, likeDownAPI } from '@/services/column'
const contentRef = ref<HTMLElement | null>(null)
type details = {
  title: string
  createTime: string
  content: string
}
const props = defineProps<{
  id: number
  kind: number
}>()
const item = ref<details>({
  title: '',
  createTime: '',
  content: '',
})
const getColumnsDetail = async (id: number, type: number = 2) => {
  const res = await getColumnsDetailAPI(id, type)
  console.log(res.data)
  item.value = res.data
  item.value.content = item.value.content.replace(
    /\<img/g,
    '<img style="max-width:100%;height:auto" ',
  )
}
onLoad(() => {
  console.log(props.id)
  console.log(props.kind)
  getColumnsDetail(props.id)
})

const likeUp = (id: number, tblLike: object) => {
  // 判断是否有token
  if (uni.getStorageSync('token')) {
    if (tblLike) {
      console.log('取消点赞')
      likeDownAPI(id).then((res) => {
        getColumnsDetail(id, 1)
      })
    } else {
      console.log('点赞')
      likeUpAPI(id).then((res) => {
        getColumnsDetail(id, 1)
      })
    }
  } else {
    wx.showToast({
      title: '您尚未登录，请先登录',
      icon: 'none',
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }, 1000)
      },
    })
  }
}
</script>
<style scoped lang="scss">
.details {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  .header {
    width: 90%;
    margin: 0 auto;
    .title {
      font-size: 45rpx;
      font-weight: bold;
      margin-top: 10rpx;
      margin-bottom: 15rpx;
    }

    .time {
      font-size: 30rpx;
      color: #999;
      margin-bottom: 20rpx;
      padding-left: 15rpx;
    }
  }
  .foot {
    border-top: 1px solid whitesmoke;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 5vh;
    padding-top: 3vh;
    display: flex;
    justify-content: space-between;
    .foot-main {
      display: flex;
      flex-direction: row;
      .foot-img {
        height: 80rpx;
        width: 80rpx;
        margin-right: 15rpx;
        border-radius: 15%;
      }
      .foot-text {
        line-height: 80rpx;
        font-size: 30rpx;
        color: #999;
      }
    }
    .foot-icons {
      display: flex;
      width: 35vw;
      justify-content: space-between;
      flex-direction: row;
      .icon-view {
        height: 80rpx;
        line-height: 80rpx;
        .post-like-font {
          vertical-align: middle;
          font-size: 30rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
  .content {
    width: 100%;
  }
}
</style>
