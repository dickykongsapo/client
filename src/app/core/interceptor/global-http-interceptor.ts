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
import { Constants } from "@models/constants";
import { Store } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useStore } from "react-redux";
import { AuthService } from "@app/core/services/auth.service";
import { AppState } from "../core.state";
import { InterceptorConfig } from "./interceptor-config";
import { ActionLoadFinish, ActionLoadStart } from "./load.actions";

// export default class GlobalHttpInterceptor {

//     private AUTH_SCHEME = 'Bearer ';
//     private AUTH_HEADER_NAME = 'X-Authorization';
//     private internalUrlPrefixes = [
//         '/api/auth/token',
//         '/api/plugins/rpc'
//     ];
//     private activeRequests = 0;
//     private store: Store<AppState> = useStore();
//     private dispatch = useDispatch();

//     public httpClient = () => {
//         const axiosInstance = axios.create({

//             baseURL: process.env.REACT_APP_API_URL,

//         });
//         this.handleRequest(axiosInstance)
//         this.handleResponse(axiosInstance)
//         return axiosInstance
//     }
//     public handleRequest = (axiosInstance) => {
//         axiosInstance.interceptors.request.use((request) => {
//             if (request.url.startsWith('/api')) {

//                 console.log(request)
//                 const isLoading = !this.isInternalUrlPrefix(request.url);
//                 console.log(isLoading)
//                 this.updateLoadingState(request, isLoading);
//                 console.log(this.store.getState())
//                 if (this.isTokenBasedAuthEntryPoint(request.url)) {
//                     if (!AuthService.getJwtToken() && !AuthService.refreshTokenPending()) {
//                         console.log('unauthorized')
//                     } else if (!AuthService.isJwtTokenValid()) {
//                         console.log('expried')
//                     } else {
//                         const jwtToken = localStorage.getItem('jwt_token');

//                         if (jwtToken) {
//                             request.headers[this.AUTH_HEADER_NAME] = `${this.AUTH_SCHEME}${jwtToken}`;

//                         }
//                         // request.headers['content-type'] = 'application/json';
//                         return request;
//                     }

//                 }
//                 else {
//                     return request
//                 }
//                 // const jwtToken = localStorage.getItem('jwt_token');

//                 // if (jwtToken) {
//                 //     config.headers['X-Authorization'] = `Bearer ${jwtToken}`;

//                 // }
//                 // config.headers['content-type'] = 'application/json';
//                 // return config;
//             } else {
//                 console.group("Error");

//                 console.log('url is wrong');

//                 console.groupEnd();
//             }

//         }, (error) => {
//             console.group("Error");

//             console.log(error);

//             console.groupEnd();

//         });
//     }

//     private DEBUG = process.env.REACT_APP_NODE_ENV !== "production";

//     public handleResponse = (axiosInstance) => {

//         axiosInstance.interceptors.response.use((response) => {
//             this.updateLoadingState(response, false);

//             return response
//         }
//             // , (error) => {

//             //     if (error?.status?.code === 401) {

//             //     }
//             //     else {
//             //         // console.log(error)
//             //         // if (this.DEBUG) {
//             //         //     console.group("Error");
//             //         //     console.log(error);
//             //         //     console.groupEnd();
//             //         // }

//             //     }

//             //     return error
//             // }
//         );

//     };


//     //     errorInterceptor(httpClient);

//     //    privateupdateHeaderInterceptor(httpClient);
//     public isInternalUrlPrefix = (url): boolean => {
//         for (const index in this.internalUrlPrefixes) {
//             if (url.startsWith(this.internalUrlPrefixes[index])) {
//                 return true;
//             }
//         }
//         return false;
//     }

//     private isTokenBasedAuthEntryPoint(url): boolean {
//         return url.startsWith('/api/') &&
//             !url.startsWith(Constants.entryPoints.login) &&
//             !url.startsWith(Constants.entryPoints.tokenRefresh) &&
//             !url.startsWith(Constants.entryPoints.nonTokenBased);
//     }

