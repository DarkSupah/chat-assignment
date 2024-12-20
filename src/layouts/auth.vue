<script setup lang="ts"></script>

<template>
  <div class="auth-layout">
    <el-container class="auth-layout__container" direction="vertical">
      <el-main class="auth-layout__main">
        <slot />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.auth-layout {
  height: 100%;

  &__container {
    height: 100%;
  }

  &__main {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
  }
}
</style>
