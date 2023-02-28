// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import locale from 'element-ui/lib/locale/lang/en'
Vue.prototype._ = _


Vue.config.productionTip = false;

/* eslint-disable no-new */
var bus = new Vue();
Vue.prototype.bus = bus;
Vue.config.productionTip = false;
Vue.use(ElementUI, {locale}, VueRouter)
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app');
