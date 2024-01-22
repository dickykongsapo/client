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

import {
    DataKey,
    Datasource,
    DatasourceData
} from '@models/widget.models';
import { IWidgetSubscription } from './widget-api-models';
//   import { TranslateService } from '@ngx-translate/core';
//   import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { DataKeyType, entityTypeTranslations } from '@app/shared/public-api';
import { BehaviorSubject, Observable } from 'rxjs';
import { emptyPageData, PageData } from '@models/page/page-data';
import { EntityId } from '@models/id/entity-id';
import { EntityTypeTranslation } from '@app/shared/public-api';
import { map, switchMap, tap } from 'rxjs/operators';
import { EntityData } from '@components/widget/lib/table-widget.models';
import {
    Direction,
    EntityDataPageLink,
    KeyFilter
} from '@models/query/query.models';
import { sortItems } from '@models/page/page-link';
import { DeviceProfileTypeForReactWidget } from '@models/device.models';
import { getDeviceType } from '@pages/react-test/react/models/senso8-device-type.models';
import { AdminService } from '../services/admin.service';
import i18n from 'src/i18n';
export class EntityDatasource {
    private entitiesSubject = new BehaviorSubject<EntityData[]>([]);
    private sensorScenarioSubject = new BehaviorSubject<[]>([])
    private pageDataSubject = new BehaviorSubject<PageData<EntityData>>(emptyPageData<EntityData>());

    private currentEntity: EntityData = null;

    public dataLoading = true;

    private appliedPageLink: EntityDataPageLink;
    private appliedSortOrderLabel: string;

    constructor(
        private dataKeys: Array<DataKey>,
        private subscription: IWidgetSubscription,
        private adminService?: AdminService
    ) {
    }

    loadEntities(pageLink: EntityDataPageLink, sortOrderLabel: string, keyFilters: KeyFilter[]) {
        this.dataLoading = true;
        // this.clear();
        this.appliedPageLink = pageLink;
        this.appliedSortOrderLabel = sortOrderLabel;
        this.subscription.subscribeForPaginatedData(0, pageLink, keyFilters);
    }

    private clear() {
        this.entitiesSubject.next([]);
        this.pageDataSubject.next(emptyPageData<EntityData>());
    }

    async loadSensorScenario() {
        (this.adminService) && await this.adminService.getSensorScenario().subscribe(sensorScenario => {
            this.sensorScenarioSubject.next(sensorScenario.jsonValue as []);
        })
    }

    dataUpdated() {
        const customerList = this.subscription.customerList ? this.subscription.customerList : [];
        let datasourcesPageData = this.subscription.datasourcePages[0];
        const dataPageData = this.subscription.dataPages[0];
        let entities = new Array<EntityData>();

        if (datasourcesPageData.totalElements !== 0) {

            datasourcesPageData.data.forEach((datasource, index) => {
                entities.push(this.datasourceToEntityData(datasource, dataPageData.data[index]));
            });

            if (this.appliedSortOrderLabel && this.appliedSortOrderLabel.length) {
                const asc = this.appliedPageLink.sortOrder.direction === Direction.ASC;
                entities = entities.sort((a, b) => sortItems(a, b, this.appliedSortOrderLabel, asc));
            }

            const resultEntities = customerList.length == 0 ? entities : entities.filter(entity => customerList.includes(entity.customerId));

            const entitiesPageData: PageData<EntityData> = {
                data: resultEntities,
                totalPages: datasourcesPageData.totalPages,
                totalElements: resultEntities.length,
                hasNext: datasourcesPageData.hasNext
            };

            this.entitiesSubject.next(resultEntities);
            this.pageDataSubject.next(entitiesPageData);
            this.dataLoading = false;
        }
    }

    private datasourceToEntityData(datasource: Datasource, data: DatasourceData[]): EntityData {
        const entity: EntityData = {
            id: {} as EntityId,
            entityName: datasource.entityName,
            entityLabel: datasource.entityLabel ? datasource.entityLabel : datasource.entityName,
        };
        if (datasource.entityId) {
            entity.id.id = datasource.entityId;
        }
        if (datasource.entityType) {
            entity.id.entityType = datasource.entityType;
            entity.entityType = i18n.t(entityTypeTranslations.get(datasource.entityType).type);
        } else {
            entity.entityType = '';
        }
        this.dataKeys.forEach((dataKey, index) => {
            const keyData = data[index].data;
            if (keyData && keyData.length && keyData[0].length > 1) {
                if (data[index].dataKey.type !== DataKeyType.entityField || !entity.hasOwnProperty(dataKey.label)) {
                    entity[dataKey.label] = keyData[0][1];
                }
            } else {
                entity[dataKey.label] = '';
            }
        });
        return entity;
    }

    isEmpty(): Observable<boolean> {
        return this.entitiesSubject.pipe(
            map((entities) => !entities.length)
        );
    }

    totalEntities(): Observable<EntityData[]> {
        return this.entitiesSubject.pipe(
            map((totalEntities) => totalEntities)
        )
    }

    sensorScenarioJsonValue(): Observable<[]> {
        return this.sensorScenarioSubject.pipe(
            map((sensorScenarioJsonValue) => sensorScenarioJsonValue)
        )
    }

    total(): Observable<number> {
        return this.pageDataSubject.pipe(
            map((pageData) => pageData.totalElements)
        );
    }

    public toggleCurrentEntity(entity: EntityData): boolean {
        if (this.currentEntity !== entity) {
            this.currentEntity = entity;
            return true;
        } else {
            return false;
        }
    }

    public isCurrentEntity(entity: EntityData): boolean {
        return (this.currentEntity && entity && this.currentEntity.id && entity.id) &&
            (this.currentEntity.id.id === entity.id.id);
    }


    deviceTypeFilter(deviceTypeNumber: number, deviceProfileType: DeviceProfileTypeForReactWidget): Boolean {
        if (deviceTypeNumber == 15) {
            return true
        } else {
            if (getDeviceType(deviceProfileType) == deviceTypeNumber) {
                return true
            }
            return false
        }
    }
}
