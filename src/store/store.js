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
    boardId: '',
  },
  getters: {
    getColumnIndex: state => id => state.columns.findIndex(elem => elem._id === id),
    getColumnNames: state => state.columns.map(
      value => ({ value: value._id, text: value.name }),
    ),
    getColumnsNumber: state => state.columns.length,
    getTasksNumber: state => id => state.columns.find(elem => elem._id === id).tasks.length,
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },

    setColumns(state, newColumns) {
      Vue.set(state, 'columns', newColumns);
    },
    setBoardId(state, boardId) {
      Vue.set(state, 'boardId', boardId);
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
    updateTasks(state, { columnId, tasks }) {
      const column = state.columns.find(elem => elem._id === columnId);
      Vue.set(column, 'tasks', tasks);
    },
    setTaskColor(state, { columnId, taskId, color }) {
      const column = state.columns.find(elem => elem._id === columnId);
      const task = column.tasks.find(elem => elem._id === taskId);
      Vue.set(task, 'color', color);
    },
    setColumnPosition(state, { id, position }) {
      const { columns } = state;
      const index = columns.findIndex(elem => elem._id === id);
      columns.splice(position, 0, columns.splice(index, 1)[0]);
    },
    setTaskPosition(state, {
      columnId, taskId, columnNewId, position,
    }) {
      const column = state.columns.find(elem => elem._id === columnId);
      const { tasks } = column;
      const index = tasks.findIndex(elem => elem._id === taskId);
      const task = tasks.splice(index, 1)[0];
      if (columnId === columnNewId) {
        tasks.splice(position, 0, task);
      } else {
        const columnNew = state.columns.find(elem => elem._id === columnNewId);
        columnNew.tasks.splice(position, 0, task);
      }
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
      commit('setColumns', response.data.columns);
      commit('setBoardId', response.data.boardId);
    },
    async deleteColumn({ commit }, { id }) {
      await axios.delete(`${process.env.VUE_APP_BASE_URL}/api/column`, { data: { id } });
      commit('deleteColumn', id);
    },
    async addColumn({ commit }, { name, boardId }) {
      const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/column`, {
        name, boardId,
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
      const response = await axios.post(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        id: columnId,
        name: item.name,
        description: item.description,
      });
      commit('addTask', { item: response.data, columnId });
    },
    async sendUpdateTask(state, {
      taskId, name, description, color,
    }) {
      axios.put(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        id: taskId,
        name,
        description,
        color,
      });
    },
    async updateTask({ commit, dispatch }, {
      columnId, taskId, name, description, color,
    }) {
      await dispatch('sendUpdateTask', {
        taskId, name, description, color,
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
    async setTaskColor({ commit, dispatch }, {
      columnId, taskId, name, description, color,
    }) {
      await dispatch('sendUpdateTask', {
        taskId, name, description, color,
      });
      commit('setTaskColor', {
        columnId, taskId, color,
      });
    },
    async sendColumnPosition(state, { id, position }) {
      axios.patch(`${process.env.VUE_APP_BASE_URL}/api/column`, {
        id,
        num: position,
      });
    },
    async sendTaskPosition(state, {
      columnId, taskId, columnNewId, position,
    }) {
      axios.patch(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        columnId,
        id: taskId,
        columnNewId,
        num: position,
      });
    },
    async setTaskPosition({ dispatch, commit }, {
      columnId, taskId, columnNewId, position,
    }) {
      await dispatch('sendTaskPosition', {
        columnId, taskId, columnNewId, position,
      });
      commit('setTaskPosition', {
        columnId, taskId, columnNewId, position,
      });
    },
    async setColumnPosition({ dispatch, commit }, { id, position }) {
      await dispatch('sendColumnPosition', { id, position });
      commit('setColumnPosition', { id, position });
    },
  },
});
