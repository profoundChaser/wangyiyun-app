<template>
  <div class="icon-list">
    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shipin1"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-songlist-01"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="icon-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
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
    }
  }
}
</style>
