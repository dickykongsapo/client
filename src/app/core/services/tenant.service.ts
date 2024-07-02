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

import { from, map, Observable } from 'rxjs';
import { PageLink } from '@models/page/page-link';
import { PageData } from '@models/page/page-data';
import { Tenant, TenantInfo } from '@models/tenant.model';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class TenantService {

    public getTenants(pageLink: PageLink): Observable<PageData<Tenant>> {
        return from(axiosInstance.get<PageData<Tenant>>(`/api/tenants${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getTenantInfos(pageLink: PageLink): Observable<PageData<TenantInfo>> {
        return from(axiosInstance.get<PageData<TenantInfo>>(`/api/tenantInfos${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getTenant(tenantId: string): Observable<Tenant> {
        return from(axiosInstance.get<Tenant>(`/api/tenant/${tenantId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getTenantInfo(tenantId: string): Observable<TenantInfo> {
        return from(axiosInstance.get<TenantInfo>(`/api/tenant/info/${tenantId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveTenant(tenant: Tenant): Observable<Tenant> {
        return from(axiosInstance.post<Tenant>('/api/tenant', tenant))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteTenant(tenantId: string) {
        return from(axiosInstance.delete(`/api/tenant/${tenantId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

}
