<template>
  <div class="item-music-index">
    <item-music-top :playlist="state.playlist"></item-music-top>
    <item-music-list :musicList="state.musicList" 
    :subscribedCount="state.subscribedCount"></item-music-list>
  </div>
</template>

<script>
import { onBeforeMount, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getItemMusicList, getMusicDetail } from '../api/itemMusic'
import ItemMusicTop from '@/components/itemMusic/itemMusicTop.vue'
import { setStore } from '@/utils/utils'
import ItemMusicList from '@/components/itemMusic/ItemMusicList.vue'

export default {
  setup() {
    //获取当前路由
    const route = useRoute()
    const state = reactive({
      playlist: {},
      musicList:[],
      subscribedCount:null
    })
    
    onBeforeMount(() => {
      const id = route.query.id
      console.log(id)
      //获取歌单详情
      getMusicDetail(id).then((res) => {
        state.playlist = res.playlist
        console.log(res)
        state.subscribedCount=res.playlist.subscribedCount
        console.log(state.subscribedCount)
        //使用session进行存储
        setStore('session', 'playlist', state.playlist)
      })
      //获取歌单详情的所有歌单
      getItemMusicList({id}).then(res=>{
        console.log(res)
        state.musicList=res.songs
      })
    })
    return { state }
  },
  components: {
    ItemMusicTop,
    ItemMusicList,
  },
}
</script>

<style lang="scss" scoped>

</style>
