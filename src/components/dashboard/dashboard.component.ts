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
import { IAliasController, IWidgetSubscription, WidgetSubscriptionContext, WidgetSubscriptionOptions } from "@app/core/api/widget-api-models";
import { AuthService } from "@app/core/services/auth.service";
import { DashboardService } from "@app/core/services/dashboard.service";
import { DeviceService } from "@app/core/services/device.service";
import { EntityDataService } from "@app/core/services/entity-data.service";
import { TimeService } from "@app/core/services/time.service"
import { UtilsService } from "@app/core/services/utils.service";
import { TelemetryWebsocketService } from "@app/core/ws/telemetry-websocket.service";
import { Timewindow } from "@models/time/time.models";
import { widgetType } from "@models/widget.models";
import { useEffect } from "react"
import { forkJoin, ReplaySubject } from "rxjs";
import { alarmSource } from "./dashboard-alarmsource";
import { dataSource } from "./dashboard-datasource";
import { AlarmsDatasource } from "@app/core/api/widget-alarm-datasource.model";
import { EntityDatasource } from "@app/core/api/widget-entity-datasource.models";


interface DashboardProps {
    dashboardTimewindow: Timewindow,
    aliasController: IAliasController,
    customerList: string[]
}


const Dashboard = (props: DashboardProps) => {
    const timeService = new TimeService()
    const { dashboardTimewindow, aliasController, customerList } = props;
    let timewindow;

    let alarmsDatasource: AlarmsDatasource = null;
    let entityDatasource: EntityDatasource = null;

    const authService = new AuthService();
    const utilsService = new UtilsService(window)
    const telemetryService = new TelemetryWebsocketService(authService)
    const alarmDataService = new AlarmDataService(telemetryService);
    const deviceService = new DeviceService();
    const entityDataService = new EntityDataService(telemetryService, utilsService);
    const dashboardService = new DashboardService();
    // const raf = new RafService();
    const utils = new UtilsService(window)

    //Fake alarm subscription
    let subForAlarm: IWidgetSubscription;
    let subscriptionContextForAlarm: WidgetSubscriptionContext;

    //Fake Entity Subscription
    let subForEntity: IWidgetSubscription;
    let subscriptionContextForEntity: WidgetSubscriptionContext;

    useEffect(() => {
        (async () => {
            if (!dashboardTimewindow) {
                timewindow = timeService.defaultTimewindow();
            }

            let optionsForAlarm: WidgetSubscriptionOptions
            optionsForAlarm = {
                type: widgetType.alarm,
                stateData: false,
                hasDataPageLink: true,
                singleEntity: false,
                warnOnPageDataOverflow: false,
                ignoreDataUpdateOnIntervalTick: false,
                comparisonEnabled: undefined,
                timeForComparison: undefined
            };
            optionsForAlarm.alarmSource = alarmSource(aliasController.getEntityAliasId('all'));

            const createAlarmSubscriptionSubject = new ReplaySubject();

            optionsForAlarm.useDashboardTimewindow = true
            optionsForAlarm.displayTimewindow = true
            optionsForAlarm.legendConfig = null;
            optionsForAlarm.dashboardTimewindow = dashboardTimewindow
            optionsForAlarm.timeWindowConfig = dashboardTimewindow
            optionsForAlarm.customerList = customerList
            optionsForAlarm.units = ""
            optionsForAlarm.decimals = 2
            optionsForAlarm.callbacks = {
                onDataUpdated: () => {
                    try {
                        alarmsDatasource.updateAlarms();
                    } catch (e) { }
                }
            };
            subscriptionContextForAlarm = new WidgetSubscriptionContext(this)
            subscriptionContextForAlarm.alarmDataService = alarmDataService
            subscriptionContextForAlarm.deviceService = deviceService
            subscriptionContextForAlarm.entityDataService = entityDataService
            subscriptionContextForAlarm.getServerTimeDiff = dashboardService.getServerTimeDiff.bind(dashboardService)
            // subscriptionContextForAlarm.raf = raf
            subscriptionContextForAlarm.timeService = timeService
            subscriptionContextForAlarm.utils = utils


            /////
            let optionsForEntity: WidgetSubscriptionOptions;

            optionsForEntity = {
                type: widgetType.latest,
                stateData: false,
                hasDataPageLink: true,
                singleEntity: false,
                warnOnPageDataOverflow: false,
                ignoreDataUpdateOnIntervalTick: false,
                comparisonEnabled: undefined,
                timeForComparison: undefined,
            }

            optionsForEntity.datasources = [dataSource(aliasController.getEntityAliasId('all'))];

            optionsForEntity.useDashboardTimewindow = true;
            optionsForEntity.displayTimewindow = true;
            optionsForEntity.legendConfig = null;
            optionsForEntity.dashboardTimewindow = dashboardTimewindow;
            optionsForEntity.timeWindowConfig = dashboardTimewindow;
            optionsForEntity.customerList = customerList
            optionsForEntity.units = ""
            optionsForEntity.decimals = 2;
            optionsForEntity.callbacks = {
                onDataUpdated: () => {
                    try {
                        entityDatasource.dataUpdated();
                    } catch (e) { }
                }
            };
            subscriptionContextForEntity = new WidgetSubscriptionContext(this)
            subscriptionContextForEntity.alarmDataService = alarmDataService
            subscriptionContextForEntity.deviceService = deviceService
            subscriptionContextForEntity.entityDataService = entityDataService
            subscriptionContextForEntity.getServerTimeDiff = dashboardService.getServerTimeDiff.bind(dashboardService)
            // subscriptionContextForEntity.raf = this.raf
            subscriptionContextForEntity.timeService = timeService
            subscriptionContextForEntity.utils = utils


            // subscriptionForForkJoin = forkJoin(
            //     createSubscription(optionsForAlarm, subscriptionContextForAlarm),
            //     createSubscription(optionsForEntity, subscriptionContextForEntity)
            //   ).subscribe(
            //     ([alarmDatasourceSubscription, entityDatasourceSubscription]) => {
            //       this.subForAlarm = alarmDatasourceSubscription;
            //       this.buildDatasource(alarmDatasourceSubscription);

            //       this.subForEntity = entityDatasourceSubscription;
            //       this.buildDatasource(entityDatasourceSubscription);

            //       createAlarmSubscriptionSubject.next();
            //       createAlarmSubscriptionSubject.complete();
            //     }, err => {
            //       createAlarmSubscriptionSubject.error(err)
            //     }
            //   )

        })
    })
}