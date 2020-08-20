import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ComponentUtils from './utils/ComponentUtils';
import PageUtils from './utils/PageUtils';

Vue.config.productionTip = false

Vue.prototype.$P = new PageUtils(router);
Vue.prototype.$C = new ComponentUtils();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
