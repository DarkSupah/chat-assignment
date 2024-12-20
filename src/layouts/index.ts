import { defineAsyncComponent } from 'vue'

export const AuthLayout = defineAsyncComponent(() => import('~/layouts/auth.vue'))
export const DefaultLayout = defineAsyncComponent(() => import('~/layouts/default.vue'))
