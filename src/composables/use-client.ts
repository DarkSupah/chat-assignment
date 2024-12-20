import { computed, ref } from 'vue'
import type { Room } from 'matrix-js-sdk/lib/models/room'

import { Client, type InitClientData } from '~/api/matrix.ts'
import { useAuth } from '~/composables/use-auth.ts'
import { useRouter } from 'vue-router'
import { cookies } from '~/utils/cookies.ts'

import type { LoginResponse } from 'matrix-js-sdk/lib/@types/auth'
import type { CookieString } from '~/types.ts'

const HOST_KEY = 'host'
const HOST = ref<CookieString>(cookies.get(HOST_KEY))

const client = ref<Client>()

export const useClient = () => {
  const auth = useAuth()
  const router = useRouter()

  const host = computed<CookieString, CookieString>({
    get: () => HOST.value,
    set: (val: CookieString): void => {
      HOST.value = val

      if (val) {
        cookies.set(HOST_KEY, val)
      } else {
        cookies.remove(HOST_KEY)
      }
    },
  })

  const setData = (data: LoginResponse | undefined) => {
    if (!data) return

    auth.accessToken.value = data?.access_token
    auth.userID.value = data?.user_id
    auth.deviceID.value = data?.device_id
    auth.refreshToken.value = data?.refresh_token
  }

  const setup = async (data: InitClientData) => {
    if (client.value) return

    client.value = new Client(data)
    host.value = data.baseUrl
  }
  const loginWithPassword = async (user: string, password: string): Promise<void> => {
    const response = await client.value?.loginWithPassword(user, password)
    setData(response)
  }
  const loginWithToken = async (token: string): Promise<void> => {
    const response = await client.value?.loginWithToken(token)
    setData(response)
  }
  const logout = async () => {
    await client.value?.logout()

    auth.clear()
    host.value = undefined

    client.value?.dispose()

    client.value = undefined

    await router.push({ name: 'login' })
  }
  const sync = async () => {
    await client.value?.sync()
  }
  const start = async () => {
    await client.value?.start()
  }

  const rooms = computed<Room[] | undefined>(() => client.value?.rooms)

  const home = computed<string | undefined>(() => client.value?.home)

  return {
    client,

    host,
    home,

    setup,

    loginWithPassword,
    loginWithToken,
    logout,
    sync,
    start,

    rooms,
  }
}
