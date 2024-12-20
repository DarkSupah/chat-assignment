import { createRouter, createWebHistory } from 'vue-router'

import { AuthLayout, DefaultLayout } from '~/layouts'
import { useAuth } from '~/composables/use-auth.ts'

const IndexView = () => import('~/views/index-page.vue')
const LoginView = () => import('~/views/login-page.vue')

const { isAuth } = useAuth()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: AuthLayout,
        notAuth: true,
      },
    },
    {
      path: '/',
      name: 'home',
      component: IndexView,
      meta: {
        layout: DefaultLayout,
        protected: true,
      },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.protected && !isAuth.value) {
    return { name: 'login' }
  }

  if (to.meta.notAuth && isAuth.value) {
    return { name: 'home' }
  }
})

export default router
