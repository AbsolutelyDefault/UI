/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import vueAuth from './auth';
import router from '../routers/router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: vueAuth.isAuthenticated(),
    columns: [],
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },

    setColumns(state, newColumns) {
      Vue.set(state, 'columns', newColumns);
    },
    addTask(state, { item, columnId }) {
      const column = state.columns.find(elem => elem._id === columnId);
      column.tasks.push(item);
    },
    deleteTask(state, { taskId, columnId }) {
      const column = state.columns.find(elem => elem._id === columnId);
      Vue.set(column, 'tasks', column.tasks.filter(elem => elem._id !== taskId));
    },
    addColumn(state, column) {
      state.columns.push(column);
    },
    deleteColumn(state, id) {
      Vue.set(state, 'columns', state.columns.filter(elem => elem._id !== id));
    },
    updateTask(state, {
      columnId, taskId, name, description,
    }) {
      const column = state.columns.find(elem => elem._id === columnId);
      const task = column.tasks.find(elem => elem._id === taskId);
      if (name) {
        Vue.set(task, 'name', name);
      }
      if (description) {
        Vue.set(task, 'description', description);
      }
    },
    updateColumnName(state, { id, name }) {
      const column = state.columns.find(elem => elem._id === id);
      Vue.set(column, 'name', name);
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
        router.push({ name: 'Login' });
      }
    },

    async getColumns({ commit }) {
      const response = await axios.get(`${process.env.VUE_APP_BASE_URL}/api/column`);
      commit('setColumns', response.data);
    },
    async deleteColumn({ commit }, { id }) {
      await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/column`, { data: { id } });
      commit('deleteColumn', id);
    },
    async addColumn({ commit }, { name }) {
      const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/column`, {
        name,
      });
      commit('addColumn', response.data);
    },
    async deleteTask({ commit }, { columnId, taskId }) {
      await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        data: {
          columnId,
          id: taskId,
        },
      });
      commit('deleteTask', { columnId, taskId });
    },
    async addTask({ commit }, { item, columnId }) {
      await axios.post(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        id: columnId,
        name: item.name,
        description: item.description,
      });
      commit('addTask', { item, columnId });
    },
    async updateTask({ commit }, {
      columnId, taskId, name, description,
    }) {
      await axios.put(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        id: taskId,
        name,
        description,
      });
      commit('updateTask', {
        columnId, taskId, name, description,
      });
    },
    async updateColumnName({ commit }, { id, name }) {
      await axios.put(`${process.env.VUE_APP_BASE_URL}/api/column`, {
        id,
        name,
      });
      commit('updateColumnName', {
        id, name,
      });
    },
  },
});
