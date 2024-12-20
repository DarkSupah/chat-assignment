<script setup lang="ts">
import { useClient } from '~/composables/use-client.ts'

import RoomItem from '~/components/molecules/room-item.vue'
import ItemList from '~/components/organisms/item-list.vue'

const { sortedRooms: rooms } = useClient()
</script>

<template>
  <div class="index-page">
    <item-list :items="rooms" item-key="roomId">
      <template #default="{ item }">
        <suspense>
          <room-item :room="item" />
        </suspense>
      </template>
    </item-list>
  </div>
</template>
