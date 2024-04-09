import { http } from '@/utils/http'

type logInInfo = {
  username: string
  password: string
}

type logInResult = {
  msg: string
  token: string
  code: number
}

export const logInAPI = (data: logInInfo) => {
  return http<logInResult>({
    method: 'POST',
    url: '/login',
    data,
  })
}
