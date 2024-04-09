<template>
  <navigator
    :url="`/pages/column/components/article?kind=${item.kind}&id=${item.id}`"
    class="post-container"
    hover-class="none"
    v-for="(item, index) in columnContents"
    :key="item.id"
  >
    <!--  -->
    <image class="post-image" :src="item.img" mode="heightFix"></image>
    <text class="post-title">{{ item.title }}</text>
    <text class="post-content">{{ item.summary }}</text>
    <view class="post-like">
      <view class="time">
        <text>{{ item.createTime }}</text>
      </view>
      <view class="hit">
        <view>
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
        <view>
          <uni-icons type="eye-filled" size="20"></uni-icons>
          <text class="post-like-font">{{ item.viewsNums }}</text>
        </view>
      </view>
    </view>
  </navigator>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { getColumnsAPI, likeUpAPI, likeDownAPI } from '@/services/column'
import { onShow } from '@dcloudio/uni-app'
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
  flex-direction: column;
  width: 95%;
  margin: 0 auto;
  margin-top: 20rpx;
  // margin-bottom: 40rpx;
  background-color: #fff;
  border-bottom: 1px solid #b5b5b5;
  padding-bottom: 5px;
}

.post-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  padding-left: 10rpx;
}

.post-image {
  max-width: 90vw;
  height: 400rpx;
  margin: 0 auto;
  margin-bottom: 15px;
  border-radius: 5rpx;
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
  justify-content: space-between;
  font-size: 13px;
  line-height: 16px;
  // margin-left: 10px;
}

.hit {
  display: flex;
  justify-content: space-between;
  width: 100px;
}

.time {
  color: #7a7a7a;
  font-size: 25rpx;
  padding-left: 15rpx;
}

.post-like-image {
  width: 30rpx;
  height: 30rpx;
  margin-right: 8px;
  vertical-align: middle;
}

.post-like-font {
  vertical-align: middle;
  font-size: 30rpx;
  margin: 0 20px 3rpx 0;
}
</style>
