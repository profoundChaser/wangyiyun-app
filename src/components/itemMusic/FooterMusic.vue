<template>
  <div class="footer-music-index">
    <div class="footerLeft" @click="showPopup">
      <img :src="playlist[playlistIndex].al.picUrl" alt="" />
      <div class="content">
        <h4>{{ playlist[playlistIndex].name }}</h4>
        <p>横滑可以切换上下首</p>
      </div>
    </div>
    <div class="footerRight">
      <div class="icon-box" @click="musicPlay">
        <i class="iconfont" v-if="!isPlay">&#xea82;</i>
        <i class="iconfont" v-else>&#xe65a;</i>
      </div>
      <i class="iconfont">&#xe62a;</i>
    </div>
    <audio
      :src="` https://music.163.com/song/media/outer/url?id=${playlist[playlistIndex].id}.mp3`"
      ref="audio"
      @timeupdate="timeupdate"
    ></audio>
    <van-popup v-model:show="popupShow" position="right" :style="{ width:'100%',height: '100%' }">
      <MusicDetail :music="playlist[playlistIndex]" @outPopup="outPopup"
      :isPlay="isPlay" @playMusic ="musicPlay" ref="musicDetail"
      :currentTime="currentTime" :playlist="playlist"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { throwStatement } from '@babel/types'
import { onMounted, ref, watch } from 'vue'
import { mapState,mapActions } from 'vuex'
import MusicDetail from './MusicDetail.vue'
export default {
  data() {
    return {
      isPlay: false,
      popupShow: false,
      currentTime:0
    }
  },
  computed: {
    ...mapState(['playlist', 'playlistIndex']),
  },
  created(){
    this.getLyric(this.playlist[this.playlistIndex].id)
  },
  watch: {
    playlistIndex(newVal, oldVal) {
      let audio = this.$refs.audio
      audio.autoplay = true
      if (audio.paused) {
        audio.play()
        this.isPlay = true
        console.log('目前要播放了')
      }
    },
    playlist(newVal, oldVal) {
      if (!this.isPlay) {
        let audio = this.$refs.audio
        audio.autoplay = true
        this.isPlay = true
      }
    },
  },
  methods: {
    ...mapActions(['getLyric']),
    musicPlay() {
      let audio = this.$refs.audio
      if (audio.paused) {
        audio.play()
        this.isPlay = true
        console.log('目前要播放了')
      } else {
        audio.pause()
        this.isPlay = false
        console.log('目前要暂停了')
      }
    },
    showPopup() {
      this.popupShow = true
    },
    outPopup() {
      this.popupShow = false
    },
    //事件变化时，记录当前播放时间
    timeupdate(e){
      const audio=e.target
      this.currentTime=audio.currentTime
    }
  },
  components: { MusicDetail },
  destroyed(){
    this.$off(['outPopup','playMusic'])
  }
}
</script>

<style lang="scss" scoped>
.footer-music-index {
  width: 100%;
  background: #fff;
  height: 1.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  .footerLeft {
    display: flex;
    font-size: 0.3rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }
    .content {
      margin-left: 0.3rem;
      p {
        font-size: 0.2rem;
        color: #ccc;
      }
    }
  }

  .footerRight {
    display: flex;
    .iconfont {
      &:last-child {
        margin-left: 0.3rem;
      }
    }
  }
}
</style>
