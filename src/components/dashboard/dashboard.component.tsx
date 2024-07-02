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

import { AlarmDataService } from "@app/core/api/alarm-data.service";
import { IAliasController, IStateController, IWidgetSubscription, WidgetSubscriptionContext, WidgetSubscriptionOptions } from "@app/core/api/widget-api-models";
import { AuthService } from "@app/core/services/auth.service";
import { DashboardService } from "@app/core/services/dashboard.service";
import { DeviceService } from "@app/core/services/device.service";
import { EntityDataService } from "@app/core/services/entity-data.service";
import { TimeService } from "@app/core/services/time.service"
import { UtilsService } from "@app/core/services/utils.service";
import { TelemetryWebsocketService } from "@app/core/ws/telemetry-websocket.service";
import { Timewindow } from "@models/time/time.models";
import { DataKey, Widget, WidgetPosition, widgetType } from "@models/widget.models";
import React, { useEffect } from "react"
import { distinct, forkJoin, Observable, ReplaySubject, Subject, Subscription } from "rxjs";
import { alarmSource } from "./dashboard-alarmsource";
import { dataSource } from "./dashboard-datasource";
import { AlarmsDatasource } from "@app/core/api/widget-alarm-datasource.model";
import { EntityDatasource } from "@app/core/api/widget-entity-datasource.models";
import { WidgetSubscription } from "@app/core/api/widget-subscription";
import { EntityColumn } from "@components/widget/lib/table-widget.models";
import { deepClone } from "@app/core/utils";
import { AlarmDataPageLink, dataKeyToEntityKey, dataKeyTypeToEntityKeyType, EntityDataPageLink, EntityKeyType, KeyFilter } from "@models/query/query.models";
import { DataKeyType, toHistoryTimewindow } from "@models/public-api";
import { Direction } from "@models/page/sort-order";
import { AdminService } from "@app/core/services/admin.service";
import { IDashboardComponent } from "@models/dashboard-component.model";
import { AliasController } from "@app/core/api/alias-controller";


interface DashboardProps {
    dashboardTimewindow: Timewindow,
    aliasController: IAliasController,
    customerList: string[],
    authService: AuthService
}


export class Dashboard extends React.Component<DashboardProps> implements IDashboardComponent {

    isMobileSize: boolean = false;
    mobileAutofillHeight: boolean = false;
    autofillHeight: boolean = false
    isEdit: boolean = false;
    dashboardTimewindow: Timewindow;
    aliasController: IAliasController;

    customerList: string[];
    stateController: IStateController;
    optionsChangeNotificationsPaused = false;

    alarmPageLink: AlarmDataPageLink = {
        page: 0,
        pageSize: 2147483647,
        textSearch: null,
        sortOrder: {
            direction: Direction.DESC,
            key: {
                key: 'createdTime',
                type: EntityKeyType.ALARM_FIELD
            }
        }
    };;


    entityPageLink: EntityDataPageLink = {
        page: 0,
        pageSize: 2147483647,
        textSearch: null,
        sortOrder: {
            direction: Direction.DESC,
            key: {
                key: 'name',
                type: EntityKeyType.ENTITY_FIELD
            }
        }
    }


    utils = new UtilsService(window)
    alarmsDatasource: AlarmsDatasource = null;
    entityDatasource: EntityDatasource = null;
    authService = null;
    telemetryService = new TelemetryWebsocketService(this.authService)
    alarmDataService = new AlarmDataService(this.telemetryService);
    deviceService = new DeviceService();
    entityDataService = new EntityDataService(this.telemetryService, this.utils);
    dashboardService = new DashboardService();
    adminService = new AdminService();

    subscriptionForForkJoin: Subscription;

    //Fake alarm subscription
    subForAlarm: IWidgetSubscription;
    subscriptionContextForAlarm: WidgetSubscriptionContext;

    //Fake Entity Subscription
    subForEntity: IWidgetSubscription;
    subscriptionContextForEntity: WidgetSubscriptionContext;

    originalDashboardTimewindow: Timewindow;

    dashboardTimewindowChangedSubject: Subject<Timewindow> = new ReplaySubject<Timewindow>();

