/*
 * Copyright 2022 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MainService } from '../src/types'
import { startService } from './helpers'

import { getConfig } from './config'

describe('Test service initialization', () => {
  let service: MainService

  beforeAll(async() => {
    const config = getConfig()
    service = await startService(config)
  })

  afterAll(async() => {
    await service.close()
  })

  test('status routes work as expected', async() => {
    const routes = ['healthz', 'ready', 'metrics']

    for (const route of routes) {
      const { statusCode } = await service.inject({
        method: 'GET',
        url: `/-/${route}`,
      })

      expect(statusCode).toBe(200)
    }
  })
})
