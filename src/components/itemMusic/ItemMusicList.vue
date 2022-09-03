<template>
  <div class="music-list-index">
    <div class="scroll-view">
      <header>
        <i class="iconfont">&#xe601;</i>
        <div>
          播放全部 <span class="num">（共{{ musicList.length }}首）</span>
        </div>
        <button class="store-btn">
          <i class="iconfont">&#xeb78;</i>收藏（{{ subscribedCount }}）
        </button>
      </header>
      <main>
        <ul class="music-list">
          <li
            class="music-list-item"
            v-for="(music, index) in musicList"
            :key="music.id"
            @click="changeMusicList(index)"
            @tap="changeMusicList(index)"
          >
            <span class="index">{{ index + 1 }}</span>
            <div class="music-info">
              <span class="music-title">{{ music.name }}</span>
              <span class="music-author" v-for="(item, index) in music.ar" :key="index">{{
                item.name
              }}</span>
            </div>
            <i class="iconfont">&#xe66b;</i>
            <i class="iconfont">&#xe8c4;</i>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
import { getItemMusicList } from '@/api/itemMusic'
import { onBeforeMount, onMounted } from 'vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  data() {
    return {
      isFirst: true,
    }
  },
  props: ['musicList', 'subscribedCount'],
  methods: {
    changeMusicList(index) {
      this.updatePlaylist(this.musicList)
      this.updatePlaylistIndex(index)
      this.getLyric(this.musicList[index].id)
    },
    ...mapActions(['getLyric']),
    ...mapMutations(['updatePlaylist', 'updatePlaylistIndex']),
  },
  created() {},
}  
</script>

<style lang="scss" scoped>
.music-list-index {
  width: 100%;
  background: #fff;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  padding: 15px 15px 0 15px;
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .num {
      color: #ccc;
    }
    .store-btn {
      background: red;
      border-radius: 30px;
      padding: 5px;
      color: #fff;
    }
  }

  main {
    .music-list {
      cursor: pointer;
      .music-list-item {
        display: flex;
        align-items: center;
        margin-top: 0.6rem;
        transition: all 0.3s linear;
        &:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .music-info {
          display: flex;
          flex-direction: column;
          margin-left: 0.4rem;
          font-size: 0.3rem;
          .music-title {
            width: 4rem;
            overflow: hidden;
            white-space: nowrap;
            font-weight: 700;
          }
          .music-author {
            font-size: 0.15rem;
            color: #ccc;
            margin-top: 0.1rem;
          }
        }
        .iconfont {
          margin-left: 0.8rem;
        }
      }
    }
  }
}
</style>
