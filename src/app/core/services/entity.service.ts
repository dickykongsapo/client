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

// import { Injectable } from '@angular/core';
import { EMPTY, forkJoin, from, Observable, of, throwError } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { PageLink } from '@models/page/page-link';
import { AliasEntityType, EntityType } from '@models/entity-type.models';
import { BaseData } from '@models/public-api';
import { EntityId } from '@models/id/entity-id';
import { DeviceService } from './device.service';
import { CustomerService } from './customer.service';

import { TenantService } from './tenant.service';
import { UserService } from './user.service';
import { DashboardService } from './dashboard.service';

import { Direction } from '@models/page/sort-order';
import { PageData } from '@models/page/page-data';
import { getCurrentAuthUser } from '../auth/auth.selectors';

// import { Store } from '@ngrx/store';
// import { AppState } from '@core/core.state';
import { Authority } from '@models/public-api';
import { Tenant } from '@models/tenant.model';
import { catchError, concatMap, expand, map, mergeMap, toArray } from 'rxjs/operators';
import { Customer } from '@models/public-api';
import { AssetService } from './asset.service';
import { EntityViewService } from './entity-view.service';

import { AttributeScope, DataKeyType } from '@models/public-api';
// import { RuleChainService } from './rule-chain.service';
import { AliasInfo, StateParams, SubscriptionInfo } from '../api/widget-api-models';

