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

import lc39 from '@mia-platform/lc39'
import { LogLevel } from 'fastify'

import { EnvVariables } from '../../src/env'
import { MainService } from '../../src/types'
import { LOG_LEVEL } from '../config'

export const startService = async(conf: EnvVariables): Promise<MainService> => {
  return (lc39 as unknown as (
    filePath: string,
    options: {
      logLevel: LogLevel | 'silent',
      envVariables: Record<string, string | number | undefined>
    }
  ) => Promise<MainService>)('./src/index.ts', {
    logLevel: LOG_LEVEL ?? 'silent',
    envVariables: conf,
  })
}