<template>
  <div class="out-wrapper">
    <!--pages/posts/post-detail/post-detail.wxml-->
    <scroll-view scroll-y>
      <view class="container">
        <view class="author-date">
          <image class="avatar" :src="details?.avatar"></image>
          <view class="author-view">
            <text class="author">{{ details?.nickName }}</text>
            <text class="const-text">推荐于</text>
            <text class="date">{{ details?.createTime }}</text>
          </view>
          <view v-if="details?.status === 3" class="active-recommend">
            <image src="../../static/recommend/active-recommend.png" mode="heightFix" />
          </view>
        </view>

        <view class="activityD">
          <text class="title">{{ details?.theme }}</text>
          <text class="date">主讲人：{{ details?.lecturerName }}</text>
        </view>

        <view class="tool">
          <text class="text">{{ details?.content }}</text>
        </view>
        <view @tap.stop="navToAct" class="activity">
          <view class="img-wrapper">
            <image class="activity-img" :src="details.tblActivity.lng" mode="scaleToFill" />
          </view>
          <view class="activity-content">
            <view class="title">{{ details.tblActivity.userImg2 }}</view>
            <view class="speaker">主讲人： {{ details.tblActivity.speakerName }}</view>
          </view>
        </view>
        <view class="wrapper">
          <view class="TLC">
            <view class="dianzannum" @click="iLike(details.id, details.tblLike)">
              <!-- <uni-icons v-if="details.tblLike == null" type="heart" size="20"></uni-icons>
            <uni-icons v-else type="heart-filled" color="red" size="20"></uni-icons> -->
              <image class="dianzan-img" v-if="details.tblLike == null" src="../../static/column/heart.png"
                mode="scaleToFill" />
              <image class="dianzan-img" v-else src="../../static/column/heart-active.png" mode="scaleToFill" />
              <view>{{ details.likeCount }}</view>
            </view>
            <view class="comment">
              <view @tap="showInputBox(details.id)">
                <image class="comment-img" src="../../static/recommend/comment.png" mode="scaleToFill" />
                <text>评论</text>
              </view>
            </view>
          </view>

          <view class="zan-name-view" v-if="details.likes.length !== 0">
            <image class="dianzan-img" src="../../static/column/heart.png" mode="scaleToFill" />
            <block v-for="(item2, index2) in details.likes" :key="index2">
              <text bindtap="TouchZanUser" :data-name="item2.nickName" class="zan-user">
                {{ item2.nickName }}
              </text>
              <text class="zan-user" v-if="index2 !== details.likes.length - 1">,&nbsp;</text>
            </block>
          </view>

          <view class="line"></view>

          <view class="discuss-view">
            <view class="discuss" v-for="(item3, index3) in details.tblRecommendCommnets" :key="index3">
              <label bindtap="TouchZanUser" :data-name="item3.nickName" class="discuss-user">{{ item3.nickName
                }}:</label>
              <label class="content">{{ item3.comment }}</label>
            </view>
          </view>
        </view>
      </view>
      <view class="input-view" v-if="showInput">
        <input class="inputstyle" v-model="comment" type="text" :focus="isInputFocused" placeholder="请输入评论"
          @blur="hideInput" />
        <button class="btn-view" :disabled="comment === ''" @click="sendcomment">发送</button>
      </view>
    </scroll-view>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { onLaunch, onLoad } from '@dcloudio/uni-app'
import { getRecommedDetail, sendLike, deletLike, sendcommen } from '@/services/recommed'

type ActivityInfo = {
  userImg2: string
  speakerName: string
  lng: string
  id: number
}
type detailsInfo = {
  avatar: string
  nickName: string
  createTime: string
  theme: string
  lecturerName: string
  content: string
  status: number
  id: number
  tblLike: boolean
  likeCount: number
  likes: Array<{ nickName: string }>
  tblRecommendCommnets: Array<{ nickName: string; comment: string; createTime: string }>
  tblActivity:ActivityInfo
}

const props = defineProps<{
  id: number
}>()
const details = ref<detailsInfo>()
const getD = async (id) => {
  const res = await getRecommedDetail(id)
  details.value = res.data
}
onLoad(() => {
  getD(props.id)
})

