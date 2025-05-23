///
/// Copyright © 2016-2021 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///
import { InterceptorConfig } from "../interceptor/interceptor-config";
import { InterceptorHttpParams } from "../interceptor/interceptor-http-params";

var httpHeaders = require('http-headers')

export interface RequestConfig {
    ignoreLoading?: boolean;
    ignoreErrors?: boolean;
    resendRequest?: boolean;
}

export function defaultHttpOptionsFromConfig(config?: RequestConfig) {
    if (!config) {
        config = {};
    }
    return defaultHttpOptions(config.ignoreLoading, config.ignoreErrors, config.resendRequest);
}

export function defaultHttpOptions(ignoreLoading: boolean = false,
    ignoreErrors: boolean = false,
    resendRequest: boolean = false) {
    return {
        headers: new httpHeaders({
            'Content-Type': 'application/json',

            // 'Access-Control-Allow-Origin': '*',
        }),
        // withCredentials: true,
        params: new InterceptorHttpParams(new InterceptorConfig(ignoreLoading, ignoreErrors, resendRequest))
    };
}

export function defaultHttpUploadOptions(ignoreLoading: boolean = false,
    ignoreErrors: boolean = false,
    resendRequest: boolean = false) {
    return {
        params: new InterceptorHttpParams(new InterceptorConfig(ignoreLoading, ignoreErrors, resendRequest))
    };
}