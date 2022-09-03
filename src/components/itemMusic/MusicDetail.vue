<template>
  <div class="detail-index" ref="detailIndex">
    <img :src="music.al.picUrl" alt="" class="bgImg" crossorigin />
    <header>
      <div class="detailTop-left">
        <i class="iconfont" @click="outPopup">&#xe8f4;</i>
        <div class="music-info">
          <Vue3Marquee>
            {{ music.al.name }}
          </Vue3Marquee>
          <span v-for="item in music.ar" :key="item">
            {{ item.name }}
          </span>
          <i class="iconfont">&#xe775;</i>
        </div>
      </div>
      <div class="detailTop-right">
        <i class="iconfont">&#xe739;</i>
      </div>
    </header>
    <main @click="switchView">
      <div v-show="isImgShow" class="img-container">
        <img src="../../assets/img/needle-ab.png" alt="图片" class="needle-ab" ref="needleAb" />
        <img src="../../assets/img/disc.png" alt="图片" class="disc" />
        <img :src="music.al.picUrl" alt="" class="disc-pic" crossorigin ref="discPic" />
      </div>
      <div class="lyric-block" v-show="isLyricShow">
        <div class="list-container">
          <ul class="lyric-list" ref="lyricList">
            <li
              v-for="(item, index) in lyric"
              :key="index"
              class="lyric-list-item"
              :class="highlightLyric(index) ? 'highlight' : ''"
            >
              {{ item.lrc }}
            </li>
          </ul>
        </div>
      </div>
    </main>
    <footer>
      <div class="footerTop">
        <i class="iconfont">&#xe643;</i>
        <i class="iconfont">&#xe663;</i>
        <i class="iconfont">&#xe895;</i>
        <i class="iconfont">&#xe6d3;</i>
        <i class="iconfont">&#xe8c4;</i>
      </div>
      <div class="footerCenter">
        <span class="countTime">{{ currentTimeText }}</span>
        <div class="progress">
          <van-progress :percentage="percentage" :stroke-width="4" />
        </div>
        <span class="totalTime">{{ totalTimeTextObj.totalTimeText }}</span>
      </div>
      <div class="footerBottom">
        <div class="changePlayType">
          <i class="iconfont">&#xea84;</i>
          <!-- <i class="iconfont">&#xe6ae;</i>
          <i class="iconfont">&#xe637;</i>
          <i class="iconfont">&#xe66c;</i> -->
        </div>
        <i class="iconfont" @click="preMusic">&#xe615;</i>
        <div class="play-icon-box" @click="playMusic">
          <i class="iconfont" v-if="!isPlay">&#xe624;</i>
          <i class="iconfont" v-else>&#xe629;</i>
        </div>
        <i class="iconfont" @click="nextMusic">&#xe61c;</i>
        <i class="iconfont">&#xea86;</i>
      </div>
    </footer>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import Grade from 'grade-js'
