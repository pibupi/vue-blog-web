<template>
  <div class="about-wrap">
    <div class="about-content">
      <div class="avatar-top">
        <img src="../../assets/image/github.jpg" alt="" class="avatar" />
        <p>人菜瘾大bug多脾气差</p>
      </div>
      <div class="desc">
        <i class="line line1"></i>
        <span> 博客简述 </span>
        <i class="line"></i>
      </div>
      <div class="desc-content">
        <p>前端：Vue + Vuex + ElementUI + Sass</p>
        <p>后台：React + Ant Design + Redux</p>
        <p>服务端：Koa2 + Sequelize + MySQL</p>
        <p>
          源码地址：<span class="github-address" @click="toGitHub">github</span>
        </p>
      </div>
      <div class="desc">
        <i class="line line1"></i>
        <span> 关于我 </span>
        <i class="line"></i>
      </div>
      <div class="about-me">
        <ul>
          <li>姓名：张贺</li>
          <li>联系方式： 15942892352@sina.cn</li>
          <li>地址：北京市</li>
          <li>
            技能
            <ul class="skill">
              <li>
                HTML, CSS, JavaScript: 熟练开发符合W3C标准页面，熟练使用ES6语法
              </li>
              <li>
                TypeScript: 熟悉TypeScript通常用法，包含泛型，接口等，并与react
                vue 结合使用
              </li>
              <li>
                React: 熟练使用React相关技术栈并有相关工作经验，熟悉hooks
              </li>
              <li>
                Vue: 熟练使用Vue相关技术栈并有相关工作经验，熟悉vue3.0新特性
              </li>
              <li>
                WebPack:了解相关概念，并能搭建自动化工程项目
              </li>
              <li>
                Node、MySql:根据需求能够做到简单的数据库设计，接口的开发与设计
              </li>
              <li>
                小程序:熟悉组件化开发、wxs语法、内置组件等相关技术
              </li>
            </ul>
          </li>
          <li>
            其他：
            <ul class="skill">
              <li>常用开发工具： vscode、git、postman</li>
              <li>熟悉的 UI 库： antd、element-ui、iview、vant</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'about-me',
  methods: {
    toGitHub() {
      window.location.href = 'https://github.com/zhanghe888/react-blog-admin';
    }
  }
};
</script>
<style lang="scss" scoped>
.about-wrap {
  color: #777;
  font-size: 14px;
  @media (max-width: 575px) {
    font-size: 12px;
  }
  .about-content {
    width: 80%;
    margin: 60px auto;
    .avatar-top {
      display: flex;
      justify-content: flex-start;
      .avatar {
        width: 30px;
        border-radius: 50%;
        margin-right: 30px;
      }
    }
  }
  .desc {
    margin-top: 10px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    span {
      min-width: 100px;
      display: inline-block;
      margin-left: 30px;
      color: #000;
      font-weight: 700;
    }
    .line {
      margin-top: 12px;
      width: 100%;
      height: 1px;
      background-color: #e8e8e8;
      display: inline-block;
    }
    .line1 {
      width: 60px;
    }
  }
  .desc-content {
    p {
      margin-top: 10px;
    }
    .github-address {
      color: #1890ff;
      cursor: pointer;
    }
  }
  .about-me {
    margin-left: 10px;
    ul {
      list-style: circle;
    }
    li {
      margin-top: 10px;
    }
    .skill {
      margin-left: 30px;
    }
  }
}
</style>
