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
import { EntitySubtype } from '@models/entity-type.models';
import { EntityView, EntityViewInfo, EntityViewSearchQuery } from '@models/entity-view.models';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class EntityViewService {

    public getTenantEntityViewInfos(pageLink: PageLink, type: string = ''): Observable<PageData<EntityViewInfo>> {
        return from(axiosInstance.get<PageData<EntityViewInfo>>(`/api/tenant/entityViewInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getCustomerEntityViewInfos(customerId: string, pageLink: PageLink, type: string = ''): Observable<PageData<EntityViewInfo>> {
        return from(axiosInstance.get<PageData<EntityViewInfo>>(`/api/customer/${customerId}/entityViewInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getEntityView(entityViewId: string): Observable<EntityView> {
        return from(axiosInstance.get<EntityView>(`/api/entityView/${entityViewId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getEntityViewInfo(entityViewId: string): Observable<EntityViewInfo> {
        return from(axiosInstance.get<EntityViewInfo>(`/api/entityView/info/${entityViewId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveEntityView(entityView: EntityView): Observable<EntityView> {
        return from(axiosInstance.post<EntityView>('/api/entityView', entityView))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteEntityView(entityViewId: string) {
        return from(axiosInstance.delete(`/api/entityView/${entityViewId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getEntityViewTypes(): Observable<Array<EntitySubtype>> {
        return from(axiosInstance.get<Array<EntitySubtype>>('/api/entityView/types'))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public makeEntityViewPublic(entityViewId: string): Observable<EntityView> {
        return from(axiosInstance.post<EntityView>(`/api/customer/public/entityView/${entityViewId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public assignEntityViewToCustomer(customerId: string, entityViewId: string): Observable<EntityView> {
        return from(axiosInstance.post<EntityView>(`/api/customer/${customerId}/entityView/${entityViewId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public unassignEntityViewFromCustomer(entityViewId: string) {
        return from(axiosInstance.delete(`/api/customer/entityView/${entityViewId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByQuery(query: EntityViewSearchQuery): Observable<Array<EntityView>> {
        return from(axiosInstance.post<Array<EntityView>>('/api/entityViews', query))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

}
