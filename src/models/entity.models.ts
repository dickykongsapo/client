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

import { EntityType } from '@models/entity-type.models';
import { AttributeData } from './telemetry/telemetry.models';
import { EntityId } from '@models/id/entity-id';

export interface EntityInfo {
    name?: string;
    label?: string;
    entityType?: EntityType;
    id?: string;
    entityDescription?: string;
}

export interface EntityInfoData {
    id: EntityId;
    name: string;
}

export interface ImportEntityData {
    name: string;
    type: string;
    label: string;
    gateway: boolean;
    description: string;
    accessToken: string;
    mqttBasicClientId: string;
    mqttBasicUserName: string;
    mqttBasicPassword: string;
    attributes: {
        server: AttributeData[],
        shared: AttributeData[]
    };
    timeseries: AttributeData[];
}

export interface ImportEntitiesResultInfo {
    create?: {
        entity: number;
    };
    update?: {
        entity: number;
    };
    error?: {
        entity: number;
    };
}

export interface EntityField {
    keyName: string;
    value: string;
    name: string;
    time?: boolean;
}

export interface EntitiesKeysByQuery {
    attribute: Array<string>;
    timeseries: Array<string>;
    entityTypes: EntityType[];
}

export const entityFields: { [fieldName: string]: EntityField } = {
    createdTime: {
        keyName: 'createdTime',
        name: 'entity-field.created-time',
        value: 'createdTime',
        time: true
    },
    name: {
        keyName: 'name',
        name: 'entity-field.name',
        value: 'name'
    },
    type: {
        keyName: 'type',
        name: 'entity-field.type',
        value: 'type'
    },
    firstName: {
        keyName: 'firstName',
        name: 'entity-field.first-name',
        value: 'firstName'
    },
    lastName: {
        keyName: 'lastName',
        name: 'entity-field.last-name',
        value: 'lastName'
    },
    email: {
        keyName: 'email',
        name: 'entity-field.email',
        value: 'email'
    },
    title: {
        keyName: 'title',
        name: 'entity-field.title',
        value: 'title'
    },
    country: {
        keyName: 'country',
        name: 'entity-field.country',
        value: 'country'
    },
    state: {
        keyName: 'state',
        name: 'entity-field.state',
        value: 'state'
    },
    city: {
        keyName: 'city',
        name: 'entity-field.city',
        value: 'city'
    },
    address: {
        keyName: 'address',
        name: 'entity-field.address',
        value: 'address'
    },
    address2: {
        keyName: 'address2',
        name: 'entity-field.address2',
        value: 'address2'
    },
    zip: {
        keyName: 'zip',
        name: 'entity-field.zip',
        value: 'zip'
    },
    phone: {
        keyName: 'phone',
        name: 'entity-field.phone',
        value: 'phone'
    },
    label: {
        keyName: 'label',
        name: 'entity-field.label',
        value: 'label'
    },
    deviceProfileType: {
        keyName: 'deviceProfileType',
        name: 'device-profile.type',
        value: 'deviceProfileType'
    }
};
