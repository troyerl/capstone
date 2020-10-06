import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

Vue.use(VueRouter);

import Main from '../components/user/Main.vue';
import Login from '../components/visitor/Login.vue';
import Signup from '../components/visitor/Signup.vue';

import route from './routes';

const routes = [
  // common
  { path: route.main, name: 'main', component: Main, meta: { requiresAuth: true } },
  { path: route.login, name: 'login', component: Login, meta: { requiresAuth: false } },
  { path: route.signup, name: 'signup', component: Signup, meta: { requiresAuth: false } }
];

const router = new VueRouter({
  mode:'history',
  routes // short for `routes: routes`
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo) {
      next();
    } else {
      next({path: route.login});
    }
  }
  next();
});

export default router;