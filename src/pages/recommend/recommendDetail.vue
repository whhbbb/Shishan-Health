<template>
  <div>
    <!--pages/posts/post-detail/post-detail.wxml-->
    <view class="container">
      <view class="author-date">
        <image class="avatar" :src="details.avatar"></image>
        <view class="author-view">
          <text class="author">{{ details.nickName }}</text>
          <text class="const-text">推荐于</text>
          <text class="date">{{ details.createTime }}</text>
        </view>
      </view>

      <view class="activityD">
        <text class="title">{{ details.theme }}</text>
        <text class="date">主讲人：{{ details.lecturerName }}</text>
      </view>

      <view class="tool">
        <text>{{ details.content }}</text>
      </view>
      <view class="wrapper">
        <view class="TLC">
          <view>
            <uni-icons v-if="details.status == 1" type="email-filled" size="20"></uni-icons>
            <uni-icons v-if="details.status == 2" type="auth" size="20"></uni-icons>
            <uni-icons v-else-if="details.status == 3" type="vip-filled" size="20"></uni-icons>

            <text v-if="details.status == 1">已推荐</text>
            <text v-if="details.status == 2">已采纳</text>
            <text v-else-if="details.status == 3">有效推荐</text>
          </view>

          <view class="dianzannum" @click="iLike(details.id, details.tblLike)">
            <uni-icons v-if="details.tblLike == null" type="heart" size="20"></uni-icons>
            <uni-icons v-else type="heart-filled" color="red" size="20"></uni-icons>
            <view>{{ details.likeCount }}</view>
          </view>

          <view>
            <view @tap="showInputBox(details.id)">
              <uni-icons type="chat" size="20"></uni-icons>
              <text>评论</text>
            </view>
          </view>
        </view>

        <view class="zan-name-view" v-if="details.likes.length !== 0">
          <uni-icons type="heart-filled" size="20"></uni-icons>
          <block v-for="(item2, index2) in details.likes" :key="index2">
            <text bindtap="TouchZanUser" :data-name="item2.nickName" class="zan-user">{{
              item2.nickName
            }}</text>
            <text class="zan-user" v-if="index2 !== details.likes.length - 1">,</text>
          </block>
        </view>

        <view class="discuss-view">
          <view
            class="discuss"
            v-for="(item3, index3) in details.tblRecommendCommnets"
            :key="index3"
          >
            <label bindtap="TouchZanUser" :data-name="item3.nickName" class="discuss-user"
              >{{ item3.nickName }}：</label
            >
            <label class="content">{{ item3.comment }}</label>
            <view class="date">{{ item3.createTime }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="input-view" v-if="showInput">
      <input
        class="inputstyle"
        v-model="comment"
        type="text"
        :focus="isInputFocused"
        placeholder="请输入评论"
        @blur="hideInput"
      />
      <button class="btn-view" :disabled="comment === ''" @click="sendcomment">发送</button>
    </view>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLaunch, onLoad } from '@dcloudio/uni-app'
import { getRecommedDetail, sendLike, deletLike, sendcommen } from '@/services/recommed'
const props = defineProps<{
  id: number
}>()
const details = ref({})
const getD = async (id) => {
  const res = await getRecommedDetail(id)
  console.log(res)
  details.value = res.data
}
onLoad(() => {
  getD(props.id)
})

