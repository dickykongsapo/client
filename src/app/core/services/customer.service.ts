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

import { from, map, Observable } from "rxjs";
import { axiosInstance } from "@app/core/interceptor/global-http-interceptor";
import { PageLink } from "@models/page/page-link";
import { PageData } from "@models/page/page-data";
import { Customer } from "@models/customer.model";
import WhiteLabelForm from "@components/white-label-form/white-label-form.component";
export class CustomerService {
    // private globalHttpInterceptor = new GlobalHttpInterceptor();

    public getCustomers(pageLink: PageLink): Observable<PageData<Customer>> {
        return from(axiosInstance.get<PageData<Customer>>(`/api/customers/${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
    public getCustomer(customerId: string): Observable<Customer> {
        return from(axiosInstance.get<Customer>(`/api/customer/${customerId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
}