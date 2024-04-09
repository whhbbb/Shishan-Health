<template>
  <view class="container" v-if="isPastTargetDate">
    <view class="ad_popError" v-if="isShowPop !== ''">{{ isShowPop }}</view>
    <view class="activity">
      <!-- 输入活动相关信息：活动主题、姓名、学院、、学号、举办日期、举办时间、举办地点、人数估计、线上地址、发起人电话、发起人简介，使用uniapp的uni-form组件 -->
      <!-- 使用uni-form -->
      <view class="forms">
        <uni-forms
          ref="baseform"
          label-position="top"
          :rules="rules"
          :model="content"
          label-width="100%"
        >
          <uni-forms-item required label="活动主题" name="title">
            <uni-easyinput v-model="content.title" placeholder="请输入活动主题"></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item required label="活动简介" name="introduction">
            <textarea class="text" :maxlength="100" v-model="content.introduction"></textarea>
          </uni-forms-item>
          <uni-forms-item required label="发布者姓名" name="name">
            <uni-easyinput v-model="content.name" placeholder="请输入姓名"></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item required label="学院" name="college">
            <uni-combox
              :candidates="colleges.map((item) => item.value)"
              placeholder="请选择所在学院"
              v-model="content.college"
            />
          </uni-forms-item>
          <uni-forms-item required label="学号" name="studentId">
            <uni-easyinput v-model="content.studentId" placeholder="请输入学号"></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item
            required
            label="电话"
            name="phone"
            style="white-space: nowrap; width: 30rpx"
          >
            <uni-easyinput v-model="content.phone" placeholder="请输入发起人电话"></uni-easyinput>
          </uni-forms-item>
          <!-- 主讲人姓名 -->
          <uni-forms-item required label="主讲人姓名" name="sponsorName">
            <uni-easyinput
              v-model="content.sponsorName"
              placeholder="请输入主讲人姓名"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item required label="主讲人简介" name="sponsorIntroduction">
            <textarea
              class="text"
              :maxlength="100"
              v-model="content.sponsorIntroduction"
            ></textarea>
          </uni-forms-item>
          <uni-forms-item required label="举办时间" name="time">
            <uni-datetime-picker v-model="content.time" type="datetime" />
          </uni-forms-item>
          <uni-forms-item required label="报名开始时间" name="startTime">
            <uni-datetime-picker v-model="content.startTime" type="datetime" />
          </uni-forms-item>
          <uni-forms-item required label="举办地点" name="address">
            <!-- <uni-data-picker :localdata="addresses" popup-title="请选择举办地点" v-model="content.address" /> -->
            <uni-easyinput v-model="content.address" placeholder="请输入举办地点"></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item required label="人数限制" name="population">
            <uni-easyinput
              v-model="content.population"
              placeholder="请输入人数限制"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item label="学院限制" class="checkbox-container">
            <uni-data-checkbox
              :multiple="true"
              class="checkbox-item"
              v-model="selectedColleges"
              :localdata="colleges"
              mode="default"
            />
          </uni-forms-item>
          <uni-forms-item>
            <view label="学院报名人数限制">
              <uni-section
                v-for="(college, index) in selectedColleges"
                :key="index"
                :title="`设置${college}的报名人数`"
                type="line"
                padding
              >
                <uni-number-box
                  :max="1500"
                  v-model="populationLimit.find((item) => item.college === college).population"
                >
                </uni-number-box>
              </uni-section>
            </view>
          </uni-forms-item>
          <uni-forms-item label="线上地址" name="onlineAddress">
            <uni-easyinput
              v-model="content.onlineAddress"
              placeholder="请输入线上地址，没有则不填"
            ></uni-easyinput>
          </uni-forms-item>
          <uni-forms-item required label="活动类型" class="checkbox-container" name="sort">
            <uni-data-checkbox
              v-model="content.sort"
              class="checkbox-item"
              :localdata="typeList"
            ></uni-data-checkbox>
          </uni-forms-item>

          <view class="btns">
            <button @tap="submit" class="btn" type="primary">提交</button>
            <button @tap="reset" class="btn" type="warn">重置</button>
          </view>
        </uni-forms>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  getCollegeListAPI,
  editActivityAPI,
  getLaunchPermissionAPI,
  getActivityInfoAPI
} from '@/services/ActivityLaunch'
import { ref, reactive, computed } from 'vue'

import { onUnload, onShow } from '@dcloudio/uni-app'
import debounce from '@/utils/tool'
//过审
// 获取当前时间点
// const currentTime = ref(new Date());

// // 计算2023年11月17号的时间点
// const targetDate = new Date('2023-11-23');

