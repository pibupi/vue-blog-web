<template>
  <div class="home-wrap">
    <!-- <Swiper /> -->
    <Article />
    <div class="pagination-wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.current"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import Swiper from "@/components/swiper/swiper.vue";
import Article from "@/components/articles/articles.vue";
import ScrollTop from "@/components/scrolltop/scrolltop";
export default {
  name: "home",
  components: {
    // Swiper,
    Article,
    ScrollTop
  },

  computed: {
    ...mapState({
      count: state => state.article.count,
      pagination: state => state.article.pagination
    })
  },
  created() {
    this.getArticleListAction(this.pagination);
  },
  methods: {
    ...mapActions(["getArticleListAction"]),
    ...mapMutations(["CHANGE_CURRENT"]),
    handleCurrentChange(val) {
      this.$store.commit("CHANGE_CURRENT", val);
      this.getArticleListAction(this.pagination);
    }
  }
};
</script>
<style lang="scss" scoped>
.home-wrap {
  margin-bottom: 200px;
}
.pagination-wrap {
  width: 0;
  margin: 30px auto;
}
</style>
