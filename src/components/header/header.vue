<template>
  <div class="header-wrap">
    <div class="logo-wrap">
      <div class="logo">
        Logo
      </div>
      <el-input
        placeholder="请输入内容"
        v-model="pagination.keywords"
        class="search-input"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="articleSearch"
        ></el-button>
      </el-input>
    </div>
    <div class="nav-right">
      <ul class="nav-right-ul clearfix">
        <li class="mouhover">
          <router-link to="/home" tag="span">首页</router-link>
        </li>
        <li><router-link to="/back" tag="span">归档</router-link></li>
        <li><router-link to="/category" tag="span">分类</router-link></li>
        <li><router-link to="/about" tag="span">关于</router-link></li>
        <li><router-link to="/wall" tag="span">留言墙</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/scss/public.scss";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      pagination: state => state.article.pagination
    })
  },
  methods: {
    ...mapActions(["getArticleListAction"]),
    articleSearch() {
      this.getArticleListAction(this.pagination);
    }
  }
};
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 50px 10% 0 10%;
  .logo-wrap {
    display: flex;
    justify-content: flex-start;
    width: 50%;
    .logo {
      flex: 1 0 100px;
    }
    .search-input {
      min-width: 200px;
      width: 100%;
    }
  }
  .nav-right {
    @media (max-width: 930px) {
      display: none;
    }
  }
  .nav-right-ul {
    li {
      float: left;
      margin-right: 20px;
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
}
</style>
