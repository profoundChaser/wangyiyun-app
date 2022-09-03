<template>
    <div class="icon-list">
      <div class="icon-box">
        <i class="iconfont">&#xe600;</i>
        <span>{{state.playlist.trackCount}}</span>
      </div>
      <div class="icon-box">
        <i class="iconfont">&#xe739;</i>
        <span>{{state.playlist.shareCount}}</span>
      </div>
      <div class="icon-box">
        <i class="iconfont">&#xe8bc;</i>
        <span>下载</span>
      </div>
      <div class="icon-box">
        <i class="iconfont">&#xe65f;</i>
        <span>多选</span>
      </div>
    </div>
  </template>
  
  <script>
import { onMounted, reactive } from 'vue'
import { getStore } from '@/utils/utils'
  export default {
    setup() {
      const state=reactive({
        playlist:{}
      })
      onMounted(()=>{
        state.playlist = getStore('session', 'playlist', true)
      })
      return {
        state
      }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .icon-list {
    width: 100%;
    display: flex;
    padding: 10px;
    height: 2rem;
    align-items: center;
    justify-content: space-around;
    margin-top: .2rem;
    .icon-box {
      width: 25%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconfont {
        font-size: .5rem;
      }
      span{
        margin-top: .2rem;
      }
    }
  }
  </style>
  