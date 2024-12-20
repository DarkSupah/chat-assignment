import { computed, ref } from 'vue'
import { type CookieString } from '~/types.ts'
import { cookies } from '~/utils/cookies.ts'

const ACCESS_TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const USER_ID_KEY = 'user_id'
const DEVICE_ID_KEY = 'device_id'

const ACCESS_TOKEN = ref<CookieString>(cookies.get(ACCESS_TOKEN_KEY))
const REFRESH_TOKEN = ref<CookieString>(cookies.get(REFRESH_TOKEN_KEY))
const USER_ID = ref<CookieString>(cookies.get(USER_ID_KEY))
const DEVICE_ID = ref<CookieString>(cookies.get(DEVICE_ID_KEY))

export const useAuth = () => {
  const accessToken = computed<CookieString, CookieString>({
    get: () => ACCESS_TOKEN.value,
    set: (val: CookieString): void => {
      ACCESS_TOKEN.value = val

      if (val) {
        cookies.set(ACCESS_TOKEN_KEY, val)
      } else {
        cookies.remove(ACCESS_TOKEN_KEY)
      }
    },
  })

  const refreshToken = computed<CookieString, CookieString>({
    get: () => REFRESH_TOKEN.value,
    set: (val: CookieString): void => {
      REFRESH_TOKEN.value = val

      if (val) {
        cookies.set(REFRESH_TOKEN_KEY, val)
      } else {
        cookies.remove(REFRESH_TOKEN_KEY)
      }
    },
  })

  const userID = computed<CookieString, CookieString>({
    get: () => USER_ID.value,
    set: (val: CookieString): void => {
      USER_ID.value = val

      if (val) {
        cookies.set(USER_ID_KEY, val)
      } else {
        cookies.remove(USER_ID_KEY)
      }
    },
  })

  const deviceID = computed<CookieString, CookieString>({
    get: () => DEVICE_ID.value,
    set: (val: CookieString): void => {
      USER_ID.value = val

      if (val) {
        cookies.set(DEVICE_ID_KEY, val)
      } else {
        cookies.remove(DEVICE_ID_KEY)
      }
    },
  })

  const clear = (): void => {
    accessToken.value = undefined
    refreshToken.value = undefined
    userID.value = undefined
    deviceID.value = undefined
  }

  const isAuth = computed<boolean>(() => !!accessToken.value)

  return {
    accessToken,
    refreshToken,
    userID,
    deviceID,

    isAuth,

    clear,
  }
}
