<template>
  <div class="home-wrap">
    <!-- <Swiper /> -->
    <Article />
  </div>
</template>
<script>
import { mapActions } from "vuex";
// import Swiper from "@/components/swiper/swiper.vue";
import Article from "@/components/article-list/article-list.vue";
export default {
  name: "home",
  data() {
    return {
      // articlelist:[]
    };
  },
  components: {
    // Swiper,
    Article
  },
  created() {
    this.getarticlelist();
  },
  methods: {
    ...mapActions(["getarticlelist"])
  }
};
</script>
<style lang="scss" scoped>
.home-wrap {
  // height: 100%;
  // background-color: blue;
}
</style>