// 判断当前时间是否已经过了2023年11月17号
import { getAudit } from '@/services/Audit'
const isPastTargetDate = ref<boolean>(false)
const getA = async () => {
  const res = await getAudit()
  console.log(res)
  isPastTargetDate.value = res.data
}
const rules = {
  studentId: {
    rules: [{ required: true, errorMessage: '学号不能为空' }],
  },
  phone: {
    rules: [
      { required: true, errorMessage: '电话不能为空' },
      { minLength: 11, maxLength: 11, errorMessage: '电话必须为11位数字' },
      {
        pattern: /^1[3-9]\d{9}$/,
        errorMessage: '非正确电话号码',
      },
    ],
  },
  population: {
    rules: [
      // population不能为0
      {
        required: true,
        errorMessage: '人数不能为空',
      },
      {
        pattern: /^\d+$/,
        errorMessage: '人数必须为数字',
      },
    ],
  },
  title: {
    rules: [{ required: true, errorMessage: '活动主题不能为空' }],
  },
  name: {
    rules: [{ required: true, errorMessage: '姓名不能为空' }],
  },
  college: {
    rules: [{ required: true, errorMessage: '学院不能为空' }],
  },
  time: {
    rules: [{ required: true, errorMessage: '时间不能为空' }],
  },
  startTime: {
    rules: [{ required: true, errorMessage: '报名开始时间不能为空' }],
  },
  address: {
    rules: [{ required: true, errorMessage: '地点不能为空' }],
  },
  sponsorName: {
    rules: [{ required: true, errorMessage: '主讲人姓名不能为空' }],
  },
  introduction: {
    rules: [{ required: true, errorMessage: '活动简介不能为空' }],
  },
  sponsorIntroduction: {
    rules: [{ required: true, errorMessage: '主讲人简介不能为空' }],
  },
  sort: {
    rules: [{ required: true, errorMessage: '活动类型不能为空' }],
  },
}
type address = {
  value: string
  text: string
  children?: address[]
}
type college = {
  value: string
  text: string
}
type form = {
  // 活动主题、姓名、学院、、学号、举办日期、举办时间、举办地点、人数估计、线上地址、发起人电话、主讲人简介
  title: string
  name: string
  college: string
  studentId: string
  time: string
  startTime: string
  address: string
  population: string
  onlineAddress: string
  phone: string
  introduction: string
  sponsorIntroduction: string
  sponsorName: string
  deptNums?: Array<object>
  sort: number
  id:number
}
type limit = {
  college?: string
  population: number
  id: number
}
const props = defineProps<{
  id: number
}>()
const content = ref<form>({
  title: '',
  name: '',
  college: '',
  studentId: '',
  time: '',
  startTime: '',
  address: '',
  population: '',
  onlineAddress: '',
  phone: '',
  introduction: '',
  sponsorIntroduction: '',
  sponsorName: '',
  sort: 1,
  id:null
})
const colleges = ref<college[]>([])
const selectedColleges = ref<string[]>([])
// 选中学院
// const selectedCollegeChange: UniHelper.UniDataCheckboxMultipleOnChange = (e) => {
//   console.log(e)
//   console.log(selectedColleges.value)
//   console.log(populationLimit.value)
// }

const populationLimit = ref<limit[]>([])
let newLimit = ref<any>([])

const editActivity = async (data: any) => {
  console.log('显示加载中')
  const res = await editActivityAPI(data)
  console.log(res)
  uni.hideLoading()
  if (res.code === 200) {
    uni.hideLoading()
    console.log('取消加载中')
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
      complete: () => {
        setTimeout(() => {
          uni.navigateBack({
            delta: 1,
          })
          reset()
        }, 1000)
      },
    })
  } else {
    uni.showToast({
      title: '活动修改失败',
      icon: 'none',
    })
  }
}

