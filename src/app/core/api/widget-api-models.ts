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

import { BehaviorSubject, Observable } from 'rxjs';
import { EntityId } from '@models/id/entity-id';
import {
    DataKey, DataSet,
    Datasource,
    DatasourceData,
    DatasourceType,
    KeyInfo,
    LegendConfig,
    LegendData,
    WidgetActionDescriptor,
    widgetType
} from '@models/widget.models';
// import {
//     DataKey,
//     DataSet,
//     Datasource,
//     DatasourceData,
//     DatasourceType,
//     KeyInfo,
//     LegendConfig,
//     LegendData,
//     WidgetActionDescriptor,
//     widgetType
// } from '@shared/models/widget.models';
import { TimeService } from '../services/time.service';
import { UtilsService } from '../services/utils.service';
import { Timewindow, WidgetTimewindow } from '@models/time/time.models';
import { EntityType } from '@models/entity-type.models';
// import { HttpErrorResponse } from '@angular/common/http';
import { EntityAlias, EntityAliases } from '@models/alias.models';
import { EntityInfo } from '@models/entity.models';
import { IDashboardComponent } from '@models/dashboard-component.model';
import * as moment_ from 'moment';
import {
    AlarmData,
    AlarmDataPageLink,
    dataKeyTypeToEntityKeyType,
    Direction,
    EntityData,
    EntityDataPageLink,
    EntityFilter,
    Filter,
    FilterInfo,
    Filters,
    KeyFilter
} from '@models/query/query.models';
import { EntityDataService } from '../services/entity-data.service';
import { emptyPageData, PageData } from '@models/page/page-data';
import { AlarmDataService } from './alarm-data.service';
import { IDashboardController } from '@components/dashboard-page/dashboard-page.models';
import { AlarmDataInfo } from '@models/alarm.models';
// import { EventEmitter } from '@angular/core';
// import { CollectionViewer, DataSource, SelectionModel } from '@angular/cdk/collections';
import { sortItems } from '@models/page/page-link';
import { deepClone } from '../utils';
import { map } from 'rxjs/operators';
import { DeviceService } from '../services/device.service';

export interface TimewindowFunctions {
    onUpdateTimewindow: (startTimeMs: number, endTimeMs: number, interval?: number) => void;
    onResetTimewindow: () => void;
}

export interface WidgetSubscriptionApi {
    createSubscription: (options: WidgetSubscriptionOptions, subscribe?: boolean) => Observable<IWidgetSubscription>;
    createSubscriptionFromInfo: (type: widgetType, subscriptionsInfo: Array<SubscriptionInfo>,
        options: WidgetSubscriptionOptions, useDefaultComponents: boolean, subscribe: boolean)
        => Observable<IWidgetSubscription>;
    removeSubscription: (id: string) => void;
}

export interface RpcApi {
    sendOneWayCommand: (method: string, params?: any, timeout?: number) => Observable<any>;
    sendTwoWayCommand: (method: string, params?: any, timeout?: number) => Observable<any>;
}

export interface IWidgetUtils {
    formatValue: (value: any, dec?: number, units?: string, showZeroDecimals?: boolean) => string | undefined;
}

export interface WidgetActionsApi {
    actionDescriptorsBySourceId: { [sourceId: string]: Array<WidgetActionDescriptor> };
    getActionDescriptors: (actionSourceId: string) => Array<WidgetActionDescriptor>;
    handleWidgetAction: ($event: Event, descriptor: WidgetActionDescriptor,
        entityId?: EntityId, entityName?: string, additionalParams?: any, entityLabel?: string) => void;
    elementClick: ($event: Event) => void;
    getActiveEntityInfo: () => SubscriptionEntityInfo;
}

export interface AliasInfo {
    alias?: string;
    stateEntity?: boolean;
    entityFilter?: EntityFilter;
    currentEntity?: EntityInfo;
    entityParamName?: string;
    resolveMultiple?: boolean;
}

export interface StateEntityInfo {
    entityParamName: string;
    entityId: EntityId;
}

export interface IAliasController {
    entityAliasesChanged: Observable<Array<string>>;
    entityAliasResolved: Observable<string>;
    filtersChanged: Observable<Array<string>>;
    getAliasInfo(aliasId: string): Observable<AliasInfo>;
    getEntityAliasId(aliasName: string): string;
    getInstantAliasInfo(aliasId: string): AliasInfo;
    resolveSingleEntityInfo(aliasId: string): Observable<EntityInfo>;
    resolveDatasources(datasources: Array<Datasource>, singleEntity?: boolean): Observable<Array<Datasource>>;
    resolveAlarmSource(alarmSource: Datasource): Observable<Datasource>;
    resolveAlarmCountSource(): Observable<JSON>;
    getEntityAliases(): EntityAliases;
    getFilters(): Filters;
    getFilterInfo(filterId: string): FilterInfo;
    getKeyFilters(filterId: string): Array<KeyFilter>;
    updateCurrentAliasEntity(aliasId: string, currentEntity: EntityInfo);
    updateUserFilter(filter: Filter);
    updateEntityAliases(entityAliases: EntityAliases);
    updateFilters(filters: Filters);
    updateAliases(aliasIds?: Array<string>);
    dashboardStateChanged();
}