    dashboardTimewindowChanged = this.dashboardTimewindowChangedSubject.asObservable().pipe(
        distinct()
    );

    customerListChangedSubject: Subject<Array<string>> = new ReplaySubject<Array<string>>();

    customerListChanged = this.customerListChangedSubject.asObservable().pipe(
        distinct()
    );


    constructor(props: DashboardProps) {
        super(props);

        console.log(props)
        this.dashboardTimewindow = props.dashboardTimewindow
        this.customerList = props.customerList
        this.aliasController = props.aliasController
        this.authService = props.authService

    }
    timeService = new TimeService()

    onUpdateTimewindow(startTimeMs: number, endTimeMs: number, interval?: number, persist?: boolean): void {
        // this.ngZone.run(() => {
        if (!this.originalDashboardTimewindow && !persist) {
            this.originalDashboardTimewindow = deepClone(this.dashboardTimewindow);
        }
        this.dashboardTimewindow = toHistoryTimewindow(this.dashboardTimewindow,
            startTimeMs, endTimeMs, interval, this.timeService);
        this.dashboardTimewindowChangedSubject.next(this.dashboardTimewindow);
        // });
    }

    onResetTimewindow(): void {
        // this.ngZone.run(() => {
        if (this.originalDashboardTimewindow) {
            this.dashboardTimewindow = deepClone(this.originalDashboardTimewindow);
            this.originalDashboardTimewindow = null;
            this.dashboardTimewindowChangedSubject.next(this.dashboardTimewindow);
        }
        // });
    }


    highlightWidget(widgetId: string, delay?: number) {
        // const highlighted = this.dashboardWidgets.highlightWidget(widgetId);
        // if (highlighted) {
        //   this.scrollToWidget(highlighted, delay);
        // }
    }


    resetHighlight() {
        // const highlighted = this.dashboardWidgets.resetHighlight();
        // if (highlighted) {
        //   setTimeout(() => {
        //     this.scrollToWidget(highlighted, 0);
        //   }, 0);
        // }
    }



    selectWidget(widgetId: string, delay?: number) {
        // const selected = this.dashboardWidgets.selectWidget(widgetId);
        // if (selected) {
        //   this.scrollToWidget(selected, delay);
        // }
    }


    getSelectedWidget() {
        // const dashboardWidget = this.dashboardWidgets.getSelectedWidget();
        // return dashboardWidget ? dashboardWidget.widget : null;
    }


    getEventGridPosition(event: Event): WidgetPosition {
        const pos: WidgetPosition = {
            row: 0,
            column: 0
        };
        // const parentElement = $(this.gridster.el);
        let pageX = 0;
        let pageY = 0;
        if (event instanceof MouseEvent) {
            pageX = event.pageX;
            pageY = event.pageY;
        }
        // const offset = parentElement.offset();
        // const x = pageX - offset.left + parentElement.scrollLeft();
        // const y = pageY - offset.top + parentElement.scrollTop();
        // pos.row = this.gridster.pixelsToPositionY(y, Math.floor);
        // pos.column = this.gridster.pixelsToPositionX(x, Math.floor);
        return pos;
    }

    notifyGridsterOptionsChanged() {
        // if (!this.optionsChangeNotificationsPaused) {
        //   if (this.gridster && this.gridster.options) {
        //     this.gridster.optionsChanged();
        //   }
        // }
    }


    pauseChangeNotifications() {
        this.optionsChangeNotificationsPaused = true;
    }

    resumeChangeNotifications() {
        this.optionsChangeNotificationsPaused = false;
    }

    notifyLayoutUpdated() {
        this.updateWidgetLayouts();
    }
    updateWidgetLayouts() {

        // this.dashboardWidgets.widgetLayoutsUpdated();

    }

    // componentDidMount() {
    //     console.log(this.props)
    //     let optionsForAlarm: WidgetSubscriptionOptions;
    //     optionsForAlarm = {
    //         type: widgetType.alarm,
    //         stateData: false,
    //         hasDataPageLink: true,
    //         singleEntity: false,
    //         warnOnPageDataOverflow: false,
    //         ignoreDataUpdateOnIntervalTick: false,
    //         comparisonEnabled: undefined,
    //         timeForComparison: undefined
    //     };
    //     optionsForAlarm.alarmSource = alarmSource(this.aliasController.getEntityAliasId('all'));
    //     const createAlarmSubscriptionSubject = new ReplaySubject<void>();

