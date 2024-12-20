<script setup lang="ts">
import { useClient } from '~/composables/use-client.ts'

const { logout } = useClient()
</script>

<template>
  <div class="default-layout">
    <el-container>
      <el-header class="default-layout__header">
        <div class="default-layout__header_content">
          <span>Super duper header</span>

          <el-button type="danger" @click="logout"> Выйти </el-button>
        </div>
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.default-layout {
  &__header {
    --el-header-padding: 16px;
    color: var(--el-color-white);
    background: var(--el-color-primary);

    &_content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
