<template>
  <div class="cate-wrap">
    <div class="tags-wrap">
      <div class="split-line-wrap">
        <i class="iconfont icon-biaoqian"></i>
        <span class="split-title">分类</span>
        <span class="split-line"></span>
      </div>
      <ul class="category-wrap">
        <li
          @click="getCategoryArticle(item.id)"
          class="category-item"
          v-for="item in category"
          :key="item.id"
        >
          {{ item.category_name }}
        </li>
      </ul>
    </div>
    <!-- <Article /> -->
    <div class="back">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(item, index) in articleList"
          :key="index"
          :color="item.color"
        >
          <span class="time"> {{ item.createdAt.split(' ')[0] }}</span>
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
          small
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getCategoryArticleService } from '../../service/article';
import { mapState, mapActions } from 'vuex';
import Article from '@/components/articles/articles';
export default {
  name: 'category',
  data() {
    return {
      reverse: true,
      articleList: [],
      count: null,
      category_id: null,
      pagination: {
        current: 1,
        pageSize: 2
      }
    };
  },
  components: {
    // Article
  },
  created() {
    this.getCategoryAction();
    this.clearArticleListAction();
    this.getCategoryArticle(1, this.displayName);
  },
  computed: {
    ...mapState({
      category: state => state.category.category,
      displayName: state => state.login.displayName
    })
  },
  methods: {
    ...mapActions(['getCategoryAction', 'clearArticleListAction']),
    getCategoryArticle(category_id, displayName) {
      this.category_id = category_id;
      let params = {
        category_id,
        ...this.pagination,
        displayName: this.displayName
      };
      getCategoryArticleService(params).then(res => {
        this.articleList = res.data.rows;
        this.count = res.data.count;
      });
    },
    toArticleDetail(id) {
      this.$router.push({ name: 'articleDetail', query: { id } });
    },
    handleCurrentChange(val) {
      this.pagination.current = val;
      let params = {
        category_id: this.category_id,
        ...this.pagination,
        displayName: this.displayName
      };
      getCategoryArticleService(params).then(res => {
        this.articleList = res.data.rows;
        this.count = res.data.count;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tags-wrap {
  margin: 60px auto;
  width: 80%;
  .split-line-wrap {
    display: flex;
    justify-content: flex-start;
    position: relative;
    .split-title {
      margin-left: 10px;
      width: 40px;
      font-size: 13px;
      font-weight: bolder;
    }
    .split-line {
      width: 100%;
      &:before {
        display: inline-block;
        content: '';
        position: absolute;
        top: 10px;
        right: 0;
        display: inline-block;
        height: 2px;
        width: 92%;
        background-color: #dcdfe7;
        @media (max-width: 768px) {
          width: 80%;
        }
        @media (max-width: 320px) {
          width: 70%;
        }
      }
    }
  }
  .category-wrap {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .category-item {
      padding: 5px 10px;
      margin-right: 20px;
      font-size: 13px;
      font-weight: bolder;
      background-color: #f4f4f4;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        background-color: #2821fc;
        color: #fff;
      }
    }
  }
}
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
.pagination-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  @media (max-width: 575px) {
    justify-content: center;
  }
}
</style>
