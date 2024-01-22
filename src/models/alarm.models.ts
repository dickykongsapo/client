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

import { BaseData } from '@models/base-data';
import { TenantId } from './id/tenant-id';
import { AlarmId } from './id/alarm-id';
import { EntityId } from './id/entity-id';
import { TimePageLink } from './page/page-link';
import { NULL_UUID } from './id/has-uuid';
import { EntityType } from './entity-type.models';
import { isString } from '@app/core/utils';
import { AlarmContactListId } from './id/alarm-contact-id';
import { AlarmEscalationId } from './id/alarm-escalation-id';

export enum AlarmSeverity {
    CRITICAL = 'CRITICAL',
    MAJOR = 'MAJOR',
    MINOR = 'MINOR',
    WARNING = 'WARNING',
    INDETERMINATE = 'INDETERMINATE'
}

export enum AlarmStatus {
    ACTIVE_UNACK = 'ACTIVE_UNACK',
    ACTIVE_ACK = 'ACTIVE_ACK',
    CLEARED_UNACK = 'CLEARED_UNACK',
    CLEARED_ACK = 'CLEARED_ACK'
}

export enum AlarmSearchStatus {
    ANY = 'ANY',
    NEW = 'NEW',
    INPROGRESS = 'INPROGRESS',
    UNREAD = 'UNREAD',
    CLOSED = 'CLOSED'
}


export enum AlarmCounterSearchStatus {
    TOTAL = 'TOTAL',
    NEW = 'NEW',
    INPROGRESS = 'INPROGRESS',
    CLOSED = 'CLOSED',
    UNREAD = 'UNREAD'
}

export const alarmTypeTranslations = new Map<string, string>(
    [
        ['CT Communication Error (Phase A)', 'alarm.typeList.ct-commu-error-phase-a'],
        ['CT Communication Error (Phase B)', 'alarm.typeList.ct-commu-error-phase-b'],
        ['CT Communication Error (Phase C)', 'alarm.typeList.ct-commu-error-phase-c'],
        ['CT Communication Error', 'alarm.typeList.ct-commu-error'],
        ['Device Offline', 'alarm.typeList.device-offline'],
        ['High CO', 'alarm.typeList.high-co'],
        ['High CO2', 'alarm.typeList.high-co2'],
        ['High H2S', 'alarm.typeList.high-h2s'],
        ['High HCHO', 'alarm.typeList.high-hcho'],
        ['High NH3', 'alarm.typeList.high-nh3'],
        ['High NO2', 'alarm.typeList.high-no2'],
        ['High PM10', 'alarm.typeList.high-pm10'],
        ['High PM2.5', 'alarm.typeList.high-pm2p5'],
        ['High Relative Humidity', 'alarm.typeList.high-relative-humidity'],
        ['High Temperature', 'alarm.typeList.high-temperature'],
        ['High TVOC', 'alarm.typeList.high-tvoc'],
        ['Low Battery', 'alarm.typeList.low-battery'],
        ['Low Relative Humidity', 'alarm.typeList.low-relative-humidity'],
        ['Low Temperature', 'alarm.typeList.low-temperature'],
        ['On Battery Power', 'alarm.typeList.on-battery-power'],
        ['Open Alarm', 'alarm.typeList.open-alarm'],
        ['Over Current (Phase A)', 'alarm.typeList.over-current-phase-a'],
        ['Over Current (Phase B)', 'alarm.typeList.over-current-phase-b'],
        ['Over Current (Phase C)', 'alarm.typeList.over-current-phase-c'],
        ['Over Current', 'alarm.typeList.over-current'],
        ['Over Voltage (Phase A)', 'alarm.typeList.over-voltage-phase-a'],
        ['Over Voltage (Phase B)', 'alarm.typeList.over-voltage-phase-b'],
        ['Over Voltage (Phase C)', 'alarm.typeList.over-voltage-phase-c'],
        ['Over Voltage', 'alarm.typeList.over-voltage'],
        ['Sound Level Alert', 'alarm.typeList.sound-level-alert'],
        ['Temperature Probe Connection Problem', 'alarm.typeList.temperature-probe-connect-problem'],
        ['Under Voltage (Phase A)', 'alarm.typeList.under-voltage-phase-a'],
        ['Under Voltage (Phase B)', 'alarm.typeList.under-voltage-phase-b'],
        ['Under Voltage (Phase C)', 'alarm.typeList.under-voltage-phase-c'],
        ['Under Voltage', 'alarm.typeList.under-voltage'],
        ['Water Leak', 'alarm.typeList.water-leak'],
    ]
);

