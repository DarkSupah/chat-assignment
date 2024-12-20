<script setup lang="ts">
import { MatrixEvent } from 'matrix-js-sdk'
import BaseMessage from './base-message.vue'

interface Props {
  event: MatrixEvent
}

defineProps<Props>()
</script>

<template>
  <base-message> Encrypted, not available </base-message>
</template>
