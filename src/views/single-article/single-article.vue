<template>
  <div class="single-article-wrap">
    <div class="single-article-container">
      <h1 class="single-article-title">{{ singleArticle.title }}</h1>
      <div v-html="singleArticle.content" id="edit"></div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "single-article",
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
    console.log(this.$route.query.id);
    this.getsingarticle(this.$route.query.id);
  },
  methods: {
    ...mapActions(["getsingarticle"])
  }
};
</script>
<style lang="scss" scoped>
.single-article-wrap {
  height: 100%;
  margin-bottom: 60px;
  padding-top: 30px;
  // background-color: tomato;
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
      // text-indent: 2em;
    }
    #edit /deep/ p > span {
      display: inline-block;
      margin-bottom: 20px;
      color: #000;
    }
    #edit /deep/ img {
      display: flex;
      justify-content: center;
      // text-align: center;
      margin: 0 auto;
      max-width: 100%;
      cursor: zoom-in;
    }
  }
}
</style>
