import { http } from '@/utils/http'

export const getGiftList = () => {
  return http<any>({
    method: 'GET',
    url: '/system/goods/list',
  })
}
export const getGiftDetail = (id) => {
  return http<any>({
    method: 'GET',
    url: `/system/goods/${id}`,
  })
}
export const exchangeGift = (data) => {
  return http<any>({
    method: 'POST',
    url: `/system/usergoods`,
    data,
  })
}
export const getGiftHistory = () => {
  return http<any>({
    method: 'GET',
    url: '/system/usergoods/list?type=1',
  })
}
export const getCreidHistory = () => {
  return http<any>({
    method: 'GET',
    url: '/system/credituser/list',
  })
}
