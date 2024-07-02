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
import { EntityRelation, EntityRelationInfo, EntityRelationsQuery } from '@models/relation.models';
import { EntityId } from '@models/id/entity-id';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class EntityRelationService {

    public saveRelation(relation: EntityRelation): Observable<EntityRelation> {
        return from(axiosInstance.post<EntityRelation>('/api/relation', relation))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteRelation(fromId: EntityId, relationType: string, toId: EntityId) {
        return from(axiosInstance.delete(`/api/relation?fromId=${fromId.id}&fromType=${fromId.entityType}` +
            `&relationType=${relationType}&toId=${toId.id}&toType=${toId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteRelations(entityId: EntityId) {
        return from(axiosInstance.delete(`/api/relations?entityId=${entityId.id}&entityType=${entityId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getRelation(fromId: EntityId, relationType: string, toId: EntityId): Observable<EntityRelation> {
        return from(axiosInstance.get<EntityRelation>(`/api/relation?fromId=${fromId.id}&fromType=${fromId.entityType}` +
            `&relationType=${relationType}&toId=${toId.id}&toType=${toId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByFrom(fromId: EntityId): Observable<Array<EntityRelation>> {
        return from(axiosInstance.get<Array<EntityRelation>>(
            `/api/relations?fromId=${fromId.id}&fromType=${fromId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findInfoByFrom(fromId: EntityId): Observable<Array<EntityRelationInfo>> {
        return from(axiosInstance.get<Array<EntityRelationInfo>>(
            `/api/relations/info?fromId=${fromId.id}&fromType=${fromId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByFromAndType(fromId: EntityId, relationType: string): Observable<Array<EntityRelation>> {
        return from(axiosInstance.get<Array<EntityRelation>>(
            `/api/relations?fromId=${fromId.id}&fromType=${fromId.entityType}&relationType=${relationType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByTo(toId: EntityId): Observable<Array<EntityRelation>> {
        return from(axiosInstance.get<Array<EntityRelation>>(
            `/api/relations?toId=${toId.id}&toType=${toId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findInfoByTo(toId: EntityId): Observable<Array<EntityRelationInfo>> {
        return from(axiosInstance.get<Array<EntityRelationInfo>>(
            `/api/relations/info?toId=${toId.id}&toType=${toId.entityType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByToAndType(toId: EntityId, relationType: string): Observable<Array<EntityRelation>> {
        return from(axiosInstance.get<Array<EntityRelation>>(
            `/api/relations?toId=${toId.id}&toType=${toId.entityType}&relationType=${relationType}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByQuery(query: EntityRelationsQuery): Observable<Array<EntityRelation>> {
        return from(axiosInstance.post<Array<EntityRelation>>(
            '/api/relations', query))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findInfoByQuery(query: EntityRelationsQuery): Observable<Array<EntityRelationInfo>> {
        return from(axiosInstance.post<Array<EntityRelationInfo>>(
            '/api/relations/info', query))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

}