export interface StateObject {
    id?: string;
    params?: StateParams;
}

export interface StateParams {
    entityName?: string;
    entityLabel?: string;
    targetEntityParamName?: string;
    entityId?: EntityId;
    [key: string]: any | null;
}

export type StateControllerHolder = () => IStateController;

export interface IStateController {
    dashboardCtrl: IDashboardController;
    getStateParams(): StateParams;
    getStateParamsByStateId(stateId: string): StateParams;
    openState(id: string, params?: StateParams, openRightLayout?: boolean): void;
    updateState(id?: string, params?: StateParams, openRightLayout?: boolean): void;
    resetState(): void;
    openRightLayout(): void;
    preserveState(): void;
    cleanupPreservedStates(): void;
    navigatePrevState(index: number): void;
    getStateId(): string;
    getStateIndex(): number;
    getStateIdAtIndex(index: number): string;
    getEntityId(entityParamName: string): EntityId;
}

export interface SubscriptionInfo {
    type: DatasourceType;
    name?: string;
    entityType?: EntityType;
    entityId?: string;
    entityIds?: Array<string>;
    entityName?: string;
    entityNamePrefix?: string;
    timeseries?: Array<KeyInfo>;
    attributes?: Array<KeyInfo>;
    functions?: Array<KeyInfo>;
    alarmFields?: Array<KeyInfo>;

    deviceId?: string;
    deviceName?: string;
    deviceNamePrefix?: string;
    deviceIds?: Array<string>;
}

export class WidgetSubscriptionContext {

    constructor(private dashboard: IDashboardComponent) { }

    get aliasController(): IAliasController {
        return this.dashboard.aliasController;
    }

    dashboardTimewindowApi: TimewindowFunctions = {
        onResetTimewindow: this.dashboard.onResetTimewindow.bind(this.dashboard),
        onUpdateTimewindow: this.dashboard.onUpdateTimewindow.bind(this.dashboard)
    };

    timeService: TimeService;
    deviceService: DeviceService;
    // translate: TranslateService;
    entityDataService: EntityDataService;
    alarmDataService: AlarmDataService;
    utils: UtilsService;
    // raf: RafService;
    widgetUtils: IWidgetUtils;
    getServerTimeDiff: () => Observable<number>;
}

export type SubscriptionMessageSeverity = 'info' | 'warn' | 'error' | 'success';

export interface SubscriptionMessage {
    severity: SubscriptionMessageSeverity;
    message: string;
}

export interface WidgetSubscriptionCallbacks {
    onDataUpdated?: (subscription: IWidgetSubscription, detectChanges: boolean) => void;
    onDataUpdateError?: (subscription: IWidgetSubscription, e: any) => void;
    onSubscriptionMessage?: (subscription: IWidgetSubscription, message: SubscriptionMessage) => void;
    onInitialPageDataChanged?: (subscription: IWidgetSubscription, nextPageData: PageData<EntityData>) => void;
    forceReInit?: () => void;
    dataLoading?: (subscription: IWidgetSubscription) => void;
    legendDataUpdated?: (subscription: IWidgetSubscription, detectChanges: boolean) => void;
    timeWindowUpdated?: (subscription: IWidgetSubscription, timeWindowConfig: Timewindow) => void;
    rpcStateChanged?: (subscription: IWidgetSubscription) => void;
    onRpcSuccess?: (subscription: IWidgetSubscription) => void;
    onRpcFailed?: (subscription: IWidgetSubscription) => void;
    onRpcErrorCleared?: (subscription: IWidgetSubscription) => void;
    onDataUpdatedOnOffline?: (subscription: IWidgetSubscription, detectChanges: boolean) => void;

}

export interface WidgetSubscriptionOptions {
    type?: widgetType;
    stateData?: boolean;
    alarmSource?: Datasource;
    datasources?: Array<Datasource>;
    hasDataPageLink?: boolean;
    singleEntity?: boolean;
    warnOnPageDataOverflow?: boolean;
    ignoreDataUpdateOnIntervalTick?: boolean;
    targetDeviceAliasIds?: Array<string>;
    targetDeviceIds?: Array<string>;
    useDashboardTimewindow?: boolean;
    displayTimewindow?: boolean;
    timeWindowConfig?: Timewindow;
    dashboardTimewindow?: Timewindow;
    customerList?: Array<string>;
    legendConfig?: LegendConfig;
    comparisonEnabled?: boolean;
    timeForComparison?: moment_.unitOfTime.DurationConstructor;
    decimals?: number;
    units?: string;
    callbacks?: WidgetSubscriptionCallbacks;
    alarmCountSource?: JSON;
}

