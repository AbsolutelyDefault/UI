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
    async signOut({ commit }) {
      commit('isAuthenticated', {
        isAuthenticated: false,
      });
      if (vueAuth.isAuthenticated()) {
        await vueAuth.logout();
      }
    },
    async signInSocial({ commit }, params) {
      await vueAuth.authenticate(params.provider);
      commit('isAuthenticated', {
        isAuthenticated: vueAuth.isAuthenticated(),
      });
    },
    async getLoginStatus() {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/status`);
      if (response.data.loggedIn) {
        return;
      }
      throw new Error();
    },
    async updateLoginStatus({ commit, dispatch }) {
      try {
        await dispatch('getLoginStatus');
        commit('isAuthenticated', {
          isAuthenticated: true,
        });
      } catch {
        await dispatch('signOut');
        router.push({ name: 'XLogin' });
      }
    },
  },
});
