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
import { User } from "@models/user.model";
import { PageLink } from "@models/page/page-link";
import { PageData } from "@models/page/page-data";
import { isDefined } from "../utils";

export class UserService {
    // private globalHttpInterceptor = new GlobalHttpInterceptor();

    public getUsers(pageLink: PageLink): Observable<PageData<User>> {
        return from(axiosInstance.get<PageData<User>>(`/api/users${pageLink.toQuery()}`)).pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getTenantAdmins(tenantId: string, pageLink: PageLink): Observable<PageData<User>> {
        return from(axiosInstance.get<PageData<User>>(`/api/tenant/${tenantId}/admins${pageLink.toQuery()}`)).pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getTenantUsers(tenantId: string, pageLink: PageLink): Observable<PageData<User>> {
        return from(axiosInstance.get<PageData<User>>(`/api/tenant/${tenantId}/users${pageLink.toQuery()}`)).pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getCustomerAdmins(customerId: string, pageLink: PageLink): Observable<PageData<User>> {
        return from(axiosInstance.get<PageData<User>>(`/api/customer/${customerId}/admins${pageLink.toQuery()}`)).pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getCustomerUsers(customerId: string, pageLink: PageLink): Observable<PageData<User>> {
        return from(axiosInstance.get<PageData<User>>(`/api/customer/${customerId}/users${pageLink.toQuery()}`)).pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getUser(userId: string): Observable<User> {
        // let data = authHeader();
        // console.log(data)
        return from(axiosInstance.get<User>(`/api/user/${userId}`)).pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveUser(user: User, sendActivationMail: boolean = false,
        password?: string): Observable<User> {
        console.log(user)
        let url = '/api/user';
        url += '?sendActivationMail=' + sendActivationMail;
        if (password) {
            url += '&password=' + password;
        }
        return from(axiosInstance.post<User>(url, user)).pipe(map(axiosResponse => { console.log('1'); return axiosResponse.data }));
    }

    public deleteUser(userId: string) {
        return from(axiosInstance.delete(`/api/user/${userId}`)).pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getActivationLink(userId: string): Observable<string> {
        return from(axiosInstance.get(`/api/user/${userId}/activationLink`,
            { ...{ responseType: 'text' } })).pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public sendActivationEmail(email: string) {
        const encodeEmail = encodeURIComponent(email);
        return from(axiosInstance.post(`/api/user/sendActivationMail?email=${encodeEmail}`, null));
    }

    public setUserCredentialsEnabled(userId: string, userCredentialsEnabled?: boolean): Observable<any> {
        let url = `/api/user/${userId}/userCredentialsEnabled`;
        if (isDefined(userCredentialsEnabled)) {
            url += `?userCredentialsEnabled=${userCredentialsEnabled}`;
        }
        return from(axiosInstance.post<User>(url, null)).pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public demoteCustomerAdmin(userId: string) {
        return axiosInstance.post(`/api/user/${userId}/demoteCustomerAdmin`);
    }

    public promoteCustomerUser(userId: string) {
        return axiosInstance.post(`/api/user/${userId}/promoteCustomerUser`);
    }

}