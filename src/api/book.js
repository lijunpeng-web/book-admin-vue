import request from '@/utils/request'

export function getBookList(params) {
  return request({
    url: '/api/book/list',
    method: 'get',
    params
  })
}

export function addBook(params) {
  return request({
    url: '/api/book/add',
    method: 'Post',
    data: params
  })
}


export function getBookDetails(params) {
  return request({
    url: '/api/book/getBookDetails',
    method: 'get',
    params
  })
}

export function modifyUpperShelfType(params) {
  return request({
    url: '/api/book/updateType',
    method: 'Post',
    data: params
  })
}

export function updataBookDetails(params) {
  return request({
    url: '/api/book/updateBook',
    method: 'Post',
    data: params
  })
}

export function getSortType(params) {
  return request({
    url: '/api/book/sort',
    method: 'get',
    params
  })
}

export function getBookType(params) {
  return request({
    url: '/api/book/booktype',
    method: 'get',
    params
  })
}

export function getChapterDetails(params) {
  return request({
    url: '/api/book/chapter',
    method: 'get',
    params
  })
}

export function upChapterDetails(params) {
  return request({
    url: '/api/book/upchapter',
    method: 'post',
    data: params
  })
}
export function addChapterDetails(params) {
  return request({
    url: '/api/book/addchapter',
    method: 'post',
    data: params
  })
}

export function sortOrder(params) {
  return request({
    url: '/api/book/sortorder',
    method: 'post',
    data: params
  })
}