export const alarmSeverityTranslations = new Map<AlarmSeverity, string>(
    [
        [AlarmSeverity.CRITICAL, 'alarm.severity-critical'],
        [AlarmSeverity.MAJOR, 'alarm.severity-major'],
        [AlarmSeverity.MINOR, 'alarm.severity-minor'],
        [AlarmSeverity.WARNING, 'alarm.severity-warning'],
        [AlarmSeverity.INDETERMINATE, 'alarm.severity-indeterminate']
    ]
);

export const alarmStatusTranslations = new Map<AlarmStatus, string>(
    [
        [AlarmStatus.ACTIVE_UNACK, 'alarm.display-status.ACTIVE_UNACK'],
        [AlarmStatus.ACTIVE_ACK, 'alarm.display-status.ACTIVE_ACK'],
        [AlarmStatus.CLEARED_UNACK, 'alarm.display-status.CLEARED_UNACK'],
        [AlarmStatus.CLEARED_ACK, 'alarm.display-status.CLEARED_ACK'],
    ]
);

export const alarmSearchStatusTranslations = new Map<AlarmSearchStatus, string>(
    [
        [AlarmSearchStatus.ANY, 'alarm.search-status.ANY'],
        [AlarmSearchStatus.NEW, 'alarm.search-status.NEW'],
        [AlarmSearchStatus.INPROGRESS, 'alarm.search-status.INPROGRESS'],
        [AlarmSearchStatus.UNREAD, 'alarm.search-status.UNREAD'],
        [AlarmSearchStatus.CLOSED, 'alarm.search-status.CLOSED']
    ]
);

export const alarmCounterStatusTranslation = new Map<AlarmCounterSearchStatus, string>(
    [
        [AlarmCounterSearchStatus.TOTAL, 'alarm.counter.search-status.TOTAL'],
        [AlarmCounterSearchStatus.NEW, 'alarm.counter.search-status.NEW'],
        [AlarmCounterSearchStatus.INPROGRESS, 'alarm.counter.search-status.INPROGRESS'],
        [AlarmCounterSearchStatus.CLOSED, 'alarm.counter.search-status.CLOSED'],
        [AlarmCounterSearchStatus.UNREAD, 'alarm.counter.search-status.UNREAD']
    ]
);

export const alarmSeverityColors = new Map<AlarmSeverity, string>(
    [
        [AlarmSeverity.CRITICAL, 'red'],
        [AlarmSeverity.MAJOR, 'orange'],
        [AlarmSeverity.MINOR, '#ffca3d'],
        [AlarmSeverity.WARNING, '#abab00'],
        [AlarmSeverity.INDETERMINATE, 'green']
    ]
);

export interface Alarm extends BaseData<AlarmId> {
    tenantId: TenantId;
    type: string;
    originator: EntityId;
    severity: AlarmSeverity;
    status: AlarmStatus;
    startTs: number;
    endTs: number;
    ackTs: number;
    clearTs: number;
    propagate: boolean;
    details?: any;
}

export interface AlarmInfo extends Alarm {
    originatorName: string;
    originatorLabel: string;
    originatorType: string
}

export interface AlarmDataInfo extends AlarmInfo {
    [key: string]: any;
}

export const simulatedAlarm: AlarmInfo = {
    id: new AlarmId(NULL_UUID),
    tenantId: new TenantId(NULL_UUID),
    createdTime: new Date().getTime(),
    startTs: new Date().getTime(),
    endTs: 0,
    ackTs: 0,
    clearTs: 0,
    originatorName: 'Simulated',
    originatorLabel: 'Simulated',
    originatorType: 'Simulated',
    originator: {
        entityType: EntityType.DEVICE,
        id: '1'
    },
    type: 'TEMPERATURE',
    severity: AlarmSeverity.MAJOR,
    status: AlarmStatus.ACTIVE_UNACK,
    details: {
        message: 'Temperature is high!'
    },
    propagate: false,
};

