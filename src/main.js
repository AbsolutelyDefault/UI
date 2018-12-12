/* eslint-disable no-console */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';
import router from './routers/router';
import store from './store/store';

VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);
Vue.use(VueTextareaAutosize);
Vue.use(BootstrapVue);

library.add(faGooglePlusG);
library.add(faEllipsisH);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
