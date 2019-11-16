<template>
  <div>
    <div
      class="article-wrap clearfix"
      v-for="item in articleList"
      :key="item.id"
    >
      <div class="article-img">
        img
      </div>
      <ul class="article-container">
        <li class="article-list-item">
          <h1 class="article-title" @click="toSingleArticle(item.id)">
            {{ item.title }}
          </h1>
          <div class="article-desc">{{ item.desc }}</div>
          <div class="article-bottom">
            <p class="article-bottom-left">左侧用户信息</p>
            <p class="article-bottom-right">{{ item.createdAt }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "article-list",
  computed: {
    ...mapState({
      articleList: state => state.article.articleList
    })
  },
  methods: {
    toSingleArticle(id) {
      this.$router.push({ name: "singleArticle", query: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.article-wrap {
  padding: 0 100px;
  background-color: violet;
  margin-top: 30px;
  .article-img {
    float: left;
    min-width: 30%;
    height: 200px;
    margin-right: 30px;
    background-color: wheat;
    @media (max-width: 930px) {
      width: 100%;
      height: 200px;
    }
  }
  .article-container {
    float: left;
    height: 200px;
    width: 60%;
    @media (max-width: 930px) {
      width: 100%;
    }
    background-color: tomato;
    .article-list-item {
      height: 100%;
      position: relative;
      // margin-top: 30px;
      .article-title {
        font-size: 30px;
        font-weight: bolder;
      }
      .article-desc {
        margin-top: 30px;
        color: #f7f7f7;
      }
      .article-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
