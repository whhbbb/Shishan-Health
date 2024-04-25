<template>
  <PageSkeleton v-if="showSkeleton"></PageSkeleton>
  <navigator
    v-else-if="!showSkeleton && columnContents.length > 0"
    :url="`/pages/column/components/article?kind=${item.kind}&id=${item.id}`"
    class="post-container"
    hover-class="none"
    v-for="(item, index) in columnContents"
    :key="item.id"
  >
    <!--  -->
    <image class="post-image" :src="item.img" mode="scaleToFill"></image>
    <view class="post-right">
      <text class="post-title">{{ item.title }}</text>
      <!-- <text class="post-content">{{ item.summary }}</text> -->
      <view class="post-like">
        <view class="time">
          <text>{{ item.createTime }}</text>
        </view>
      </view>
      <view class="hit">
        <view class="hit-inner">
          <image class="post-like-image" src="../../../static/column/eyes.png"></image>
          <text class="post-like-font">{{ item.viewsNums }}</text>
        </view>
        <view class="hit-inner">
          <image
            v-if="!item.tblLike"
            class="post-like-image"
            @tap.stop="likeUp(item.id, item.tblLike)"
            src="../../../static/column/heart.png"
          ></image>
          <image
            v-else
            class="post-like-image"
            @tap.stop="likeUp(item.id, item.tblLike)"
            src="../../../static/column/heart-active.png"
          ></image>
          <text class="post-like-font">{{ item.likeCount }}</text>
        </view>
      </view>
    </view>
    <view class="icon">
      <uni-icons type="right" size="20"></uni-icons>
    </view>
  </navigator>
  <view v-else>
    <view class="no-content">
      <!-- <uni-icons type="notice" size="40"></uni-icons>
      <text>暂无数据</text> -->
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getColumnsAPI, likeUpAPI, likeDownAPI } from '@/services/column'
import { onShow } from '@dcloudio/uni-app'
import PageSkeleton from '@/pages/column/PageSkeleton.vue'
type columnItem = {
  // 精彩专栏编号
  id: number
  // 精彩专栏标题
  title: string
  // 精彩专栏种类
  kind?: string
  // 简介
  summary?: string
  // 内容
  content: string
  // 点赞数
  likeCount: number
  // 浏览数
  viewsNums: number
  // 创建时间
  createTime: string
  // 图片
  img: string
  // 点赞状态
  tblLike?: object
}
const props = defineProps({
  kind: {
    type: Number,
    default: 1,
  },
})
// 判断是否显示骨架屏
const showSkeleton = ref(true)
const columnContents = ref<columnItem[]>([])
// 点赞或取消点赞
const likeUp = (id: number, tblLike: object) => {
  // 判断是否有token
  if (uni.getStorageSync('token')) {
    if (tblLike) {
      console.log('取消点赞' + props.kind)
      likeDownAPI(id).then((res) => {
        console.log(res)
        if (res.code === 200) {
          getColumns(props.kind)
          console.log('取消点赞成功')
        }
      })
    } else {
      console.log('点赞' + props.kind)
      likeUpAPI(id).then((res) => {
        console.log(res)
        if (res.code === 200) {
          getColumns(props.kind)
          console.log('点赞成功')
        }
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
// 获取数据
const getColumns = async (kind: Number) => {
  const res = await getColumnsAPI({ kind: kind })
  console.log(res)
  if (res.code === 200) {
    columnContents.value = res.rows
    showSkeleton.value = false
  } else {
    uni.showToast({
      title: '获取数据失败',
      icon: 'none',
    })
  }
}
onMounted(() => {
  console.log(props.kind)
  getColumns(props.kind)
})
onShow(() => {
  getColumns(props.kind)
})
</script>

<style lang="scss">
.post-container {
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: 20rpx;
  // margin-bottom: 40rpx;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 20rpx;
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5%;
  }
}

.post-image {
  width: 40%;
  height: 180rpx;
  margin: 0 auto;
  border-radius: 10rpx;
  margin: 10rpx 10rpx 10rpx 0;
}
.post-right{
  margin: 15rpx 0 15rpx 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .post-title {
    width: 45vw;
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    padding-left: 10rpx;
  }
}

.post-content {
  color: #666;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  line-height: 40rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.post-like {
  display: flex;
  font-size: 13px;
  line-height: 16px;
}

.hit {
  flex: 1;
  display: flex;
  align-items: flex-end;
  width: 100px;
  padding-left: 12rpx;
  .hit-inner{
    width: 90rpx;
    display: flex;
    align-items: center;
    margin-right: 30rpx;
  }
}

.time {
  color: #7a7a7a;
  font-size: 25rpx;
  padding-left: 10rpx;
}

.post-like-image {
  font-size: 15rpx;
  width: 30rpx;
  height: 30rpx;
  margin-right: 10rpx;
}

.post-like-font {
  font-size: 28rpx;
}
</style>
