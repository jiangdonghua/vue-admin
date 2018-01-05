/**
 * Created by Administrator on 2017/12/14.
 */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
export function deleteList(query) {
  return request({
    url: '/article/deleteList',
    method: 'get',
    params: query
  })
}
export function editList(query) {
  return request({
    url: '/article/editList',
    method: 'get',
    params: query
  })
}
export function addList(query) {
  return request({
    url: '/article/addList',
    method: 'get',
    params: query
  })
}
export function batchRemoveList(query) {
  return request({
    url: '/article/batchRemoveList',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

