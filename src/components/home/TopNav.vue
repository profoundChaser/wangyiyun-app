<template>
  <div class="topNav">
    <div class="icon-box">
      <i class="iconfont">&#xe790;</i>
    </div>
    <div class="nav">
      <span>我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="icon-box">
      <i class="iconfont">&#xe693;</i>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .icon{
    width: 0.3rem;
  }
  .nav {
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
}
</style>
