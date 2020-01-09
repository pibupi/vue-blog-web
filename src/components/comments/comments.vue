<template>
  <div class="comment-wrap">
    <div class="split-line-wrap">
      <span class="split-title">评论</span>
      <i class="iconfont icon-icon1"></i>
      <span class="split-line"></span>
    </div>
    <div class="commen-editor-wrap">
      <div class="avatar">
        <el-avatar size="large" style="fontSize:12px;">{{
          displayName
        }}</el-avatar>
      </div>
      <div
        contenteditable="true"
        class="commen-editor"
        ref="editor"
        @blur="changeEditContent"
      ></div>
    </div>
    <i
      class="iconfont icon-fasong"
      style="float:right;cursor:pointer;"
      @click="sendComment"
    ></i>
    <!-- 用户评论 -->
    <div
      class="commen-content clearfix"
      v-for="item in comments"
      :key="item.id"
    >
      <div class="user-info">
        <span class="avatar">
          <el-avatar size="small" style="fontSize:12px;">{{
            item.displayName
          }}</el-avatar>
        </span>
        <span style="marginLeft:10px;">{{ item.displayName }}</span>
      </div>
      <ul class="content">
        <li class="content-item">
          <div class="content-item-inner">
            <p style="fontSize:16px;">{{ item.content }}</p>
          </div>
          <div class="content-bottom">
            <div class="left">
              <span style="color:#99a2aa">
                {{ item.createdAt }}
              </span>
              <!-- 父评论点赞 -->
              <span
                @click="up(item)"
                style="marginRight:10px;position:relative;marginLeft:10px;"
              >
                <span class="count">{{ item.reply_like_count }}</span>
                <i
                  style="cursor:pointer;"
                  :class="
                    item.reply_like_status
                      ? 'iconfont icon-dianzan6 zan'
                      : 'iconfont icon-dianzan6'
                  "
                  class="topzan"
                ></i>
              </span>
              <!-- 父评论回复 -->
              <i
                class=" iconfont icon-xinxi"
                style="cursor:pointer;marginLeft:10px;"
                @click="answer(item.id, item.displayName)"
              ></i>
            </div>
          </div>
          <!-- 回复评论 -->
          <ul class="answer-list">
            <li v-for="(child, index) in item.children" :key="index">
              <div class="user-info">
                <span class="avatar">
                  <el-avatar size="small" style="fontSize:12px;">{{
                    child.displayName
                  }}</el-avatar>
                </span>
                <span
                  style="marginLeft:10px;fontWeight:bolder;fontSize:12px;color: #6d757a;"
                  >{{ child.displayName }} :
                </span>
                <span class="answer-content">{{ child.answerContent }}</span>
              </div>
              <ul class="content">
                <li class="content-item">
                  <div class="content-item-inner">
                    <p>{{ child.content }}</p>
                  </div>
                  <div class="content-bottom">
                    <div class="left">
                      <span>
                        {{ child.createdAt }}
                      </span>
                      <!-- 子评论点赞 -->
                      <span
                        @click="upChild(child)"
                        style="marginRight:10px;position:relative;marginLeft:10px;"
                      >
                        <span class="count">{{ child.reply_like_count }}</span>
                        <i
                          style="cursor:pointer;"
                          :class="
                            child.reply_like_status
                              ? 'iconfont icon-dianzan6 zan'
                              : 'iconfont icon-dianzan6'
                          "
                          class="topzan"
                        ></i>
                      </span>
                      <!-- 子评论回复 -->
                      <i
                        class="iconfont icon-xinxi"
                        style="cursor:pointer;marginLeft:10px;"
                        @click="answer(child.parent_id, child.displayName)"
                      ></i>
                    </div>
                  </div>
                  <div v-if="child.toggleAnswer" class="answer-input-wrap">
                    <input
                      type="text"
                      v-model="answerMsg"
                      class="answerInput"
                    />
                    <i @click="sendAnswer" class="iconfont icon-xinxi"></i>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div v-if="item.toggleAnswer" class="answer-input-wrap sendbtn">
            <input type="text" v-model="answerMsg" class="answerInput" />
            <i
              @click="sendAnswer"
              size="small"
              class=" iconfont icon-fasong huifubtn"
            ></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import '../../assets/scss/public.scss';