export interface SubscriptionEntityInfo {
    entityId: EntityId;
    entityName: string;
    entityLabel: string;
    entityDescription: string;
}

export interface IWidgetSubscription {

    options: WidgetSubscriptionOptions;
    id: string;
    init$: Observable<IWidgetSubscription>;
    ctx: WidgetSubscriptionContext;
    type: widgetType;
    callbacks: WidgetSubscriptionCallbacks;

    loadingData: boolean;
    useDashboardTimewindow: boolean;

    legendData: LegendData;

    datasourcePages?: PageData<Datasource>[];
    dataPages?: PageData<Array<DatasourceData>>[];
    datasources?: Array<Datasource>;
    data?: Array<DatasourceData>;
    hiddenData?: Array<{ data: DataSet }>;
    timeWindowConfig?: Timewindow;
    timeWindow?: WidgetTimewindow;
    comparisonEnabled?: boolean;
    comparisonTimeWindow?: WidgetTimewindow;

    alarms?: PageData<AlarmData>;
    totalAlarms?: PageData<AlarmData>;
    alarmSource?: Datasource;
    alarmCountSource?: JSON;

    targetDeviceAliasIds?: Array<string>;
    targetDeviceIds?: Array<string>;

    rpcEnabled?: boolean;
    executingRpcRequest?: boolean;
    rpcErrorText?: string;

    getFirstEntityInfo(): SubscriptionEntityInfo;

    onAliasesChanged(aliasIds: Array<string>): boolean;

    onFiltersChanged(filterIds: Array<string>): boolean;

    onDashboardTimewindowChanged(dashboardTimewindow: Timewindow): void;

    updateDataVisibility(index: number): void;

    onUpdateTimewindow(startTimeMs: number, endTimeMs: number, interval?: number): void;
    onResetTimewindow(): void;
    updateTimewindowConfig(newTimewindow: Timewindow): void;

    sendOneWayCommand(method: string, params?: any, timeout?: number): Observable<any>;
    sendTwoWayCommand(method: string, params?: any, timeout?: number): Observable<any>;
    clearRpcError(): void;

    subscribe(): void;

    subscribeAllForPaginatedData(pageLink: EntityDataPageLink,
        keyFilters: KeyFilter[]): void;

    subscribeForPaginatedData(datasourceIndex: number,
        pageLink: EntityDataPageLink,
        keyFilters: KeyFilter[]): Observable<any>;

    subscribeForAlarms(pageLink: AlarmDataPageLink,
        keyFilters: KeyFilter[]): void;
    subscribeForTotalAlarms(pageLink: AlarmDataPageLink,
        keyFilters: KeyFilter[]): void;

    isDataResolved(): boolean;

    destroy(): void;

    update(): void;

    updateCustomerList(customerList: Array<string>): void;

    [key: string]: any;
}

export class AlarmsDatasource {

    private alarmsSubject = new BehaviorSubject<AlarmDataInfo[]>([]);
    private pageDataSubject = new BehaviorSubject<PageData<AlarmDataInfo>>(emptyPageData<AlarmDataInfo>());

    // private selectionModeChanged = new EventEmitter<boolean>();

    // public selectionModeChanged$ = this.selectionModeChanged.asObservable();

    public dataLoading = true;

    private appliedPageLink: AlarmDataPageLink;
    private appliedSortOrderLabel: string;

    constructor(private subscription: IWidgetSubscription,
        private dataKeys: Array<DataKey>) {
    }

    loadAlarms(pageLink: AlarmDataPageLink, sortOrderLabel: string, keyFilters: KeyFilter[]) {
        this.dataLoading = true;
        this.appliedPageLink = pageLink;
        this.appliedSortOrderLabel = sortOrderLabel;
        this.subscription.subscribeForAlarms(pageLink, keyFilters);
    }

    updateAlarms() {
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

        const alarmsPageData: PageData<AlarmDataInfo> = {
            data: alarms,
            totalPages: subscriptionAlarms.totalPages,
            totalElements: subscriptionAlarms.totalElements,
            hasNext: subscriptionAlarms.hasNext
        };

        this.alarmsSubject.next(alarms);

        this.pageDataSubject.next(alarmsPageData);

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
            alarm[dataKey.label] = value;
        });
        return alarm;
    }

    total(): Observable<AlarmDataInfo[]> {
        return this.pageDataSubject.pipe(
            map((pageData) => pageData.data)
        );
    }

    // private onSelectionModeChanged(selectionMode: boolean) {
    //     this.selectionModeChanged.emit(selectionMode);
    // }
}