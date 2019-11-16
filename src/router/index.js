import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/layout.vue";
import Home from "../views/home/home.vue";
import Tags from "../views/tags/tags.vue";
import About from "../views/about/about.vue";
import SingleArticle from "../views/single-article/single-article.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "layout",
    component: Layout,
    children: [
      {
        path: "home",
        name: "home",
        component: Home
      },
      {
        path: "tags",
        name: "tags",
        component: Tags
      },
      {
        path: "about",
        name: "about",
        component: About
      },
      {
        path: "singleArticle",
        name: "singleArticle",
        component: SingleArticle
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
  routes
});

export default router;
