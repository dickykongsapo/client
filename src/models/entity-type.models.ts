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

import { TenantId } from '@models/id/tenant-id';
import { BaseData, HasId } from '@models/base-data';


export enum EntityType {
    TENANT = 'TENANT',
    TENANT_PROFILE = 'TENANT_PROFILE',
    CUSTOMER = 'CUSTOMER',
    USER = 'USER',
    DASHBOARD = 'DASHBOARD',
    ASSET = 'ASSET',
    DEVICE = 'DEVICE',
    DEVICE_PROFILE = 'DEVICE_PROFILE',
    ALARM = 'ALARM',
    ALARM_CONTACT_LIST = 'ALARM_CONTACT_LIST',
    ALARM_ESCALATION = 'ALARM_ESCALATION',
    RULE_CHAIN = 'RULE_CHAIN',
    RULE_NODE = 'RULE_NODE',
    ENTITY_VIEW = 'ENTITY_VIEW',
    WIDGETS_BUNDLE = 'WIDGETS_BUNDLE',
    WIDGET_TYPE = 'WIDGET_TYPE',
    API_USAGE_STATE = 'API_USAGE_STATE',
    ENTITY_IMAGE = 'ENTITY_IMAGE',
    PAYLOAD_DECODER = 'PAYLOAD_DECODER'
}

export enum AliasEntityType {
    CURRENT_CUSTOMER = 'CURRENT_CUSTOMER',
    CURRENT_TENANT = 'CURRENT_TENANT',
    CURRENT_USER = 'CURRENT_USER',
    CURRENT_USER_OWNER = 'CURRENT_USER_OWNER'
}

export interface EntityTypeTranslation {
    type?: string;
    typePlural?: string;
    list?: string;
    nameStartsWith?: string;
    details?: string;
    add?: string;
    filter?: string;
    clearFilter?: string;
    edit?: string;
    noEntities?: string;
    selectedEntities?: string;
    search?: string;
}

export interface EntityTypeResource<T> {
    helpLinkId: string | null;
    helpLinkIdForEntity?(entity: T): string;
}

