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
import { AliasController } from "@app/core/api/alias-controller";
import { selectAuthState, selectAuthUser } from "@app/core/auth/auth.selectors";
import { AppState } from "@app/core/core.state";
import { AdminService } from "@app/core/services/admin.service";
import { AlarmService } from "@app/core/services/alarm.service";
import { AuthService } from "@app/core/services/auth.service";
import { DashboardService } from "@app/core/services/dashboard.service";
import { DeviceService } from "@app/core/services/device.service";
import { EntityDataService } from "@app/core/services/entity-data.service";
import { EntityService } from "@app/core/services/entity.service";
import { UtilsService } from "@app/core/services/utils.service";
import { TelemetryWebsocketService } from "@app/core/ws/telemetry-websocket.service";
import { DashboardLayout } from "@components/dashboard-layout/dashboard-layout.component";
import { DashboardContext, DashboardPageScope } from "@components/dashboard-page/dashboard-page.models";
import { Authority } from "@models/authority.enum";
import { Dashboard, DashboardConfiguration } from "@models/dashboard.models";
import { NULL_UUID } from "@models/id/has-uuid";
import { PageLink } from "@models/page/page-link";
import { AggregationType } from "@models/public-api";
import { Store } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useStore } from "react-redux";

export declare type Data = {
    [name: string]: any;
};

