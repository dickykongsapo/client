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

import { DataKey } from '@models/widget.models';
import { IWidgetSubscription } from './widget-api-models';
import { deepClone } from '../utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyPageData, PageData } from '@models/page/page-data';
import { map, take, tap } from 'rxjs/operators';
import {
    AlarmData,
    AlarmDataPageLink,
    dataKeyTypeToEntityKeyType,
    KeyFilter
} from '@models/query/query.models';
import { Direction } from '@models/page/sort-order';
import { sortItems } from '@models/page/page-link';
import { AlarmDataInfo } from '@app/shared/public-api';
export class AlarmsDatasource {

    private totalAlarmsSubject = new BehaviorSubject<AlarmDataInfo[]>([]);
    private pageDataSubject = new BehaviorSubject<PageData<AlarmDataInfo>>(emptyPageData<AlarmDataInfo>());
    private clearedPageDataSubject = new BehaviorSubject<PageData<AlarmDataInfo>>(emptyPageData<AlarmDataInfo>());

    public dataLoading = true;

    private appliedPageLink: AlarmDataPageLink;
    private appliedSortOrderLabel: string;

    constructor(private subscription: IWidgetSubscription,
        private dataKeys: Array<DataKey>,
        private customerList?: Array<string>) {
    }

    loadAlarms(pageLink: AlarmDataPageLink, sortOrderLabel: string, keyFilters: KeyFilter[]) {
        this.dataLoading = true;
        this.appliedPageLink = pageLink;
        this.appliedSortOrderLabel = sortOrderLabel;
        this.subscription.subscribeForAlarms(pageLink, keyFilters);
    }

    private clear() {
        // if (this.selection.hasValue()) {
        //     this.selection.clear();
        //     this.onSelectionModeChanged(false);
        // }
        this.totalAlarmsSubject.next([]);
        this.pageDataSubject.next(emptyPageData<AlarmDataInfo>());
        this.clearedPageDataSubject.next(emptyPageData<AlarmDataInfo>());

    }

    updateAlarms(alarmCounterStatusList?: string) {
        const customerList = this.subscription.customerList ? this.subscription.customerList : [];
        const subscriptionAlarms = this.subscription.alarms;
        let alarms = new Array<AlarmDataInfo>();
        subscriptionAlarms.data.forEach((alarmData) => {
            alarms.push(this.alarmDataToInfo(alarmData));
        });

        if (this.appliedSortOrderLabel && this.appliedSortOrderLabel.length) {
            const asc = this.appliedPageLink.sortOrder.direction === Direction.ASC;
            alarms = alarms.sort((a, b) => sortItems(a, b, this.appliedSortOrderLabel, asc));
        }
        // if (this.selection.hasValue()) {
        //     const alarmIds = alarms.map((alarm) => alarm.id.id);
        //     const toRemove = this.selection.selected.filter(alarmId => alarmIds.indexOf(alarmId) === -1);
        //     this.selection.deselect(...toRemove);
        //     if (this.selection.isEmpty()) {
        //         this.onSelectionModeChanged(false);
        //     }
        // }

        switch (alarmCounterStatusList) {
            case ('NEW'): {
                alarms = alarms.filter(data => data.status.includes('ACTIVE') && data.status.includes('UNACK'))
                break;
            }
            case ('INPROGRESS'): {
                alarms = alarms.filter(data => data.status.includes('ACTIVE') && data.status.includes('ACK') && !data.status.includes('UNACK'))
                break;
            }
            case ('CLOSED'): {
                alarms = alarms.filter(data => data.status.includes('CLEARED') && data.status.includes('ACK') && !data.status.includes('UNACK'))
                break;
            }
            case ('UNREAD'): {
                alarms = alarms.filter(data => data.status.includes('CLEARED') && data.status.includes('UNACK'))
                break;
            }
            case ('TOTAL'): {
                break;
            }
            default: {
                break;
            }
        }

        alarms = customerList.length == 0 ? alarms : alarms.filter(alarm => customerList.includes(alarm.customerId))
        const alarmsPageData: PageData<AlarmDataInfo> = {
            data: alarms,
            totalPages: subscriptionAlarms.totalPages,
            totalElements: subscriptionAlarms.totalElements,
            hasNext: subscriptionAlarms.hasNext
        };

        let totalAlarms = new Array<AlarmDataInfo>();
        subscriptionAlarms.data.forEach((alarmData) => {
            totalAlarms.push(this.alarmDataToInfo(alarmData));
        })
        totalAlarms = customerList.length == 0 ? totalAlarms : totalAlarms.filter(alarm => customerList.includes(alarm.customerId))

        const clearedAlarmsPageData: PageData<AlarmDataInfo> = {
            data: alarms.filter(data => data.status.includes('CLEARED') && data.status.includes('ACK') && !data.status.includes('UNACK')),
            totalPages: subscriptionAlarms.totalPages,
            totalElements: subscriptionAlarms.totalElements,
            hasNext: subscriptionAlarms.hasNext
        };

        this.totalAlarmsSubject.next(totalAlarms);
        this.pageDataSubject.next(alarmsPageData);

        this.clearedPageDataSubject.next(clearedAlarmsPageData);

        this.dataLoading = false;
    }