//点赞
const sendLikeTo = async (id) => {
  const res = await sendLike(id)
  console.log(res)
  if (res.code == 200) {
    getD(props.id)
  }
}
const delLike = async (id) => {
  const res = await deletLike(id)
  console.log(res)
  if (res.code == 200) {
    getD(props.id)
  }
}
const iLike = (id, tblLike) => {
  if (uni.getStorageSync('token')) {
    if (tblLike) {
      console.log('取消点赞！')
      delLike(id)
    } else {
      console.log('点赞')
      sendLikeTo(id)
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

//评论
const showInput = ref(false)
const comment = ref('')
const currentItemId = ref<number>()
// 自动弹出键盘
const isInputFocused = ref(true)
const showInputBox = (itemId) => {
  if (uni.getStorageSync('token')) {
    console.log('评论')
    console.log(itemId)
    showInput.value = true
    currentItemId.value = itemId
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
const sendC = async () => {
  const res = await sendcommen({
    comment: comment.value,
    recommendId: currentItemId.value,
  })
  console.log(res)
  if (res.code == 200) {
    showInput.value = false
    // 发送评论后隐藏输入框
    showInput.value = false
    // 清空评论内容
    comment.value = ''
    getD(props.id)
  }
}
const sendcomment = () => {
  console.log('点击了发送')
  console.log(currentItemId.value)
  sendC()
}
const hideInput = () => {
  showInput.value = false
  // 发送评论后隐藏输入框
  showInput.value = false
}
</script>
<style scoped>
/* pages/posts/post-detail/post-detail.wxss */
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.head-container {
  width: 100%;
  height: 460rpx;
  position: relative;
}
.head-image {
  width: 100%;
  height: 460rpx;
}
.audio {
  width: 102rpx;
  height: 110rpx;
  position: absolute;
  top: 50%;
  margin-top: -55rpx;
  left: 50%;
  margin-left: -51rpx;
  opacity: 0.6;
}
.author-date {
  display: flex;
  flex-direction: row;
  margin: 3vh auto 0;
  width: 100%;
}
.author-view {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-left: 5%;
}
.avatar {
  /* height:100%; */
  width: 100rpx;
  height: 100rpx;
  overflow: hidden;
  vertical-align: middle;
  margin-left: 20rpx;
  border-radius: 15%;
}
.author {
  font-size: 30rpx;
  font-weight: 300;
  vertical-align: middle;
  color: #666;
}
.const-text {
  font-size: 24rpx;
  color: #999;
}

.date {
  margin-top: 2rpx;
  font-size: 24rpx;
  vertical-align: middle;
  color: #999;
}
.title {
  font-size: 36rpx;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 5rpx;
  color: #4b556c;
}
.tool {
  width: 90%;
  line-height: 65rpx;
  margin: 3vh auto 0;
  font-size: 34rpx;
  word-break: break-all;
  overflow: hidden;
}
.circle-img {
  float: right;
  margin-right: 40rpx;
  vertical-align: middle;
}

/* .circle-img image{
  width: 90rpx;
  height: 90rpx;
}
.share-img{
  margin-left: 30rpx;
} */
.activityD {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 3vh auto 0;
  /* margin:10px 0; */
}
.horizon {
  width: 660rpx;
  height: 1px;
  background-color: #e5e5e5;
  vertical-align: middle;
  position: relative;
  top: 46rpx;
  margin: 0 auto;
  z-index: -99;
}

.detail {
  color: #666;
  margin-left: 30rpx;
  margin-top: 20rpx;
  margin-right: 30rpx;
  line-height: 44rpx;
  letter-spacing: 2px;
}

/* 评论 */
.discuss-view {
  background: rgb(241, 241, 241);
  width: 100%;
  margin-top: 10rpx;
  border-top: 1px solid rgb(213, 213, 213);
  min-height: 20rpx;
  border-bottom-left-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
}

.discuss {
  background: rgb(241, 241, 241);
  width: 90%;
  margin: 0 auto;
  padding-top: 10rpx;
  padding-bottom: 8rpx;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}

.discuss label {
  font-size: 30rpx;
}

.discuss-user {
  color: rgb(88, 103, 138);
}

.content {
  margin-left: 10rpx;
}
.wrapper {
  border-radius: 10rpx;
  width: 90%;
  margin: 3vh auto;
  background-color: rgb(241, 241, 241);
}
.TLC {
  font-size: 29rpx;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 10rpx;
  /* border-bottom: 1px solid rgb(213, 213, 213); */
  height: 70rpx;
  line-height: 70rpx;
  display: flex;
  flex-wrap: row;
  align-items: center;
  justify-content: space-between;
  /* background-color: rgb(241, 241, 241); */
  /* */
}
.TlC > view {
  display: flex;
  align-items: center;
}
.dianzannum {
  display: flex;
  flex-wrap: row;
}
.zan-name-view {
  background-color: rgb(241, 241, 241);
  width: 90%;
  margin: 0 auto;
  padding-bottom: 10rpx;
  margin-bottom: 10rpx;
  overflow-wrap: break-word;
}
.zan-user {
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  color: rgb(88, 103, 138);
}
.input-view {
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;

  background-color: white;
}
.inputstyle {
  width: 80%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;

  padding-left: 5px;
}
.btn-view {
  height: 40px;
  font-size: medium;
  border: 1px solid #ccc;
}
</style>
