<template>
  <div >
    <router-view />
    <footer-music></footer-music>
  </div>
</template>

<script>
import FooterMusic from './components/itemMusic/FooterMusic.vue'
  export default{
  components: { FooterMusic },}
</script>

<style lang="less">
</style>
