<template>
  <div class="header-wrap">
    <div class="logo-wrap">
      <div class="logo">
        <span>打杂的！</span>
      </div>

      <!-- </input> -->
    </div>
    <div class="nav-right" clearfix>
      <div class="search-wrap">
        <input
          placeholder="搜索文章"
          v-model="pagination.keywords"
          class="search-input"
        />
        <span
          @click="articleSearch"
          class="iconfont icon-sousuo2 search-btn"
        ></span>
      </div>
      <ul class="nav-right-ul clearfix">
        <li class="mouhover">
          <router-link to="/home" tag="span">首页</router-link>
          <!-- <span @click="toHome">首页</span> -->
        </li>
        <li><router-link to="/archive" tag="span">归档</router-link></li>
        <li><router-link to="/category" tag="span">分类</router-link></li>
        <li><router-link to="/about" tag="span">关于</router-link></li>
        <li><router-link to="/wall" tag="span">留言墙</router-link></li>
      </ul>
      <div class="head-btn">
        <span v-if="!isLogin">
          <el-button size="small" @click="openLoginDialog">登录</el-button>
          <el-button size="small" @click="openRegisDialog">注册</el-button>
        </span>
        <span v-else>
          <el-button size="small" @click="logOut">退出登录</el-button>
        </span>
      </div>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      style="width:800px;margin:0 auto;"
      @close="closeDialog"
    >
      <el-form :model="registForm" style="width:400px;" ref="registForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            class="regis-form"
            v-model="registForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          v-if="login === 'register'"
        >
          <el-input
            class="regis-form"
            v-model="registForm.displayName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            class="regis-form"
            v-model="registForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          v-if="login === 'register'"
        >
          <el-input
            class="regis-form"
            v-model="registForm.password2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button @click="resetForm('registForm')">取 消</el-button>
          <el-button type="primary" @click="registConfirm">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import "@/assets/scss/public.scss";
import { mapState, mapActions, mapMutations } from "vuex";
import { register, login } from "../../service/regist";
import { Message } from "element-ui";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "80px",
      login: "register",
      title: "注册",
      registForm: {
        username: "",
        displayName: "",
        password: null,
        password2: null
      }
    };
  },
  computed: {
    ...mapState({
      pagination: state => state.article.pagination,
      isLogin: state => state.login.isLogin
    })
  },
  methods: {
    // toHome() {
    //   this.$router.push({ name: "home" });
    // },
    ...mapActions(["getArticleListAction", "logout"]),
    ...mapMutations(["LOGIN_SUCCESS"]),
    logOut() {
      this.logout();
      Message.success({
        message: "成功退出登录"
      });
      this.$router.replace({ name: "home" });
    },
    articleSearch() {
      this.getArticleListAction(this.pagination);
    },
    openRegisDialog() {
      this.title = "注册";
      this.login = "register";
      this.dialogFormVisible = true;
    },
    openLoginDialog() {
      this.login = "login";
      this.title = "登录";
      this.dialogFormVisible = true;
    },
    closeDialog() {
      this.registForm.username = "";
      this.registForm.password = "";
      this.registForm.password2 = "";
      this.registForm.displayName = "";
    },
    resetForm(registForm) {
      this.$refs[registForm].resetFields();
      this.dialogFormVisible = false;
      this.registForm.username = "";
      this.registForm.password = "";
      this.registForm.password2 = "";
      this.registForm.displayName = "";
    },
    registConfirm() {
      if (this.login === "register") {
        if (this.registForm.password !== this.registForm.password2) {
          Message.warning({
            message: "两次密码不一致"
          });
          return;
        }
        let params = {
          username: this.registForm.username,
          displayName: this.registForm.displayName,
          password: this.registForm.password
        };
        register(params).then(res => {
          if (res.code === 0) {
            Message.success({
              message: res.msg
            });
          } else if (res.code === 1) {
            Message.warning({
              message: res.msg
            });
            return;
          }
          this.dialogFormVisible = false;
          this.registForm.username = "";
          this.registForm.password = "";
          this.registForm.password2 = "";
          this.registForm.displayName = "";
        });
      } else if (this.login === "login") {
        let params = {
          username: this.registForm.username,
          password: this.registForm.password
        };
        login(params).then(res => {
          this.$store.commit("LOGIN_SUCCESS", res);
          this.dialogFormVisible = false;
          this.registForm.username = "";
          this.registForm.password = "";
          this.registForm.password2 = "";
          this.registForm.displayName = "";
          Message.success({
            message: "登录成功"
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 50px 10% 0 10%;
  margin-bottom: 60px;
  .logo-wrap {
    display: flex;
    justify-content: flex-start;
    width: 16%;
    // @media (max-width: 1032px) {
    //   display: none;
    // }
    @media (max-width: 575px) {
      display: block;
    }
    .logo {
      flex: 1 0 130px;
      font-size: 30px;
      font-weight: bolder;
      color: #555;
      min-width: 130px;
      @media (max-width: 575px) {
        font-size: 20px;
      }
      @media (max-width: 1032px) {
        display: none;
      }
      @media (max-width: 575px) {
        display: block;
      }
    }
  }
  .nav-right {
    display: flex;
    justify-content: flex-end;
    min-width: 84%;
    @media (max-width: 575px) {
      display: none;
    }
    .search-wrap {
      margin-right: 5%;
      min-width: 200px;
      @media (max-width: 718px) {
        display: none;
      }
      .search-input {
        width: 80%;
        border-radius: 10px;
        outline: none;
        border: none;
        height: 30px;
        padding: 5px;
        @media (max-width: 940px) {
          display: none;
        }
      }
      .search-btn {
        font-size: 20px;
        margin-top: 2px;
        cursor: pointer;
        @media (max-width: 940px) {
          display: none;
        }
      }
    }
    .nav-right-ul {
      margin-right: 5%;
      // width: 100%;
      min-width: 313px;
      li {
        float: left;
        margin-left: 2%;
        font-weight: bolder;
        padding: 5px 10px;
        border-radius: 10px;
        transition: all 0.5s;
        cursor: pointer;
        &:hover {
          transform: translateY(-5px);
          background-color: #2821fc;
          color: #fff;
        }
      }
    }
    .head-btn {
      min-width: 130px;
      // width: 100%;
      display: inline-block;
      @media (max-width: 545px) {
        display: none;
      }
    }
  }
  .regis-form {
    width: 200px;
  }
}
</style>
