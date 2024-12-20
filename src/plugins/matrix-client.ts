import { useAuth } from '~/composables/use-auth.ts'
import { useClient } from '~/composables/use-client.ts'

import type { FunctionPlugin } from 'vue'

export default {
  install: async (app, options) => {
    const auth = useAuth()
    const client = useClient()

    if (auth.isAuth.value) {
      await client.setup({
        accessToken: auth.accessToken.value,
        refreshToken: auth.refreshToken.value,
        deviceId: auth.deviceID.value as string,
        userId: auth.userID.value as string,

        baseUrl: client.host.value as string,
      })

      await client.start()
    }
  },
} as FunctionPlugin