    private alarmDataToInfo(alarmData: AlarmData): AlarmDataInfo {
        const alarm: AlarmDataInfo = deepClone(alarmData);
        delete alarm.latest;
        const latest = alarmData.latest;

        this.dataKeys.forEach((dataKey, index) => {
            const type = dataKeyTypeToEntityKeyType(dataKey.type);
            let value = '';
            if (type) {
                if (latest && latest[type]) {
                    const tsVal = latest[type][dataKey.name];
                    if (tsVal) {
                        value = tsVal.value;
                    }
                }
            }

            switch (dataKey.name) {
                case 'label':
                    alarm['originatorLabel'] = value;
                case 'location':
                    alarm['location'] = value;
                case 'type':
                    alarm['originatorType'] = value;
                case 'customerId':
                    alarm['customerId'] = value;
                default:
            }
        });
        return alarm;
    }

    total(): Observable<number> {
        return this.pageDataSubject.pipe(
            map((pageData) => pageData.data.length)
        );
    }

    switchTotal(alarmCounterStatusList): Observable<number> {
        switch (alarmCounterStatusList) {
            case 'NEW':
                return this.pageDataSubject.pipe(
                    map(pageData => pageData.data.filter(alarm => alarm.status.includes('ACTIVE') && alarm.status.includes('UNACK')).length)
                )
            case 'INPROGRESS':
                return this.pageDataSubject.pipe(
                    map(pageData => pageData.data.filter(alarm => alarm.status.includes('ACTIVE') && alarm.status.includes('ACK') && !alarm.status.includes('UNACK')).length)
                )
            case 'CLOSED':
                return this.pageDataSubject.pipe(
                    map(pageData => pageData.data.filter(alarm => alarm.status.includes('CLEARED') && alarm.status.includes('ACK') && !alarm.status.includes('UNACK')).length)
                )
            case 'UNREAD':
                return this.pageDataSubject.pipe(
                    map(pageData => pageData.data.filter(alarm => alarm.status.includes('CLEARED') && alarm.status.includes('UNACK')).length)
                )
            case 'TOTAL':
                return this.pageDataSubject.pipe(
                    map(pageData => pageData.data.length)
                )
            default:
                break;
        }

        return this.pageDataSubject.pipe(
            map(pageData => pageData.data.filter(alarm => alarm.status.includes('ACTIVE') && alarm.status.includes('UNACK')).length)
        )

    }

    cleared(): Observable<number> {
        return this.clearedPageDataSubject.pipe(
            map((pageData) => pageData.data.length)
        )
    }

    totalAlarms(): Observable<AlarmDataInfo[]> {
        return this.totalAlarmsSubject.pipe(
            map((totalAlarms) => totalAlarms)
        )
    }

    // private onSelectionModeChanged(selectionMode: boolean) {
    //     this.selectionModeChanged.emit(selectionMode);
    // }
}
