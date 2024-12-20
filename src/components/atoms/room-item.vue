<script setup lang="ts">
import type { Room } from 'matrix-js-sdk/lib/models/room'
import { useRoom } from '~/composables/use-room.ts'
import { computed } from 'vue'
import { type MatrixEvent } from 'matrix-js-sdk'

interface Props {
  room: Room
}

const props = defineProps<Props>()

const { getThumbnail, getEvents } = useRoom(props.room)

const thumbnail = computed<string>(() => getThumbnail(32, 32, 'scale'))
const events = computed<MatrixEvent[]>(() => getEvents())
</script>

<template>
  <div class="room-item">
    <div class="room-item__header">
      <img
        v-if="thumbnail"
        width="32"
        height="32"
        loading="lazy"
        :src="thumbnail"
        class="room-item__avatar"
        alt="room avatar"
      />
      <span class="room-item__name">
        {{ room?.name }}
      </span>
    </div>

    <div class="room-item__wrapper">
      <div class="room-item__last-events">
        <div class="roomitem__event" v-for="event in events" :key="event.getId()">
          {{ event.sender.name }}: {{ event }}
        </div>
      </div>
      <div class="room-item__unread"></div>
    </div>
  </div>
</template>

<style lang="scss">
.room-item {
  display: flex;
  flex-direction: column;

  padding: 12px;
  border-radius: 8px;

  background: var(--el-color-primary);

  &__header {
    display: flex;
    align-items: center;
  }

  &__avatar {
    margin-right: 8px;
  }

  &__name {
    font-size: 16px;
    font-weight: 600;

    color: var(--el-color-white);
  }

  &__owner {
    font-size: 12px;
    color: var(--c-grey);

    margin-top: 4px;
  }

  &__last-events {
    margin-top: 16px;

    & > *:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
