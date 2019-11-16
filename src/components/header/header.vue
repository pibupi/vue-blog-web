<template>
  <div class="header-wrap">
    <div class="logo-wrap">
      Logo
    </div>
    <div class="nav-right">
      <ul class="nav-right-ul clearfix">
        <li><router-link to="/home">首页</router-link></li>
        <li>归档</li>
        <li><router-link to="/tags">标签</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
        <li>留言墙</li>
        <li>搜索</li>
      </ul>
    </div>
  </div>
</template>
<script>
import "@/assets/scss/public.scss";
export default {};
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 80px;
  background-color: aqua;
  display: flex;
  justify-content: space-between;
  padding: 50px 100px 0 100px;
  @media (max-width: 930px) {
    display: none;
  }
  .nav-right-ul {
    li {
      float: left;
      margin-right: 20px;
      font-weight: bolder;
    }
  }
}
</style>