// 表单校验
const baseform = ref<any>()
const isShowPop = ref<any>('')
const ohShitfadeOut = () => {
  console.log('xianshi ')
  const fadeOutTimeout = setTimeout(() => {
    isShowPop.value = ''
    clearTimeout(fadeOutTimeout)
  }, 3000)
}
// 按钮提交
const submit = debounce(() => {
  baseform.value
    .validate()
    .then((res: form) => {
      // 求学院限制人数总和
      let sum: number = 0
      populationLimit.value.forEach((item: any) => {
        sum += item.population
      })
      console.log(res)
      if (res) {
        if (selectedColleges.value.length === 0) {
          newLimit.value = []
        }
        uni.showLoading({
          title: '提交中...',
        })
        populationLimit.value.forEach((item) => {
          if (selectedColleges.value.some((college) => college === item.college)) {
            console.log(item.college)
            newLimit.value.push({
              deptId: item.id,
              maxNum: item.population,
            })
          }
        })

        const needContent = {
          id: content.value.id,
          userImg2: content.value.title,
          userName: content.value.name,
          hbKeyword: content.value.college,
          userTel: content.value.studentId,
          lat: content.value.time,
          startTime: content.value.startTime,
          address: content.value.address,
          hot: parseInt(content.value.population),
          qphone: content.value.phone,
          //
          sort: content.value.sort,
          details: content.value.introduction,
          cityname: content.value.onlineAddress,
          speakerName: content.value.sponsorName,
          img: content.value.sponsorIntroduction,
          deptNums: newLimit.value,
          state:4,
        }
        console.log(needContent)
        editActivity(needContent)
      }
    })
    .catch((res) => {
      console.log(res)
      uni.hideLoading()
      isShowPop.value = res[0].errorMessage
      ohShitfadeOut()
    })

  // console.log(content.value)
})
// 重置
const reset = () => {
  uni.removeStorageSync('content')
  content.value = {
    title: '',
    name: '',
    college: '',
    studentId: '',
    time: '',
    startTime: '',
    address: '',
    population: '',
    onlineAddress: '',
    phone: '',
    sort: 1,
    introduction: '',
    sponsorIntroduction: '',
    sponsorName: '',
    id:content.value.id
  }
  populationLimit.value.forEach((item) => {
    item.population = 0
  })
  newLimit.value = []
  selectedColleges.value = []
}
// 保存
// const save = () => {
//   uni.setStorageSync('content', content.value)
//   uni.showToast({
//     title: '已保存！',
//     icon: 'success',
//   })
// }
// 获取学院列表
const getCollegeList = async () => {
  const res = await getCollegeListAPI()
  colleges.value = res.data.map((item: any) => ({
    value: item.deptName,
    text: item.orderNum + item.deptName,
  }))
  populationLimit.value = res.data.map((item: any) => ({
    college: item.deptName,
    population: 0,
    id: item.deptId,
  }))
  console.log(populationLimit.value)
}
// 获取修改活动的权限
const getEditPermission = async () => {
  const res = await getLaunchPermissionAPI()
  if (res.code !== 200) {
    uni.showToast({
      title: '您没有修改活动的权限',
      icon: 'none',
    })
    setTimeout(() => {
      uni.switchTab({
        url: '/pages/index/index',
      })
    }, 800)
  } else {
    getCollegeList()
    getOriginValue()
    // if (uni.getStorageSync('content')) {
    //   content.value = uni.getStorageSync('content')
    // }
  }
}
// 获取修改活动原本的信息
const getOriginValue=async()=>{
  const res = await getActivityInfoAPI(props.id);
  content.value = {
    id: res.data.id,
    title: res.data.userImg2,
    name: res.data.userName,
    college: res.data.hbKeyword,
    studentId: res.data.userTel,
    time: res.data.lat,
    startTime: res.data.startTime,
    address: res.data.address,
    population: res.data.hot,
    onlineAddress: res.data.cityname,
    phone: res.data.qphone,
    sort: res.data.sort,
    introduction: res.data.details,
    sponsorIntroduction: res.data.img,
    sponsorName: res.data.speakerName,
  }
  // newLimit.value = res.data.deptNums
  selectedColleges.value = res.data.deptActivities.map((item:any)=>item.deptName)
  // populationLimit.value.forEach((item) => {
  //   item.population = res.data.deptActivities.find((i:any)=>i.deptName===item.college).maxNum
  //   console.log(item.population)
  // })
  res.data.deptActivities.forEach((item:any)=>{
    populationLimit.value.find((i:any)=>i.college===item.deptName).population=item.maxNum
  })
}
onShow(() => {
  getA()
  getEditPermission()
})
const typeList = [
  {
    text: '学术晚茶',
    value: 1,
  },
  {
    text: '学术社区',
    value: 2,
  },
]
onUnload(()=>{
  // 触发事件，并传递数据
  uni.$emit('backPageData', { state:1 });
})
</script>

<style lang="scss">
//
.activity {
  // width: 100vw;
  .forms {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 0 auto;

    .text {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #d6d6d6;
      border-radius: 10rpx;
      padding: 10rpx;
    }

    .btns {
      margin-top: 20rpx;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;

      .btn {
        width: 25%;
        height: 80%;
        font-size: 30rpx;
      }
    }
  }
}

.checkbox-container {
  background-color: blue;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.checkbox-item {
  width: 100% !important;
}
.ad_popError {
  background: #de352d;
  color: #fff;
  height: 58rpx;
  line-height: 58rpx;
  font-size: 24rpx;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}
.container {
  position: relative;
}
</style>