import jwtToken from 'jwt-decode';
import { Message } from 'element-ui';
import { mapState } from 'vuex';
import { getComments, sendAnswerComment } from '../../service/comment';
import axios from '../../service';
export default {
  name: 'comment',
  props: {
    comments: {
      type: Array
    },
    replyLikeCommentStatus: {
      type: Array
    },
    replyLikeAnswerStatus: {
      type: Array
    }
  },
  data() {
    return {
      commentContent: '', // 评论内容
      answerMsg: '', // @前缀
      // answerMsgOk: [],
      parent_id: null, // 父级评论id
      answerId: null, // 回复id
      answerDiaplayName: '', // 评论昵称
      zanStatus: false, // 点赞状态
      // buzanStatus: false,
      zanId: null // 点赞的评论id
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin,
      displayName: state => state.login.displayName
    })
  },
  methods: {
    // 父评论点赞
    up(item) {
      let status = false;
      this.replyLikeCommentStatus.forEach(result => {
        if (result.comment_id == item.id) {
          status = true;
          return;
        }
      });
      if (status) {
        Message.warning({
          message: '您已点过赞！！'
        });
        return;
      }
      let decoded = null;
      if (sessionStorage.getItem('token')) {
        decoded = jwtToken(sessionStorage.getItem('token'));
      }
      let params = {
        user_id: decoded.id,
        comment_id: item.id,
        article_id: this.$route.query.id
      };
      axios
        .request({
          url: '/api/v1/web/click/replylike',
          data: {
            params
          },
          method: 'post'
        })
        .then(res => {
          if (res.code === 0) {
            this.$emit('getArticleDetail');
          }
        });
    },
    // 子评论点赞
    upChild(child) {
      let statuss = false;
      if (this.replyLikeAnswerStatus) {
        this.replyLikeAnswerStatus.forEach(item => {
          if (item.answer_id == child.id) {
            statuss = true;
            return;
          }
        });
        if (statuss) {
          Message.warning({
            message: '您已点过赞！！'
          });
          return;
        }
      }
      let decoded = null;
      if (sessionStorage.getItem('token')) {
        decoded = jwtToken(sessionStorage.getItem('token'));
      }
      let params = {
        user_id: decoded.id,
        answer_id: child.id, // 子评论要加1
        article_id: this.$route.query.id
      };
      axios
        .request({
          url: '/api/v1/web/click/child/replylike',
          data: {
            params
          },
          method: 'post'
        })
        .then(async res => {
          if (res.code == 0) {
            Message.warning({
              message: res.msg
            });
            await this.$emit('getArticleDetail');
          } else {
            Message.warning({
              message: res.msg
            });
          }
        });
    },
    // 发送父级评论
    async sendComment() {
      if (this.isLogin) {
        let params = {
          content: this.commentContent,
          article_id: this.$route.query.id,
          displayName: this.displayName
        };
        await this.$emit('send', params);
        this.$refs.editor.innerHTML = '';
      } else {
        alert('请先登录');
        return;
      }
    },
    // 获取编辑框内容
    changeEditContent() {
      this.commentContent = this.$refs.editor.innerHTML;
    },
    // 弹出回复框
    answer(id, displayName) {
      this.answerId = id;
      this.answerDiaplayName = displayName;
      if (this.displayName === displayName) {
        alert('不能@自己');
        return;
      }
      let item = this.comments.find(item => item.id === id);
      this.parent_id = item.id;
      this.answerMsg = `@${displayName}  `;
      if (!this.isLogin) {
        item.toggleAnswer = true;
        alert('请先登录');
      }
      item.toggleAnswer = !item.toggleAnswer;
    },
    // 发送子回复
    sendAnswer() {
      let data = {
        parent_id: this.parent_id,
        article_id: this.$route.query.id,
        answerContent: this.answerMsg,
        displayName: this.displayName,
        createdAt: Date.now()
      };
      sendAnswerComment(data).then(res => {
        if (res.code == 0) {
          this.answer(this.answerId, this.answerDiaplayName);
          let item = this.comments.find(item => item.id === this.answerId);
          this.$emit('getArticleDetail');
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.zan {
  color: #1890ff;
}
.topzan {
  font-size: 20px;
}
.count {
  color: #fff;
  display: inline-block;
  position: absolute;
  top: -15px;
  right: -6px;
  font-size: 12px;
  text-align: center;
  line-height: 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #f00;
}
.comment-wrap {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 200px;
  margin-top: 50px;
  overflow: hidden;
  @media (max-width: 930px) {
    width: 85%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
  .split-line-wrap {
    display: flex;
    justify-content: flex-start;
    position: relative;
    .split-title {
      min-width: 40px;
      font-size: 13px;
      font-weight: bolder;
    }
    .split-line {
      margin-left: 50px;
      margin-top: 10px;
      display: inline-block;
      height: 0;
      width: 92%;
      border: 1px solid #dcdfe7;
    }
  }
  .commen-editor-wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 30px auto;
    font-size: 13px;
    .avatar {
      color: #6d757a;
      margin-right: 30px;
      font-size: 13px;
      min-width: 60px;
      font-weight: bolder;
      display: inline-block;
      @media (max-width: 600px) {
        display: none;
      }
    }
    .commen-editor {
      min-height: 80px;
      width: 90%;
      border: 2px solid #eee;
      border-radius: 5px;
      outline: none;
      padding: 20px;
      transition: all 0.5s;
      box-sizing: border-box;
      @media (max-width: 600px) {
        width: 100%;
      }
      &:hover {
        border: 2px solid #1890ff;
      }
    }
  }
  .commen-content {
    width: 100%;
    margin: 30px auto;
    overflow: hidden;
    font-size: 13px;
    border-bottom: 1px solid #e5e9ef;
    .content {
      margin-left: 50px;
      .content-item {
        .content-item-inner {
          margin-top: 30px;
          margin-bottom: 30px;
          font-size: 18px;
        }
        .content-bottom {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          color: #99a2aa;
          .left {
            font-size: 13px;
            .answer {
              padding: 3px;
              border-radius: 2px;
              cursor: pointer;
              &:hover {
                color: #00a1d6;
                background-color: #e5e9ef;
              }
            }
          }
          .tool {
            font-size: 13px;
          }
        }
        .answer-input-wrap {
          padding-bottom: 60px;
          overflow: hidden;
          // position: relative;
          .answerInput {
            min-height: 20px;
            width: 98%;
            float: right;
            border: 1px solid #eee;
            border-radius: 5px;
            outline: none;
            padding: 20px;
            transition: all 0.5s;
            box-sizing: border-box;
            &:hover {
              border: 1px solid #1890ff;
            }
          }
          .send-answer-button {
            // position: absolute;
            // right: 0;
            // top: 100%;
            margin-top: 20px;
            float: right;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
  .sendbtn {
    position: relative;
  }
  .huifubtn {
    position: absolute;
    right: 0;
    bottom: 30px;
    cursor: pointer;
  }
}
</style>
