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
    <Article />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Article from "@/components/articles/articles";
export default {
  name: "category",
  components: {
    Article
  },
  created() {
    this.getCategoryAction();
    this.clearArticleListAction();
  },
  computed: {
    ...mapState({
      category: state => state.category.category
    })
  },
  methods: {
    ...mapActions([
      "getCategoryAction",
      "getCategoryArticleAction",
      "clearArticleListAction"
    ]),
    getCategoryArticle(category_id) {
      this.getCategoryArticleAction(category_id);
    }
  }
};
</script>
<style lang="scss" scoped>
.cate-wrap {
  margin-bottom: 300px;
}
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
        content: "";
        position: absolute;
        top: 10px;
        right: 0;
        display: inline-block;
        height: 2px;
        width: 92%;
        background-color: #dcdfe7;
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
</style>
