<template>
  <div class="back">
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(item, index) in articleList"
        :key="index"
        :color="item.color"
      >
        <span class="time"> {{ item.createdAt.split(" ")[0] }}</span>
        <span class="title" @click="toArticleDetail(item.id)">{{
          item.title
        }}</span>
      </el-timeline-item>
    </el-timeline>
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
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      reverse: true,
      activities: []
    };
  },
  created() {
    this.getArticleListAction(this.pagination);
  },
  computed: {
    ...mapGetters(["articleList"]),
    ...mapState({
      count: state => state.article.count,
      pagination: state => state.article.pagination
    })
  },
  methods: {
    ...mapActions(["getArticleListAction"]),
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getArticleListAction(this.pagination);
    },
    toArticleDetail(id) {
      this.$router.push({ name: "articleDetail", query: { id } });
    }
  }
};
</script>
w
<style lang="scss" scoped>
.back {
  width: 70%;
  margin: 100px auto;
}
.time {
  font-size: 13px;
  @media (max-width: 414px) {
    font-size: 12px;
  }
}
.title {
  margin-left: 30px;
  font-size: 15px;
  color: #1890ff;
  cursor: pointer;
  @media (max-width: 414px) {
    font-size: 12px;
  }
}
.back
  /deep/
  .el-timeline-item__node
  .el-timeline-item__node--normal
  .el-timeline-item__node-- {
  color: #1890ff;
}
</style>