    //     let optionsForEntity: WidgetSubscriptionOptions;
    //     optionsForEntity = {
    //         type: widgetType.latest,
    //         stateData: false,
    //         hasDataPageLink: true,
    //         singleEntity: false,
    //         warnOnPageDataOverflow: false,
    //         ignoreDataUpdateOnIntervalTick: false,
    //         comparisonEnabled: undefined,
    //         timeForComparison: undefined,
    //     }
    //     optionsForEntity.datasources = [dataSource(this.aliasController.getEntityAliasId('all'))];



    //     optionsForAlarm.useDashboardTimewindow = true
    //     optionsForAlarm.displayTimewindow = true
    //     optionsForAlarm.legendConfig = null;
    //     optionsForAlarm.dashboardTimewindow = this.dashboardTimewindow
    //     optionsForAlarm.timeWindowConfig = this.dashboardTimewindow
    //     optionsForAlarm.customerList = this.customerList
    //     optionsForAlarm.units = ""
    //     optionsForAlarm.decimals = 2
    //     optionsForAlarm.callbacks = {
    //         onDataUpdated: () => {
    //             try {
    //                 this.alarmsDatasource.updateAlarms();
    //             } catch (e) { }
    //         }
    //     };
    //     this.subscriptionContextForAlarm = new WidgetSubscriptionContext(this)
    //     this.subscriptionContextForAlarm.alarmDataService = this.alarmDataService
    //     this.subscriptionContextForAlarm.deviceService = this.deviceService
    //     this.subscriptionContextForAlarm.entityDataService = this.entityDataService
    //     this.subscriptionContextForAlarm.getServerTimeDiff = this.dashboardService.getServerTimeDiff.bind(this.dashboardService)
    //     // this.subscriptionContextForAlarm.raf = this.raf
    //     this.subscriptionContextForAlarm.timeService = this.timeService
    //     // this.subscriptionContextForAlarm.translate = this.translate
    //     this.subscriptionContextForAlarm.utils = this.utils




    //     optionsForEntity.datasources = [dataSource(this.aliasController.getEntityAliasId('all'))];

    //     optionsForEntity.useDashboardTimewindow = true;
    //     optionsForEntity.displayTimewindow = true;
    //     optionsForEntity.legendConfig = null;
    //     optionsForEntity.dashboardTimewindow = this.dashboardTimewindow;
    //     optionsForEntity.timeWindowConfig = this.dashboardTimewindow;
    //     optionsForEntity.customerList = this.customerList
    //     optionsForEntity.units = ""
    //     optionsForEntity.decimals = 2;
    //     optionsForEntity.callbacks = {
    //         onDataUpdated: () => {
    //             try {
    //                 this.entityDatasource.dataUpdated();
    //             } catch (e) { }
    //         }
    //     };
    //     this.subscriptionContextForEntity = new WidgetSubscriptionContext(this)
    //     this.subscriptionContextForEntity.alarmDataService = this.alarmDataService
    //     this.subscriptionContextForEntity.deviceService = this.deviceService
    //     this.subscriptionContextForEntity.entityDataService = this.entityDataService
    //     this.subscriptionContextForEntity.getServerTimeDiff = this.dashboardService.getServerTimeDiff.bind(this.dashboardService)
    //     // subscriptionContextForEntity.raf = this.raf
    //     this.subscriptionContextForEntity.timeService = this.timeService
    //     this.subscriptionContextForEntity.utils = this.utils


    //     this.subscriptionForForkJoin = forkJoin(
    //         this.createSubscription(optionsForAlarm, this.subscriptionContextForAlarm),
    //         this.createSubscription(optionsForEntity, this.subscriptionContextForEntity)
    //     ).subscribe(
    //         ([alarmDatasourceSubscription, entityDatasourceSubscription]) => {
    //             this.subForAlarm = alarmDatasourceSubscription;
    //             this.buildDatasource(alarmDatasourceSubscription);

