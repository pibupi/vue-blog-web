<template>
  <div class="tags-wrap">
    <div class="split-line-wrap">
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
    <Article />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Article from "@/components/article-list/article-list";
export default {
  name: "category",
  data() {
    return {};
  },
  components: {
    Article
  },
  created() {
    this.getCategory();
    this.clearArticleListAction();
  },
  computed: {
    ...mapState({
      category: state => state.category.category
    })
  },
  methods: {
    ...mapActions([
      "getCategory",
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
.tags-wrap {
  margin: 30px auto;
  height: 400px;
  width: 80%;
  .split-line-wrap {
    display: flex;
    justify-content: flex-start;
    position: relative;
    .split-title {
      width: 40px;
      font-size: 13px;
      font-weight: bolder;
    }
    .split-line {
      position: absolute;
      top: 10px;
      right: 0;
      display: inline-block;
      height: 0;
      width: 92%;
      border: 1px solid #dcdfe7;
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
