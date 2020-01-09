<template>
  <div class="article-list-wrap">
    <!-- 文章详情 -->
    <div class="detailed-title">
      <h1 class="detail-head-title">
        {{ article.title }}
      </h1>
      <div class="user-info">
        <span class="detail-author">{{ article.author }}</span>
        <span class="detail-line"></span>
        <span class="detail-time">
          {{ article.createdAt | dateformat('YYYY-MM-DD') }}
        </span>
        <span class="detail-line"></span>
        <i class="iconfont icon-biaoqian" style="marginLeft:10px;"
          ><el-tag
            size="small"
            type="success"
            style="marginLeft:5px;position:relative;top:-2px;"
            >{{ article.category_name }}</el-tag
          ></i
        >
      </div>
    </div>
    <div class="content">
      <div>
        <div class="detailed-content" id="mark" v-html="code"></div>
        <div class="pick">
          <div class="pick-category">
            <span>
              <i class="iconfont icon-biaoqian"></i>
              <span style="marginLeft:10px;">{{ article.category_name }}</span>
            </span>
          </div>
          <div class="clickxin">
            <span :class="likeClass" @click="likeClick">♥</span>
            <span class="count">{{ count }}</span>
          </div>
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
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import jwtToken from 'jwt-decode';
import { mapState, mapActions } from 'vuex';
import Comments from '@/components/comments/comments';
// import javascript from "highlight.js/lib/languages/javascript";
import { Message } from 'element-ui';
import { clickLikeArticle, getSingArticle } from '../../service/article';
import { translateMarkdown } from '../../lib/markdown';
export default {
  data() {
    return {
      // code: "# 标题\n```javascript\nfunction(){\n\tconsole.log(123)\n}\n```", 测试markdown数据
      code: '',
      article: {},
      count: 0,
      like_status: 0,
      likeClass: 'xin',
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
    ...mapActions(['sendCommentAction', 'getCommentAction']),
    initMarkDown() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code) {
          // 如何让代码高亮
          return hljs.highlightAuto(code).value; // 自动检测
        },
        pedantic: false, // 容错，如为false会把不符合markdown的也改正一下渲染
        gfm: true, // 启动类似github样式的markdown
        tables: true, // 表格输出为github的样式
        breaks: false, // github的换行符
        sanitize: false, // 原始输出忽略html标签，false为不忽略，如iframe,视频
        smartLists: true // 自动渲染列表
        // smartypants: false,
        // xhtml: false
      });
      this.code = marked(this.code);
    },
    // 发送父级评论
    async send(params) {
      if (params.content) {
        await this.sendCommentAction(params);
        this.getArticleDetail();
      } else {
        Message.warning({
          message: '评论内容不能为空'
        });
      }
    },
    // 点赞
    async likeClick() {
      if (!this.isLogin) {
        Message.warning({
          message: '登陆后即可点赞'
        });
        return;
      }
      const decoded = jwtToken(sessionStorage.getItem('token'));
      let params = {
        article_id: this.$route.query.id,
        user_id: decoded.id
      };
      let { code, msg } = await clickLikeArticle(params);
      if (code === 0) {
        this.likeClass = 'xin click';
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
    // 获取文章详情
    async getArticleDetail() {
      let decoded = null;
      if (sessionStorage.getItem('token')) {
        decoded = jwtToken(sessionStorage.getItem('token'));
      }
      let data = {
        article_id: this.$route.query.id,
        user_id: decoded ? decoded.id : ''
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
        this.likeClass = 'xin click';
      }
      // 动态添加额外需要的属性，这样才会其效果
      comments.forEach((item, index) => {
        this.$set(item, 'toggleAnswer', false);
        comments[index].toggleAnswer = false;
        replyLikeCommentStatus.forEach(likeItem => {
          if (likeItem.comment_id == item.id) {
            this.$set(item, 'reply_like_status', true);
            comments[index].reply_like_status = true;
          }
        });
        this.$set(item, 'children', []);
        answerComments.forEach((child, index) => {
          if (item.id == child.parent_id) {
            this.$set(child, 'toggleAnswer', false);
            answerComments[index].toggleAnswer = false;
            replyLikeAnswerStatus.forEach(likeItem => {
              if (likeItem.answer_id == child.id) {
                this.$set(child, 'reply_like_status', true);
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
};
</script>
<style lang="scss" scoped>
.xin {
  margin-right: 30px;
  font-size: 36px;
  font-weight: bolder;
  cursor: pointer;
  @media (max-width: 573px) {
    font-size: 30px;
  }
}
.pick {
  display: flex;
  width: 100%;
  justify-content: space-between;
  overflow: hidden;
  @media (max-width: 930px) {
    left: 90%;
  }
  @media (max-width: 600px) {
    left: 80%;
  }
  .clickxin {
    position: relative;
  }
  .pick-category {
    padding-top: 15px;
  }
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
  width: 70%;
  margin: 0 auto;
  overflow: hidden;
  padding: 1.3rem;
  font-size: 1rem;
  @media (max-width: 930px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
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
  .detail-head-title {
    font-size: 1.8rem;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    margin: 30px auto 0;
    width: 80%;
    border: none;
    @media (max-width: 930px) {
      font-size: 20px !important;
    }
    @media (max-width: 375px) {
      font-size: 16px !important;
      margin: 0 auto;
    }
  }
  .user-info {
    margin-top: 20px;
    .detail-line {
      &:before {
        display: inline-block;
        content: '';
        width: 1px;
        height: 10px;
        background-color: #e8e8e8;
        // border: 1px solid #555;
      }
    }
    .detail-author {
      color: #555;
      font-size: 14px;
      margin-right: 10px;
    }
    .detail-time {
      margin-left: 10px;
      color: #555;
      font-size: 14px;
      margin-right: 10px;
    }
  }
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
  font-family: Lato, PingFang, SC, Microsoft YaHei, sans-serif !important;
  font-size: 14px;
  line-height: 2em;
}
#mark /deep/ ol li {
  list-style: circle;
  margin-left: 3%;
  font-size: 14px;
  line-height: 1.7em;
}
#mark /deep/ a {
  font-size: 12px;
  color: #1890ff;
}
#mark /deep/ pre {
  display: block;
  background-color: #f3f3f3;
  padding: 0.5rem !important;
  overflow-y: auto;
  font-weight: 300;
  background-color: #f7f7f7 !important;
  border-radius: 0.3rem;
  margin: 20px 0;
}
#mark /deep/ pre > code {
  border: 0px !important;
  background-color: #f7f7f7 !important;
  font-size: 13px;
  color: #555;
  font-family: consolas, Menlo, PingFang SC, Microsoft YaHei, monospace !important;
}
#mark /deep/ code {
  padding: 2px 4px;
  word-wrap: break-word;
  color: #ff502c;
  background: #fff5f5;
  border-radius: 3px;
  font-size: 13px;
}
#mark /deep/ pre > code .hljs-string {
  color: #50a14f;
}
#mark /deep/ .hljs-built_in {
  color: #c18401;
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
  max-width: 100%;
  border: 1px solid #f3f3f3;
  display: inline-block;
  @media (max-width: 1024px) {
    width: 100%;
  }
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
#mark /deep/ ul li {
  list-style: circle;
  margin-left: 3%;
  font-size: 14px;
  line-height: 2em;
}
#mark /deep/ .hljs-title {
  color: #a6e22e;
}
#mark /deep/ .hljs-params {
  color: #ff502c;
}
</style>
