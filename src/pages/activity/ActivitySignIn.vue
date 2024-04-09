<template>
  <div>
    <image @click="scan()" class="scan-img" src="../../static/activity/scanimg.png"></image>
    <button style="box-shadow: 0 0 7px rgba(0, 0, 0, 0.1)" type="primary" @click="scan()" id="scan">
      扫一扫
    </button>

    <!-- <button type="primary" @click="qrsigncode()" id="token">签到码</button> -->
    <!-- <button type="primary" @click="qrapplycode()" id="token">报名码</button> -->
  </div>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'

// 获取报名码函数
// qrapplycode(){
//   //获取appid和appsecret
//   wx.request({
//     method:'GET',
//     url:'http://117.50.163.249:3166/system/app',
//     header:{
//       'Authorization':'Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjAwNjhiMzY4LTk2MTctNDhhMi05NGM3LWRhMDRlM2YxYTgzMyJ9.NRPuqh96eIsA11EgkRNVsnpZAGclIvE0EvdjCKhi3BOFVf94XOaEUFlw57jLQRyRpFkz_UALDIUNNtTRAlbumw'
//     },
//     success(res) {
//       const appid=res.data.data.appid
//       const appsecret=res.data.data.appsecret
//       //获取access_token
//        wx.request({
//        method:'POST',
//        url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appid+'&secret='+appsecret,
//        success(res) {
//          console.log(res.data.access_token)
//          //获取报名码
//   wx.request({
//        url:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+res.data.access_token,
//        method:'POST',
//        data:{
//          "page": "pages/activity/ActivityDetails",
//           "scene": "id=2210",//activityid
//           "check_path": false,
//           "env_version": "release"
//        },
//        success(res){
//          //将二进制的图片格式转换
//         const base64 = wx.arrayBufferToBase64(res.data);
//         const imgurl = 'data:image/jpeg;base64,' + base64;
//        }
//      })
//        }
//      })
//     }
//   })

// },

const scan = () => {
  uni.scanCode({
    success: (res) => {
      //判断当前手机系统
      // wx.getSystemInfo({
      //   success: (res22) => {
      console.log(res)
      console.log('res.path', res.path) //pages/me/me?scene=table_id%3D8%26shop_id%3D1
      // const platform = res22.platform.toLowerCase()
      var path = res.path
      // 判断当前手机系统
      // if (platform.includes('ios')) {
      //   console.log('当前手机系统为 iOS')
      //   path = decodeURIComponent(path)
      //   console.log(path)
      // }
      const modifiedStr = path.replace('?scene=', '?id=')
      console.log(modifiedStr)
      uni.navigateTo({
        url: '/' + modifiedStr,
      })

      // else if (platform.includes('windows')) {
      //   console.log('当前手机系统为 Windows Phone');
      // } else {
      //   console.log('当前手机系统为其他');
      // }
      //   },
      // })

      //微信开发者工具 在开发者工具里出现乱码需要decodeURIComponent转义,真机不需要,可以直接使用
    },
  })
}
onLoad(() => {
  if (!uni.getStorageSync('token')) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000,
      complete: (res) => {
        setTimeout(() => {
          uni.navigateTo({
            url: '/pages/login/login',
          })
        }, 1000)
      },
    })
  }
})
// 获取签到码
//  qrsigncode(){
//    wx.request({
//      method:'GET',
//      url:'http://117.50.163.249:3166/system/app',
//      header:{
//        'Authorization':`Bearer ${uni.getStorageSync('token')}`
//      },
//      success(res) {
//    wx.request({
//      method:'POST',
//      url:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appId+'&secret='+appsecret,
//      success(res) {
//        console.log(res)
//        console.log(res.data.access_token)
// wx.request({
//      url:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token='+res.data.access_token,
//      method:'POST',
//      data:{
//        "page": "pages/activity/SignCheck",
//         "scene": "id=2210",
//         "check_path": false,
//         "env_version": "release"
//      },
//      success(res){
//        console.log(res)
//       const base64 = wx.arrayBufferToBase64(res.data);
//       const imgurl = 'data:image/jpeg;base64,' + base64;

//      }
//    })
//      }
//    })
//    }})
//  },
</script>
<style scoped>
.scan-img {
  width: 70%;
  height: 500rpx;

  margin: 5vh 15%;
  /* border: 1rpx solid #ccc; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

button {
  width: 80%;
  margin: 1vh 10%;
}
</style>
