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

import { axiosInstance } from '../interceptor/global-http-interceptor';
import { from, map, Observable, ReplaySubject } from 'rxjs';
import { PageLink } from '@models/page/page-link';
import { PageData } from '@models/page/page-data';
import { AuthService } from './auth.service';
import { EntitySubtype } from '@models/entity-type.models';
import {
    ClaimRequest,
    ClaimResult,
    Device,
    DeviceCredentials,
    DeviceInfo,
    DeviceSearchQuery
} from '@models/device.models';



export class DeviceService {

    public getTenantDeviceInfos(pageLink: PageLink, type: string = ''): Observable<PageData<DeviceInfo>> {
        return from(axiosInstance.get<PageData<DeviceInfo>>(`/api/tenant/deviceInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }))
    }

    public getTenantDeviceInfosByDeviceProfileId(pageLink: PageLink, deviceProfileId: string = ''): Observable<PageData<DeviceInfo>> {
        return from(axiosInstance.get<PageData<DeviceInfo>>(`/api/tenant/deviceInfos${pageLink.toQuery()}&deviceProfileId=${deviceProfileId}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getCustomerDeviceInfos(customerId: string, pageLink: PageLink, type: string = ''): Observable<PageData<DeviceInfo>> {
        return from(axiosInstance.get<PageData<DeviceInfo>>(`/api/customer/${customerId}/deviceInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getCustomerDeviceInfosByDeviceProfileId(customerId: string, pageLink: PageLink, deviceProfileId: string = ''): Observable<PageData<DeviceInfo>> {
        return from(axiosInstance.get<PageData<DeviceInfo>>(`/api/customer/${customerId}/deviceInfos${pageLink.toQuery()}&deviceProfileId=${deviceProfileId}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getDevice(deviceId: string): Observable<Device> {
        return from(axiosInstance.get<Device>(`/api/device/${deviceId}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getDeviceName(deviceId: string): Observable<string> {
        return from(axiosInstance.get<string>(`/api/device/name/${deviceId}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getDevices(deviceIds: Array<string>): Observable<Array<Device>> {
        return from(axiosInstance.get<Array<Device>>(`/api/devices?deviceIds=${deviceIds.join(',')}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getDeviceInfo(deviceId: string): Observable<DeviceInfo> {
        return from(axiosInstance.get<DeviceInfo>(`/api/device/info/${deviceId}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public saveDevice(device: Device): Observable<Device> {
        return from(axiosInstance.post<Device>('/api/device', device))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public deleteDevice(deviceId: string) {
        return from(axiosInstance.delete(`/api/device/${deviceId}`))
    }

    public getDeviceTypes(): Observable<Array<EntitySubtype>> {
        return from(axiosInstance.get<Array<EntitySubtype>>('/api/device/types'))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public getDeviceCredentials(deviceId: string, sync: boolean = false): Observable<DeviceCredentials> {

        const url = `/api/device/${deviceId}/credentials`;
        if (sync) {
            const responseSubject = new ReplaySubject<DeviceCredentials>();
            const request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.setRequestHeader('Accept', 'application/json, text/plain, */*');
            const jwtToken = AuthService.getJwtToken();
            if (jwtToken) {
                request.setRequestHeader('X-Authorization', 'Bearer ' + jwtToken);
            }
            request.send(null);
            if (request.status === 200) {
                const credentials = JSON.parse(request.responseText) as DeviceCredentials;
                responseSubject.next(credentials);
            } else {
                responseSubject.error(null);
            }
            return responseSubject.asObservable();
        } else {
            return from(axiosInstance.get<DeviceCredentials>(url))
                .pipe(map(axiosInstance => { return axiosInstance.data }))
        }
    }

    public saveDeviceCredentials(deviceCredentials: DeviceCredentials): Observable<DeviceCredentials> {
        return from(axiosInstance.post<DeviceCredentials>('/api/device/credentials', deviceCredentials))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public makeDevicePublic(deviceId: string): Observable<Device> {
        return from(axiosInstance.post<Device>(`/api/customer/public/device/${deviceId}`, null))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public assignDeviceToCustomer(customerId: string, deviceId: string): Observable<Device> {
        return from(axiosInstance.post<Device>(`/api/customer/${customerId}/device/${deviceId}`, null))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public unassignDeviceFromCustomer(deviceId: string) {
        return from(axiosInstance.delete(`/api/customer/device/${deviceId}`))
    }

    public sendOneWayRpcCommand(deviceId: string, requestBody: any): Observable<any> {
        return from(axiosInstance.post<any>(`/api/plugins/rpc/oneway/${deviceId}`, requestBody))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public sendTwoWayRpcCommand(deviceId: string, requestBody: any): Observable<any> {
        return from(axiosInstance.post<any>(`/api/plugins/rpc/twoway/${deviceId}`, requestBody))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public findByQuery(query: DeviceSearchQuery): Observable<Array<Device>> {
        return from(axiosInstance.post<Array<Device>>('/api/devices', query))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public findByName(deviceName: string): Observable<Device> {
        return from(axiosInstance.get<Device>(`/api/tenant/devices?deviceName=${deviceName}`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public claimDevice(deviceName: string, claimRequest: ClaimRequest): Observable<ClaimResult> {
        return from(axiosInstance.post<ClaimResult>(`/api/customer/device/${deviceName}/claim`, claimRequest))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }

    public unclaimDevice(deviceName: string) {
        return from(axiosInstance.delete(`/api/customer/device/${deviceName}/claim`))
            .pipe(map(axiosInstance => { return axiosInstance.data }))
    }
}
