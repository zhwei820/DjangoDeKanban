import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import router from './router/index';
import store from './store/index';

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable */
new Vue({
  router,
  store,
  el: '#app',
});
