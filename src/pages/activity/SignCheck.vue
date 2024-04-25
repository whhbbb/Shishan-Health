<template>
  <view class="sign-in-wrapper">
    <view class="sign-in">
      <view class="content">
        <image
          class="sign-in-img"
          v-if="result === 3"
          src="../../static/activity/success.png"
          mode="scaleToFill"
        />
        <image
          v-else
          class="sign-in-img"
          src="../../static/activity/warn.png"
          mode="scaleToFill"
        />
        <view class="content-detail">
          {{ message[result - 1].detail }}
        </view>
      </view>
      <view class="nav">
        <button @tap="navTo" class="nav-btn">{{ message[result-1].btn }}</button>
      </view>
    </view>
  </view>
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
const message = [
  {
    detail:'未报名',
    btn:'点击报名'
  },
  {
    detail:'请勿重复签到',
    btn:'我知道了'
  },
  {
    detail:'签到成功',
    btn:'我知道了'
  },
  {
    detail:'签到截止',
    btn:'我知道了'
  },
  {
    detail:'签到未开始',
    btn:'我知道了'
  }
]

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
  result.value = 1
}

let AId = props.id

const navTo = () => {
  if(result.value === 1){
    uni.navigateTo({
      url: '/pages/activity/SignApply?id=' + AId,
    })
  }else{
    uni.navigateBack()
  }
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

<style lang="scss">
.sign-in-wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .sign-in {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .content{
      display: flex;
      flex-direction: column;
      align-items: center;
      .sign-in-img {
      width: 130rpx;
      height: 130rpx;
    }
    .content-detail{
      margin-top: 20rpx;
      font-size: 38rpx;
      font-weight: bold;
      text-align: center;
    }
    }
    .nav-btn{
      width: 300rpx;
      border-radius: 50rpx;
      color: #0077B6;
      font-weight: bold;
      background-color: rgb(214, 243, 251);
    }
  }
}
</style>
