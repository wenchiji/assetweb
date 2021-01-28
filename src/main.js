import Vue from 'vue'
import './plugins/axios'
import axios from './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(axios);
Vue.prototype.$http = axios;

window.jQuery = $;
window.$ = $;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
