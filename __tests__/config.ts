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


import { EnvVariables } from '../src/env'

export const getConfig: () => EnvVariables = () => ({
  // Mia - Custom Plugin Lib
  USERID_HEADER_KEY: 'userid',
  GROUPS_HEADER_KEY: 'groups',
  CLIENTTYPE_HEADER_KEY: 'clienttype',
  BACKOFFICE_HEADER_KEY: 'backoffice',
  MICROSERVICE_GATEWAY_SERVICE_NAME: 'microservice-gateway',

  // Service Related Env vars
})

export const LOG_LEVEL = 'silent'
