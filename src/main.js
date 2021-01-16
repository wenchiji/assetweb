import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//请求拦截
axios.interceptors.request.use(config => {
  /*判断token存在   登录拦截*/
  if(localStorage.eleToken){
    /*设置统一的header*/
    config.headers.Authorization  = localStorage.eleToken;
  }
  // if (localStorage.getItem('Authorization')) {
  //   config.headers.Authorization = localStorage.getItem('Authorization');
  // }
  return config;
},error => {
  return Promise.reject(error);
});
