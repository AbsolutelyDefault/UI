/* eslint-disable no-console */
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueAuthenticate from 'vue-authenticate';
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(BootstrapVue);

library.add(faGooglePlusG);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  tokenName: 'authorizationToken',
  baseUrl: process.env.VUE_APP_BASE_URL,
  storageType: 'cookieStorage',
  providers: {
    google: {
      name: 'google',
      clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      url: process.env.VUE_APP_BASE_PATH,
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
      redirectUri: window.location.origin,
      requiredUrlParams: ['scope'],
      optionalUrlParams: ['display'],
      scope: ['profile', 'email'],
      scopePrefix: 'openid',
      scopeDelimiter: ' ',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 452, height: 633 },
    },

  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
