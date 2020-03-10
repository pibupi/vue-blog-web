<template>
  <div class="top">
    <div class="header-wrap">
      <div class="logo-wrap">
        <div class="logo">
          <span>打杂的！</span>
        </div>
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
          </li>
          <li><router-link to="/archive" tag="span">归档</router-link></li>
          <li><router-link to="/category" tag="span">分类</router-link></li>
          <li><router-link to="/about" tag="span">关于</router-link></li>
          <!-- <li><router-link to="/wall" tag="span">留言墙</router-link></li> -->
        </ul>
        <div class="head-btn">
          <span v-if="!isLogin">
            <el-button size="small" type="primary" @click="openLoginDialog"
              >登录</el-button
            >
            <el-button size="small" type="danger" @click="openRegisDialog"
              >注册</el-button
            >
          </span>
          <span v-else>
            <el-button
              size="small"
              @click="logOut"
              style="marginTop:6px;"
              class="logbtn"
              >退出登录</el-button
            >
            <el-avatar
              class="avatar"
              size="large"
              style="marginLeft:10px;position:absolute;fontSize:12px;"
              >{{ displayName }}</el-avatar
            >
          </span>
        </div>
      </div>
      <i class="iconfont icon-ziyuan menu" @click="showMenu"></i>
      <div class="small-nav-right" v-if="showmenu">
        <ul class="small-nav-right-ul">
          <li class="mouhover" @click="navClick('/home')">
            <i class="iconfont icon-shouye"></i><span>首页</span>
          </li>
          <li @click="navClick('/archive')">
            <i class="iconfont icon-guidang"></i><span>归档</span>
          </li>
          <li @click="navClick('/category')">
            <i class="iconfont icon-leimupinleifenleileibie"></i
            ><span>分类</span>
          </li>
          <li @click="navClick('/about')">
            <i class="iconfont icon-guanyuwo"></i><span>关于</span>
          </li>
          <!-- <li><router-link to="/wall" tag="span">留言墙</router-link></li> -->
        </ul>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="dialogFormVisible"
        style="width:800px;margin:0 auto;"
        @close="closeDialog"
        :modal-append-to-body="false"
      >
        <el-form
          :rules="rules"
          :model="registForm"
          style="width:400px;"
          ref="registForm"
          size="mini"
        >
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input
              class="regis-form"
              v-model="registForm.username"
              autocomplete="off"
              ref="userInput"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="昵称"
            :label-width="formLabelWidth"
            v-if="login === 'register'"
            prop="displayName"
          >
            <el-input
              class="regis-form"
              v-model="registForm.displayName"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              type="password"
              class="regis-form"
              v-model="registForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            :label-width="formLabelWidth"
            v-if="login === 'register'"
            prop="password2"
          >
            <el-input
              type="password"
              class="regis-form"
              v-model="registForm.password2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            size="small"
            style="width:90%"
            @click="registConfirm"
            >{{ login === 'login' ? 'login' : 'register' }}</el-button
          >
          <el-button
            size="small"
            style="width:90%;marginTop:10px;marginLeft:0;"
            @click="githublogin"
            v-if="login === 'login'"
          >
            <i class="iconfont icon-github" style="fontSize:16px;"></i>
            github login
          </el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import '@/assets/scss/public.scss';
