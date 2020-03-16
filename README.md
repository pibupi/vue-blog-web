### 项目地址：
[博客地址](http://www.xxhblog.com)   

### 项目介绍
* vue-blog-web为博客前台
* 前后端分离项目

### 技术栈
* Vue全家桶
* Axios
* Sass
* ElementUI
* Eslint + Prettier
* highlight.js
### 预览

### 已实现功能

- [x] 登录
- [x] github第三方授权
- [x] 文章列表展示
- [x] 文章详情展示
- [x] 标签展示
- [x] 评论功能
- [x] 代码高亮
- [x] 文章、评论点赞

### 待实现功能

- [ ] 文章段落生成锚点
- [ ] 推荐文章
- [ ] 个人中心完善
- [ ] UI

### 项目启动
```
git clone git@github.com:zhanghe888/vue-blog-web.git

cd vue-blog-web

npm install

npm run serve
```
### 项目结构
```
vue-blog-web
├─ .gitignore          // git忽略文件
├─ src
│    ├─ assets         // 静态资源
│    ├─ components     // 公共组件
│    ├─ config         // 配置文件
│    ├─ lib            // 公共方法
│    ├─ router         // 路由表
│    ├─ service        // 请求层
│    └─ store          // 状态共享
│    └─ views          // 业务模块
└─ babel.config.js    // babel配置，Element按需加载
```

### 未来
* 采用webpack4+动配置工程环境
* TypeScript重构此项目
* 优化前台UI展示
* 增加vue3.0新特性