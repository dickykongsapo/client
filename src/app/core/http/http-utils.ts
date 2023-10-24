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