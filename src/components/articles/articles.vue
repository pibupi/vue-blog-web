<template>
  <div>
    <div class="article-wrap " id="article-wrap">
      <!-- 文章列表展示 -->
      <ul class="article-container ">
        <li
          class="article-list-item clearfix"
          v-for="item in articleList"
          :key="item.id"
        >
          <el-card shadow="hover" class="article-card">
            <div>
              <div class="article-content">
                <div class="article-bottom-wrap">
                  <h1 class="article-title" @click="toSingleArticle(item.id)">
                    {{ item.title }}
                  </h1>
                  <div class="article-desc">{{ item.desc }}</div>
                  <div class="article-bottom">
                    <p class="article-bottom-left">{{ item.author }}</p>
                    <p class="article-bottom-right">
                      <span>
                        <i class="iconfont icon-yanjing"></i>
                        <span style="marginLeft:3px;">{{
                          item.look_time
                        }}</span>
                      </span>
                      <span style="fontSize:12px;lineHeight:12px;">
                        <i class="iconfont icon-xinxi"></i>
                        <span
                          style="marginLeft:3px;paddingBottom:3px;display:inline-block"
                          >{{ item.comment_count }}</span
                        >
                      </span>
                      <span style="fontSize:12px;lineHeight:12px;">
                        <i class="iconfont icon-dianzan4"></i>
                        <span style="marginLeft:3px;">{{
                          item.like_count
                        }}</span>
                      </span>
                      {{ item.createdAt | dateformat('YYYY-MM-DD') }}
                    </p>
                  </div>
                </div>
                <div class="article-img-wrap" v-if="item.url">
                  <el-image :src="item.url" alt="" class="article-img" lazy />
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
import { mapState } from 'vuex';
export default {
  name: 'article-list',
  computed: {
    ...mapState({
      articleList: state => state.article.articleList,
      displayName: state => state.login.displayName
    })
  },
  methods: {
    toSingleArticle(id) {
      this.$router.push({ name: 'articleDetail', query: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.article-wrap {
  margin-top: 60px;
  .article-container {
    padding: 0 0;
    @media (max-width: 930px) {
      padding: 0;
    }
    .article-list-item {
      width: 60%;
      margin: 0 auto;
      margin-top: 20px;
      @media (max-width: 575px) {
        width: 80%;
      }
      .article-card {
        width: 100%;
        // padding-right: 30px;
        &:hover {
          background-color: #effbff;
        }
        .article-img-wrap {
          margin-left: 8%;
          @media (max-width: 930px) {
            display: none;
          }
          .article-img {
            height: 100%;
            width: 300px;
            border-radius: 10px;
            @media (max-width: 1140px) {
              width: 260px;
            }
            @media (max-width: 1168px) {
              width: 240px;
            }
            img {
              width: 100%;
            }
          }
        }
        .article-content {
          display: flex;
          justify-content: flex-start;
          width: 100%;
          position: relative;
          height: 200px;
          @media (max-width: 930px) {
            margin-left: 0;
            width: 90%;
          }
          @media (max-width: 320px) {
            width: 100%;
          }
          .article-title {
            font-size: 20px;
            font-weight: bolder;
            cursor: pointer;
            @media (max-width: 930px) {
              font-size: 18px;
            }
            @media (max-width: 575px) {
              font-size: 16px;
            }
          }
          .article-desc {
            margin-top: 30px;
            color: #666;
            @media (max-width: 1140px) {
              font-size: 14px;
            }
            @media (max-width: 930px) {
              font-size: 12px;
            }
          }
          .article-bottom-wrap {
            position: relative;
            width: 100%;
            .article-bottom {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              display: flex;
              color: #666;
              font-size: 12px;
              justify-content: space-between;
              .article-bottom-right {
                span {
                  margin-right: 4px;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
    }
  }
}
.icon-yanjing:before {
  font-size: 18px;
}
.icon-dianzan4:before {
  font-size: 16px;
}
.icon-xinxi:before {
  font-size: 14px;
}
.article-list-item /deep/ .el-card__body {
  // width: 100%;
  @media (max-width: 320px) {
    padding: 8px;
  }
}
</style>
