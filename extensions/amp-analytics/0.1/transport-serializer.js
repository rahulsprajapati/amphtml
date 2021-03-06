/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  appendEncodedParamStringToUrl,
  serializeQueryString,
} from '../../../src/url';

/**
 * "trigger": string
 * "timestamp": null,
 *  "extraUrlParams": !JsonObject
 */
/** @typedef {!JsonObject} */
export let batchSegmentDef;

/**
 * Please register your batch plugin function below.
 * Please keep the object in alphabetic order.
 * Note: extraUrlParams passed in are not encoded. Please make sure to proper
 * encode segments and make sure the final output url is valid.
 */
export const TransportSerializers = {
  'default': defaultSerializer,
};


/**
 * Please add your batch plugin function below in alphabetic order. All batch
 * plugin function should accept input of a string, an array of batchSegment
 * Then return a string. Note: extraUrlParams passed in are not encoded. Please
 * make sure to proper encode segments and make sure the final output url is
 * valid.
 */

// Below is a function prototype for easy copy
// /**
//  * @param {string} baseUrl
//  * @param {Array<!batchSegmentDef>} batchSegments
//  * @return {string}
//  */
// function ping(baseUrl, batchSegments) {}

/**
 * The default way for merging batch segments
 *
 * @param {string} baseUrl
 * @param {!Array<!batchSegmentDef>} batchSegments
 * @return {string}
 */
export function defaultSerializer(baseUrl, batchSegments) {
  const extraUrlParamsStr = batchSegments
      .map(item => serializeQueryString(item['extraUrlParams']))
      .filter(queryString => !!queryString)
      .join('&');
  let requestUrl;
  if (baseUrl.indexOf('${extraUrlParams}') >= 0) {
    requestUrl = baseUrl.replace('${extraUrlParams}', extraUrlParamsStr);
  } else {
    requestUrl = appendEncodedParamStringToUrl(baseUrl, extraUrlParamsStr);
  }
  return requestUrl;
}
