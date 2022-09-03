import request from '@/utils/request'

export function getMusicDetail(id) {
  return request({
    url: `/playlist/detail?id=${id}`,
    method: 'GET',
  })
}

export function getItemMusicList(options) {
  let range = ''
  if (options.limit) {
    range = `&limit=${options.limit}`
  }
  if (options.offset && options.limit) {
    range = `&limit=${options.limit}&offset=${options.offset}`
  }
  return request({
    url: `/playlist/track/all?id=${options.id}${range}`,
    method: 'GET',
  })
}

export function getItemMusicWord(id) {
  return request({
    url: `/lyric?id=${id}`,
    method: 'GET',
  })
}
