<script setup lang="ts">
import { computed } from 'vue'

import { RouterView, useRoute } from 'vue-router'
import { DefaultLayout } from '~/layouts'

const route = useRoute()
const layout = computed(() => route.meta.layout ?? DefaultLayout)
</script>

<template>
  <transition name="layout" mode="in-out" :duration="200">
    <component :is="layout">
      <router-view #default="{ Component }">
        <transition name="page" mode="in-out" :duration="200">
          <component :is="Component" />
        </transition>
      </router-view>
    </component>
  </transition>
</template>