import axios from '../../service';
import { mapState, mapActions, mapMutations } from 'vuex';
import { register, login } from '../../service/regist';
import { Message } from 'element-ui';
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '80px',
      login: 'register',
      title: 'login',
      showmenu: false,
      registForm: {
        username: '',
        displayName: '',
        password: null,
        password2: null
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        displayName: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        password2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      pagination: state => state.article.pagination,
      isLogin: state => state.login.isLogin,
      displayName: state => state.login.displayName
    })
  },
  created() {
    // 获取github授权后的用户信息
    const username = window.location.search.split('=');
    let userinfo = {
      username: username[1],
      password: username[1]
    };
    if (userinfo.username && username[0].split('?')[1] === 'name') {
      login(userinfo).then(res => {
        this.$store.commit('LOGIN_SUCCESS', res);
        Message.success({
          message: '登录成功'
        });
        let preUrl = sessionStorage.getItem('preUrl');
        this.$router.replace(preUrl);
      });
    }
  },
  mounted() {
    document.getElementById('wrap').addEventListener('click', () => {
      this.showmenu = false;
    });
  },
  methods: {
    ...mapActions(['getArticleListAction', 'logout']),
    ...mapMutations(['LOGIN_SUCCESS']),
    navClick(path) {
      this.$router.push(path);
      this.showmenu = false;
    },
    showMenu() {
      this.showmenu = !this.showmenu;
    },
    // 跳转到github
    githublogin() {
      const preUrl = `${window.location.pathname}${window.location.search}`;
      sessionStorage.setItem('preUrl', preUrl);
      // window.location.href = `https://github.com/login/oauth/authorize?client_id=eb12a53881547ca7c69f&redirect_uri=http://localhost:5001/api/v1/oauth/redirect`;
      window.location.href =
        'https://github.com/login/oauth/authorize?client_id=eb12a53881547ca7c69f&redirect_uri=http://111.229.228.223:5001/api/v1/oauth/redirect';
    },
    // 退出登录
    logOut() {
      this.logout();
      Message.success({
        message: '成功退出登录'
      });
      if (this.$route.path !== '/home') {
        this.$router.replace({ name: 'home' });
      }
    },
    // 搜索
    articleSearch() {
      this.getArticleListAction(this.pagination);
    },
    openRegisDialog() {
      this.title = 'regist';
      this.login = 'register';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['userInput'].focus();
      });
    },
    openLoginDialog() {
      this.login = 'login';
      this.title = 'login';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['userInput'].focus();
      });
    },
    closeDialog() {
      this.registForm.username = '';
      this.registForm.password = '';
      this.registForm.password2 = '';
      this.registForm.displayName = '';
      this.$refs['userInput'].blur();
    },
    resetForm(registForm) {
      this.$refs[registForm].resetFields();
      this.dialogFormVisible = false;
      this.registForm.username = '';
      this.registForm.password = '';
      this.registForm.password2 = '';
      this.registForm.displayName = '';
    },
    // 提交注册登录表单
    registConfirm() {
      if (this.login === 'register') {
        if (this.registForm.password !== this.registForm.password2) {
          Message.warning({
            message: '两次密码不一致'
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
          this.registForm.username = '';
          this.registForm.password = '';
          this.registForm.password2 = '';
          this.registForm.displayName = '';
        });
      } else if (this.login === 'login') {
        let params = {
          username: this.registForm.username,
          password: this.registForm.password
        };
        login(params).then(res => {
          this.$store.commit('LOGIN_SUCCESS', res);
          this.dialogFormVisible = false;
          this.registForm.username = '';
          this.registForm.password = '';
          this.registForm.password2 = '';
          this.registForm.displayName = '';
          Message.success({
            message: '登录成功'
          });
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  right: 4px;
  left: 0;
  z-index: 100;
  background-color: #fff;
}
.header-wrap {
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 20px 10% 20px 10%;
  margin-bottom: 60px;
  box-shadow: -1px 4px 6px #f0f1f2;
  position: relative;
  @media (max-width: 575px) {
    height: 30px;
    display: block;
    margin-bottom: 0;
  }
  .logo-wrap {
    display: flex;
    justify-content: flex-start;
    width: 16%;
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
      width: 40%;
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
      min-width: 243px;
      li {
        float: left;
        margin-left: 2%;
        font-weight: bolder;
        padding: 5px 10px;
        border-radius: 5px;
        transition: all 0.5s;
        position: relative;
        cursor: pointer;
        &:before {
          display: inline-block;
          content: '';
          height: 6px;
          width: 6px;
          border-radius: 50%;
          background-color: #2821fc;
          position: absolute;
          right: 0;
          opacity: 0;
          transition: all 0.5s;
        }
        &:hover {
          &:before {
            opacity: 1;
          }
        }
      }
    }
    .head-btn {
      min-width: 130px;
      display: inline-block;
      @media (max-width: 545px) {
        display: none;
      }
    }
  }
  .regis-form {
    width: 80%;
  }
}
.header-wrap /deep/ .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.small-nav-right {
  z-index: 100;
  position: absolute;
  left: 0;
  width: 100%;
  transition: all 0.5s;
}
.small-nav-right-ul {
  background-color: #fff;
  width: 100%;
  box-shadow: 2px 4px 6px #f0f1f2;
  font-size: 14px;
  padding-bottom: 10px;
  color: #555;
  li {
    padding-left: 20px;
    margin-top: 10px;
    span {
      margin-left: 10px;
    }
  }
}
.icon-ziyuan {
  position: absolute;
  right: 0;
}
.menu {
  position: absolute;
  right: 30px;
  top: 16px;
  font-size: 30px;
  display: none;
  @media (max-width: 575px) {
    display: block;
  }
}
</style>
