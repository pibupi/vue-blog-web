<template>
  <div>
    <div className="detailed-title">
      <h1 style="text-align:center;">{{ article.title }}</h1>
    </div>
    <div class="content">
      <div>
        <div className="detailed-content" id="mark" v-html="code"></div>
        <div class="pick" @click="likeClick">
          <span :class="likeClass">♥</span>
          <span class="count">{{ count }}</span>
        </div>
      </div>
    </div>
    <Comments
      @send="send"
      :comments="comments"
      @getArticleDetail="getArticleDetail"
      :replyLikeCommentStatus="replyLikeCommentStatus"
      :replyLikeAnswerStatus="replyLikeAnswerStatus"
    />
  </div>
</template>
<script>
import marked from "marked";
import hljs from "highlight.js";
import jwtToken from "jwt-decode";
import axios from "../../service/index";
import { mapState, mapActions } from "vuex";
import Comments from "@/components/comments/comments";
// import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/monokai-sublime.css";
import { Message } from "element-ui";
import { clickLikeArticle, getSingArticle } from "../../service/article";
import { translateMarkdown } from "../../lib/markdown";
export default {
  data() {
    return {
      // code: "# 标题\n```javascript\nfunction(){\n\tconsole.log(123)\n}\n```", 测试markdown数据
      code: "",
      article: {},
      count: 0,
      like_status: 0,
      likeClass: "xin",
      comments: [],
      replyLikeStatus: [],
      replyLikeCommentStatus: [],
      replyLikeAnswerStatus: []
      // replydownLikeCommentStatus: []
    };
  },
  components: {
    Comments
  },
  created() {
    this.getArticleDetail();
  },
  mounted() {
    this.initMarkDown();
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    ...mapActions(["sendCommentAction", "getCommentAction"]),
    initMarkDown() {
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
    },
    async send(params) {
      if (params.content) {
        await this.sendCommentAction(params);
        // console.log(params);
        // let data = {
        //   ...params,
        //   createdAt: Date.now()
        // };
        // this.comments.unshift(data);
        this.getArticleDetail();
        console.log(this.comments);
      } else {
        Message.warning({
          message: "评论内容不能为空"
        });
      }
    },
    async likeClick() {
      if (!this.isLogin) {
        Message.warning({
          message: "登陆后即可点赞"
        });
        return;
      }
      const decoded = jwtToken(sessionStorage.getItem("token"));
      let params = {
        article_id: this.$route.query.id,
        user_id: decoded.id
      };
      let { code, msg } = await clickLikeArticle(params);
      if (code === 0) {
        this.likeClass = "xin click";
        this.count += 1;
        Message.warning({
          message: msg
        });
      } else if (code === 1) {
        Message.warning({
          message: msg
        });
        return;
      }
    },
    async getArticleDetail() {
      let decoded = null;
      if (sessionStorage.getItem("token")) {
        decoded = jwtToken(sessionStorage.getItem("token"));
      }
      let data = {
        article_id: this.$route.query.id,
        user_id: decoded ? decoded.id : ""
      };
      let {
        data: {
          article,
          comments,
          answerComments,
          replyLikeCommentStatus,
          replyLikeAnswerStatus
          // replydownLikeCommentStatus
        }
      } = await getSingArticle(data);
      this.article = article;
      this.replyLikeCommentStatus = replyLikeCommentStatus;
      this.replyLikeAnswerStatus = replyLikeAnswerStatus;
      // this.replydownLikeCommentStatus = replydownLikeCommentStatus;
      let { like_count, like_status, content } = this.article;
      this.count = like_count;
      this.like_status = like_status;
      if (this.like_status > 0) {
        this.likeClass = "xin click";
      }
      // 动态添加额外需要的属性，这样才会其效果
      comments.forEach((item, index) => {
        this.$set(item, "toggleAnswer", false);
        comments[index].toggleAnswer = false;
        replyLikeCommentStatus.forEach(likeItem => {
          if (likeItem.comment_id == item.id) {
            this.$set(item, "reply_like_status", true);
            comments[index].reply_like_status = true;
            // this.$set(item, "reply_down_status", true);
            // comments[index].reply_down_status = true;
          }
        });
        // replydownLikeCommentStatus.forEach(likeItem => {
        //   if (likeItem.comment_id == item.id) {
        //     this.$set(item, "reply_down_status", true);
        //     comments[index].reply_down_status = true;
        //     // this.$set(item, "reply_down_status", true);
        //     // comments[index].reply_down_status = true;
        //   }
        // });

        this.$set(item, "children", []);
        answerComments.forEach((child, index) => {
          if (item.id == child.parent_id) {
            this.$set(child, "toggleAnswer", false);
            answerComments[index].toggleAnswer = false;
            replyLikeAnswerStatus.forEach(likeItem => {
              if (likeItem.answer_id == child.id) {
                this.$set(child, "reply_like_status", true);
                answerComments[index].reply_like_status = true;
              }
            });
            item.children.push(child);
          }
        });
      });
      this.comments = comments;
      this.code = translateMarkdown(content);
    }
  }
  //   async getArticleDetail() {
  //     let decoded = null;
  //     if (sessionStorage.getItem("token")) {
  //       decoded = jwtToken(sessionStorage.getItem("token"));
  //     }
  //     let data = {
  //       article_id: this.$route.query.id,
  //       user_id: decoded ? decoded.id : ""
  //     };
  //     let {
  //       data: { article, comments, answerComments, replyLikeStatus }
  //     } = await getSingArticle(data);
  //     this.article = article;
  //     this.replyLikeStatus = replyLikeStatus;
  //     let { like_count, like_status, content } = this.article;
  //     this.count = like_count;
  //     this.like_status = like_status;
  //     if (this.like_status > 0) {
  //       this.likeClass = "xin click";
  //     }
  //     // 动态添加额外需要的属性，这样才会其效果
  //     comments.forEach((item, index) => {
  //       this.$set(item, "toggleAnswer", false);
  //       comments[index].toggleAnswer = false;
  //       replyLikeStatus.forEach(likeItem => {
  //         if (likeItem.comment_id == item.id) {
  //           this.$set(item, "reply_like_status", true);
  //           comments[index].reply_like_status = true;
  //         }
  //       });
  //       // this.$set(item, "toggleUpZan", false);
  //       // comments[index].toggleUpZan = false;
  //       // this.$set(item, "toggleDownZan", false);
  //       // comments[index].toggleDownZan = false;

  //       this.$set(item, "children", []);
  //       answerComments.forEach((child, index) => {
  //         if (item.id == child.parent_id) {
  //           this.$set(child, "toggleAnswer", false);
  //           answerComments[index].toggleAnswer = false;
  //           replyLikeStatus.forEach(likeItem => {
  //             if (likeItem.comment_id == child.id - 1) {
  //               this.$set(child, "reply_like_status", true);
  //               answerComments[index].reply_like_status = true;
  //             }
  //           });
  //           // this.$set(child, "toggleUpZan", false);
  //           // answerComments[index].toggleUpZan = false;
  //           // this.$set(child, "toggleDownZan", false);
  //           // answerComments[index].toggleDownZan = false;
  //           item.children.push(child);
  //         }
  //       });
  //     });
  //     console.log(comments);
  //     this.comments = comments;
  //     this.code = translateMarkdown(content);
  //   }
  // }
};
</script>
<style lang="scss" scoped>
.xin {
  float: right;
  margin-right: 30px;
  font-size: 36px;
  font-weight: bolder;
}
.pick {
  position: relative;
  left: 95%;
  overflow: hidden;
  display: inline-block;
}
.click {
  color: red;
}
.count {
  position: absolute;
  right: 16px;
  font-size: 12px;
  font-weight: bolder;
  bottom: 6px;
}
.content {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
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
  font-size: 14px;
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
