<template>
  <div class="home-wrap">
    <!-- <Swiper /> -->
    <Article />
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.current"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next"
        :total="count"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
// import Swiper from "@/components/swiper/swiper.vue";
import Article from "@/components/article-list/article-list.vue";
export default {
  name: "home",
  components: {
    // Swiper,
    Article
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
.pagination {
  width: 0;
  margin: 30px auto;
}
</style>
