<template>
  <div class="home">
    <header>
      <top-nav></top-nav>
    </header>
    <main>
      <div class="swiper-container">
        <Swiper></Swiper>
      </div>
      <div class="icon-list-bar">
       <icon-list></icon-list>
      </div>
      <div id="music-content-container">
        <menu-list></menu-list>
      </div>
    </main>
  </div>
</template>

<script>
import TopNav from '../components/home/TopNav.vue'
import Swiper from '@/components/home/Swiper.vue'
import IconList from '../components/home/IconList.vue'
import MenuList from '../components/home/MenuList.vue'

export default {
  name: 'HomeView',
  components: {
    TopNav,
    Swiper,
    IconList,
    MenuList
  }
}
</script>
