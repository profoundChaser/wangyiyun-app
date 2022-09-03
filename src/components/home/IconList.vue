<template>
  <div class="icon-list">
    <div class="icon-box">
      <img src="../../assets/fonts/svg/tuijian.svg" alt="" class="icon">
      <span>每日推荐</span>
    </div>
    <div class="icon-box">
      <img src="../../assets/fonts/svg/shipin.svg" alt="" class="icon">
      <span>私人FM</span>
    </div>
    <div class="icon-box">
      <img src="../../assets/fonts/svg/gedan.svg" alt="" class="icon">
      <span>歌单</span>
    </div>
    <div class="icon-box">
      <img src="../../assets/fonts/svg/paihangbang.svg" alt="" class="icon">
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
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
    .icon {
      width: 1rem;
      margin-bottom: 10px;
    }
  }
}
</style>
