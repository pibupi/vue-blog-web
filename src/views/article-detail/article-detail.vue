<template>
  <div>
    <div className="detailed-title">
      <h1 style="text-align:center;">{{ article.title }}</h1>
    </div>
    <div class="content">
      <div className="detailed-content" id="mark" v-html="code"></div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import axios from "../../service/index";
import xss from "xss";
// import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
function translateMarkdown(plainText, isGuardXss = false) {
  return marked(isGuardXss ? xss(plainText) : plainText, {
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    smartypants: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
}
export default {
  data() {
    return {
      // code: "# 标题\n```javascript\nfunction(){\n\tconsole.log(123)\n}\n```", 测试markdown数据
      code: "",
      article: {}
    };
  },
  created() {
    axios
      .request({
        url: `/api/v1/web/article/${this.$route.query.id}`,
        method: "get"
      })
      .then(res => {
        this.article = res.data;
        this.code = translateMarkdown(res.data.content);
      });
  },
  mounted() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    this.code = marked(this.code);
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 70%;
  margin: 0 auto;
}
.bread-div {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
  background-color: #e1f0ff;
}
.detailed-title {
  font-size: 1.8rem;
  text-align: center;
  padding: 1rem;
}
.center {
  text-align: center;
}
.detailed-content {
  padding: 1.3rem;
  font-size: 1rem;
  line-height: 1rem;
}
#mark {
  color: #555 !important;
}
#mark /deep/ p {
  font-size: 1rem;
  line-height: 1.5em;
}
#mark /deep/ ol li {
  font-size: 1rem;
  line-height: 1.5em;
}
#mark /deep/ pre {
  display: block;
  background-color: #f3f3f3;
  padding: 0.5rem !important;
  overflow-y: auto;
  font-weight: 300;
  font-family: Menlo, monospace;
  border-radius: 0.3rem;
}
#mark /deep/ pre {
  background-color: #283646 !important;
}
#mark /deep/ pre > code {
  border: 0px !important;
  background-color: #283646 !important;
  color: #fff;
}
#mark /deep/ code {
  display: inline-block;
  background-color: #f3f3f3;
  border: 1px solid #fdb9cc;
  border-radius: 3px;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  color: #4f4f4f;
  margin: 0px 3px;
}

.title-anchor {
  color: #888 !important;
  padding: 4px !important;
  margin: 0rem !important;
  height: auto !important;
  line-height: 1.2rem !important;
  font-size: 0.7rem !important;
  border-bottom: 1px dashed #eee;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.active {
  color: rgb(30, 144, 255) !important;
}
.nav-title {
  text-align: center;
  color: #888;
  border-bottom: 1px solid rgb(30, 144, 255);
}
.article-menu {
  font-size: 12px;
}
#mark /deep/ iframe {
  height: 34rem;
}
#mark /deep/ img {
  margin-left: 20%;
  width: 40%;
  border: 1px solid #f3f3f3;
  display: inline-block;
}
.title-level3 {
  display: none !important;
}
.ant-anchor-link-title {
  font-size: 12px !important;
}
.ant-anchor-wrapper {
  padding: 5px !important;
}
</style>
