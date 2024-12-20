<script setup lang="ts">
import { useClient } from '~/composables/use-client.ts'

import RoomItem from '~/components/atoms/room-item.vue'
import ItemList from '~/components/molecules/item-list.vue'

const { rooms } = useClient()
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