    //             this.subForEntity = entityDatasourceSubscription;
    //             this.buildDatasource(entityDatasourceSubscription);

    //             createAlarmSubscriptionSubject.next();
    //             createAlarmSubscriptionSubject.complete();
    //         }, err => {
    //             createAlarmSubscriptionSubject.error(err)
    //         }
    //     )
    // }


    private buildDatasource(subscription: IWidgetSubscription) {
        const latestDataKeys: Array<DataKey> = [];
        if (subscription.type == 'alarm') {

            if (subscription.alarmSource) {
                subscription.alarmSource.dataKeys.map((dataKey) => {
                    const entityColumn: EntityColumn = deepClone(dataKey) as EntityColumn;
                    entityColumn.entityKey = dataKeyToEntityKey(dataKey);
                    entityColumn.label = this.utils.customTranslation(entityColumn.label, entityColumn.label)
                    entityColumn.title = entityColumn.label;


                    if (dataKey.type !== DataKeyType.alarm) {
                        latestDataKeys.push(dataKey);
                    }
                })
            }
            this.alarmsDatasource = new AlarmsDatasource(subscription, latestDataKeys);
            const sortOrderLabel = 'Created time';
            const keyFilters: KeyFilter[] = null; // TODO:
            this.alarmsDatasource.loadAlarms(this.alarmPageLink, sortOrderLabel, keyFilters);
        } else if (subscription.type == 'latest') {
            if (subscription.options.datasources[0]) {
                subscription.options.datasources[0].dataKeys.map((dataKey) => {
                    const entityColumn: EntityColumn = deepClone(dataKey) as EntityColumn;
                    entityColumn.entityKey = dataKeyToEntityKey(dataKey);
                    entityColumn.label = this.utils.customTranslation(entityColumn.label, entityColumn.label)
                    entityColumn.title = entityColumn.label;

                    if (entityColumn.type === DataKeyType.function) {
                        entityColumn.name = entityColumn.label;
                    }
                    latestDataKeys.push(entityColumn);
                })
            }

            this.entityDatasource = new EntityDatasource(latestDataKeys, subscription, this.adminService)
            const sortOrderLabel = 'Name';
            const keyFilters: KeyFilter[] = null; // TODO:

            this.entityDatasource.loadEntities(this.entityPageLink, sortOrderLabel, keyFilters)
            this.entityDatasource.loadSensorScenario();
        }
    }


    private createSubscription(options: WidgetSubscriptionOptions, subscriptionContext: WidgetSubscriptionContext, customerList?: Array<string>, subscribe?: boolean): Observable<IWidgetSubscription> {
        const createSubscriptionSubject = new ReplaySubject<IWidgetSubscription>();
        const subscription: IWidgetSubscription = new WidgetSubscription(subscriptionContext, options, customerList);
        subscription.init$.subscribe(
            () => {
                if (subscribe) {
                    subscription.subscribe();
                }
                createSubscriptionSubject.next(subscription);
                createSubscriptionSubject.complete();
            },
            (err) => {
                createSubscriptionSubject.error(err);
            }
        );

        return createSubscriptionSubject.asObservable();
    }


    render() {
        return (
            <div>
                ddddd
            </div>
        )
    }

    // const { dashboardTimewindow, aliasController, customerList } = props;

}
// let timewindow;

// let alarmsDatasource: AlarmsDatasource = null;
// let entityDatasource: EntityDatasource = null;

// let subscriptionForForkJoin: Subscription;
// const authService = new AuthService();
// const utils = new UtilsService(window)

// const telemetryService = new TelemetryWebsocketService(authService)
// const alarmDataService = new AlarmDataService(telemetryService);
// const deviceService = new DeviceService();
// const entityDataService = new EntityDataService(telemetryService, utils);
// const dashboardService = new DashboardService();
// // const raf = new RafService();
// const adminService = new AdminService();

// //Fake alarm subscription
// let subForAlarm: IWidgetSubscription;
// let subscriptionContextForAlarm: WidgetSubscriptionContext;

