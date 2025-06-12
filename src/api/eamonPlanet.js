import request from '@/utils/request'

export function getOpenid(loginCode) {
  return request({
    url: 'https://buzz.xiaoming100.club/app/getOpenid',
    method: 'post',
    data: {
      code: loginCode
    }
  })
} 