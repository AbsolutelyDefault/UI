/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import vueAuth from './auth';
import router from '../routers/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: true,
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
  },
  actions: {
    signOut({ commit }) {
      return new Promise((resolve) => {
        commit('isAuthenticated', {
          isAuthenticated: false,
        });
        if (vueAuth.isAuthenticated()) {
          vueAuth.logout()
            .then(() => {
              resolve();
            });
        } else {
          resolve();
        }
      });
    },
    signInSocial({ commit }, params) {
      return vueAuth.authenticate(params.provider)
        .then(() => {
          commit('isAuthenticated', {
            isAuthenticated: vueAuth.isAuthenticated(),
          });
        });
    },
    getLoginStatus() {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_BASE_URL}/status`)
          .then((resp) => {
            if (resp.data.loggedIn) {
              resolve();
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    updateLoginStatus({ commit, dispatch }) {
      dispatch('getLoginStatus')
        .then(() => {
          commit('isAuthenticated', {
            isAuthenticated: true,
          });
        })
        .catch(() => {
          dispatch('signOut')
            .then(router.push({ name: 'Login' }));
        });
    },
  },
});
