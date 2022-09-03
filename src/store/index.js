import { getItemMusicWord } from '@/api/itemMusic'
import { createStore } from 'vuex'

export default createStore({
  state: {
    playlist: [
      {
        al: {
          id: 137142551,
          name: '孤勇者',
          pic: 109951166702962260,
          picUrl: 'https://p1.music.126.net/aG5zqxkBRfLiV7A8W0iwgA==/109951166702962263.jpg',
          pic_str: '109951166702962263',
        },
        id: 1901371647,
        name: '孤勇者',
        ar: [
          {
            id: 2116,
            name: '陈奕迅',
          },
        ],
      },
    ],
    playlistIndex: 0,
    lyricList: {},
  },
  getters: {},
  mutations: {
    updatePlaylist: function (state, value) {
      state.playlist = value
    },
    updatePlaylistIndex: function (state, value) {
      state.playlistIndex = value
    },
    updateLyricList: function (state, value) {
      state.lyricList = value
      console.log(state.lyricList)
    },
  },
  actions: {
    getLyric: async function ({ commit, state }, value) {
      let res = await getItemMusicWord(value)
      commit('updateLyricList', res.lrc.lyric)
    },
  },
  modules: {},
})
