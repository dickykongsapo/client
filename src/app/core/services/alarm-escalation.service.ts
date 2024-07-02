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

import { AlarmContactList, AlarmEscalation, AlarmEscalationInfo } from '@models/alarm.models';
import { PageData } from '@models/page/page-data';
import { PageLink } from '@models/page/page-link';
import { from, map } from 'rxjs';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class AlarmEscalationService {

    public getAlarmContactLists(pageLink: PageLink) {
        return from(axiosInstance.get<PageData<AlarmContactList>>(`/api/alarm/contacts${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarmContactListById(id: string) {
        return from(axiosInstance.get<AlarmContactList>(`/api/alarm/contact/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveAlarmContactList(contact: AlarmContactList) {
        return from(axiosInstance.post<AlarmContactList>(`/api/alarm/contact`, contact))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteAlarmContactList(id: string) {
        return from(axiosInstance.delete(`/api/alarm/contact/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarmEscalations(pageLink: PageLink) {
        return from(axiosInstance.get<PageData<AlarmEscalationInfo>>(`/api/alarm/escalations${pageLink.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarmEscalationById(id: string) {
        return from(axiosInstance.get<AlarmEscalation>(`/api/alarm/escalation/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarmEscalationInfoById(id: string) {
        return from(axiosInstance.get<AlarmEscalationInfo>(`/api/alarm/escalation/${id}/info`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveAlarmEscalation(escalation: AlarmEscalation) {
        return from(axiosInstance.post<AlarmEscalation>(`/api/alarm/escalation`, escalation))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteAlarmEscalation(id: string) {
        return from(axiosInstance.delete(`/api/alarm/escalation/${id}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
}
