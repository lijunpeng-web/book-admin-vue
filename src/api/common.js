import request from '@/utils/request'

export function uploadImg(params) {
  return request({
    url: '/api/book/list',
    method: 'Post',
    data: params
  })
}