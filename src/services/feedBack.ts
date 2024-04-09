import { http } from '@/utils/http'

export const postFeedbackAPI = (data: any) => {
  return http<any>({
    method: 'POST',
    url: '/system/feedback',
    data,
  })
}
