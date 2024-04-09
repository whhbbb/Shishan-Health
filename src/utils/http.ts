import { useMemberStore } from '@/stores'

const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非http开头拼接
    if (!options.url.startsWith('http')) {
      options.url = 'https://124.220.216.249:3266' + options.url
    }
    options.timeout = 10000
    // 添加小程序请求头标识
    options.header = {
      ...options.header,
      // 'source-client': 'miniapp'
    }
    // 添加token请求头标识
    const token = uni.getStorageSync('token')
    if (token) {
      options.header.Authorization = `Bearer ${token}`
    }
  },
}

// 拦截request请求
uni.addInterceptor('request', httpInterceptor)
// 拦截uploadFile请求
uni.addInterceptor('uploadFile', httpInterceptor)

//白名单 不需要验证token
const whiteList = [
  '/pages/index/index',
  '/pages/login/login',
  '/pages/column/column',
  '/pages/column/components/article',
  '/pages/recommend/recommend',
  '/pages/recommend/recommendDetail',
  '/pages/activity/ActivityDetails',
  '/pages/my/components/contactUs',
  '/pages/my/components/aboutUs',
  '/pages/gift/giftCenter',
]
//登录页
const loginPage = '/pages/login/login'
const initPermission = {
  invoke(e) {
    // 调用前拦截
    console.log('拦截', e)
    //获取用户的token
    const token = uni.getStorageSync('token'),
      //获取要跳转的页面路径（url去掉"?"和"?"后的参数）
      url = e.url.split('?')[0]
    const notNeed = whiteList.includes(url)
    // 如果在whiteList里面就不需要登录
    if (notNeed) {
      return e
    } else {
      //需要登录
      if (!token) {
        uni.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1000,
          complete: () => {
            setTimeout(() => {
              uni.navigateTo({
                url: loginPage,
              })
            }, 1000)
          },
        })

        return false
      } else {
        return e
      }
    }
  },
  fail(err) {
    // 失败回调拦截
    console.log(err)
  },
}
//页面跳转拦截器
uni.addInterceptor('navigateTo', initPermission)
uni.addInterceptor('switchTab', initPermission)
uni.addInterceptor('reLaunch', initPermission)
uni.addInterceptor('redirectTo', initPermission)

type Data<T> = {
  code: string
  msg: string
  result: T
}

export const http = <T>(options: UniApp.RequestOptions) => {
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        //登陆过期
        console.log(res)
        if (res.statusCode == 200 && res.data.code == 410) {
          uni.showToast({
            title: '登录过期',
            icon: 'none',
            duration: 1000,
            complete: () => {
              setTimeout(() => {
                uni.removeStorageSync('token')
                uni.navigateTo({
                  url: '/pages/login/login',
                })
              }, 1000)
            },
          })
          reject(res)
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as T)
        } else if (res.statusCode === 401) {
          uni.navigateTo({
            url: '/pages/login/login',
          })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求失败',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: err.errMsg || '网络错误，请换个网络试试',
        })
        reject(err)
      },
    })
  })
}
