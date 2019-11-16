<template>
  <div class="layout">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
export default {
  name: "home",
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss" scoped>
.layout {
  height: 100%;
}
</style>
