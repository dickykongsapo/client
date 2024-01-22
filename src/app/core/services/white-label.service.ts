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

import { from, map, Observable, tap } from "rxjs";
import { axiosInstance } from "@app/core/interceptor/global-http-interceptor";
import { WhiteLabel } from "@models/white-label.model";

export class WhiteLabelService {

    //   loginWhiteLabel: LoginWhiteLabel = null;

    // private globalHttpInterceptor = new GlobalHttpInterceptor();
    // private http = this.globalHttpInterceptor.httpClient();

    public getWhiteLabel(tenantId: string): Observable<WhiteLabel> {
        return from(axiosInstance.get<WhiteLabel>(`/api/whiteLabel/${tenantId}`)).pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public setWhiteLabel(whiteLabel: WhiteLabel, tenantId: string): Observable<WhiteLabel> {
        return from(axiosInstance.post<WhiteLabel>(`/api/whiteLabel/${tenantId}`, whiteLabel)).pipe(
            map(axiosResponse => {
                return axiosResponse.data
            }),
            tap((whiteLabel: WhiteLabel) => {

            })
        );
    }

    //   public deleteWhiteLabel(tenantId: string) {
    //     this.http.delete(`/api/whiteLabel/${tenantId}`, defaultHttpOptions()).subscribe();
    //   }

    //   public getLoginWhiteLabel(): Observable<LoginWhiteLabel>{
    //     return this.http.get<LoginWhiteLabel>(`/api/whiteLabel/login`, defaultHttpOptions());
    //   }

    //   public getLoginWhiteLabelByDomain (baseURL: string): Observable<LoginWhiteLabel> {
    //     return this.http.get<LoginWhiteLabel>(`/api/noauth/whiteLabel/${baseURL}`, defaultHttpOptions());
    //   }

    //   public loadLoginWhiteLabel(baseURL: string): Observable<LoginWhiteLabel> {
    //     return this.getLoginWhiteLabelByDomain(baseURL).pipe(
    //       catchError(err => of(null)),
    //       tap((wl) => {
    //         this.loginWhiteLabel = wl;
    //       })
    //     );
    //   }

    //   public saveLoginWhiteLabel (LoginWhiteLabel: LoginWhiteLabel) : Observable<LoginWhiteLabel> {
    //     return this.http.post<LoginWhiteLabel>(`/api/whiteLabel/login`, LoginWhiteLabel, defaultHttpOptions());
    //   }

    //   public deleteLoginWhiteLabel(){
    //     this.http.delete(`/api/whiteLabel/login`, defaultHttpOptions()).subscribe();
    //   }
}
