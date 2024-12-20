<script setup lang="ts">
interface Props {
  items: unknown[] | undefined
  itemKey: string
}

defineProps<Props>()
</script>

<template>
  <div class="item-list">
    <slot v-for="item in items" :key="item[itemKey]" v-bind="{ item }" />
  </div>
</template>

<style lang="scss">
.item-list {
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
}
</style>
