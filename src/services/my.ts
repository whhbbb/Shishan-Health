import { http } from '@/utils/http'
// 获取我参加的活动
export const getMyActivityAPI = () => {
  return http<any>({
    method: 'GET',
    url: '/system/useractivity/myactivity',
  })
}
// 获取我发布的活动
export const getMyAddActivityAPI = () => {
  return http<any>({
    method: 'GET',
    url: '/system/useractivity/myaddactivity',
  })
}

export const getConnect = () => {
  return http<any>({
    method: 'GET',
    url: '/system/head/list',
  })
}
