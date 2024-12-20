import type { Room } from 'matrix-js-sdk/lib/models/room'
import { type MaybeRef, ref, unref } from 'vue'
import { useClient } from '~/composables/use-client.ts'
import type { ResizeMethod } from 'matrix-js-sdk/lib/@types/partials'
import { type MatrixEvent } from 'matrix-js-sdk'

const THUMBNAILS_CACHE = ref<Map<string, string>>(new Map<string, string>())

interface KeyOptions {
  id: string
  width: number
  height: number
  resizeMethod: ResizeMethod
}

const buildKey = (opts: KeyOptions): string => {
  return `${opts.id}-${opts.width}x${opts.height}--${opts.resizeMethod}`
}

export const useRoom = (room: MaybeRef<Room>) => {
  const { baseUrl } = useClient()

  const instance = unref<Room>(room)

  const getThumbnail = (
    width: number = 32,
    height: number = 32,
    resizeMethod: ResizeMethod = 'scale',
  ): string => {
    const key = buildKey({ width, height, resizeMethod, id: instance.roomId })

    const cachedImage = THUMBNAILS_CACHE.value.get(key)

    if (cachedImage) {
      return cachedImage as string
    }

    const result = instance.getAvatarUrl(baseUrl.value as string, width, height, resizeMethod)

    THUMBNAILS_CACHE.value.set(key, result as string)

    return result as string
  }

  const getEvents = (): MatrixEvent[] => {
    return instance.getLiveTimeline().getEvents()
  }

  return {
    getThumbnail,
    getEvents,
  }
}
