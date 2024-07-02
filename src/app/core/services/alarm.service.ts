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
import { PageData } from '@models/page/page-data';
import { EntityId } from '@models/id/entity-id';
import {
    Alarm,
    AlarmCount,
    AlarmInfo,
    AlarmQuery,
    AlarmSearchStatus,
    AlarmSeverity,
    AlarmStatus
} from '@models/alarm.models';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class AlarmService {

    public getAlarm(alarmId: string): Observable<Alarm> {
        return from(axiosInstance.get<Alarm>(`/api/alarm/${alarmId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarmInfo(alarmId: string): Observable<AlarmInfo> {
        return from(axiosInstance.get<AlarmInfo>(`/api/alarm/info/${alarmId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveAlarm(alarm: Alarm): Observable<Alarm> {
        return from(axiosInstance.post<Alarm>('/api/alarm', alarm))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public ackAlarm(alarmId: string): Observable<void> {
        return from(axiosInstance.post<void>(`/api/alarm/${alarmId}/ack`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public clearAlarm(alarmId: string): Observable<void> {
        return from(axiosInstance.post<void>(`/api/alarm/${alarmId}/clear`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getNonClosedAlarmCount(entityId: EntityId): Observable<number> {
        return from(axiosInstance.get<number>(`/api/alarm/${entityId.entityType}/${entityId.id}/count`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteAlarm(alarmId: string): Observable<void> {
        return from(axiosInstance.delete<void>(`/api/alarm/${alarmId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAlarms(query: AlarmQuery): Observable<PageData<AlarmInfo>> {
        return from(axiosInstance.get<PageData<AlarmInfo>>(`/api/alarm${query.toQuery()}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getHighestAlarmSeverity(entityId: EntityId, alarmSearchStatus: AlarmSearchStatus, alarmStatus: AlarmStatus): Observable<AlarmSeverity> {
        let url = `/api/alarm/highestSeverity/${entityId.entityType}/${entityId.entityType}`;
        if (alarmSearchStatus) {
            url += `?searchStatus=${alarmSearchStatus}`;
        } else if (alarmStatus) {
            url += `?status=${alarmStatus}`;
        }
        return from(axiosInstance.get<AlarmSeverity>(url))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }


    public getAlarmCount(): Observable<JSON> {
        return from(axiosInstance.get<JSON>(`/api/alarm/count`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

}
