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
import {
    AdminSettings,
    MailServerSettings,
    SecuritySettings,
    TestSmsRequest,
    UpdateMessage
} from '@models/settings.models';

export class AdminService {

    public getAdminSettings<T>(key: string): Observable<AdminSettings<T>> {
        return from(axiosInstance.get<AdminSettings<T>>(`/api/admin/settings/${key}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getSensorScenario<T>(): Observable<AdminSettings<T>> {
        return from(axiosInstance.get<AdminSettings<T>>(`/api/admin/sensorScenario`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveAdminSettings<T>(adminSettings: AdminSettings<T>): Observable<AdminSettings<T>> {
        return from(axiosInstance.post<AdminSettings<T>>('/api/admin/settings', adminSettings))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public sendTestMail(adminSettings: AdminSettings<MailServerSettings>): Observable<void> {
        return from(axiosInstance.post<void>('/api/admin/settings/testMail', adminSettings))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public sendTestSms(testSmsRequest: TestSmsRequest): Observable<void> {
        return from(axiosInstance.post<void>('/api/admin/settings/testSms', testSmsRequest))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public sendTestWhatsapp(testSmsRequest: TestSmsRequest): Observable<void> {
        return from(axiosInstance.post<void>('/api/admin/settings/testWhatsapp', testSmsRequest))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getSecuritySettings(): Observable<SecuritySettings> {
        return from(axiosInstance.get<SecuritySettings>(`/api/admin/securitySettings`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveSecuritySettings(securitySettings: SecuritySettings): Observable<SecuritySettings> {
        return from(axiosInstance.post<SecuritySettings>('/api/admin/securitySettings', securitySettings))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public checkUpdates(): Observable<UpdateMessage> {
        return from(axiosInstance.get<UpdateMessage>(`/api/admin/updates`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
}