import { DataKey, Datasource, DatasourceType, KeyInfo } from '@models/widget.models';
import { UtilsService } from './utils.service';
import { AliasFilterType, EntityAlias, EntityAliasFilter, EntityAliasFilterResult } from '@models/public-api';
import {
    EntitiesKeysByQuery,
    entityFields,
    EntityInfo,
    ImportEntitiesResultInfo,
    ImportEntityData
} from '@models/public-api';
import { EntityRelationService } from './entity-relation.service';
import { deepClone, isDefined, isDefinedAndNotNull } from '../utils';
import { Asset } from '@models/asset.models';
import { Device, DeviceCredentialsType } from '@models/device.models';
import { AttributeService } from './attribute.service';
import {
    AlarmData,
    AlarmDataQuery,
    createDefaultEntityDataPageLink,
    defaultEntityDataPageLink,
    EntityData,
    EntityDataQuery,
    entityDataToEntityInfo,
    EntityFilter,
    entityInfoFields,
    EntityKey,
    EntityKeyType,
    EntityKeyValueType,
    FilterPredicateType,
    singleEntityDataPageLink,
    StringOperation
} from '@models/query/query.models';
import { alarmFields } from '@models/public-api';
import { PayloadDecoderService } from './payload-decoder.service';
import { AlarmEscalationService } from './alarm-escalation.service';
import { Store } from '@reduxjs/toolkit';
import { AppState } from '../core.state';
import { useStore } from 'react-redux';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class EntityService {

    // private http: HttpClient,
    // private store: Store<AppState>,
    private store: Store<AppState> = useStore();

    private deviceService = new DeviceService()
    private assetService = new AssetService()
    private entityViewService = new EntityViewService()
    private tenantService = new TenantService()
    private customerService = new CustomerService()
    private userService = new UserService()
    private dashboardService = new DashboardService()
    // private ruleChainService = new RuleChainService()
    private entityRelationService = new EntityRelationService()
    private attributeService = new AttributeService()
    private alarmEscalationService = new AlarmEscalationService()
    private utils = new UtilsService(window)
    private payloadDecoderService = new PayloadDecoderService()

    private getEntityObservable(entityType: EntityType, entityId: string): Observable<BaseData<EntityId>> {

        let observable: Observable<BaseData<EntityId>>;
        switch (entityType) {
            case EntityType.DEVICE:
                observable = this.deviceService.getDevice(entityId);
                break;
            case EntityType.ASSET:
                observable = this.assetService.getAsset(entityId);
                break;
            case EntityType.ENTITY_VIEW:
                observable = this.entityViewService.getEntityView(entityId);
                break;
            case EntityType.TENANT:
                observable = this.tenantService.getTenant(entityId);
                break;
            case EntityType.CUSTOMER:
                observable = this.customerService.getCustomer(entityId);
                break;
            case EntityType.DASHBOARD:
                observable = this.dashboardService.getDashboardInfo(entityId);
                break;
            case EntityType.USER:
                observable = this.userService.getUser(entityId);
                break;
            // case EntityType.RULE_CHAIN:
            //     observable = this.ruleChainService.getRuleChain(entityId, config);
            //     break;
            case EntityType.ALARM:
                console.error('Get Alarm Entity is not implemented!');
                break;
            case EntityType.PAYLOAD_DECODER:
                observable = this.payloadDecoderService.getPayloadDecoderById(entityId);
                break;
            case EntityType.ALARM_CONTACT_LIST:
                observable = this.alarmEscalationService.getAlarmContactListById(entityId);
                break;
        }
        return observable;
    }
    public getEntity(entityType: EntityType, entityId: string): Observable<BaseData<EntityId>> {
        const entityObservable = this.getEntityObservable(entityType, entityId);
        if (entityObservable) {
            return entityObservable;
        } else {
            return throwError(null);
        }
    }

    private getEntitiesByIdsObservable(fetchEntityFunction: (entityId: string) => Observable<BaseData<EntityId>>,
        entityIds: Array<string>): Observable<Array<BaseData<EntityId>>> {
        const tasks: Observable<BaseData<EntityId>>[] = [];
        entityIds.forEach((entityId) => {
            tasks.push(fetchEntityFunction(entityId));
        });
        return forkJoin(tasks).pipe(
            map((entities) => {
                if (entities) {
                    entities.sort((entity1, entity2) => {
                        const index1 = entityIds.indexOf(entity1.id.id);
                        const index2 = entityIds.indexOf(entity2.id.id);
                        return index1 - index2;
                    });
                    return entities;
                } else {
                    return [];
                }
            })
        );
    }


    private getEntitiesObservable(entityType: EntityType, entityIds: Array<string>): Observable<Array<BaseData<EntityId>>> {
        let observable: Observable<Array<BaseData<EntityId>>>;
        switch (entityType) {
            case EntityType.DEVICE:
                observable = this.deviceService.getDevices(entityIds);
                break;
            case EntityType.ASSET:
                observable = this.assetService.getAssets(entityIds);
                break;
            case EntityType.ENTITY_VIEW:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.entityViewService.getEntityView(id),
                    entityIds);
                break;
            case EntityType.TENANT:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.tenantService.getTenant(id),
                    entityIds);
                break;
            case EntityType.CUSTOMER:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.customerService.getCustomer(id),
                    entityIds);
                break;
            case EntityType.DASHBOARD:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.dashboardService.getDashboardInfo(id),
                    entityIds);
                break;
            case EntityType.USER:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.userService.getUser(id),
                    entityIds);
                break;
            case EntityType.ALARM:
                console.error('Get Alarm Entity is not implemented!');
                break;
            case EntityType.ALARM_CONTACT_LIST:
                observable = this.getEntitiesByIdsObservable(
                    (id) => this.alarmEscalationService.getAlarmContactListById(id),
                    entityIds);
        }
        return observable;
    }

    public getEntities(entityType: EntityType, entityIds: Array<string>): Observable<Array<BaseData<EntityId>>> {
        const entitiesObservable = this.getEntitiesObservable(entityType, entityIds);
        if (entitiesObservable) {
            return entitiesObservable;
        } else {
            return throwError(null);
        }
    }

    private getSingleTenantByPageLinkObservable(pageLink: PageLink): Observable<PageData<Tenant>> {
        const authUser = getCurrentAuthUser(this.store);
        const tenantId = authUser.tenantId;
        return this.tenantService.getTenant(tenantId).pipe(
            map((tenant) => {
                const result = {
                    data: [],
                    totalPages: 0,
                    totalElements: 0,
                    hasNext: false
                } as PageData<Tenant>;
                if (tenant.title.toLowerCase().startsWith(pageLink.textSearch.toLowerCase())) {
                    result.data.push(tenant);
                    result.totalPages = 1;
                    result.totalElements = 1;
                }
                return result;
            })
        );
    }

    private getSingleCustomerByPageLinkObservable(pageLink: PageLink): Observable<PageData<Customer>> {
        const authUser = getCurrentAuthUser(this.store);
        const customerId = authUser.customerId;
        return this.customerService.getCustomer(customerId).pipe(
            map((customer) => {
                const result = {
                    data: [],
                    totalPages: 0,
                    totalElements: 0,
                    hasNext: false
                } as PageData<Customer>;
                if (customer.title.toLowerCase().startsWith(pageLink.textSearch.toLowerCase())) {
                    result.data.push(customer);
                    result.totalPages = 1;
                    result.totalElements = 1;
                }
                return result;
            })
        );
    }

    private getEntitiesByPageLinkObservable(entityType: EntityType, pageLink: PageLink, subType: string = ''): Observable<PageData<BaseData<EntityId>>> {
        let entitiesObservable: Observable<PageData<BaseData<EntityId>>>;
        const authUser = getCurrentAuthUser(this.store);
        const customerId = authUser.customerId;
        switch (entityType) {
            case EntityType.DEVICE:
                pageLink.sortOrder.property = 'label';
                if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                    entitiesObservable = this.deviceService.getCustomerDeviceInfos(customerId, pageLink, subType);

                } else {
                    entitiesObservable = this.deviceService.getTenantDeviceInfos(pageLink, subType);
                }
                break;
            case EntityType.ASSET:
                pageLink.sortOrder.property = 'name';
                if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                    entitiesObservable = this.assetService.getCustomerAssetInfos(customerId, pageLink, subType);
                } else {
                    entitiesObservable = this.assetService.getTenantAssetInfos(pageLink, subType);
                }
                break;
            case EntityType.ENTITY_VIEW:
                pageLink.sortOrder.property = 'name';
                if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                    entitiesObservable = this.entityViewService.getCustomerEntityViewInfos(customerId, pageLink, subType);
                } else {
                    entitiesObservable = this.entityViewService.getTenantEntityViewInfos(pageLink, subType);
                }
                break;
            case EntityType.TENANT:
                pageLink.sortOrder.property = 'title';
                if (authUser.authority === Authority.TENANT_ADMIN) {
                    entitiesObservable = this.getSingleTenantByPageLinkObservable(pageLink);
                } else {
                    entitiesObservable = this.tenantService.getTenants(pageLink);
                }
                break;
            case EntityType.CUSTOMER:
                pageLink.sortOrder.property = 'title';
                if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                    entitiesObservable = this.getSingleCustomerByPageLinkObservable(pageLink);
                } else {
                    entitiesObservable = this.customerService.getCustomers(pageLink);
                }
                break;
            // case EntityType.RULE_CHAIN:
            //     pageLink.sortOrder.property = 'name';
            //     entitiesObservable = this.ruleChainService.getRuleChains(pageLink, config);
            //     break;
            case EntityType.DASHBOARD:
                pageLink.sortOrder.property = 'title';
                if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                    entitiesObservable = this.dashboardService.getCustomerDashboards(customerId, pageLink);
                } else {
                    entitiesObservable = this.dashboardService.getTenantDashboards(pageLink);
                }
                break;
            case EntityType.USER:
                pageLink.sortOrder.property = 'email';
                entitiesObservable = this.userService.getUsers(pageLink);
                break;
            case EntityType.ALARM:
                console.error('Get Alarm Entities is not implemented!');
                break;
            case EntityType.PAYLOAD_DECODER:
                pageLink.sortOrder.property = 'title';
                entitiesObservable = this.payloadDecoderService.getPayloadDecoders(pageLink);
                break;
            case EntityType.ALARM_CONTACT_LIST:
                pageLink.sortOrder.property = 'name';
                entitiesObservable = this.alarmEscalationService.getAlarmContactLists(pageLink);
                break;
        }
        return entitiesObservable;
    }

    private getEntitiesByPageLink(entityType: EntityType, pageLink: PageLink, subType: string = ''): Observable<Array<BaseData<EntityId>>> {
        const entitiesObservable: Observable<PageData<BaseData<EntityId>>> =
            this.getEntitiesByPageLinkObservable(entityType, pageLink, subType);
        if (entitiesObservable) {
            return entitiesObservable.pipe(
                expand((data) => {
                    if (data.hasNext) {
                        pageLink.page += 1;
                        return this.getEntitiesByPageLinkObservable(entityType, pageLink, subType);
                    } else {
                        return EMPTY;
                    }
                }),
                map((data) => data.data),
                concatMap((data) => data),
                toArray()
            );
        } else {
            return of(null);
        }
    }

    public getEntitiesByNameFilter(entityType: EntityType, entityNameFilter: string,
        pageSize: number, subType: string = ''): Observable<Array<BaseData<EntityId>>> {
        const pageLink = new PageLink(pageSize, 0, entityNameFilter, {
            property: 'label',
            direction: Direction.ASC
        });
        if (pageSize === -1) { // all
            pageLink.pageSize = 100;
            return this.getEntitiesByPageLink(entityType, pageLink, subType).pipe(
                map((data) => data && data.length ? data : null)
            );
        } else {
            const entitiesObservable: Observable<PageData<BaseData<EntityId>>> =
                this.getEntitiesByPageLinkObservable(entityType, pageLink, subType);
            if (entitiesObservable) {
                return entitiesObservable.pipe(
                    map((data) => data && data.data.length ? data.data : null)
                );
            } else {
                return of(null);
            }
        }
    }

    public findEntityDataByQuery(query: EntityDataQuery): Observable<PageData<EntityData>> {
        return from(axiosInstance.post<PageData<EntityData>>('/api/entitiesQuery/find', query))
            .pipe(map((axiosResponse) => { return axiosResponse.data }));
    }

    public findEntityKeysByQuery(query: EntityDataQuery, attributes = true, timeseries = true): Observable<EntitiesKeysByQuery> {
        return from(axiosInstance.post<EntitiesKeysByQuery>(
            `/api/entitiesQuery/find/keys?attributes=${attributes}&timeseries=${timeseries}`,
            query))
            .pipe(map((axiosResponse) => { return axiosResponse.data }));
    }

    public findAlarmDataByQuery(query: AlarmDataQuery): Observable<PageData<AlarmData>> {
        return from(axiosInstance.post<PageData<AlarmData>>('/api/alarmsQuery/find', query))
            .pipe(map((axiosResponse) => { return axiosResponse.data }));
    }

    public findEntityInfosByFilterAndName(filter: EntityFilter,
        searchText: string): Observable<PageData<EntityInfo>> {
        const nameField: EntityKey = {
            type: EntityKeyType.ENTITY_FIELD,
            key: 'name'
        };
        const query: EntityDataQuery = {
            entityFilter: filter,
            pageLink: {
                pageSize: 10,
                page: 0,
                sortOrder: {
                    key: nameField,
                    direction: Direction.ASC
                }
            },
            entityFields: entityInfoFields,
            keyFilters: searchText && searchText.length ? [
                {
                    key: nameField,
                    valueType: EntityKeyValueType.STRING,
                    value: null,
                    predicate: {
                        type: FilterPredicateType.STRING,
                        operation: StringOperation.STARTS_WITH,
                        ignoreCase: true,
                        value: {
                            defaultValue: searchText
                        }
                    }
                }
            ] : null
        };
        return this.findEntityDataByQuery(query).pipe(
            map((data) => {
                const entityInfos = data.data.map(entityData => entityDataToEntityInfo(entityData));
                return {
                    data: entityInfos,
                    hasNext: data.hasNext,
                    totalElements: data.totalElements,
                    totalPages: data.totalPages
                };
            })
        );
    }

    public findSingleEntityInfoByEntityFilter(filter: EntityFilter): Observable<EntityInfo> {
        const query: EntityDataQuery = {
            entityFilter: filter,
            pageLink: createDefaultEntityDataPageLink(1),
            entityFields: entityInfoFields
        };
        return this.findEntityDataByQuery(query).pipe(
            map((data) => {
                if (data.data.length) {
                    const entityData = data.data[0];
                    return entityDataToEntityInfo(entityData);
                } else {
                    return null;
                }
            })
        );
    }

    public getAliasFilterTypesByEntityTypes(entityTypes: Array<EntityType | AliasEntityType>): Array<AliasFilterType> {
        const allAliasFilterTypes: Array<AliasFilterType> = Object.keys(AliasFilterType).map((key) => AliasFilterType[key]);
        if (!entityTypes || !entityTypes.length) {
            return allAliasFilterTypes;
        }
        const result = [];
        for (const aliasFilterType of allAliasFilterTypes) {
            if (this.filterAliasFilterTypeByEntityTypes(aliasFilterType, entityTypes)) {
                result.push(aliasFilterType);
            }
        }
        return result;
    }

    public filterAliasByEntityTypes(entityAlias: EntityAlias, entityTypes: Array<EntityType | AliasEntityType>): boolean {
        const filter = entityAlias.filter;
        if (this.filterAliasFilterTypeByEntityTypes(filter.type, entityTypes)) {
            switch (filter.type) {
                case AliasFilterType.singleEntity:
                    return entityTypes.indexOf(filter.singleEntity.entityType) > -1 ? true : false;
                case AliasFilterType.entityList:
                    return entityTypes.indexOf(filter.entityType) > -1 ? true : false;
                case AliasFilterType.entityName:
                    return entityTypes.indexOf(filter.entityType) > -1 ? true : false;
                case AliasFilterType.entityType:
                    return entityTypes.indexOf(filter.entityType) > -1 ? true : false;
                case AliasFilterType.stateEntity:
                    return true;
                case AliasFilterType.assetType:
                    return entityTypes.indexOf(EntityType.ASSET) > -1 ? true : false;
                case AliasFilterType.deviceType:
                    return entityTypes.indexOf(EntityType.DEVICE) > -1 ? true : false;
                case AliasFilterType.entityViewType:
                    return entityTypes.indexOf(EntityType.ENTITY_VIEW) > -1 ? true : false;
                case AliasFilterType.relationsQuery:
                    if (filter.filters && filter.filters.length) {
                        let match = false;
                        for (const relationFilter of filter.filters) {
                            if (relationFilter.entityTypes && relationFilter.entityTypes.length) {
                                for (const relationFilterEntityType of relationFilter.entityTypes) {
                                    if (entityTypes.indexOf(relationFilterEntityType) > -1) {
                                        match = true;
                                        break;
                                    }
                                }
                            } else {
                                match = true;
                                break;
                            }
                        }
                        return match;
                    } else {
                        return true;
                    }
                case AliasFilterType.assetSearchQuery:
                    return entityTypes.indexOf(EntityType.ASSET) > -1 ? true : false;
                case AliasFilterType.deviceSearchQuery:
                    return entityTypes.indexOf(EntityType.DEVICE) > -1 ? true : false;
                case AliasFilterType.entityViewSearchQuery:
                    return entityTypes.indexOf(EntityType.ENTITY_VIEW) > -1 ? true : false;
            }
        }
        return false;
    }

    private filterAliasFilterTypeByEntityTypes(aliasFilterType: AliasFilterType,
        entityTypes: Array<EntityType | AliasEntityType>): boolean {
        if (!entityTypes || !entityTypes.length) {
            return true;
        }
        let valid = false;
        entityTypes.forEach((entityType) => {
            valid = valid || this.filterAliasFilterTypeByEntityType(aliasFilterType, entityType);
        });
        return valid;
    }

    private filterAliasFilterTypeByEntityType(aliasFilterType: AliasFilterType, entityType: EntityType | AliasEntityType): boolean {
        switch (aliasFilterType) {
            case AliasFilterType.singleEntity:
                return true;
            case AliasFilterType.entityList:
                return true;
            case AliasFilterType.entityName:
                return true;
            case AliasFilterType.entityType:
                return true;
            case AliasFilterType.stateEntity:
                return true;
            case AliasFilterType.assetType:
                return entityType === EntityType.ASSET;
            case AliasFilterType.deviceType:
                return entityType === EntityType.DEVICE;
            case AliasFilterType.entityViewType:
                return entityType === EntityType.ENTITY_VIEW;
            case AliasFilterType.relationsQuery:
                return true;
            case AliasFilterType.assetSearchQuery:
                return entityType === EntityType.ASSET;
            case AliasFilterType.deviceSearchQuery:
                return entityType === EntityType.DEVICE;
            case AliasFilterType.entityViewSearchQuery:
                return entityType === EntityType.ENTITY_VIEW;
        }
        return false;
    }

    public prepareAllowedEntityTypesList(allowedEntityTypes: Array<EntityType | AliasEntityType>,
        useAliasEntityTypes?: boolean): Array<EntityType | AliasEntityType> {
        const authUser = getCurrentAuthUser(this.store);
        const entityTypes: Array<EntityType | AliasEntityType> = [];
        switch (authUser.authority) {
            case Authority.SYS_ADMIN:
                entityTypes.push(EntityType.TENANT);
                break;
            case Authority.TENANT_USER:
            case Authority.TENANT_ADMIN:
                entityTypes.push(EntityType.DEVICE);
                entityTypes.push(EntityType.ASSET);
                entityTypes.push(EntityType.ENTITY_VIEW);
                entityTypes.push(EntityType.TENANT);
                entityTypes.push(EntityType.CUSTOMER);
                entityTypes.push(EntityType.USER);
                entityTypes.push(EntityType.DASHBOARD);
                if (useAliasEntityTypes) {
                    entityTypes.push(AliasEntityType.CURRENT_CUSTOMER);
                    entityTypes.push(AliasEntityType.CURRENT_TENANT);
                }
                break;
            case Authority.CUSTOMER_ADMIN:
            case Authority.CUSTOMER_USER:
                entityTypes.push(EntityType.DEVICE);
                entityTypes.push(EntityType.ASSET);
                entityTypes.push(EntityType.ENTITY_VIEW);
                entityTypes.push(EntityType.CUSTOMER);
                entityTypes.push(EntityType.USER);
                entityTypes.push(EntityType.DASHBOARD);
                if (useAliasEntityTypes) {
                    entityTypes.push(AliasEntityType.CURRENT_CUSTOMER);
                }
                break;
        }
        if (useAliasEntityTypes) {
            entityTypes.push(AliasEntityType.CURRENT_USER);
            if (authUser.authority !== Authority.SYS_ADMIN) {
                entityTypes.push(AliasEntityType.CURRENT_USER_OWNER);
            }
        }
        if (allowedEntityTypes && allowedEntityTypes.length) {
            for (let index = entityTypes.length - 1; index >= 0; index--) {
                if (allowedEntityTypes.indexOf(entityTypes[index]) === -1) {
                    entityTypes.splice(index, 1);
                }
            }
        }
        return entityTypes;
    }

    private getEntityFieldKeys(entityType: EntityType, searchText: string = ''): Array<string> {
        const entityFieldKeys: string[] = [entityFields.createdTime.keyName];
        const query = searchText.toLowerCase();
        switch (entityType) {
            case EntityType.USER:
                entityFieldKeys.push(entityFields.name.keyName);
                entityFieldKeys.push(entityFields.email.keyName);
                entityFieldKeys.push(entityFields.firstName.keyName);
                entityFieldKeys.push(entityFields.lastName.keyName);
                break;
            case EntityType.TENANT:
            case EntityType.CUSTOMER:
                entityFieldKeys.push(entityFields.title.keyName);
                entityFieldKeys.push(entityFields.email.keyName);
                entityFieldKeys.push(entityFields.country.keyName);
                entityFieldKeys.push(entityFields.state.keyName);
                entityFieldKeys.push(entityFields.city.keyName);
                entityFieldKeys.push(entityFields.address.keyName);
                entityFieldKeys.push(entityFields.address2.keyName);
                entityFieldKeys.push(entityFields.zip.keyName);
                entityFieldKeys.push(entityFields.phone.keyName);
                break;
            case EntityType.ENTITY_VIEW:
                entityFieldKeys.push(entityFields.name.keyName);
                entityFieldKeys.push(entityFields.type.keyName);
                break;
            case EntityType.DEVICE:
            case EntityType.ASSET:
                entityFieldKeys.push(entityFields.name.keyName);
                entityFieldKeys.push(entityFields.type.keyName);
                entityFieldKeys.push(entityFields.label.keyName);
                entityFieldKeys.push(entityFields.deviceProfileType.keyName)
                break;
            case EntityType.DASHBOARD:
                entityFieldKeys.push(entityFields.title.keyName);
                break;
            case EntityType.API_USAGE_STATE:
                entityFieldKeys.push(entityFields.name.keyName);
                break;
        }
        return query ? entityFieldKeys.filter((entityField) => entityField.toLowerCase().indexOf(query) === 0) : entityFieldKeys;
    }

    private getAlarmKeys(searchText: string = ''): Array<string> {
        const alarmKeys: string[] = Object.keys(alarmFields);
        const query = searchText.toLowerCase();
        return query ? alarmKeys.filter((alarmField) => alarmField.toLowerCase().indexOf(query) === 0) : alarmKeys;
    }

    public getEntityKeys(entityId: EntityId, query: string, type: DataKeyType): Observable<Array<string>> {
        if (type === DataKeyType.entityField) {
            return of(this.getEntityFieldKeys(entityId.entityType as EntityType, query));
        } else if (type === DataKeyType.alarm) {
            return of(this.getAlarmKeys(query));
        }
        let url = `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/keys/`;
        if (type === DataKeyType.timeseries) {
            url += 'timeseries';
        } else if (type === DataKeyType.attribute) {
            url += 'attributes';
        }
        return from(axiosInstance.get<Array<string>>(url))
            .pipe(
                map(axiosInstance => { return axiosInstance.data }),
                map(
                    (dataKeys) => {
                        if (query) {
                            const lowercaseQuery = query.toLowerCase();
                            return dataKeys.filter((dataKey) => dataKey.toLowerCase().indexOf(lowercaseQuery) === 0);
                        } else {
                            return dataKeys;
                        }
                    }
                )
            );
    }

    public getEntityKeysByEntityFilter(filter: EntityFilter, types: DataKeyType[]): Observable<Array<DataKey>> {
        if (!types.length) {
            return of([]);
        }
        let entitiesKeysByQuery$: Observable<EntitiesKeysByQuery>;
        if (filter !== null && types.some(type => [DataKeyType.timeseries, DataKeyType.attribute].includes(type))) {
            const dataQuery = {
                entityFilter: filter,
                pageLink: createDefaultEntityDataPageLink(100),
            };
            entitiesKeysByQuery$ = this.findEntityKeysByQuery(dataQuery, types.includes(DataKeyType.attribute),
                types.includes(DataKeyType.timeseries));
        } else {
            entitiesKeysByQuery$ = of({
                attribute: [],
                timeseries: [],
                entityTypes: [],
            });
        }
        return entitiesKeysByQuery$.pipe(
            map((entitiesKeys) => {
                const dataKeys: Array<DataKey> = [];
                types.forEach(type => {
                    let keys: Array<string>;
                    switch (type) {
                        case DataKeyType.entityField:
                            if (entitiesKeys.entityTypes.length) {
                                const entitiesFields = [];
                                entitiesKeys.entityTypes.forEach(entityType => entitiesFields.push(...this.getEntityFieldKeys(entityType)));
                                keys = Array.from(new Set(entitiesFields));
                            }
                            break;
                        case DataKeyType.alarm:
                            keys = this.getAlarmKeys();
                            break;
                        case DataKeyType.attribute:
                        case DataKeyType.timeseries:
                            if (entitiesKeys[type].length) {
                                keys = entitiesKeys[type];
                            }
                            break;
                    }
                    if (keys) {
                        dataKeys.push(...keys.map(key => {
                            return { name: key, type };
                        }));
                    }
                });
                return dataKeys;
            })
        );
    }

    public createDatasourcesFromSubscriptionsInfo(subscriptionsInfo: Array<SubscriptionInfo>): Array<Datasource> {
        const datasources = subscriptionsInfo.map(subscriptionInfo => this.createDatasourceFromSubscriptionInfo(subscriptionInfo));
        this.utils.generateColors(datasources);
        return datasources;
    }

    public createAlarmSourceFromSubscriptionInfo(subscriptionInfo: SubscriptionInfo): Datasource {
        if (subscriptionInfo.entityId && subscriptionInfo.entityType) {
            const alarmSource = this.createDatasourceFromSubscriptionInfo(subscriptionInfo);
            this.utils.generateColors([alarmSource]);
            return alarmSource;
        } else {
            throw new Error('Can\'t crate alarm source without entityId information!');
        }
    }

    public resolveAlias(entityAlias: EntityAlias, stateParams: StateParams): Observable<AliasInfo> {
        const filter = entityAlias.filter;
        return this.resolveAliasFilter(filter, stateParams).pipe(
            mergeMap((result) => {
                const aliasInfo: AliasInfo = {
                    alias: entityAlias.alias,
                    entityFilter: result.entityFilter,
                    stateEntity: result.stateEntity,
                    entityParamName: result.entityParamName,
                    resolveMultiple: filter.resolveMultiple
                };
                aliasInfo.currentEntity = null;
                if (!aliasInfo.resolveMultiple && aliasInfo.entityFilter) {
                    return this.findSingleEntityInfoByEntityFilter(aliasInfo.entityFilter).pipe(
                        map((entity) => {
                            aliasInfo.currentEntity = entity;
                            return aliasInfo;
                        })
                    );
                }
                return of(aliasInfo);
            })
        );
    }

    public resolveAliasFilter(filter: EntityAliasFilter, stateParams: StateParams): Observable<EntityAliasFilterResult> {
        const result: EntityAliasFilterResult = {
            entityFilter: null,
            stateEntity: false
        };
        if (filter.stateEntityParamName && filter.stateEntityParamName.length) {
            result.entityParamName = filter.stateEntityParamName;
        }
        const stateEntityInfo = this.getStateEntityInfo(filter, stateParams);
        const stateEntityId = stateEntityInfo.entityId;
        switch (filter.type) {
            case AliasFilterType.singleEntity:
                const aliasEntityId = this.resolveAliasEntityId(filter.singleEntity.entityType, filter.singleEntity.id);
                result.entityFilter = {
                    type: AliasFilterType.singleEntity,
                    singleEntity: aliasEntityId
                };
                return of(result);
            case AliasFilterType.entityList:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.entityName:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.entityType:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.stateEntity:
                result.stateEntity = true;
                if (stateEntityId) {
                    result.entityFilter = {
                        type: AliasFilterType.singleEntity,
                        singleEntity: stateEntityId
                    };
                }
                return of(result);
            case AliasFilterType.assetType:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.deviceType:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.entityViewType:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.apiUsageState:
                result.entityFilter = deepClone(filter);
                return of(result);
            case AliasFilterType.relationsQuery:
                result.stateEntity = filter.rootStateEntity;
                let rootEntityType;
                let rootEntityId;
                if (result.stateEntity && stateEntityId) {
                    rootEntityType = stateEntityId.entityType;
                    rootEntityId = stateEntityId.id;
                } else if (!result.stateEntity) {
                    rootEntityType = filter.rootEntity.entityType;
                    rootEntityId = filter.rootEntity.id;
                }
                if (rootEntityType && rootEntityId) {
                    const relationQueryRootEntityId = this.resolveAliasEntityId(rootEntityType, rootEntityId);
                    result.entityFilter = deepClone(filter);
                    result.entityFilter.rootEntity = relationQueryRootEntityId;
                    return of(result);
                } else {
                    return of(result);
                }
            case AliasFilterType.assetSearchQuery:
            case AliasFilterType.deviceSearchQuery:
            case AliasFilterType.entityViewSearchQuery:
                result.stateEntity = filter.rootStateEntity;
                if (result.stateEntity && stateEntityId) {
                    rootEntityType = stateEntityId.entityType;
                    rootEntityId = stateEntityId.id;
                } else if (!result.stateEntity) {
                    rootEntityType = filter.rootEntity.entityType;
                    rootEntityId = filter.rootEntity.id;
                }
                if (rootEntityType && rootEntityId) {
                    const searchQueryRootEntityId = this.resolveAliasEntityId(rootEntityType, rootEntityId);
                    result.entityFilter = deepClone(filter);
                    result.entityFilter.rootEntity = searchQueryRootEntityId;
                    return of(result);
                } else {
                    return of(result);
                }
        }
    }

    public checkEntityAlias(entityAlias: EntityAlias): Observable<boolean> {
        return this.resolveAliasFilter(entityAlias.filter, null).pipe(
            map((result) => {
                if (result.stateEntity) {
                    return true;
                } else {
                    return isDefinedAndNotNull(result.entityFilter);
                }
            }),
            catchError(err => of(false))
        );
    }

    public saveEntityParameters(entityType: EntityType, entityData: ImportEntityData, update: boolean): Observable<ImportEntitiesResultInfo> {
        let saveEntityObservable: Observable<BaseData<EntityId>>;
        switch (entityType) {
            case EntityType.DEVICE:
                const device: Device = {
                    name: entityData.name,
                    type: entityData.type,
                    label: entityData.label,
                    additionalInfo: {
                        description: entityData.description
                    }
                };
                if (entityData.gateway !== null) {
                    device.additionalInfo = {
                        ...device.additionalInfo,
                        gateway: entityData.gateway
                    };
                }
                saveEntityObservable = this.deviceService.saveDevice(device);
                break;
            case EntityType.ASSET:
                const asset: Asset = {
                    name: entityData.name,
                    type: entityData.type,
                    label: entityData.label,
                    additionalInfo: {
                        description: entityData.description
                    }
                };
                saveEntityObservable = this.assetService.saveAsset(asset);
                break;
        }
        return saveEntityObservable.pipe(
            mergeMap((entity) => {
                return this.saveEntityData(entity.id, entityData).pipe(
                    map(() => {
                        return { create: { entity: 1 } } as ImportEntitiesResultInfo;
                    }),
                    catchError(err => of({ error: { entity: 1 } } as ImportEntitiesResultInfo))
                );
            }),
            catchError(err => {
                if (update) {
                    let findEntityObservable: Observable<BaseData<EntityId>>;
                    switch (entityType) {
                        case EntityType.DEVICE:
                            findEntityObservable = this.deviceService.findByName(entityData.name);
                            break;
                        case EntityType.ASSET:
                            findEntityObservable = this.assetService.findByName(entityData.name);
                            break;
                    }
                    return findEntityObservable.pipe(
                        mergeMap((entity) => {
                            const tasks: Observable<any>[] = [];
                            const result: Device & Asset = entity as (Device | Asset);
                            const additionalInfo = result.additionalInfo || {};
                            if (result.label !== entityData.label ||
                                result.type !== entityData.type ||
                                additionalInfo.description !== entityData.description ||
                                (result.id.entityType === EntityType.DEVICE && (additionalInfo.gateway !== entityData.gateway))) {
                                result.label = entityData.label;
                                result.type = entityData.type;
                                result.additionalInfo = additionalInfo;
                                result.additionalInfo.description = entityData.description;
                                if (result.id.entityType === EntityType.DEVICE) {
                                    result.additionalInfo.gateway = entityData.gateway;
                                }
                                if (result.id.entityType === EntityType.DEVICE && result.deviceProfileId) {
                                    delete result.deviceProfileId;
                                }
                                switch (result.id.entityType) {
                                    case EntityType.DEVICE:
                                        tasks.push(this.deviceService.saveDevice(result));
                                        break;
                                    case EntityType.ASSET:
                                        tasks.push(this.assetService.saveAsset(result));
                                        break;
                                }
                            }
                            tasks.push(this.saveEntityData(entity.id, entityData));
                            return forkJoin(tasks).pipe(
                                map(() => {
                                    return { update: { entity: 1 } } as ImportEntitiesResultInfo;
                                }),
                                catchError(updateError => of({ error: { entity: 1 } } as ImportEntitiesResultInfo))
                            );
                        }),
                        catchError(findErr => of({ error: { entity: 1 } } as ImportEntitiesResultInfo))
                    );
                } else {
                    return of({ error: { entity: 1 } } as ImportEntitiesResultInfo);
                }
            })
        );
    }

    public saveEntityData(entityId: EntityId, entityData: ImportEntityData): Observable<any> {
        const observables: Observable<string>[] = [];
        let observable: Observable<string>;
        if (entityData.accessToken && entityData.accessToken !== '') {
            observable = this.deviceService.getDeviceCredentials(entityId.id, false).pipe(
                mergeMap((credentials) => {
                    credentials.credentialsId = entityData.accessToken;
                    credentials.credentialsType = DeviceCredentialsType.ACCESS_TOKEN;
                    credentials.credentialsValue = null;
                    return this.deviceService.saveDeviceCredentials(credentials).pipe(
                        map(() => 'ok'),
                        catchError(err => of('error'))
                    );
                })
            );
            observables.push(observable);
        }
        if (entityData.mqttBasicUserName && entityData.mqttBasicUserName !== '' || entityData.mqttBasicClientId && entityData.mqttBasicClientId !== '') {
            observable = this.deviceService.getDeviceCredentials(entityId.id, false).pipe(
                mergeMap((credentials) => {
                    credentials.credentialsId = entityData.mqttBasicUserName;
                    credentials.credentialsType = DeviceCredentialsType.MQTT_BASIC;
                    credentials.credentialsValue = `{"clientId":"${entityData.mqttBasicClientId}","userName":"${entityData.mqttBasicUserName}","password":"${entityData.mqttBasicPassword}"}`;
                    return this.deviceService.saveDeviceCredentials(credentials).pipe(
                        map(() => 'ok'),
                        catchError(err => of('error'))
                    );
                })
            );
            observables.push(observable);
        }
        if (entityData.attributes.shared && entityData.attributes.shared.length) {
            observable = this.attributeService.saveEntityAttributes(entityId, AttributeScope.SHARED_SCOPE,
                entityData.attributes.shared).pipe(
                    map(() => 'ok'),
                    catchError(err => of('error'))
                );
            observables.push(observable);
        }
        if (entityData.attributes.server && entityData.attributes.server.length) {
            observable = this.attributeService.saveEntityAttributes(entityId, AttributeScope.SERVER_SCOPE,
                entityData.attributes.server).pipe(
                    map(() => 'ok'),
                    catchError(err => of('error'))
                );
            observables.push(observable);
        }
        if (entityData.timeseries && entityData.timeseries.length) {
            observable = this.attributeService.saveEntityTimeseries(entityId, 'time', entityData.timeseries).pipe(
                map(() => 'ok'),
                catchError(err => of('error'))
            );
            observables.push(observable);
        }
        if (observables.length) {
            return forkJoin(observables).pipe(
                map((response) => {
                    const hasError = response.filter((status) => status === 'error').length > 0;
                    if (hasError) {
                        throw Error();
                    } else {
                        return response;
                    }
                })
            );
        } else {
            return of(null);
        }
    }

    private getStateEntityInfo(filter: EntityAliasFilter, stateParams: StateParams): { entityId: EntityId } {
        let entityId: EntityId = null;
        if (stateParams) {
            if (filter.stateEntityParamName && filter.stateEntityParamName.length) {
                if (stateParams[filter.stateEntityParamName]) {
                    entityId = stateParams[filter.stateEntityParamName].entityId;
                }
            } else {
                entityId = stateParams.entityId;
            }
        }
        if (!entityId) {
            entityId = filter.defaultStateEntity;
        }
        if (entityId) {
            entityId = this.resolveAliasEntityId(entityId.entityType, entityId.id);
        }
        return { entityId };
    }

    private resolveAliasEntityId(entityType: EntityType | AliasEntityType, id: string): EntityId {
        const entityId: EntityId = {
            entityType,
            id
        };
        if (entityType === AliasEntityType.CURRENT_CUSTOMER) {
            const authUser = getCurrentAuthUser(this.store);
            entityId.entityType = EntityType.CUSTOMER;
            if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                entityId.id = authUser.customerId;
            }
        } else if (entityType === AliasEntityType.CURRENT_TENANT) {
            const authUser = getCurrentAuthUser(this.store);
            entityId.entityType = EntityType.TENANT;
            entityId.id = authUser.tenantId;
        } else if (entityType === AliasEntityType.CURRENT_USER) {
            const authUser = getCurrentAuthUser(this.store);
            entityId.entityType = EntityType.USER;
            entityId.id = authUser.userId;
        } else if (entityType === AliasEntityType.CURRENT_USER_OWNER) {
            const authUser = getCurrentAuthUser(this.store);
            if (authUser.authority === Authority.TENANT_ADMIN) {
                entityId.entityType = EntityType.TENANT;
                entityId.id = authUser.tenantId;
            } else if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
                entityId.entityType = EntityType.CUSTOMER;
                entityId.id = authUser.customerId;
            }
        }
        return entityId;
    }

    private createDatasourceFromSubscriptionInfo(subscriptionInfo: SubscriptionInfo): Datasource {
        subscriptionInfo = this.validateSubscriptionInfo(subscriptionInfo);
        let datasource: Datasource = null;
        if (subscriptionInfo.type === DatasourceType.entity) {
            datasource = {
                type: subscriptionInfo.type,
                entityName: subscriptionInfo.entityName,
                name: subscriptionInfo.entityName,
                entityType: subscriptionInfo.entityType,
                entityId: subscriptionInfo.entityId,
                dataKeys: []
            };
            this.prepareEntityFilterFromSubscriptionInfo(datasource, subscriptionInfo);
        } else if (subscriptionInfo.type === DatasourceType.function || subscriptionInfo.type === DatasourceType.entityCount) {
            datasource = {
                type: subscriptionInfo.type,
                name: subscriptionInfo.name || subscriptionInfo.type,
                dataKeys: []
            };
        }
        if (datasource !== null) {
            if (subscriptionInfo.timeseries) {
                this.createDatasourceKeys(subscriptionInfo.timeseries, DataKeyType.timeseries, datasource);
            }
            if (subscriptionInfo.attributes) {
                this.createDatasourceKeys(subscriptionInfo.attributes, DataKeyType.attribute, datasource);
            }
            if (subscriptionInfo.functions) {
                this.createDatasourceKeys(subscriptionInfo.functions, DataKeyType.function, datasource);
            }
            if (subscriptionInfo.alarmFields) {
                this.createDatasourceKeys(subscriptionInfo.alarmFields, DataKeyType.alarm, datasource);
            }
            if (subscriptionInfo.type === DatasourceType.entityCount) {
                const dataKey = this.utils.createKey({ name: 'count' }, DataKeyType.count);
                datasource.dataKeys.push(dataKey);
            }
        }
        return datasource;
    }

    private validateSubscriptionInfo(subscriptionInfo: SubscriptionInfo): SubscriptionInfo {
        // @ts-ignore
        if (subscriptionInfo.type === 'device') {
            subscriptionInfo.type = DatasourceType.entity;
            subscriptionInfo.entityType = EntityType.DEVICE;
            if (subscriptionInfo.deviceId) {
                subscriptionInfo.entityId = subscriptionInfo.deviceId;
            } else if (subscriptionInfo.deviceName) {
                subscriptionInfo.entityName = subscriptionInfo.deviceName;
            } else if (subscriptionInfo.deviceNamePrefix) {
                subscriptionInfo.entityNamePrefix = subscriptionInfo.deviceNamePrefix;
            } else if (subscriptionInfo.deviceIds) {
                subscriptionInfo.entityIds = subscriptionInfo.deviceIds;
            }
        }
        return subscriptionInfo;
    }

    private prepareEntityFilterFromSubscriptionInfo(datasource: Datasource, subscriptionInfo: SubscriptionInfo) {
        if (subscriptionInfo.entityId) {
            datasource.entityFilter = {
                type: AliasFilterType.singleEntity,
                singleEntity: {
                    entityType: subscriptionInfo.entityType,
                    id: subscriptionInfo.entityId
                }
            };
            datasource.pageLink = singleEntityDataPageLink;
        } else if (subscriptionInfo.entityName || subscriptionInfo.entityNamePrefix) {
            let nameFilter;
            let pageLink;
            if (isDefined(subscriptionInfo.entityName) && subscriptionInfo.entityName.length) {
                nameFilter = subscriptionInfo.entityName;
                pageLink = deepClone(singleEntityDataPageLink);
            } else {
                nameFilter = subscriptionInfo.entityNamePrefix;
                pageLink = deepClone(defaultEntityDataPageLink);
            }
            datasource.entityFilter = {
                type: AliasFilterType.entityName,
                entityType: subscriptionInfo.entityType,
                entityNameFilter: nameFilter
            };
            datasource.pageLink = pageLink;
        } else if (subscriptionInfo.entityIds) {
            datasource.entityFilter = {
                type: AliasFilterType.entityList,
                entityType: subscriptionInfo.entityType,
                entityList: subscriptionInfo.entityIds
            };
            datasource.pageLink = deepClone(defaultEntityDataPageLink);
        }
    }

    private createDatasourceKeys(keyInfos: Array<KeyInfo>, type: DataKeyType, datasource: Datasource) {
        keyInfos.forEach((keyInfo) => {
            const dataKey = this.utils.createKey(keyInfo, type);
            datasource.dataKeys.push(dataKey);
        });
    }
}
