<template>
  <div class="layout">
    <Header />
    <div class="wrap" id="wrap">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <el-backtop target=".layout"></el-backtop>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/header.vue';
export default {
  name: 'layout',
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
// 页面切换动画
.layout {
  overflow: auto;
  height: 100vh;
}
.wrap {
  padding-top: 140px;
  // margin-bottom: 300px;
  @media (max-width: 575px) {
    padding-top: 60px;
  }
}
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.layout::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.layout::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
  height: 30px;
}
.layout::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
.layout::-webkit-scrollbar-thumb:hover {
  /*滚动条的hover样式*/
  height: 100px;
  background-color: yellow;
  -webkit-border-radius: 4px;
}
</style>
