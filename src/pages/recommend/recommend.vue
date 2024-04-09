<template v-if="isPastTargetDate">
  <view v-if="isPastTargetDate">
    <view class="page" :style="{ paddingBottom: safeAreaInsets?.bottom!+ 100+ 'rpx' }">
      <!-- 列表 -->
      <view class="CircleList" v-for="(item0, index0) in DataSource" :key="index0">
        <!-- 头像、昵称、内容 -->
        <view class="body-view">
          <!-- 头像 -->
          <view class="left-view">
            <image class="user-icon" :src="item0.avatar"></image>
          </view>
          <view @tap="gotoRD(item0.id)" class="right-view">
            <!-- 昵称 -->
            <view class="user-name-view">
              <label class="user-name">{{ item0.nickName }}</label>
            </view>
            <!-- 内容 -->
            <view class="user-content-view">
              <view class="theme-view">
                <text class="user-content">主题:{{ item0.theme }}</text>
                <text class="user-content">主讲人:{{ item0.lecturerName }}</text>
              </view>
              <text class="user-content">{{ item0.content }}</text>
            </view>

            <!-- 时间、转发、点赞评论按钮 -->
            <view class="TDD-view">
              <label>{{ item0.createTime }}</label>
            </view>

            <!-- 点赞 -->
            <view class="zan-view">
              <view class="trigon-view">
                <view class="zhuanfa">
                  <uni-icons v-if="item0.status == 1" type="email-filled" size="20"></uni-icons>
                  <uni-icons v-if="item0.status == 2" type="auth" size="20"></uni-icons>
                  <uni-icons v-else-if="item0.status == 3" type="vip-filled" size="20"></uni-icons>

                  <view v-if="item0.status == 1" class="dianzannum">已推荐</view>
                  <view v-if="item0.status == 2" class="dianzannum">已采纳</view>
                  <view v-else-if="item0.status == 3" class="dianzannum">有效推荐</view>
                </view>

                <view class="dianzan" @tap.stop="iLike(item0.id, item0.tblLike)">
                  <uni-icons v-if="item0.tblLike == null" type="heart" size="20"></uni-icons>
                  <uni-icons v-else type="heart-filled" color="red" size="20"></uni-icons>
                  <view class="dianzannum">{{ item0.likeCount }}</view>
                </view>

                <view class="pinglun" @tap.stop="showInputBox(item0.id)">
                  <uni-icons type="chat" size="20"></uni-icons>
                </view>
                <!-- <uni-fav :checked="IsChecked" class="favBtn" @click="favClick()" /> -->
              </view>

              <!-- 点赞 -->
              <view class="zan-name-view" v-if="item0.likes.length !== 0">
                <uni-icons type="heart-filled" size="20"></uni-icons>
                <block v-for="(item2, index2) in item0.likes" :key="index2">
                  <text :data-name="item2.nickName" class="zan-user">{{ item2.nickName }}</text>
                  <text class="zan-user" v-if="index2 !== item0.likes.length - 1">,</text>
                </block>
              </view>

              <!-- <view class="line"></view> -->
              <!-- 评论 -->
              <view class="discuss-view">
                <view
                  class="discuss"
                  v-for="(item3, index3) in item0.tblRecommendCommnets"
                  :key="index3"
                >
                  <label v-if="index3 < 4" :data-name="item3.nickName" class="discuss-user"
                    >{{ item3.nickName }}:</label
                  >
                  <label v-if="index3 < 4" class="content">{{ item3.comment }}</label>
                </view>
                <view class="discuss" v-if="item0.tblRecommendCommnets.length >= 3">
                  <label class="discuss-user"
                    >更多评论
                    <uni-icons
                      class="icons"
                      color="rgb(88, 103, 138)"
                      type="right"
                      size="13"
                    ></uni-icons
                  ></label>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <view v-if="isPastTargetDate" class="rbutton-view">
    <button class="rbutton" @click="rclick">
      <uni-icons type="plusempty" class="plusIcon" size="20"></uni-icons>
    </button>
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
  <!-- </view> -->
</template>

<script setup lang="ts">
import { onLaunch, onLoad, onPullDownRefresh, onShow, onReachBottom } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue'
import {
  getRecommedList,
  sendLike,
  deletLike,
  sendcommen,
  getRecommedDetail,
} from '@/services/recommed'
import debounce from '@/utils/tool'
//过审
// 获取当前时间点
const currentTime = ref(new Date())

