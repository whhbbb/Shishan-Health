import { http } from '@/utils/http'

export const getRecommedList = (query) => {
  return http<any>({
    method: 'GET',
    url: `/system/recommend/list/?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
  })
}

export const getRecommedDetail = (id) => {
  return http<any>({
    method: 'GET',
    url: `/system/recommend/${id}`,
  })
}
export const sendLike = (id) => {
  return http<any>({
    method: 'GET',
    url: `/system/recommend/like/${id}`,
  })
}
export const deletLike = (id) => {
  return http<any>({
    method: 'DELETE',
    url: `/system/recommend/like/${id}`,
  })
}

export const sendcommen = (data) => {
  return http<any>({
    method: 'POST',
    url: '/system/recommnedcomment',
    data,
  })
}
export const newRecommend = (data) => {
  return http<any>({
    method: 'POST',
    url: '/system/recommend',
    data,
  })
}
