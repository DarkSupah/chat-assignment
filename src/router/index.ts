import { createRouter, createWebHistory } from 'vue-router'

import { AuthLayout, DefaultLayout } from '~/layouts'

const IndexView = () => import('~/views/index-page.vue')
const LoginView = () => import('~/views/login-page.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: AuthLayout,
      },
    },
    {
      path: '/',
      name: 'home',
      component: IndexView,
      meta: {
        layout: DefaultLayout,
      },
    },
  ],
})

export default router
