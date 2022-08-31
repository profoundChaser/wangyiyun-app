import request from '../utils/request'

export function getBanner(num = 2) {
  return request({
    url: `/banner?type=${num}`,
    method: 'GET',
  })
}

export function getMusicList() {
  return request({
    url: '/personalized?limit=10',
    method: 'GET',
  })
}
