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

import PrometheusClient, { Counter } from 'prom-client'

export const getMetrics = (prometheusClient: typeof PrometheusClient): {
  // add here your exported metrics type
  counterExample: Counter<any>
} => {
  // define here your custom metrics
  const counterExample = new prometheusClient.Counter({
    name: 'example_total',
    help: 'count how many times this metric is incremented',
    labelNames: [],
  })

  return {
    counterExample,
  }
}

export type Metrics = ReturnType<typeof getMetrics>
