<template>
  <div>
    <div class="article-wrap " v-for="item in articleList" :key="item.id">
      <ul class="article-container ">
        <li class="article-list-item clearfix">
          <div class="article-img-wrap">
            <img :src="item.url" alt="" class="article-img" />
          </div>
          <div class="article-content">
            <h1 class="article-title" @click="toSingleArticle(item.id)">
              {{ item.title }}
            </h1>
            <div class="article-desc">{{ item.desc }}</div>
            <div class="article-bottom">
              <p class="article-bottom-left">左侧用户信息</p>
              <p class="article-bottom-right">{{ item.createdAt }}</p>
            </div>
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
  // padding: 0 200px;
  // padding-left: 200px;
  // background-color: violet;
  margin-top: 30px;
  .article-container {
    // float: left;
    height: 100vh;
    // margin-left: 10%;
    // width: 40%;
    // @media (max-width: 930px) {
    //   width: 100%;
    // }

    // background-color: rgb(105, 96, 94);
    .article-list-item {
      width: 80%;
      margin: 0 auto;

      // display: flex;
      // justify-content: space-between;
      // height: 100%;
      // position: relative;
      .article-img-wrap {
        margin-left: 16%;
        float: left;
        // min-width: 30%;
        height: 200px;
        margin-right: 6%;
        // background-color: wheat;
        @media (max-width: 930px) {
          margin-left: 10%;
          width: 100%;

          // display: none;
        }
        .article-img {
          height: 200px;
          width: 200px;
          @media (max-width: 930px) {
            // margin-left: 10%;
            width: 90%;
            // display: none;
          }
        }
      }
      .article-content {
        float: left;
        width: 50%;
        position: relative;
        // height: 100%;
        height: 200px;
        @media (max-width: 930px) {
          margin-left: 10%;
          width: 90%;
          // height: 200px;
          // display: none;
        }
        .article-title {
          font-size: 30px;
          font-weight: bolder;
          cursor: pointer;
        }
        .article-desc {
          margin-top: 30px;
          color: #666;
        }
        .article-bottom {
          position: absolute;
          bottom: 0;
          width: 90%;
          display: flex;
          justify-content: space-between;
          // padding-right: 10%;
        }
      }
    }
  }
}
</style>