export interface AlarmField {
    keyName: string;
    value: string;
    name: string;
    time?: boolean;
}

export interface AlarmCount {
    NewCount: number;
    ActiveCount: number;
    ClearedCount: number;
    UnackCount: number;
    AckCount: number;
}

export const alarmFields: { [fieldName: string]: AlarmField } = {
    createdTime: {
        keyName: 'createdTime',
        value: 'createdTime',
        name: 'alarm.created-time',
        time: true
    },
    startTime: {
        keyName: 'startTime',
        value: 'startTs',
        name: 'alarm.start-time',
        time: true
    },
    endTime: {
        keyName: 'endTime',
        value: 'endTs',
        name: 'alarm.end-time',
        time: true
    },
    ackTime: {
        keyName: 'ackTime',
        value: 'ackTs',
        name: 'alarm.ack-time',
        time: true
    },
    clearTime: {
        keyName: 'clearTime',
        value: 'clearTs',
        name: 'alarm.clear-time',
        time: true
    },
    originator: {
        keyName: 'originator',
        value: 'originatorName',
        name: 'alarm.originator'
    },
    originatorLabel: {
        keyName: 'originatorLabel',
        value: 'originatorLabel',
        name: 'alarm.originator'
    },
    originatorType: {
        keyName: 'originatorType',
        value: 'originator.entityType',
        name: 'alarm.originator-type'
    },
    type: {
        keyName: 'type',
        value: 'type',
        name: 'alarm.type'
    },
    severity: {
        keyName: 'severity',
        value: 'severity',
        name: 'alarm.severity'
    },
    status: {
        keyName: 'status',
        value: 'status',
        name: 'alarm.status'
    }
};

export class AlarmQuery {

    affectedEntityId: EntityId;
    pageLink: TimePageLink;
    searchStatus: AlarmSearchStatus;
    status: AlarmStatus;
    fetchOriginator: boolean;
    offset: string;

    constructor(entityId: EntityId, pageLink: TimePageLink,
        searchStatus: AlarmSearchStatus, status: AlarmStatus,
        fetchOriginator: boolean, offset: string) {
        this.affectedEntityId = entityId;
        this.pageLink = pageLink;
        this.searchStatus = searchStatus;
        this.status = status;
        this.fetchOriginator = fetchOriginator;
        this.offset = offset;
    }

    public toQuery(): string {
        let query = `/${this.affectedEntityId.entityType}/${this.affectedEntityId.id}`;
        query += this.pageLink.toQuery();
        if (this.searchStatus) {
            query += `&searchStatus=${this.searchStatus}`;
        } else if (this.status) {
            query += `&status=${this.status}`;
        }
        if (typeof this.fetchOriginator !== 'undefined' && this.fetchOriginator !== null) {
            query += `&fetchOriginator=${this.fetchOriginator}`;
        }
        if (isString(this.offset) && this.offset.length) {
            query += `&offset=${this.offset}`;
        }
        return query;
    }

}

export interface AlarmContactList extends BaseData<AlarmContactListId> {
    phone?: string;
    email?: string;
    tenantId: TenantId;
}

export interface AlarmEscalation extends BaseData<AlarmEscalationId> {
    alarmContactListId: AlarmContactListId;
    customerIds: Set<string>;
    tenantId: TenantId;
    tiers: number;
}

export interface AlarmEscalationInfo extends AlarmEscalation {
    alarmContactListName: string;
}

export interface AlarmEscalation extends BaseData<AlarmEscalationId> {
    alarmContactListId: AlarmContactListId;
    customerIds: Set<string>;
    tenantId: TenantId;
    tiers: number;
}

export interface AlarmEscalationInfo extends AlarmEscalation {
    alarmContactListName: string;
}
