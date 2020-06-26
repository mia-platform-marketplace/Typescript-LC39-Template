/*
 * Copyright 2020 Mia srl
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

'use strict'

import {FastifyInstance} from "fastify"

export interface ProcessEnv {
  [key: string]: string | undefined
}

describe('mia_template_service_name_placeholder', () => {
  const lc39 = require('@mia-platform/lc39')

  let fastify: FastifyInstance

  async function setupFastify(envVariables: ProcessEnv): Promise<FastifyInstance> {
    const fastify = await lc39('src/index.ts', {
      logLevel: 'silent',
      envVariables,
    })
    return fastify
  }

  beforeAll(async () => {
    fastify = await setupFastify({
      USERID_HEADER_KEY: 'userid',
      GROUPS_HEADER_KEY: 'groups',
      CLIENTTYPE_HEADER_KEY: 'clienttype',
      BACKOFFICE_HEADER_KEY: 'backoffice',
      MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway.example.org',
    })
  });

  afterAll(async () => {
    await fastify.close()
  })

  /*
  * Insert your tests here.
  */
  test('Insert test name here', () => {

  })
})
