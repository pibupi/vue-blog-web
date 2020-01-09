<template>
  <div class="home-wrap" id="home">
    <!-- <Swiper /> -->
    <Article />
    <div class="pagination-wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.current"
        :page-size="pagination.pageSize"
        layout="total, prev, pager, next"
        :total="count"
        small
        :page-count="5"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex';
// import Swiper from "@/components/swiper/swiper.vue";
import Article from '@/components/articles/articles.vue';
export default {
  name: 'home',
  components: {
    // Swiper,
    Article
  },
  computed: {
    ...mapState({
      count: state => state.article.count,
      pagination: state => state.article.pagination,
      displayName: state => state.login.displayName
    })
  },
  created() {
    this.$store.commit('CHANGE_CURRENT', 1);
    let params = {
      ...this.pagination,
      displayName: this.displayName
    };
    this.getArticleListAction(params);
  },
  methods: {
    ...mapActions(['getArticleListAction']),
    ...mapMutations(['CHANGE_CURRENT']),
    handleCurrentChange(val) {
      this.$store.commit('CHANGE_CURRENT', val);
      let params = {
        ...this.pagination,
        displayName: this.displayName
      };
      this.getArticleListAction(params);
    }
  }
};
</script>
<style lang="scss" scoped>
.pagination-wrap {
  width: 100%;
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
</style>
