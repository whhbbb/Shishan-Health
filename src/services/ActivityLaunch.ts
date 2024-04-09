import { http } from '@/utils/http'

export const getCollegeListAPI = () => {
  return http<any>({
    method: 'GET',
    url: '/system/depts/list',
  })
}
// 发起活动
export const launchActivityAPI = (data: any) => {
  return http<any>({
    method: 'POST',
    url: '/system/activity',
    data,
  })
}
// 修改活动
export const editActivityAPI = (data: any) => {
  return http<any>({
    method: 'PUT',
    url: '/system/activity/edit',
    data,
  })
}
// 获取某一活动的信息
export const getActivityInfoAPI = (id: number) => {
  return http<any>({
    method: 'GET',
    url: `/system/activity/${id}`,
  })
}
// 判断是否有发起活动的权限
export const getLaunchPermissionAPI = () => {
  return http<any>({
    method: 'GET',
    url: '/system/activity/menu',
  })
}