import { mapState, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  data() {
    return {
      isLyricShow: false,
      isImgShow: true,
      currentTimeText: '00:00',
      totalTimeTextObj: {
        totalTimeText: '',
        totalTime: null,
      },
      percentage: 0,
      currentIndex:null,
    }
  },
  props: ['music', 'isPlay', 'currentTime', 'playlist'],
  components: {
    Vue3Marquee,
  },
  watch: {
    isPlay(n, o) {
      this.playAnimation()
    },
    currentTime(n, o) {
      this.progressMove()
    },
    playlistIndex(n, o) {
      this.currentIndex = n
    },
    lyric(n,o){
      this.initTimeShow()
    }
  },
  computed: {
    ...mapState(['lyricList', 'playlistIndex']),
    lyric: function () {
      let res
      if (this.lyricList) {
        res = this.lyricList.split('\n').map((item, i) => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lrc = item.slice(11, item.length)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.length)
          }
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          if (lrc) {
            return {
              min,
              sec,
              mill,
              lrc,
              time,
            }
          } else {
            return {
              min,
              sec,
              mill,
              lrc: {},
              time,
            }
          }
        })
        res = res.slice(0, res.length - 1)
      }
      return res
    },
  },
  methods: {
    outPopup() {
      this.$emit('outPopup')
    },
    setContainerBg(container) {
      window.addEventListener('load', () => {
        Grade(container)
      })
    },
    playMusic() {
      this.$emit('playMusic')
    },
    //控制播放
    playAnimation() {
      const discPic = this.$refs.discPic
      const needleAb = this.$refs.needleAb
      if (this.isPlay) {
        needleAb.style.transform = 'rotate(0)'
        discPic.style.WebkitAnimationPlayState = 'running'
      } else {
        needleAb.style.transform = 'rotate(-20deg)'
        discPic.style.WebkitAnimationPlayState = 'paused'
      }
    },
    //高亮歌词
    highlightLyric(i) {
      if (this.currentTime === 0 && i === 0) {
        return true
      } else if (this.currentTime * 1000 >= this.lyric[i].time && i === this.lyric.length - 1) {
        this.lyricMove(i)
        return true
      } else {
        if (
          this.currentTime * 1000 >= this.lyric[i].time &&
          this.currentTime * 1000 <= this.lyric[i + 1].time
        ) {
          this.lyricMove(i)
          return true
        } else {
          return false
        }
      }
    },
    lyricMove(i) {
      const lyricList = this.$refs.lyricList
      if (lyricList) {
        lyricList.style.transform = `translateY(${-i * 45}px)`
      }
    },
    //初始化展示时间，获取总时间
    initTimeShow() {
      const { min, sec, mill, time } = this.lyric[this.lyric.length - 1]
      console.log(min, sec, mill)
      this.totalTimeTextObj.totalTime = time
      this.totalTimeTextObj.totalTimeText = `${min}:${sec}`
    },
    //进度条行进，vant只能显示无法拖拽
    progressMove() {
      const time = dayjs(this.currentTime * 1000).format('mm:ss')
      this.currentTimeText = time
      if (parseInt(this.currentTime) * 1000 > this.totalTimeTextObj.totalTime) {
        this.percentage = 100
        //百分之百了加载下一首
        let timer = setTimeout(() => {
          this.nextMusic()
          clearTimeout(timer)
        }, 3000)
      } else {
        let percentage = parseInt(
          ((parseInt(this.currentTime) * 1000) / this.totalTimeTextObj.totalTime) * 100
        )
        this.percentage = percentage
      }
    },
    //切换主题页面
    switchView() {
      this.isLyricShow = !this.isLyricShow
      this.isImgShow = !this.isImgShow
    },
    //下一首
    nextMusic() {
      this.currentIndex++
      if (this.currentIndex > this.lyricList.length - 1) {
        this.currentIndex = this.lyricList.length - 1
      }
      this.updatePlaylistIndex(this.currentIndex)
      this.getLyric(this.playlist[this.currentIndex].id)
    },
    //上一首
    preMusic() {
      this.currentIndex--
      if (this.currentIndex < 0) {
        this.currentIndex = 0
      }
      this.updatePlaylistIndex(this.currentIndex)
      this.getLyric(this.playlist[this.currentIndex].id)
    },
    ...mapActions(['getLyric']),
    ...mapMutations(['updatePlaylistIndex', 'updatePlaylist', 'updateLyricList']),
  },
  mounted() {
    this.playAnimation()
    this.initTimeShow()
    this.currentIndex=this.playlistIndex
  },
}
</script>

<style lang="scss" scoped>
.detail-index {
  width: 100%;
  height: 100vh;
  position: relative;
  padding: 10px;
  .bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
  header {
    display: flex;
    width: 100%;
    color: #fff;
    justify-content: space-between;
    .detailTop-left {
      display: flex;
      .music-info {
        width: 2rem;
      }
    }
  }
  main {
    width: 100%;
    height: 9.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img-container {
      width: 100%;
      height: 9.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .needle-ab {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-20deg);
        transition: all 2s;
        z-index: 1;
      }

      .disc {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 2.3rem;
        z-index: 0;
      }

      .disc-pic {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 3.14rem;
        animation: discRotate 10s linear infinite;
      }
    }

    .lyric-block {
      color: #ccc;
      height: 9.2rem;
      overflow: hidden;
      overflow-y: scroll;
      .lyric-list {
        margin-top: 3.5rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: all 0.5s linear;
        .lyric-list-item {
          margin-top: 0.6rem;
          transition: all 0.3s linear;
        }
        //高亮歌词
        .highlight {
          color: #fff;
          font-size: 0.35rem;
        }
      }
    }
  }

  footer {
    color: #fff;
    .footerCenter,
    .footerTop,
    .footerBottom {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 0.4rem;
      .iconfont {
        font-size: 0.4rem;
        color: #fff;
      }
    }
    .play-icon-box {
      .iconfont {
        font-size: 0.8rem;
      }
    }
    .footerCenter {
      .van-progress {
        width: 5rem;
      }
    }
  }
  @keyframes discRotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