// //Fake Entity Subscription
// let subForEntity: IWidgetSubscription;
// let subscriptionContextForEntity: WidgetSubscriptionContext;

// const alarmPageLink: AlarmDataPageLink = {
//     page: 0,
//     pageSize: 2147483647,
//     textSearch: null,
//     sortOrder: {
//         direction: Direction.DESC,
//         key: {
//             key: 'createdTime',
//             type: EntityKeyType.ALARM_FIELD
//         }
//     }
// };;


// const entityPageLink: EntityDataPageLink = {
//     page: 0,
//     pageSize: 2147483647,
//     textSearch: null,
//     sortOrder: {
//         direction: Direction.DESC,
//         key: {
//             key: 'name',
//             type: EntityKeyType.ENTITY_FIELD
//         }
//     }
// }





// useEffect(() => {
//     console.log(props)
//     if (!dashboardTimewindow) {
//         timewindow = timeService.defaultTimewindow();
//     }

//     let optionsForAlarm: WidgetSubscriptionOptions
//     optionsForAlarm = {
//         type: widgetType.alarm,
//         stateData: false,
//         hasDataPageLink: true,
//         singleEntity: false,
//         warnOnPageDataOverflow: false,
//         ignoreDataUpdateOnIntervalTick: false,
//         comparisonEnabled: undefined,
//         timeForComparison: undefined
//     };
//     optionsForAlarm.alarmSource = alarmSource(aliasController.getEntityAliasId('all'));

//     const createAlarmSubscriptionSubject = new ReplaySubject<void>();

//     optionsForAlarm.useDashboardTimewindow = true
//     optionsForAlarm.displayTimewindow = true
//     optionsForAlarm.legendConfig = null;
//     optionsForAlarm.dashboardTimewindow = dashboardTimewindow
//     optionsForAlarm.timeWindowConfig = dashboardTimewindow
//     optionsForAlarm.customerList = customerList
//     optionsForAlarm.units = ""
//     optionsForAlarm.decimals = 2
//     optionsForAlarm.callbacks = {
//         onDataUpdated: () => {
//             try {
//                 alarmsDatasource.updateAlarms();
//             } catch (e) { }
//         }
//     };
//     subscriptionContextForAlarm = new WidgetSubscriptionContext(this)
//     subscriptionContextForAlarm.alarmDataService = alarmDataService
//     subscriptionContextForAlarm.deviceService = deviceService
//     subscriptionContextForAlarm.entityDataService = entityDataService
//     subscriptionContextForAlarm.getServerTimeDiff = dashboardService.getServerTimeDiff.bind(dashboardService)
//     // subscriptionContextForAlarm.raf = raf
//     subscriptionContextForAlarm.timeService = timeService
//     subscriptionContextForAlarm.utils = utils


//     /////
//     let optionsForEntity: WidgetSubscriptionOptions;

//     optionsForEntity = {
//         type: widgetType.latest,
//         stateData: false,
//         hasDataPageLink: true,
//         singleEntity: false,
//         warnOnPageDataOverflow: false,
//         ignoreDataUpdateOnIntervalTick: false,
//         comparisonEnabled: undefined,
//         timeForComparison: undefined,
//     }

//     optionsForEntity.datasources = [dataSource(aliasController.getEntityAliasId('all'))];

//     optionsForEntity.useDashboardTimewindow = true;
//     optionsForEntity.displayTimewindow = true;
//     optionsForEntity.legendConfig = null;
//     optionsForEntity.dashboardTimewindow = dashboardTimewindow;
//     optionsForEntity.timeWindowConfig = dashboardTimewindow;
//     optionsForEntity.customerList = customerList
//     optionsForEntity.units = ""
//     optionsForEntity.decimals = 2;
//     optionsForEntity.callbacks = {
//         onDataUpdated: () => {
//             try {
//                 entityDatasource.dataUpdated();
//             } catch (e) { }
//         }
//     };
//     subscriptionContextForEntity = new WidgetSubscriptionContext(this)
//     subscriptionContextForEntity.alarmDataService = alarmDataService
//     subscriptionContextForEntity.deviceService = deviceService
//     subscriptionContextForEntity.entityDataService = entityDataService
//     subscriptionContextForEntity.getServerTimeDiff = dashboardService.getServerTimeDiff.bind(dashboardService)
//     // subscriptionContextForEntity.raf = this.raf
//     subscriptionContextForEntity.timeService = timeService
//     subscriptionContextForEntity.utils = utils


