import Vue from 'vue';
import Router from 'vue-router';
import Board from '@/views/Board.vue';
import Login from '@/views/Login.vue';
import store from '../store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/$',
      redirect: '/board',
      meta: { auth: false },
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
      meta: { auth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { auth: false },
    },
    {
      path: '/auth/callback',
      component: {
        template: '<div class="auth-component"></div>',
      },
      meta: { auth: false },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(route => route.meta.auth);
  const authed = store.state.isAuthenticated;
  if (authRequired && !authed) {
    next('/login');
  } else {
    next();
  }
});


export default router;
