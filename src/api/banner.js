import request from '@/utils/request'

export function getBannerList(params) {
  return request({
    url: '/api/banner/list',
    method: 'get',
    params
  })
}


export function getBannerDetails(params) {
  return request({
    url: '/api/banner/getBannerDetails',
    method: 'get',
    params
  })
}

export function addBanner(params) {
  return request({
    url: '/api/banner/add',
    method: 'Post',
    data: params
  })
}

export function updateBanner(params) {
  return request({
    url: '/api/banner/update',
    method: 'Post',
    data: params
  })
}

export function updateIsDisplay(params) {
  return request({
    url: '/api/banner/updateIsDisplay',
    method: 'Post',
    data: params
  })
}