// 计算2023年11月17号的时间点
const targetDate = new Date('2023-11-23')

// 判断当前时间是否已经过了2023年11月18号
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(true)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
  console.log(isPastTargetDate.value)
  if (isPastTargetDate.value) {
    getRecommed()
  }
  // else {
  //   console.log(isPastTargetDate.value)
  //   uni.showToast({
  //     title: '推荐部分功能尚未实现，敬请期待~',
  //     icon: 'none',
  //     duration: 2000,
  //     complete: function () {
  //       setTimeout(function () {
  //         uni.switchTab({
  //           url: '/pages/index/index',
  //         })
  //       }, 2000) // 在弹窗关闭后，延迟2秒执行页面跳转
  //     },
  //   })
  // }
}

onLoad(() => {
  getA()
})
onReachBottom(() => {
  console.log('触发上拉')
  getRecommed()
})
// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = uni.getSystemInfoSync()
let pageNum = 1
const total = ref()
//获取页面初始数据
const DataSource = ref([])
const getRecommed = debounce(async () => {
  uni.showLoading({
    title: '加载中',
  })
  if (pageNum == 1) {
    const res = await getRecommedList({
      pageNum: pageNum,
      pageSize: 10,
    })
    console.log(res.rows)
    total.value = res.total
    DataSource.value = res.rows
    pageNum = pageNum + 1
  } else {
    if (DataSource.value.length >= total.value) {
      console.log('没数据了')
      uni.showToast({
        title: '已经到底啦',
        icon: 'none',
        durationL: 800,
      })
      return
    }
    const res = await getRecommedList({
      pageNum: pageNum,
      pageSize: 10,
    })
    console.log(res.rows)
    total.value = res.total
    DataSource.value = [...DataSource.value, ...res.rows]
    pageNum = pageNum + 1
  }
  uni.hideLoading()
})

