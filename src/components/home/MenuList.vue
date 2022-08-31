<template>
  <div class="music-List">
    <div class="music-top">
      <div class="title">发现好的歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="music-content">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="music in state.musicList" :key="music.id" class="auto-define-swipe">
          <img :src="music.picUrl" alt="歌单图片" />
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-24gl-play"></use>
            </svg>
            {{ changeCount(music.playCount) }}
          </span>
          <span class="name">{{ music.name }}</span>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/api/home'
import { onMounted, reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      musicList: [],
    })
    onMounted(() => {
      getMusicList().then((res) => {
        console.log(res)
        state.musicList = res.result
      })
    })
    //处理播放量
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return {
      state,
      changeCount,
    }
  },
}
</script>

<style lang="scss" scoped>
.music-List {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .music-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .music-content {
    width: 100%;
    height: 4rem;
    .auto-define-swipe {
      height: 100%;
      position: relative;
      .playCount {
        position: absolute;
        right: 7%;
        top: 7%;
        display: flex;
        color: #fff;
        .icon {
          width: 0.4rem;
          height: 0.4rem;
          fill: #fff;
          margin-right: 5px;
        }
      }
      img {
        width: 100%;
        height: 3rem;
      }
    }
  }
}
</style>
