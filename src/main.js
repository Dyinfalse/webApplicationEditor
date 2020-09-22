import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'view-design/dist/styles/iview.css';

import PageUtils from './class/PageUtils';
// 引入全局配置文件
import "@/utils/system_options";
// require("http://127.0.0.1:8081/testComponent.js").then(() => {

  Vue.config.productionTip = false;
  Vue.prototype.$P = new PageUtils(router);
  
  // Vue.component("testComponent", testComponent);
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// })