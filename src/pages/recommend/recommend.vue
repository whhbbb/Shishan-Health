<template v-if="isPastTargetDate">
  <view v-if="isPastTargetDate">
    <view class="page" :style="{ paddingBottom: safeAreaInsets?.bottom! + 100 + 'rpx' }">
      <!-- 列表 -->
      <view class="CircleList" v-for="(item0, index0) in DataSource" :key="index0">
        <!-- 头像、昵称、内容 -->
        <view class="body-view">
          <!-- 头像 -->
          <!-- <view class="left-view">
            <image class="user-icon" :src="item0.avatar"></image>
          </view> -->
          <view @tap="gotoRD(item0.id)" class="center-view">
            <!-- 昵称 -->
            <view class="user-name-view">
              <view class="left-view">
                <view class="left-view-icon">
                  <image class="user-icon" :src="item0.avatar"></image>
                </view>
                <view class="left-view-contents">
                  <label class="user-name">{{ item0.nickName }}</label>
                  <label class="time">{{ item0.createTime }}</label>
                </view>
              </view>
              <view class="recommend" v-if="item0.status == 3">
                <image class="recommend-icon" src="../../static/recommend/active-recommend.png" mode="heightFix" />
              </view>
            </view>
            <!-- 内容 -->
            <view class="user-content-view">
              <!-- <view class="theme-view">
                <text class="user-content">主题:{{ item0.theme }}</text>
                <text class="user-content">主讲人:{{ item0.lecturerName }}</text>
              </view> -->
              <text class="user-content">{{ item0.content }}</text>
            </view>
            <!-- 推荐的活动 -->
            <view @tap.stop="navToAct(item0.tblActivity?.id)" class="activity">
              <view class="img-wrapper">
                <image
                  class="activity-img"
                  :src="item0.tblActivity?.lng"
                  mode="scaleToFill"
                />
              </view>
              <view class="activity-content">
                <view class="title">{{ item0.tblActivity?.userImg2 }}</view>
                <view class="speaker">主讲人： {{ item0.tblActivity?.speakerName }}</view>
              </view>
            </view>
            <!-- 工具栏 -->
            <view class="tool-box">
              <view class="like-up">
                <image
                  v-if="item0.tblLike == null"
                  class="like"
                  src="../../static/column/heart.png"
                  mode="scaleToFill"
                  @tap.stop="iLike(item0.id, item0.tblLike)"
                />
                <image
                  v-else
                  class="like"
                  src="../../static/column/heart-active.png"
                  mode="scaleToFill"
                  @tap.stop="iLike(item0.id, item0.tblLike)"
                />
                <text>{{ item0.likeCount }}</text>
              </view>
              <view class="comment">
                <image
                  class="comment-img"
                  src="../../static/recommend/comment.png"
                  mode="scaleToFill"
                />
                <!-- <text>{{ item0.tblRecommendCommnets.length }}</text> -->
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
  pageNum = 1
  const res = await getAudit()
  isPastTargetDate.value = res.data
  if (isPastTargetDate.value) {
    getRecommed()
  }
}

const navToAct = (id) => {
  uni.navigateTo({
    url:`/pages/activity/ActivityDetails?id=${id}`
  })
}

onReachBottom(() => {
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
    total.value = res.total
    DataSource.value = res.rows
    pageNum = pageNum + 1
  } else {
    if (DataSource.value.length >= total.value) {
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
    total.value = res.total
    DataSource.value = [...DataSource.value, ...res.rows]
    pageNum = pageNum + 1
  }
  uni.hideLoading()
})

//去详情页
const rclick = () => {
  uni.navigateTo({
    url: '/pages/recommend/makeRecd',
  })
}
//点赞
const exchangeObject = async (objId) => {
  let index = DataSource.value.findIndex((obj) => obj.id === objId)
  const res = await getRecommedDetail(objId)
  if (index !== -1) {
    DataSource.value.splice(index, 1, res.data)
  }
}
const sendLikeTo = async (id) => {
  const res = await sendLike(id)
  if (res.code == 200) {
    exchangeObject(id)
  }
}
const delLike = async (id) => {
  const res = await deletLike(id)
  if (res.code == 200) {
    exchangeObject(id)
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
// 去recommend详情
const goRDid = ref()
const goRD = async (id) => {
  const res = await getRecommedDetail(id)
  uni.setStorageSync('goRD_id', id)
  uni.navigateTo({
    url: '/pages/recommend/recommendDetail?id=' + id,
  })
}
const gotoRD = (id) => {
  goRD(id)
}
onLoad(() => {
  getA()
})
onShow(() => {
  getA()
})
</script>
<style scoped lang="scss">
/* pages/posts/post-detail/post-detail.wxss */
page{
  width: 100%;
}

.page {
  width: 100%;
  padding-bottom: 100rpx;
  /* overflow-x: hidden */
}

/* 列表 */
.CircleList {
  background: white;
  width: 81%;
  margin: 0 auto;
  margin-bottom: 1px;
  border-bottom: 1px solid rgb(237, 235, 235);
  padding-bottom: 40rpx;
  padding-top: 30rpx;
}

.body-view {
  display: flex;
}

.center-view {
  width: 100%;
  .user-name-view {
    display: flex;
    margin-bottom: 20rpx;
    .left-view {
      display: flex;
      .left-view-icon{

        /* 头像 */
        .user-icon {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
      }

      .left-view-contents{
        /* 昵称 */
        .user-name {
          display: flex;
          font-size: 32rpx;
          color: rgb(88, 103, 138);
        }

        .time{
          font-size: 25rpx;
        }
      }
    }
    .recommend{
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .recommend-icon{
        height: 45rpx;
      }
    }
  }

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
  text-indent: 55rpx;
  font-size: 30rpx;
  line-height: 50rpx;
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

/* .line {
  width: 97%;
  height: 1px;
  background: white;
} */

.activity{
  margin-top: 15rpx;
  display: flex;
  // align-items: center;
  padding: 20rpx;
  background-color: rgb(245, 245, 245);
  border-radius: 20rpx;
  .img-wrapper{
    margin:auto 0;
    width: 20%;
    height: 160rpx;
    background-color: rgb(88, 103, 138);
    border-radius: 8rpx;
    margin-right: 12rpx;
  }
  .activity-content{
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title{
      font-size: 30rpx;
      color: #000;
      font-weight: bold;
      margin: 5rpx 0 10rpx 0;
    }
    .speaker{
      font-size: 25rpx;
      color: #000;
    }
  }
}

/* 工具栏 */
.tool-box{
  display: flex;
  align-items: center;
  margin-top: 18rpx;
  .like-up{
    margin-right: 20rpx;
    .like{
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
  .comment{
    .comment-img{
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }
  }
}

.rbutton-view {
  background-color: rgba(0, 0, 0, 0);
  position: fixed;
  bottom: 3%;
  right: 0%;
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
</style>