export const AlarmCenter = () => {

    const authService = new AuthService();
    const utils = new UtilsService(window)

    const telemetryService = new TelemetryWebsocketService(authService)
    const alarmDataService = new AlarmDataService(telemetryService);
    const deviceService = new DeviceService();
    const entityDataService = new EntityDataService(telemetryService, utils);
    const dashboardService = new DashboardService();
    // const raf = new RafService();
    const adminService = new AdminService();
    const entityService = new EntityService()
    const alarmService = new AlarmService();

    let dashboard: Dashboard;
    let dashboardConfiguration: DashboardConfiguration;

    const store: Store<AppState> = useStore();
    const state: AppState = store.getState();
    let currentDashboardId: string;
    let currentMenuSectionPath: string;
    let currentCustomerId: string;
    let currentDashboardScope: DashboardPageScope;

    const [isLoading, setIsLoading] = useState(true)

    const [dashboardCtx, setDashboardCtx] = useState<DashboardContext>(
        null
    )
    // const dashboardCtx: DashboardContext = {
    //     instanceId: utils.guid(),
    //     getDashboard: () => dashboard,
    //     dashboardTimewindow: null,
    //     customerList: [NULL_UUID],
    //     state: null,
    //     stateController: null,
    //     aliasController: null,
    //     runChangeDetection: runChangeDetection.bind(this)
    // };

    useEffect(() => {
        const authUser = selectAuthUser(state)
        const pageLink = new PageLink(10000);
        let data: Data = {};
        console.log('start')


        if (authUser.authority == Authority.TENANT_ADMIN || authUser.authority == Authority.TENANT_USER) {
            dashboardService.getTenantDashboards(pageLink).subscribe(
                result => {
                    const targetDashboard = result.data.find(x => x.name == 'New Alarm Center');
                    if (targetDashboard && targetDashboard.configuration['reactDashboard']) {
                        data.currentDashboardId = targetDashboard.id.id;
                        dashboardService.getDashboard(targetDashboard.id.id).subscribe(
                            x => {
                                console.log(x)
                                data.dashboard = x
                                // data.breadcrumb = {
                                //     labelFunction: dashboardBreadcumbLabelFunction,
                                //     icon: 'dashboard'
                                // } as BreadCrumbConfig<DashboardPageComponent>,
                                data.auth = [Authority.TENANT_ADMIN, Authority.TENANT_USER, Authority.CUSTOMER_ADMIN, Authority.CUSTOMER_USER];
                                data.title = 'dashboard.dashboard';
                                data.widgetEditMode = false;
                                console.log(data)
                                init(data);

                            }
                        )
                    }
                }
            )
        }
        else if (authUser.authority === Authority.CUSTOMER_ADMIN || authUser.authority === Authority.CUSTOMER_USER) {
            dashboardService.getCustomerDashboards(authUser.customerId, pageLink).subscribe(
                result => {
                    if (result.data.find(x => x.name == 'New Alarm Center')) {
                        const targetDashboard = result.data.find(x => x.name == 'New Alarm Center');
                        if (targetDashboard && targetDashboard.configuration['reactDashboard']) {
                            data.currentDashboardId = targetDashboard.id.id;
                            dashboardService.getDashboard(targetDashboard.id.id).subscribe(
                                x => {
                                    data.dashboard = x
                                    // data.breadcrumb = {
                                    //     labelFunction: dashboardBreadcumbLabelFunction,
                                    //     icon: 'dashboard'
                                    // } as BreadCrumbConfig<DashboardPageComponent>,
                                    data.auth = [Authority.TENANT_ADMIN, Authority.TENANT_USER, Authority.CUSTOMER_ADMIN, Authority.CUSTOMER_USER];
                                    data.title = 'dashboard.dashboard';
                                    data.widgetEditMode = false;
                                    console.log(data)
                                    init(data);

                                }
                            )

                        }
                    }
                }
            )
        }

        console.log('end')

    }, [])


    const init = (data: any) => {
        reset();

        currentDashboardId = data.currentDashboardId;

        currentMenuSectionPath = window.location.pathname;
        if (currentMenuSectionPath == '/home') {
            currentMenuSectionPath = '/alarm-center';
        }
        // if (this.route.snapshot.params.customerId) {
        //     this.currentCustomerId = this.route.snapshot.params.customerId;
        //     this.currentDashboardScope = 'customer';
        // } else {
        //     this.currentDashboardScope = this.authUser.authority === Authority.TENANT_ADMIN ? 'tenant' : 'customer';
        //     this.currentCustomerId = this.authUser.customerId;
        // }


        dashboard = data.dashboard;
        dashboardConfiguration = dashboard.configuration;

        let dashboardCtxTemp: DashboardContext = {
            instanceId: utils.guid(),
            getDashboard: () => dashboard,
            dashboardTimewindow: null,
            customerList: [NULL_UUID],
            state: null,
            stateController: null,
            aliasController: null,
            runChangeDetection: runChangeDetection.bind(this)
        };


        dashboardCtxTemp.dashboardTimewindow = dashboardConfiguration.timewindow;
        dashboardCtxTemp.dashboardTimewindow.aggregation.type = AggregationType.NONE;
        dashboardCtxTemp.dashboardTimewindow.aggregation.limit = 25000;

        // layouts.main.layoutCtx.widgets = new LayoutWidgetsArray(this.dashboardCtx);
        // this.layouts.right.layoutCtx.widgets = new LayoutWidgetsArray(this.dashboardCtx);
        // this.widgetEditMode = data.widgetEditMode;
        // this.singlePageMode = data.singlePageMode;

        dashboardCtxTemp.aliasController = new AliasController(utils,
            entityService,
            alarmService,
            () => dashboardCtx.stateController,
            dashboardConfiguration.entityAliases,
            dashboardConfiguration.filters);


        console.log(dashboardCtxTemp)
        // if (widgetEditMode) {
        //     const message: WindowMessage = {
        //         type: 'widgetEditModeInited'
        //     };
        //     this.window.parent.postMessage(JSON.stringify(message), '*');
        // }
        // setIsLoading(false)
        setDashboardCtx(dashboardCtxTemp)

    }
    const reset = () => {
        dashboard = null;
        dashboardConfiguration = null;
        // prevDashboard = null;

        // widgetEditMode = false;
        // singlePageMode = false;
        // isFullscreen = false;
        // this.router.events.pipe(
        //   filter((event) => event instanceof RoutesRecognized),
        //   pairwise()
        // ).subscribe((event: any) => {
        //   if (event[0].url == '/device-table') {
        //     console.log('ss')
        //     this.isFullscreen = true;
        //     console.log(this.isFullscreen)
        //   } else {
        //     this.isFullscreen = false
        //   }
        //   console.log(event[0].url);
        // });
        // this.router.url == '/home' && this.authUser.authority == Authority.CUSTOMER_USER ? this.isFullscreen = true : this.isFullscreen = false;
        // this.isFullscreen = true;
        // isEdit = false;
        // isEditingWidget = false;
        // isEditingWidgetClosed = true;
        // forceDashboardMobileMode = false;
        // this.isAddingWidget = false;
        // this.isAddingWidgetClosed = true;

        // this.isToolbarOpened = false;
        // this.isToolbarOpenedAnimate = false;
        // this.isRightLayoutOpened = false;

        // this.editingWidget = null;
        // this.editingWidgetLayout = null;
        // this.editingWidgetOriginal = null;
        // this.editingWidgetLayoutOriginal = null;
        // this.editingWidgetSubtitle = null;
        // this.editingLayoutCtx = null;

        // this.currentDashboardId = null;
        // this.currentMenuSectionPath = null;
        // this.currentCustomerId = null;
        // this.currentDashboardScope = null;

        // this.dashboardCtx.state = null;

    }




    return (
        <div>
            alarm-center
            {dashboardCtx ?

                <DashboardLayout
                    dashboardCtx={dashboardCtx} />
                :
                null

            }
            {/* <DashboardLayout
                dashboardCtx={dashboardCtx} /> */}
        </div>
    )

}



const runChangeDetection = () => {
    /*setTimeout(() => {
      this.cd.detectChanges();
    });*/
}