export const entityTypeTranslations = new Map<EntityType | AliasEntityType, EntityTypeTranslation>(
    [
        [
            EntityType.TENANT,
            {
                type: 'entity.type-tenant',
                typePlural: 'entity.type-tenants',
                list: 'entity.list-of-tenants',
                nameStartsWith: 'entity.tenant-name-starts-with',
                details: 'tenant.tenant-details',
                add: 'tenant.add',
                noEntities: 'tenant.no-tenants-text',
                search: 'tenant.search',
                selectedEntities: 'tenant.selected-tenants'
            }
        ],
        [
            EntityType.TENANT_PROFILE,
            {
                type: 'entity.type-tenant-profile',
                typePlural: 'entity.type-tenant-profiles',
                list: 'entity.list-of-tenant-profiles',
                nameStartsWith: 'entity.tenant-profile-name-starts-with',
                details: 'tenant-profile.tenant-profile-details',
                add: 'tenant-profile.add',
                noEntities: 'tenant-profile.no-tenant-profiles-text',
                search: 'tenant-profile.search',
                selectedEntities: 'tenant-profile.selected-tenant-profiles'
            }
        ],
        [
            EntityType.CUSTOMER,
            {
                type: 'entity.type-customer',
                typePlural: 'entity.type-customers',
                list: 'entity.list-of-customers',
                nameStartsWith: 'entity.customer-name-starts-with',
                details: 'customer.customer-details',
                add: 'customer.add',
                noEntities: 'customer.no-customers-text',
                search: 'customer.search',
                selectedEntities: 'customer.selected-customers'
            }
        ],
        [
            EntityType.USER,
            {
                type: 'entity.type-user',
                typePlural: 'entity.type-users',
                list: 'entity.list-of-users',
                nameStartsWith: 'entity.user-name-starts-with',
                details: 'user.user-details',
                add: 'user.add',
                noEntities: 'user.no-users-text',
                search: 'user.search',
                selectedEntities: 'user.selected-users'
            }
        ],
        [
            EntityType.DEVICE,
            {
                type: 'entity.type-device',
                typePlural: 'entity.type-devices',
                list: 'entity.list-of-devices',
                nameStartsWith: 'entity.device-name-starts-with',
                details: 'device.device-details',
                add: 'device.add',
                noEntities: 'device.no-devices-text',
                search: 'device.search',
                selectedEntities: 'device.selected-devices'
            }
        ],
        [
            EntityType.DEVICE_PROFILE,
            {
                type: 'entity.type-device-profile',
                typePlural: 'entity.type-device-profiles',
                list: 'entity.list-of-device-profiles',
                nameStartsWith: 'entity.device-profile-name-starts-with',
                details: 'device-profile.device-profile-details',
                add: 'device-profile.add',
                noEntities: 'device-profile.no-device-profiles-text',
                search: 'device-profile.search',
                selectedEntities: 'device-profile.selected-device-profiles'
            }
        ],
        [
            EntityType.ASSET,
            {
                type: 'entity.type-asset',
                typePlural: 'entity.type-assets',
                list: 'entity.list-of-assets',
                nameStartsWith: 'entity.asset-name-starts-with',
                details: 'asset.asset-details',
                add: 'asset.add',
                noEntities: 'asset.no-assets-text',
                search: 'asset.search',
                selectedEntities: 'asset.selected-assets'
            }
        ],
        [
            EntityType.ENTITY_VIEW,
            {
                type: 'entity.type-entity-view',
                typePlural: 'entity.type-entity-views',
                list: 'entity.list-of-entity-views',
                nameStartsWith: 'entity.entity-view-name-starts-with',
                details: 'entity-view.entity-view-details',
                add: 'entity-view.add',
                noEntities: 'entity-view.no-entity-views-text',
                search: 'entity-view.search',
                selectedEntities: 'entity-view.selected-entity-views'
            }
        ],
        [
            EntityType.RULE_CHAIN,
            {
                type: 'entity.type-rulechain',
                typePlural: 'entity.type-rulechains',
                list: 'entity.list-of-rulechains',
                nameStartsWith: 'entity.rulechain-name-starts-with',
                details: 'rulechain.rulechain-details',
                add: 'rulechain.add',
                noEntities: 'rulechain.no-rulechains-text',
                search: 'rulechain.search',
                selectedEntities: 'rulechain.selected-rulechains'
            }
        ],
        [
            EntityType.RULE_NODE,
            {
                type: 'entity.type-rulenode',
                typePlural: 'entity.type-rulenodes',
                list: 'entity.list-of-rulenodes',
                nameStartsWith: 'entity.rulenode-name-starts-with'
            }
        ],
        [
            EntityType.DASHBOARD,
            {
                type: 'entity.type-dashboard',
                typePlural: 'entity.type-dashboards',
                list: 'entity.list-of-dashboards',
                nameStartsWith: 'entity.dashboard-name-starts-with',
                details: 'dashboard.dashboard-details',
                add: 'dashboard.add',
                noEntities: 'dashboard.no-dashboards-text',
                search: 'dashboard.search',
                selectedEntities: 'dashboard.selected-dashboards'
            }
        ],
        [
            EntityType.ALARM,
            {
                type: 'entity.type-alarm',
                typePlural: 'entity.type-alarms',
                list: 'entity.list-of-alarms',
                nameStartsWith: 'entity.alarm-name-starts-with',
                details: 'dashboard.dashboard-details',
                noEntities: 'alarm.no-alarms-prompt',
                search: 'alarm.search',
                selectedEntities: 'alarm.selected-alarms'
            }
        ],
        [
            EntityType.ALARM_CONTACT_LIST,
            {
                type: 'entity.type-alarm-contact',
                typePlural: 'entity.type-alarm-contacts',
                list: 'entity.list-of-alarm-contacts',
                nameStartsWith: 'entity.alarm-contact-name-starts-with',
                details: 'alarm-contact-list.contact-details',
                add: "alarm-contact-list.add",
                noEntities: 'alarm-contact-list.no-contacts-prompt',
                search: 'alarm-contact-list.search',
                selectedEntities: 'alarm-contact-list.selected-contacts'
            }
        ],
        [
            EntityType.ALARM_ESCALATION,
            {
                type: 'entity.type-alarm-escalation',
                typePlural: 'entity.type-alarm-escalations',
                list: 'entity.list-of-alarm-escalations',
                nameStartsWith: 'entity.alarm-escalations-name-starts-with',
                details: 'alarm-escalation.alarm-escalation-details',
                add: "alarm-escalation.add",
                filter: "alarm-escalation.filter",
                edit: "alarm-escalation.edit",
                clearFilter: "alarm-escalation.clear-filter",
                noEntities: 'alarm-escalation.no-alarm-escalations-prompt',
                search: 'alarm-contact-list.search',
                selectedEntities: 'alarm-escalation.selected-alarm-escalations'
            }
        ],
        [
            EntityType.API_USAGE_STATE,
            {
                type: 'entity.type-api-usage-state'
            }
        ],
        [
            EntityType.WIDGETS_BUNDLE,
            {
                details: 'widgets-bundle.widgets-bundle-details',
                add: 'widgets-bundle.add',
                noEntities: 'widgets-bundle.no-widgets-bundles-text',
                search: 'widgets-bundle.search',
                selectedEntities: 'widgets-bundle.selected-widgets-bundles'
            }
        ],
        [
            EntityType.ENTITY_IMAGE,
            {
                type: 'entity.type-image',
                typePlural: 'entity.type-images',
                details: 'entity-image.entity-image-details',
                add: 'entity-image.add',
                noEntities: 'entity-image.no-images-text',
                search: 'entity-image.search',
                selectedEntities: 'entity-image.selected-images'
            }
        ],
        [
            EntityType.PAYLOAD_DECODER,
            {
                type: 'payload-decoder.payload-decoder',
                typePlural: 'payload-decoder.payload-decoders',
                list: 'payload-decoder.payload-decoder-list',
                details: 'payload-decoder.details',
                add: 'payload-decoder.add',
                noEntities: 'payload-decoder.no-payload-decoders',
                search: 'payload-decoder.search',
                selectedEntities: 'payload-decoder.selected-payload-decoders'
            }
        ],
        [
            AliasEntityType.CURRENT_CUSTOMER,
            {
                type: 'entity.type-current-customer',
                list: 'entity.type-current-customer'
            }
        ],
        [
            AliasEntityType.CURRENT_TENANT,
            {
                type: 'entity.type-current-tenant',
                list: 'entity.type-current-tenant'
            }
        ],
        [
            AliasEntityType.CURRENT_USER,
            {
                type: 'entity.type-current-user',
                list: 'entity.type-current-user'
            }
        ],
        [
            AliasEntityType.CURRENT_USER_OWNER,
            {
                type: 'entity.type-current-user-owner',
                list: 'entity.type-current-user-owner'
            }
        ]
    ]
);

