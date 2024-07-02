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

import { PageData } from "@models/page/page-data";
import { PageLink } from "@models/page/page-link";
import { PayloadDecoder } from "@models/payload-decoder.model";
import { from, Observable } from "rxjs";
import { filter, map } from 'rxjs/operators';
import { axiosInstance } from "../interceptor/global-http-interceptor";
export class PayloadDecoderService {

    public getPayloadDecoderById(id: string): Observable<PayloadDecoder> {
        return from(axiosInstance.get<PayloadDecoder>(`/api/payloadDecoder/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getPayloadDecoders(pageLink: PageLink): Observable<PageData<PayloadDecoder>> {
        return from(axiosInstance.get<PageData<PayloadDecoder>>(`/api/payloadDecoders${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public savePayloadDecoder(payloadDecoder: PayloadDecoder): Observable<PayloadDecoder> {
        return from(axiosInstance.post<PayloadDecoder>(`/api/payloadDecoder`, payloadDecoder))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deletePayloadDecoderById(id: string): Observable<PayloadDecoder> {
        return from(axiosInstance.delete<PayloadDecoder>(`/api/payloadDecoder/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
}