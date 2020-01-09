<template>
  <div class="single-article-wrap">
    <div class="single-article-container">
      <h1 class="single-article-title">{{ singleArticle.title }}</h1>
      <div v-html="singleArticle.content" id="edit" v-highlight></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'single-article',
  data() {
    return {
      article: {},
      id: this.$route.params.id
    };
  },
  computed: {
    ...mapState({
      singleArticle: state => state.article.singleArticle
    })
  },
  created() {
    this.getSingleArticleAction(this.$route.query.id);
  },
  // 富文本的处理展示
  mounted() {
    // var allpre = document.getElementsByTagName("pre");
    // for (let i = 0; i < allpre.length; i++) {
    //   var onepre = document.getElementsByTagName("pre")[i];
    //   onepre.setAttribute("v-highlight-a");
    //   var mycode = document.getElementsByTagName("pre")[i].innerHTML;
    //   onepre.innerHTML = '<code id="mycode">' + mycode + "</code>";
    // }
  },
  methods: {
    ...mapActions(['getSingleArticleAction'])
  }
};
</script>
<style lang="scss" scoped>
.single-article-wrap {
  height: 100%;
  margin-bottom: 60px;
  padding-top: 30px;
  .single-article-container {
    height: 100%;
    width: 70%;
    margin: 0 auto;
    .single-article-title {
      margin-bottom: 30px;
      font-size: 34px;
      font-weight: bold;
    }
    #edit /deep/ p {
      margin-bottom: 20px;
      line-height: 24px;
      color: #666;
    }
    #edit /deep/ p > span {
      display: inline-block;
      margin-bottom: 20px;
      color: #000;
    }
    #edit /deep/ img {
      display: flex;
      justify-content: center;
      margin: 0 auto;
      max-width: 100%;
      margin-bottom: 30px;
      cursor: zoom-in;
    }
  }
}
</style>
