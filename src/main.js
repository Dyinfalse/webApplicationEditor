import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);
import ComponentUtils from './utils/ComponentUtils';
import PageUtils from './utils/PageUtils';

Vue.config.productionTip = false

Vue.prototype.$C = new ComponentUtils();
Vue.prototype.$P = new PageUtils(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
