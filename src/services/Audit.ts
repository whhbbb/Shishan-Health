import { http } from '@/utils/http'

export const getAudit = () => {
  return http<any>({
    method: 'GET',
    url: '/system/xswc',
  })
}
