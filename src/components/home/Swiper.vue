<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in state.images" :key="image.targetId">
      <img :src="image.pic" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { getBanner } from '@/api/home'
export default {
  setup() {
    let state = reactive({
      images: [],
    })
    onMounted(() => {
      //获取轮播图数据 api
      getBanner().then((res) => {
        console.log(res)
        state.images = res.banners
      })
    })
    return { state }
  },
}
</script>

<style lang="scss">
.van-swipe {
  width: 100%;
  .van-swipe__track {
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 4rem;
        border-radius: 10px;
      }
    }
  }
  .van-swipe__indicators {
    .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>
