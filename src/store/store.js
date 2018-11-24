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
    columns: {
      1: {
        id: 1,
        order: 1,
        name: 'To do',
        tasks: {
          1: {
            id: 1,
            name: 'Task 1',
            description: 'Description 1',
          },
          11: {
            id: 11,
            name: 'Task 1',
            description: 'Description 1',
          },
          12: {
            id: 12,
            name: 'Task 1',
            description: 'Description 1',
          },
          13: {
            id: 13,
            name: 'Task 1',
            description: 'Description 1',
          },
          14: {
            id: 14,
            name: 'Task 1',
            description: 'Description 1',
          },
          15: {
            id: 15,
            name: 'Task 1',
            description: 'Description 1',
          },
          16: {
            id: 16,
            name: 'Task 1',
            description: 'Description 1',
          },
          17: {
            id: 17,
            name: 'Task 1',
            description: 'Description 1',
          },
          18: {
            id: 18,
            name: 'Task 1',
            description: 'Description 1',
          },
          19: {
            id: 19,
            name: 'Task 1',
            description: 'Description 1',
          },
        },
      },
      2: {
        id: 2,
        order: 2,
        name: 'Blocked by blocking request of seven blocks (waiting)',
        tasks: {
          2: {
            id: 2,
            name: 'Task 2',
            description: 'Extremely long description. Extremely long description. Extremely long description. Extremely long description. ',
          },
        },
      },
      3: {
        id: 3,
        order: 3,
        name: 'In progress (development)',
        tasks: {
          3: {
            id: 3,
            name: 'Very long task name, so long task name Very long task name Very long task name',
            description: 'Description 3',
          },
        },
      },
      5: {
        id: 5,
        order: 4,
        name: 'Ready for QA (Inspection)',
        tasks: {
          5: {
            id: 5,
            name: 'Task 5',
            description: 'Description 5',
          },
        },
      },
      6: {
        id: 6,
        order: 5,
        name: 'In QA (Validation)',
        tasks: {
          51: {
            id: 51,
            name: 'Task 5',
            description: 'Description 5',
          },
        },
      },
      7: {
        id: 7,
        order: 6,
        name: 'Done (Resolved)',
        tasks: {
          52: {
            id: 52,
            name: 'Task 5',
            description: 'Description 5',
          },
        },
      },
    },
    nextTaskId: 100,
    nextLineId: 100,
  },
  mutations: {
    isAuthenticated(state, payload) {
      state.isAuthenticated = payload.isAuthenticated;
    },
    addTask(state, { item, lineId }) {
      Vue.set(state.columns[lineId].tasks,
        state.nextTaskId,
        Object.assign(item, { id: state.nextTaskId }));
      state.nextTaskId += 1;
    },
    deleteTask(state, { id, columnId }) {
      Vue.delete(state.columns[columnId].tasks, id);
    },
    addLine(state, item) {
      Vue.set(state.columns,
        state.nextLineId,
        Object.assign(item, { id: state.nextLineId, tasks: {} }));
      state.nextLineId += 1;
    },
    deleteColumn(state, { id }) {
      Vue.delete(state.columns, id);
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
  },
});
