<template>
  <div class="tip-page">
    <div class="content">
      <uni-icons
        class="icons"
        v-if="result === 1 || result === 2"
        type="info"
        color="#ffa500"
        size="100"
      ></uni-icons>
      <uni-icons
        class="icons"
        v-else-if="result === 3"
        type="checkbox-filled"
        color="green"
        size="100"
      ></uni-icons>
      <uni-icons class="icons" v-else type="clear" color="red" size="100"></uni-icons>

      <div class="message">{{ message[result - 1] }}</div>

      <view class="tag-view">
        <uni-tag type="warning" v-if="result === 1" @click="toapply" text="未报名 点击报名" />
        <uni-tag type="error" v-else-if="result === 4" text="活动已结束" />
        <uni-tag type="error" v-else-if="result === 5" text="报名未开始" />
      </view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { http } from '../../utils/http'
import { onLoad } from '@dcloudio/uni-app'

const result = ref<number>(1)
const props = defineProps<{
  id: number
}>()
console.log(props.id)
const message = ref<string[]>(['签到失败', '请勿重复签到', '签到成功', '签到截止', '签到失败'])

const postFeedbackAPI = (data: any) => {
  return http<any>({
    url: '/system/useractivity/register',
    method: 'PUT',
    data: {
      activityId: data,
    },
  })
}

const postFeedback = async (AId: number) => {
  const res = await postFeedbackAPI(AId)
  console.log(res)
  result.value = res.data
}

let AId = props.id

const toapply = () => {
  console.log('去报名！')
  uni.redirectTo({
    url: '/pages/index/index',
  })
  uni.navigateTo({
    url: '/pages/activity/ActivityDetails?id=' + AId,
  })
}
onLoad((options) => {
  let obj = wx.getLaunchOptionsSync()
  let query = null

  if (options.scene || obj.query.scene) {
    console.log('options.scene', options)
    console.log('obj.query.scene', obj.query)
    // 这里是用开发者工具模拟的时候要先用 encodeURIComponent 编译，模拟真实传递参数的效果，项目发布审核的时候这句话要注释掉
    // query = options ? encodeURIComponent(options.scene) : encodeURIComponent(obj.query.scene);
    query = options ? decodeURIComponent(options.scene) : decodeURIComponent(obj.query.scene)
    console.log(query)
    const aNo = query
    console.log('aNo', aNo)
    AId = Number(aNo)
  }
  // const scene = decodeURIComponent(options.scene)
  // console.log("query",scene)
  // if(options.scene){
  //   const aNo = scene.split('=')[1]
  //   console.log("aNo",aNo)
  //   AId =Number(aNo)
  // }
  console.log('props', props)
  if (uni.getStorageSync('token')) {
    postFeedback(AId)
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
})
</script>

<style>
.tip-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icons {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
}

.message {
  margin-top: 1vh;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}
</style>