//     private updateLoadingState = (config: InterceptorConfig, isLoading: boolean) => {
//         console.log(config)
//         if (!config.ignoreLoading) {
//             if (isLoading) {
//                 console.log(this.activeRequests)
//                 this.activeRequests++;
//             } else {
//                 console.log(this.activeRequests)
//                 this.activeRequests--;
//             }
//             if (this.activeRequests === 1 && isLoading) {
//                 this.dispatch(ActionLoadStart());
//             } else if (this.activeRequests === 0) {
//                 this.dispatch(ActionLoadFinish());
//             }
//         }
//     }

// }

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // API Base URL Path
    headers: { "Content-Type": "application/json" },
});

const AxiosInterceptor = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const AUTH_SCHEME = 'Bearer ';
    const AUTH_HEADER_NAME = 'X-Authorization';
    const internalUrlPrefixes = [
        '/api/auth/token',
        '/api/plugins/rpc'
    ];
    let activeRequests = 0;
    const store: Store<AppState> = useStore();
    const dispatch = useDispatch();

    const isInternalUrlPrefix = (url): boolean => {
        for (const index in internalUrlPrefixes) {
            if (url.startsWith(internalUrlPrefixes[index])) {
                return true;
            }
        }
        return false;
    }

    const reqInterceptor = (request) => {
        if (request.url.startsWith('/api')) {
            const isLoading = !isInternalUrlPrefix(request.url);
            updateLoadingState(request, isLoading);
            console.log(store.getState())
            if (isTokenBasedAuthEntryPoint(request.url)) {
                if (!AuthService.getJwtToken() && !AuthService.refreshTokenPending()) {
                    console.log('unauthorized')
                } else if (!AuthService.isJwtTokenValid()) {
                    console.log('expried')
                } else {
                    const jwtToken = localStorage.getItem('jwt_token');

                    if (jwtToken) {
                        request.headers[AUTH_HEADER_NAME] = `${AUTH_SCHEME}${jwtToken}`;

                    }
                    return request;
                }

            }
            else {
                return request
            }
        } else {
            console.group("Error");

            console.log('url is wrong');

            console.groupEnd();
        }

    };

    const reqErrInterceptor = (error) => {

        if (error.url.startsWith('/api')) {
            updateLoadingState(error, false);

        }
        console.group("Error");
        console.log(error);
        console.groupEnd();
        return Promise.reject(error);

    };

    const resInterceptor = (response) => {
        if (response.config.url.startsWith('/api')) {
            updateLoadingState(response, false);

        }
        return response
    }

    const resErrInterceptor = (error) => {
        console.log(error)
        updateLoadingState(error, false);

        return Promise.reject(error);
    }

    const updateLoadingState = (config: InterceptorConfig, isLoading: boolean) => {
        console.log(config)
        if (!config.ignoreLoading) {
            if (isLoading) {
                activeRequests++;
            } else {
                activeRequests--;
            }
            if (activeRequests === 1 && isLoading) {
                dispatch(ActionLoadStart());
            } else if (activeRequests === 0) {
                dispatch(ActionLoadFinish());
            }
        }
    }

    const isTokenBasedAuthEntryPoint = (url): boolean => {
        return url.startsWith('/api/') &&
            !url.startsWith(Constants.entryPoints.login) &&
            !url.startsWith(Constants.entryPoints.tokenRefresh) &&
            !url.startsWith(Constants.entryPoints.nonTokenBased);
    }

    useEffect(() => {
        const reqInterceptorEject = axiosInstance.interceptors.request.use(reqInterceptor, reqErrInterceptor);
        const resInterceptorEject = axiosInstance.interceptors.response.use(resInterceptor, resErrInterceptor);
        setIsLoaded(true);
        return () => {
            axiosInstance.interceptors.request.eject(reqInterceptorEject);
            axiosInstance.interceptors.response.eject(resInterceptorEject);
        };
    }, []);

    return isLoaded ? children : null;
};

export { AxiosInterceptor, axiosInstance };