//点赞
const sendLikeTo = async (id) => {
  const res = await sendLike(id)
  if (res.code == 200) {
    getD(props.id)
  }
}
const delLike = async (id) => {
  const res = await deletLike(id)
  if (res.code == 200) {
    getD(props.id)
  }
}
const iLike = (id, tblLike) => {
  if (uni.getStorageSync('token')) {
    if (tblLike) {
      delLike(id)
    } else {
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

// 跳转活动详情
const navToAct = () => {
  uni.navigateTo({
    url: `/pages/activity/ActivityDetails?id=${details.value.tblActivity.id}`,
  })
}

//评论
const showInput = ref(false)
const comment = ref('')
const currentItemId = ref<number>()
// 自动弹出键盘
const isInputFocused = ref(true)
const showInputBox = (itemId) => {
  if (uni.getStorageSync('token')) {
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
  sendC()
}
const hideInput = () => {
  showInput.value = false
  // 发送评论后隐藏输入框
  showInput.value = false
}

</script>
<style scoped lang="scss">
/* pages/posts/post-detail/post-detail.wxss */
.out-wrapper {
  width: 83%;
  margin: 0 auto;
  height: fit-content;
  padding-bottom: 20rpx;
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .author-date {
      display: flex;
      margin-top: 25rpx;
      margin-bottom: 20rpx;
      width: 100%;
      align-items: center;

      .avatar {
        width: 110rpx;
        height: 110rpx;
        margin-right: 20rpx;
        border-radius: 50%;
      }

      .author-view {
        display: flex;
        flex-direction: column;
        justify-content: center;

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
      }

      .active-recommend {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: 50rpx;
      }
    }

    .activityD {
      display: flex;
      flex-direction: column;
      width: 100%;

      .title {
        font-size: 36rpx;
        font-weight: 700;
        letter-spacing: 2px;
        margin-bottom: 8rpx;
        color: #4b556c;
      }

      .date {
        font-size: 25rpx;
        color: #666;
      }
    }

    .tool {
      line-height: 65rpx;
      margin: 2vh auto 0;
      font-size: 34rpx;
      word-break: break-all;
      overflow: hidden;
      text-indent: 60rpx;
    }

    .activity {
      margin-top: 15rpx;
      display: flex;
      padding: 20rpx;
      background-color: rgb(245, 245, 245);
      border-radius: 20rpx;
      height: 200rpx;

      .img-wrapper {
        width: 20%;
        height: 100%;
        background-color: rgb(88, 103, 138);
        border-radius: 8rpx;
        margin-right: 12rpx;
      }

      .activity-content {
        flex: 1;

        .title {
          font-size: 30rpx;
          color: #000;
          font-weight: bold;
          margin: 5rpx 0 10rpx 0;
        }

        .speaker {
          font-size: 25rpx;
          color: #000;
        }
      }
    }

    .wrapper {
      width: 100%;
      border-radius: 10rpx;
      margin: 25rpx auto;
      padding: 20rpx;
      background-color: rgb(241, 241, 241);

      .TLC {
        font-size: 29rpx;
        width: 90%;
        display: flex;
        align-items: center;
        margin-bottom: 10rpx;

        .dianzannum {
          display: flex;
          align-items: center;
          margin-right: 30rpx;

          .dianzan-img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 5rpx;
          }
        }

        .comment {
          display: flex;
          align-items: center;

          .comment-img {
            width: 30rpx;
            height: 30rpx;
            margin-right: 5rpx;
          }
        }
      }

      .zan-name-view {
        display: flex;
        align-items: center;

        .dianzan-img {
          width: 20rpx;
          height: 20rpx;
          margin-right: 8rpx;
        }

        .zan-user {
          font-size: 24rpx;
          line-height: 40rpx;
          height: 40rpx;
          color: rgb(88, 103, 138);
        }
      }

      .line {
        height: 1px;
        background-color: #ccc;
        margin-top: 15rpx;
      }

      .discuss-view {
        margin-top: 10rpx;
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
        color: rgb(88, 103, 138);

        .content {
          color: #000;
          margin-left: 8rpx;
        }
      }
    }
  }
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