//去详情页
const rclick = () => {
  // if (uni.getStorageSync('token')) {
  //   console.log('我要推荐')
  uni.navigateTo({
    url: '/pages/recommend/makeRecd',
  })
  // } else {
  //   wx.showToast({
  //     title: '您尚未登录，请先登录',
  //     icon: 'none',
  //     duration: 1000,
  //     complete: () => {
  //       setTimeout(() => {
  //         uni.navigateTo({
  //           url: '/pages/login/login',
  //         })
  //       }, 1000)
  //     },
  //   })
  // }
}
//点赞
const exchangeObject = async (objId) => {
  console.log(objId)
  let index = DataSource.value.findIndex((obj) => obj.id === objId)
  console.log(index)
  const res = await getRecommedDetail(objId)
  console.log(res)
  if (index !== -1) {
    DataSource.value.splice(index, 1, res.data)
  }
}
const sendLikeTo = async (id) => {
  const res = await sendLike(id)
  console.log(res)
  if (res.code == 200) {
    exchangeObject(id)
  }
}
const delLike = async (id) => {
  const res = await deletLike(id)
  console.log(res)
  if (res.code == 200) {
    exchangeObject(id)
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
    uni.showToast({
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
    // 发送评论后隐藏输入框
    showInput.value = false
    // 清空评论内容
    comment.value = ''
    exchangeObject(currentItemId.value)
  }
}
const sendcomment = () => {
  console.log('点击了发送')
  console.log(currentItemId.value)
  console.log(comment.value)
  sendC()
}
const hideInput = () => {
  // 发送评论后隐藏输入框
  showInput.value = false
}

// 去recommend详情
const goRDid = ref()
onShow(() => {
  console.log(uni.getStorageSync('goRD_id'))
  goRDid.value = uni.getStorageSync('goRD_id')
  if (goRDid.value) {
    console.log('刷新！！！')
    exchangeObject(goRDid.value)
  }
})
const goRD = async (id) => {
  const res = await getRecommedDetail(id)
  uni.setStorageSync('goRD_id', id)
  console.log(res)
  uni.navigateTo({
    url: '/pages/recommend/recommendDetail?id=' + id,
  })
}
const gotoRD = (id) => {
  console.log('去详情！')
  goRD(id)
}
</script>
<style scoped>
/* pages/posts/post-detail/post-detail.wxss */

page {
  background: whitesmoke;
}

.page {
  width: 100%;
  padding-bottom: 100rpx;
  /* overflow-x: hidden */
}

/* 列表 */
.CircleList {
  background: white;
  margin-bottom: 1px;
  border-bottom: 1px solid whitesmoke;
  padding-bottom: 40rpx;
}

.body-view {
  display: flex;
}

.left-view {
  width: 20%;
}
.right-view {
  width: 75%;
}
/* 头像 */
.user-icon {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-left: 20rpx;
  margin-top: 30rpx;
  margin-right: 20rpx;
}

/* 昵称 */
.user-name {
  display: flex;
  /* height: 50rpx; */
  line-height: 50rpx;
  font-size: 32rpx;
  color: rgb(88, 103, 138);
  margin-top: 30rpx;
  margin-left: 10rpx;
}
.theme-view {
  margin: 2vh 0;
  color: #999;
  /* font-weight: 600; */
}
/* 内容 */
.theme,
.lecturename,
.user-content {
  display: flex;
  font-size: 30rpx;
  line-height: 50rpx;
  margin-left: 10rpx;
  word-break: break-all;
  overflow: hidden;
  /* font-family: 'Verdana', sans-serif; */
}
.theme {
  font-family: 'Times New Roman', serif;
  font-size: small;
}
.lecturename {
  font-family: 'Times New Roman', serif;

  font-size: x-small;
}
/* 图片 */
.photo-view {
  background: rebeccapurple;
  margin-left: 10rpx;
  margin-bottom: 20rpx;
}
.photo {
  background: rgb(255, 166, 0);
  float: left;
  margin-right: 10rpx;
  margin-top: 10rpx;
}

/* 时间、删除、点赞评论 */
.TDD-view {
  width: 100%;
  height: 60rpx;
  display: flex;
  align-items: center;
  background: white;
  pointer-events: none;
}
.TDD-view label {
  font-size: 13px;
  margin-left: 10rpx;
}

.zan-view {
  margin-top: 20rpx;
  width: 100%;
  padding-bottom: 10rpx;
  background: rgb(241, 241, 241);
  border-radius: 10rpx;
  /* margin-bottom: 20rpx; */
}
/* .zan-view{
    width:100%;
    background-color: aqua;
  } */
.trigon-view {
  display: flex;
  flex-direction: row;
  padding: 3rpx 10rpx;
  width: 100%;
  justify-content: space-between;
  border-radius: 10rpx;
  background-color: rgb(241, 241, 241);
}
.zhuanfa {
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 50rpx;
  /* width:50rpx; */
}
.dianzan {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 30rpx;
}
.dianzannum {
  font-size: 30rpx;
  margin: auto 0 auto 15rpx;
}
.pinglun {
  display: flex;
  width: 15%;
  justify-content: center;
  align-items: center;
}
.zan-name-view {
  width: 97%;
  margin: 0 auto;
  padding-bottom: 10rpx;
  margin-bottom: 10rpx;
  overflow-wrap: break-word;
  border-bottom: 1px solid rgb(213, 213, 213);
}
.zan-user {
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  color: rgb(88, 103, 138);
}

/* .line {
  width: 97%;
  height: 1px;
  background: white;
} */

/* 评论 */
.discuss-view {
  background: white;
  width: 97%;
  margin: 0 auto;
}

.discuss {
  background: rgb(241, 241, 241);
  line-height: 35rpx;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}

.discuss label {
  font-size: 26rpx;
}

.discuss-user {
  color: rgb(88, 103, 138);
  margin-left: 10rpx;
}

.content {
  margin-left: 10rpx;
}

/* 弹出框 */
.pop-up-box {
  position: absolute;
  height: 60rpx;
  border-radius: 10rpx;
  right: 90rpx;
  background: rgba(0, 0, 0, 0.7);
}
.rbutton-view {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  bottom: 3%;
  left: 50%;
  transform: translateX(-50%);
}
.rbutton {
  border-radius: 50%;
  height: 100rpx;
  width: 100rpx;
  line-height: 100rpx;
  background-color: rgb(235, 235, 235);
  margin: 2rpx;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.plusIcon {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.input-view {
  display: flex;
  position: sticky;
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
