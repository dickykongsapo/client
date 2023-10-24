import { InterceptorConfig } from "./interceptor-config";


export class InterceptorHttpParams {
    constructor(
        public interceptorConfig: InterceptorConfig,
        params?: { [param: string]: string | string[] }
    ) {
        //   super({ fromObject: params });
    }
}
