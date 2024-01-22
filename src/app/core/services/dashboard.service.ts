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

import { from, Observable } from 'rxjs';
import { PageLink } from '@models/page/page-link';
import { PageData } from '@models/page/page-data';
import { Dashboard, DashboardInfo, HomeDashboard, HomeDashboardInfo } from '@models/dashboard.models';
import { filter, map, publishReplay, refCount } from 'rxjs/operators';
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../interceptor/global-http-interceptor';
import axios from 'axios';

// @dynamic
export class DashboardService {

    stDiffObservable: Observable<number>;
    currentUrl: string;


    public getTenantDashboards(pageLink: PageLink): Observable<PageData<DashboardInfo>> {
        return from(axiosInstance.get<PageData<DashboardInfo>>(`/api/tenant/dashboards${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getTenantDashboardsByTenantId(tenantId: string, pageLink: PageLink): Observable<PageData<DashboardInfo>> {
        return from(axiosInstance.get<PageData<DashboardInfo>>(`/api/tenant/${tenantId}/dashboards${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getCustomerDashboards(customerId: string, pageLink: PageLink): Observable<PageData<DashboardInfo>> {
        return from(axiosInstance.get<PageData<DashboardInfo>>(`/api/customer/${customerId}/dashboards${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getDashboard(dashboardId: string): Observable<Dashboard> {
        return from(axiosInstance.get<Dashboard>(`/api/dashboard/${dashboardId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getDashboardInfo(dashboardId: string): Observable<DashboardInfo> {
        return from(axiosInstance.get<DashboardInfo>(`/api/dashboard/info/${dashboardId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public saveDashboard(dashboard: Dashboard): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>('/api/dashboard', dashboard))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public deleteDashboard(dashboardId: string) {
        return from(axiosInstance.delete(`/api/dashboard/${dashboardId}`))
    }

    public assignDashboardToCustomer(customerId: string, dashboardId: string): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>(`/api/customer/${customerId}/dashboard/${dashboardId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public unassignDashboardFromCustomer(customerId: string, dashboardId: string) {
        return from(axiosInstance.delete(`/api/customer/${customerId}/dashboard/${dashboardId}`))
    }

    public makeDashboardPublic(dashboardId: string): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>(`/api/customer/public/dashboard/${dashboardId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public makeDashboardPrivate(dashboardId: string): Observable<Dashboard> {
        return from(axiosInstance.delete<Dashboard>(`/api/customer/public/dashboard/${dashboardId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public updateDashboardCustomers(dashboardId: string, customerIds: Array<string>): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>(`/api/dashboard/${dashboardId}/customers`, customerIds))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public addDashboardCustomers(dashboardId: string, customerIds: Array<string>): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>(`/api/dashboard/${dashboardId}/customers/add`, customerIds))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public removeDashboardCustomers(dashboardId: string, customerIds: Array<string>): Observable<Dashboard> {
        return from(axiosInstance.post<Dashboard>(`/api/dashboard/${dashboardId}/customers/remove`, customerIds))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getHomeDashboard(): Observable<HomeDashboard> {
        return from(axiosInstance.get<HomeDashboard>('/api/dashboard/home'))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getTenantHomeDashboardInfo(): Observable<HomeDashboardInfo> {
        return from(axiosInstance.get<HomeDashboardInfo>('/api/tenant/dashboard/home/info'))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public setTenantHomeDashboardInfo(homeDashboardInfo: HomeDashboardInfo): Observable<any> {
        return from(axiosInstance.post<any>('/api/tenant/dashboard/home/info', homeDashboardInfo))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getPublicDashboardLink(dashboard: DashboardInfo): string | null {
        if (dashboard && dashboard.assignedCustomers && dashboard.assignedCustomers.length > 0) {
            const publicCustomers = dashboard.assignedCustomers
                .filter(customerInfo => customerInfo.public);
            if (publicCustomers.length > 0) {

                const publicCustomerId = publicCustomers[0].customerId.id;
                let url = window.location.protocol + '//' + window.location.hostname;
                const port = window.location.port;
                if (port && port.length > 0 && port !== '80' && port !== '443') {
                    url += ':' + port;
                }
                url += `/dashboard/${dashboard.id.id}?publicId=${publicCustomerId}`;
                return url;
            }
        }
        return null;
    }

    public getServerTimeDiff(): Observable<number> {
        if (!this.stDiffObservable) {
            const url = '/api/dashboard/serverTime';
            const ct1 = Date.now();
            this.stDiffObservable = from(axiosInstance.get<number>(url)).pipe(
                map((st) => {
                    const ct2 = Date.now();
                    const stDiff = Math.ceil(st.data - (ct1 + ct2) / 2);
                    return stDiff;
                }),
                publishReplay(1),
                refCount()
            );
        }
        return this.stDiffObservable;
    }

}
