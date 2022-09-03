<template>
  <div class="itemMusic-index">
    <img :src="playlist.coverImgUrl" alt="" class="bgImg" />
    <header>
      <div class="icon-box" @click="$router.go(-1)">
        <i class="iconfont">&#xe8f4;</i>
      </div>
      <span class="title">歌单</span>
      <div class="icon-box">
        <i class="iconfont">&#xe693;</i>
      </div>
      <div class="icon-box">
        <i class="iconfont"> &#xe790;</i>
      </div>
    </header>
    <main>
      <div class="music-content-container">
        <div class="img-box">
          <img :src="playlist.coverImgUrl" alt="" />
          <span class="playCount">
            <i class="iconfont">&#xea6d;</i>
            {{ changeCount(playlist.playCount) }}
          </span>
        </div>
        <div class="music-content">
          <h3>{{ playlist.name }}</h3>
          <div class="userInfo">
            <img :src="playlist.creator.avatarUrl" alt="" class="avatar" />
            <div class="username">{{ playlist.creator.nickname }}</div>
            <i class="iconfont to-right">&#xe775;</i>
          </div>
          <div class="content">
            <p>{{ playlist.description }}</p>
            <i class="iconfont to-right">&#xe775;</i>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <icon-list2></icon-list2>
    </footer>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getStore } from '@/utils/utils'
import IconList2 from './IconList2.vue'

export default {
  setup(props) {
    if (!props.playlist.creator) {
      props.playlist.creator = getStore('session', 'playlist', true).creator
    }
    //处理播放量
    function changeCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return {
      changeCount,
    }
  },
  props: ['playlist'],
  components: { IconList2 },
}
</script>

<style lang="scss" scoped>
.itemMusic-index {
  width: 100%;
  position: relative;
  color: #fff;
  .bgImg {
    width: 100%;
    height: 6rem;
    position: absolute;
    top: 0;
    z-index: -1;
    filter: blur(30px);
  }

  header {
    width: 100%;
    padding: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      margin-right: 52%;
      font-weight: 900;
    }
  }

  main {
    .music-content-container {
      width: 100%;
      display: flex;
      margin-top: 0.4rem;
      justify-content: space-around;

      .img-box {
        position: relative;
        img {
          width: 3rem;
          border-radius: 10px;
          margin-left: 0.2rem;
        }
        .playCount {
          position: absolute;
          right: 7%;
          top: 7%;
          display: flex;
          color: #fff;
          align-items: center;
        }
      }
      .music-content {
        margin-left: 0.2rem;
        .userInfo {
          width: 100%;
          display: flex;
          align-items: center;
          margin-top: 0.3rem;
          .avatar {
            border-radius: 50%;
            width: 0.8rem;
            height: 0.8rem;
            margin-left: 0;
          }
          .username {
            margin-left: 0.3rem;
            color: #ccc;
          }
        }

        .content {
          display: flex;
          margin-top: 0.3rem;
          align-items: center;
          p {
            width: 90%;
            height: 0.7rem;
            overflow: hidden;
          }
        }

        .to-right {
          color: #ccc;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>
