<template>
  <div class="layout">
    <Header />
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
// import Footer from "@/components/footer/footer.vue";
export default {
  name: "home",
  components: {
    Header
    // Footer
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
</style>
