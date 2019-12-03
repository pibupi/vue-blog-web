<template>
  <div class="layout">
    <Header />
    <div class="wrap" id="wrap">
      <transition name="fade-transform" mode="out-in">
        <router-view></router-view>
      </transition>
      <el-backtop target=".wrap"></el-backtop>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
export default {
  name: "layout",
  components: {
    Header
  }
};
</script>
<style lang="scss" scoped>
// 页面切换动画

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
.wrap {
  height: 100vh;
  overflow: auto;
  width: 100%;
  margin: 0 auto;
}
</style>
