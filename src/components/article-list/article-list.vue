<template>
  <div>
    <div class="article-wrap ">
      <ul class="article-container ">
        <li
          class="article-list-item clearfix"
          v-for="item in articleList"
          :key="item.id"
        >
          <el-card shadow="hover" class="article-card">
            <div style="display: flex;justify-content: space-between;">
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
            </div>
          </el-card>
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
      this.$router.push({ name: "articleDetail", query: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.article-wrap {
  margin-top: 30px;
  .article-container {
    padding: 0 5%;
    @media (max-width: 930px) {
      padding: 0;
    }
    .article-list-item {
      width: 80%;
      margin: 0 auto;
      margin-top: 20px;
      .article-card {
        width: 100%;
        .article-img-wrap {
          height: 200px;
          width: 30%;
          @media (max-width: 930px) {
            display: none;
          }
          .article-img {
            height: 100%;
            width: 100%;
            border-radius: 10px;
          }
        }
        .article-content {
          width: 60%;
          position: relative;
          height: 200px;
          @media (max-width: 930px) {
            margin-left: 0;
            width: 90%;
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
            color: #666;
            font-size: 12px;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>
