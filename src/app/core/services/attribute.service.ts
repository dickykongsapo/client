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

import { forkJoin, from, map, Observable, of } from 'rxjs';
import { EntityId } from '@models/id/entity-id';
import { AttributeData, AttributeScope, DataSortOrder, TimeseriesData } from '@models/public-api';
import { isDefinedAndNotNull } from '../utils';
import { AggregationType } from '@models/public-api';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class AttributeService {

    public getEntityAttributesForTenantAndCustomer(authUser: any,
        keys?: Array<string>): Observable<Array<AttributeData>> {
        let url: string;
        if (authUser.authority == 'TENANT_ADMIN' || authUser.authority == 'TENANT_USER') {
            url = `/api/plugins/telemetry/TENANT/${authUser.tenantId}/values/attributes/SERVER_SCOPE`;
        } else if (authUser.authority == 'CUSTOMER_ADMIN' || authUser.authority == 'CUSTOMER_USER') {
            url = `/api/plugins/telemetry/CUSTOMER/${authUser.customerId}/values/attributes/SERVER_SCOPE`;
        }
        if (keys && keys.length) {
            url += `?keys=${keys.join(',')}`;
        }
        return from(axiosInstance.get<Array<AttributeData>>(url))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getEntityAttributes(entityId: EntityId, attributeScope: AttributeScope,
        keys?: Array<string>): Observable<Array<AttributeData>> {
        let url = `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/attributes/${attributeScope}`;
        if (keys && keys.length) {
            url += `?keys=${keys.join(',')}`;
        }
        return from(axiosInstance.get<Array<AttributeData>>(url))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteEntityAttributes(entityId: EntityId, attributeScope: AttributeScope, attributes: Array<AttributeData>): Observable<any> {
        const keys = attributes.map(attribute => encodeURI(attribute.key)).join(',');
        return from(axiosInstance.delete(`/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/${attributeScope}` +
            `?keys=${keys}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteEntityTimeseries(entityId: EntityId, timeseries: Array<AttributeData>, deleteAllDataForKeys = false): Observable<any> {
        const keys = timeseries.map(attribute => encodeURI(attribute.key)).join(',');
        return from(axiosInstance.delete(`/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/timeseries/delete` +
            `?keys=${keys}&deleteAllDataForKeys=${deleteAllDataForKeys}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveEntityAttributes(entityId: EntityId, attributeScope: AttributeScope, attributes: Array<AttributeData>): Observable<any> {
        const attributesData: { [key: string]: any } = {};
        const deleteAttributes: AttributeData[] = [];
        attributes.forEach((attribute) => {
            if (isDefinedAndNotNull(attribute.value)) {
                attributesData[attribute.key] = attribute.value;
            } else {
                deleteAttributes.push(attribute);
            }
        });
        let deleteEntityAttributesObservable: Observable<any>;
        if (deleteAttributes.length) {
            deleteEntityAttributesObservable = this.deleteEntityAttributes(entityId, attributeScope, deleteAttributes);
        } else {
            deleteEntityAttributesObservable = of(null);
        }
        let saveEntityAttributesObservable: Observable<any>;
        if (Object.keys(attributesData).length) {
            saveEntityAttributesObservable = from(axiosInstance.post(`/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/${attributeScope}`,
                attributesData))
                .pipe(map(axiosResponse => { return axiosResponse.data }));
        } else {
            saveEntityAttributesObservable = of(null);
        }
        return forkJoin([saveEntityAttributesObservable, deleteEntityAttributesObservable]);
    }

    public saveEntityTimeseries(entityId: EntityId, timeseriesScope: string, timeseries: Array<AttributeData>): Observable<any> {
        const timeseriesData: { [key: string]: any } = {};
        const deleteTimeseries: AttributeData[] = [];
        timeseries.forEach((attribute) => {
            if (isDefinedAndNotNull(attribute.value)) {
                timeseriesData[attribute.key] = attribute.value;
            } else {
                deleteTimeseries.push(attribute);
            }
        });
        let deleteEntityTimeseriesObservable: Observable<any>;
        if (deleteTimeseries.length) {
            deleteEntityTimeseriesObservable = this.deleteEntityTimeseries(entityId, deleteTimeseries, true);
        } else {
            deleteEntityTimeseriesObservable = of(null);
        }
        let saveEntityTimeseriesObservable: Observable<any>;
        if (Object.keys(timeseriesData).length) {
            saveEntityTimeseriesObservable =
                from(axiosInstance.post(`/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/timeseries/${timeseriesScope}`,
                    timeseriesData))
                    .pipe(map(axiosResponse => { return axiosResponse.data }));
        } else {
            saveEntityTimeseriesObservable = of(null);
        }
        return forkJoin([saveEntityTimeseriesObservable, deleteEntityTimeseriesObservable]);
    }

    public getEntityTimeseries(entityId: EntityId, keys: Array<string>, startTs: number, endTs: number,
        limit: number = 100, agg: AggregationType = AggregationType.NONE, interval?: number,
        orderBy: DataSortOrder = DataSortOrder.DESC, useStrictDataTypes: boolean = false): Observable<TimeseriesData> {
        let url = `/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/timeseries?keys=${keys.join(',')}&startTs=${startTs}&endTs=${endTs}`;
        if (isDefinedAndNotNull(limit)) {
            url += `&limit=${limit}`;
        }
        if (isDefinedAndNotNull(agg)) {
            url += `&agg=${agg}`;
        }
        if (isDefinedAndNotNull(interval)) {
            url += `&interval=${interval}`;
        }
        if (isDefinedAndNotNull(orderBy)) {
            url += `&orderBy=${orderBy}`;
        }
        if (isDefinedAndNotNull(useStrictDataTypes)) {
            url += `&useStrictDataTypes=${useStrictDataTypes}`;
        }

        return from(axiosInstance.get<TimeseriesData>(url))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getLatestEntityTimeseries(entityId: EntityId, key: string): Observable<TimeseriesData> {
        return from(axiosInstance.get<TimeseriesData>(`/api/plugins/telemetry/${entityId.entityType}/${entityId.id}/values/timeseries?keys=${key}&useStrictDataTypes=false`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }
}
