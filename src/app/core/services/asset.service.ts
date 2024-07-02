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
import { PageLink } from '@models/page/page-link';
import { PageData } from '@models/page/page-data';
import { EntitySubtype } from '@models/entity-type.models';
import { Asset, AssetInfo, AssetSearchQuery } from '@models/asset.models';
import { axiosInstance } from '../interceptor/global-http-interceptor';

export class AssetService {

    public getTenantAssetInfos(pageLink: PageLink, type: string = ''): Observable<PageData<AssetInfo>> {
        return from(axiosInstance.get<PageData<AssetInfo>>(`/api/tenant/assetInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getCustomerAssetInfos(customerId: string, pageLink: PageLink, type: string = ''): Observable<PageData<AssetInfo>> {
        return from(axiosInstance.get<PageData<AssetInfo>>(`/api/customer/${customerId}/assetInfos${pageLink.toQuery()}&type=${type}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAsset(assetId: string): Observable<Asset> {
        return from(axiosInstance.get<Asset>(`/api/asset/${assetId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAssets(assetIds: Array<string>): Observable<Array<Asset>> {
        return from(axiosInstance.get<Array<Asset>>(`/api/assets?assetIds=${assetIds.join(',')}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAssetInfo(assetId: string): Observable<AssetInfo> {
        return from(axiosInstance.get<AssetInfo>(`/api/asset/info/${assetId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public saveAsset(asset: Asset): Observable<Asset> {
        return from(axiosInstance.post<Asset>('/api/asset', asset))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public deleteAsset(assetId: string) {
        return from(axiosInstance.delete(`/api/asset/${assetId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public getAssetTypes(): Observable<Array<EntitySubtype>> {
        return from(axiosInstance.get<Array<EntitySubtype>>('/api/asset/types'))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public makeAssetPublic(assetId: string): Observable<Asset> {
        return from(axiosInstance.post<Asset>(`/api/customer/public/asset/${assetId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public assignAssetToCustomer(customerId: string, assetId: string): Observable<Asset> {
        return from(axiosInstance.post<Asset>(`/api/customer/${customerId}/asset/${assetId}`, null))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public unassignAssetFromCustomer(assetId: string) {
        return from(axiosInstance.delete(`/api/customer/asset/${assetId}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByQuery(query: AssetSearchQuery): Observable<Array<Asset>> {
        return from(axiosInstance.post<Array<Asset>>('/api/assets', query))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

    public findByName(assetName: string): Observable<Asset> {
        return from(axiosInstance.get<Asset>(`/api/tenant/assets?assetName=${assetName}`))
            .pipe(map(axiosResponse => { return axiosResponse.data }));
    }

}
