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

import Tap from 'tap'

import { BaseService } from '../src/interfaces/service'
import { getConfig } from './helpers/env'
import { startService } from './helpers'

Tap.test('mia_template_service_name_placeholder service initialization', async t => {
  const testEnv = await getConfig()

  await t.test('Service starts successfully', async assert => {
    let service: BaseService

    assert.teardown(async() => { await service?.close() })

    try {
      service = await startService(testEnv)
    } catch (error) {
      assert.fail('it should not throw')
    }

    assert.end()
  })

  await t.test('Service status routes work as expected', async assert => {
    const service: BaseService = await startService(testEnv)

    assert.teardown(async() => { await service.close() })

    const routes = ['healthz', 'ready', 'metrics']

    for (const route of routes) {
      const { statusCode } = await service.inject({
        method: 'GET',
        url: `/-/${route}`,
      })

      assert.strictSame(statusCode, 200)
    }

    assert.end()
  })

  t.end()
}).then()

