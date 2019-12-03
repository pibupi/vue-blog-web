import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/layout.vue";
import Home from "../views/home/home.vue";
import Category from "../views/category/category.vue";
import About from "../views/about/about.vue";
import ArticleDetail from "../views/article-detail/article-detail.vue";
import Wall from "../views/wall/wall.vue";
import Archive from "../views/archive/archive.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    meta: { index: 0 },
    redirect: "/home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        meta: { index: 1 }, //meta对象的index用来定义当前路由的层级,由小到大,由低到高
        component: Home
      },
      {
        path: "category",
        name: "category",
        meta: { index: 1 },
        component: Category
      },
      {
        path: "about",
        name: "about",
        meta: { index: 1 },
        component: About
      },
      {
        path: "articleDetail",
        name: "articleDetail",
        meta: { index: 1 },
        component: ArticleDetail
      },
      {
        path: "wall",
        name: "wall",
        meta: { index: 1 },
        component: Wall
      },
      {
        path: "archive",
        name: "archive",
        meta: { index: 1 },
        component: Archive
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
