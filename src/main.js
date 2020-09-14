import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import PageUtils from './class/PageUtils';
// require("http://127.0.0.1:8081/testComponent.js").then(() => {
  Vue.use(ViewUI);

  Vue.config.productionTip = false;
  Vue.prototype.$P = new PageUtils(router);
  
  // Vue.component("testComponent", testComponent);

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
// })