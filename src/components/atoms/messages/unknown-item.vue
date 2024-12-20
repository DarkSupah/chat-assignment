<script setup lang="ts">
import { MatrixEvent } from 'matrix-js-sdk'
import BaseMessage from './base-message.vue'

interface Props {
  event: MatrixEvent
}

defineProps<Props>()
</script>

<template>
  <base-message> Event is unknown: {{ event.getContent() }} </base-message>
</template>
