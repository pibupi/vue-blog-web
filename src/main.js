import Vue from 'vue';
import {
  Button,
  Input,
  Card,
  pagination,
  Dialog,
  Form,
  FormItem,
  Tag,
  Timeline,
  TimelineItem,
  Backtop,
  Tooltip,
  Icon,
  Image,
  Avatar
} from 'element-ui';
import App from './App.vue';
// import "./registerServiceWorker";
import moment from 'moment';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import animated from 'animate.css';
import './assets/scss/reset.scss';
import './assets/font/iconfont.css';
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD') {
  return moment(dataStr).format(pattern);
});
// 解决移动端重复点击路由报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
Vue.use(animated);
Vue.use(Input)
  .use(Button)
  .use(pagination)
  .use(Dialog)
  .use(Form)
  .use(FormItem)
  .use(Tag)
  .use(Timeline)
  .use(TimelineItem)
  .use(Backtop)
  .use(Tooltip)
  .use(Icon)
  .use(Image)
  .use(Avatar)
  .use(Card);
Vue.config.productionTip = false;
// 解决elementui打开模态框给body加padding-right 17px的问题
function handlePadding() {
  let MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  let observer = new MutationObserver(mutations => {
    mutations.forEach(item => {
      if ('style' == item.attributeName) {
        document.body.style.padding = 0;
      }
    });
  });

  var body = document.body;

  var options = {
    attributes: true
  };

  observer.observe(body, options);
}
handlePadding();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
