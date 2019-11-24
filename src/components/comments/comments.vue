<template>
  <div class="comment-wrap">
    <div class="split-line-wrap">
      <span class="split-title">评论</span>
      <span class="split-line"></span>
    </div>
    <div class="commen-editor-wrap">
      <div class="avatar">{{ displayName }}</div>
      <div
        contenteditable="true"
        class="commen-editor"
        ref="editor"
        @blur="changeEditContent"
      ></div>
    </div>
    <el-button size="small" style="float:right;" @click="sendComment"
      >发送评论</el-button
    >
    <!-- 用户评论 -->
    <div
      class="commen-content clearfix"
      v-for="item in comments"
      :key="item.id"
    >
      <div class="user-info">
        <span class="avatar">头像</span>
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
              <span class="answer" @click="answer(item.id, item.displayName)"
                >回复</span
              >
            </div>
            <span class="tool">
              点赞
            </span>
          </div>
          <!-- 回复评论 -->
          <ul class="answer-list">
            <li v-for="(child, index) in item.children" :key="index">
              <div class="user-info">
                <span class="avatar">头像</span>
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
                      <span
                        class="answer"
                        @click="answer(child.parent_id, child.displayName)"
                        >回复</span
                      >
                    </div>
                    <span class="tool">
                      点赞
                    </span>
                  </div>
                  <div v-if="child.toggleAnswer" class="answer-input-wrap">
                    <input
                      type="text"
                      v-model="answerMsg"
                      class="answerInput"
                    />
                    <el-button
                      @click="sendAnswer"
                      size="small"
                      class="send-answer-button"
                      >回复</el-button
                    >
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <div v-if="item.toggleAnswer" class="answer-input-wrap">
            <input type="text" v-model="answerMsg" class="answerInput" />
            <el-button
              @click="sendAnswer"
              size="small"
              class="send-answer-button"
              >回复</el-button
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "../../assets/scss/public.scss";
import jwtDecode from "jwt-decode";
import { mapState } from "vuex";
import { getComments } from "../../service/comment";
import axios from "../../service";
export default {
  name: "comment",
  props: {
    comments: {
      type: Array
    }
  },
  data() {
    return {
      commentContent: "",
      answerMsg: "",
      answerMsgOk: [],
      parent_id: null,
      answerId: null,
      answerDiaplayName: ""
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.login.isLogin,
      displayName: state => state.login.displayName
      // comments: state => state.comment.comments
    })
  },
  created() {},
  methods: {
    async sendComment() {
      if (this.isLogin) {
        let params = {
          content: this.commentContent,
          article_id: this.$route.query.id,
          displayName: this.displayName
        };
        await this.$emit("send", params);
        this.$refs.editor.innerHTML = "";
      } else {
        alert("请先登录");
        return;
      }
    },
    changeEditContent() {
      this.commentContent = this.$refs.editor.innerHTML;
    },
    answer(id, displayName) {
      this.answerId = id;
      this.answerDiaplayName = displayName;
      if (this.displayName === displayName) {
        alert("不能@自己");
        return;
      }
      let item = this.comments.find(item => item.id === id);
      this.parent_id = item.id;
      this.answerMsg = `@${displayName}  `;
      if (!this.isLogin) {
        item.toggleAnswer = true;
        alert("请先登录");
      }
      item.toggleAnswer = !item.toggleAnswer;
    },
    sendAnswer() {
      let data = {
        parent_id: this.parent_id,
        article_id: this.$route.query.id,
        answerContent: this.answerMsg,
        displayName: this.displayName
      };
      axios
        .request({
          url: "/api/v1/web/comment/answer/add",
          data,
          method: "post"
        })
        .then(res => {
          if (res.code == 0) {
            this.answer(this.answerId, this.answerDiaplayName);
            let item = this.comments.find(item => item.id === this.answerId);
            item.children.push(data);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-wrap {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 50px;
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
      // position: absolute;
      // top: 10px;
      // right: 0;
      margin-left: 50px;
      margin-top: 10px;
      display: inline-block;
      height: 0;
      width: 92%;
      border: 2px solid #dcdfe7;
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
            // font-weight: bolder;
          }
          .tool {
            font-size: 13px;
            // font-weight: bolder;
          }
        }
      }
    }
  }
}
.answer-content {
  font-size: 14px;
}
.answer {
  padding: 3px;
  border-radius: 2px;
  cursor: pointer;
  &:hover {
    color: #00a1d6;
    background-color: #e5e9ef;
  }
}
.answer-input-wrap {
  overflow: hidden;
}
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
  margin-top: 20px;
  float: right;
  margin-bottom: 20px;
}
</style>
