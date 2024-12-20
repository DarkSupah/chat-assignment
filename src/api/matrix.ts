import * as sdk from 'matrix-js-sdk'
import type { MatrixClient } from 'matrix-js-sdk/lib/client'

import { ClientEvent } from 'matrix-js-sdk/lib/client'
import { SyncState } from 'matrix-js-sdk/lib/sync'
import type { ICreateClientOpts } from 'matrix-js-sdk/lib/client'
import type { LoginResponse, LoginRequest } from 'matrix-js-sdk/lib/@types/auth'

export interface AuthData {
  user?: string
  password?: string
}

export interface InitClientData extends AuthData, ICreateClientOpts {}

export class Client {
  private readonly _client: MatrixClient

  constructor(data: InitClientData) {
    this._client = sdk.createClient(data)
  }

  async loginWithPassword(user: string, password: string): Promise<LoginResponse> {
    return this._client.loginWithPassword(user, password)
  }

  async loginWithToken(token: string): Promise<LoginResponse> {
    return this._client.loginWithToken(token)
  }

  async login(
    type: LoginRequest['type'],
    data: Omit<LoginRequest, 'type'>,
  ): Promise<LoginResponse> {
    return this._client.login(type, { ...data, refresh_token: true })
  }

  async logout(): Promise<void> {
    await this._client.logout()
  }

  async sync(): Promise<void> {
    return new Promise<void>((res, rej) => {
      this._client.once(ClientEvent.Sync, async (state: SyncState) => {
        if (state === SyncState.Prepared) {
          res()
        } else {
          console.error('Sync failed', state)
          rej()
        }
      })
    })
  }

  dispose() {
    this._client.stopClient()
  }

  async start(): Promise<void> {
    await this._client.startClient()
  }

  get rooms() {
    return this._client.getRooms()
  }

  get baseUrl() {
    return this._client.getHomeserverUrl()
  }

  get client() {
    return this._client
  }
}
