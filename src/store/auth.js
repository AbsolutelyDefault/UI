/* eslint-disable no-param-reassign */
import Vue from 'vue';
import { VueAuthenticate } from 'vue-authenticate';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

const vueAuth = new VueAuthenticate(Vue.prototype.$http, {
  tokenName: 'authorizationToken',
  baseUrl: process.env.VUE_APP_BASE_URL,
  storageType: 'localStorage',
  tokenType: '',
  tokenHeader: 'authorization',
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

  bindRequestInterceptor($auth) {
    const { tokenHeader } = $auth.options;

    $auth.$http.interceptors.request.use((config) => {
      if ($auth.isAuthenticated()) {
        config.headers[tokenHeader] = [
          $auth.options.tokenType, $auth.getToken(),
        ].join(' ');
      } else {
        delete config.headers[tokenHeader];
      }
      return config;
    });
  },
});

export default vueAuth;