//     subscriptionForForkJoin = forkJoin(
//         createSubscription(optionsForAlarm, subscriptionContextForAlarm),
//         createSubscription(optionsForEntity, subscriptionContextForEntity)
//     ).subscribe(
//         ([alarmDatasourceSubscription, entityDatasourceSubscription]) => {
//             console.log(alarmDatasourceSubscription)
//             console.log(entityDatasourceSubscription)
//             subForAlarm = alarmDatasourceSubscription;
//             buildDatasource(alarmDatasourceSubscription);

//             subForEntity = entityDatasourceSubscription;
//             buildDatasource(entityDatasourceSubscription);

//             createAlarmSubscriptionSubject.next();
//             createAlarmSubscriptionSubject.complete();
//         }, err => {
//             createAlarmSubscriptionSubject.error(err)
//         }
//     )
// }, [])



// const buildDatasource = (subscription: IWidgetSubscription) => {
//     const latestDataKeys: Array<DataKey> = [];
//     if (subscription.type == 'alarm') {

//         if (subscription.alarmSource) {
//             subscription.alarmSource.dataKeys.map((dataKey) => {
//                 const entityColumn: EntityColumn = deepClone(dataKey) as EntityColumn;
//                 entityColumn.entityKey = dataKeyToEntityKey(dataKey);
//                 entityColumn.label = utils.customTranslation(entityColumn.label, entityColumn.label)
//                 entityColumn.title = entityColumn.label;


//                 if (dataKey.type !== DataKeyType.alarm) {
//                     latestDataKeys.push(dataKey);
//                 }
//             })
//         }
//         alarmsDatasource = new AlarmsDatasource(subscription, latestDataKeys);
//         const sortOrderLabel = 'Created time';
//         const keyFilters: KeyFilter[] = null; // TODO:
//         alarmsDatasource.loadAlarms(alarmPageLink, sortOrderLabel, keyFilters);
//     } else if (subscription.type == 'latest') {
//         if (subscription.options.datasources[0]) {
//             subscription.options.datasources[0].dataKeys.map((dataKey) => {
//                 const entityColumn: EntityColumn = deepClone(dataKey) as EntityColumn;
//                 entityColumn.entityKey = dataKeyToEntityKey(dataKey);
//                 entityColumn.label = utils.customTranslation(entityColumn.label, entityColumn.label)
//                 entityColumn.title = entityColumn.label;

//                 if (entityColumn.type === DataKeyType.function) {
//                     entityColumn.name = entityColumn.label;
//                 }
//                 latestDataKeys.push(entityColumn);
//             })
//         }

//         entityDatasource = new EntityDatasource(latestDataKeys, subscription, adminService)
//         const sortOrderLabel = 'Name';
//         const keyFilters: KeyFilter[] = null; // TODO:

//         entityDatasource.loadEntities(entityPageLink, sortOrderLabel, keyFilters)
//         entityDatasource.loadSensorScenario();
//     }
// }


// const createSubscription = (options: WidgetSubscriptionOptions, subscriptionContext: WidgetSubscriptionContext, customerList?: Array<string>, subscribe?: boolean): Observable<IWidgetSubscription> => {
//     const createSubscriptionSubject = new ReplaySubject<IWidgetSubscription>();
//     const subscription: IWidgetSubscription = new WidgetSubscription(subscriptionContext, options, customerList);
//     subscription.init$.subscribe(
//         () => {
//             if (subscribe) {
//                 subscription.subscribe();
//             }
//             createSubscriptionSubject.next(subscription);
//             createSubscriptionSubject.complete();
//         },
//         (err) => {
//             createSubscriptionSubject.error(err);
//         }
//     );

//     return createSubscriptionSubject.asObservable();
// }
// return (
//     <div>
//         dashboard
//     </div>
// )
// }