export const entityTypeResources = new Map<EntityType, EntityTypeResource<BaseData<HasId>>>(
    [
        [
            EntityType.TENANT,
            {
                helpLinkId: 'tenants'
            }
        ],
        [
            EntityType.TENANT_PROFILE,
            {
                helpLinkId: 'tenantProfiles'
            }
        ],
        [
            EntityType.CUSTOMER,
            {
                helpLinkId: 'customers'
            }
        ],
        [
            EntityType.USER,
            {
                helpLinkId: 'users'
            }
        ],
        [
            EntityType.DEVICE,
            {
                helpLinkId: 'devices'
            }
        ],
        [
            EntityType.DEVICE_PROFILE,
            {
                helpLinkId: 'deviceProfiles'
            }
        ],
        [
            EntityType.ASSET,
            {
                helpLinkId: 'assets'
            }
        ],
        [
            EntityType.ENTITY_VIEW,
            {
                helpLinkId: 'entityViews'
            }
        ],
        [
            EntityType.RULE_CHAIN,
            {
                helpLinkId: 'rulechains'
            }
        ],
        [
            EntityType.DASHBOARD,
            {
                helpLinkId: 'dashboards'
            }
        ],
        [
            EntityType.WIDGETS_BUNDLE,
            {
                helpLinkId: 'widgetsBundles'
            }
        ],
        [
            EntityType.ENTITY_IMAGE,
            {
                helpLinkId: null
            }
        ],
        [
            EntityType.PAYLOAD_DECODER,
            {
                helpLinkId: 'payloadDecoder'
            }
        ],
        [
            EntityType.ALARM_CONTACT_LIST,
            {
                helpLinkId: null
            }
        ],
        [
            EntityType.ALARM_ESCALATION,
            {
                helpLinkId: null
            }
        ],
        [
            EntityType.ALARM_ESCALATION,
            {
                helpLinkId: null
            }
        ]
    ]
);

export interface EntitySubtype {
    tenantId: TenantId;
    entityType: EntityType;
    type: string;
}
