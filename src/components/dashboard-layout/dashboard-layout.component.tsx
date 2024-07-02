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

import { AuthService } from "@app/core/services/auth.service";
import { DashboardContext } from "@components/dashboard-page/dashboard-page.models";
import { Dashboard } from "@components/dashboard/dashboard.component";
import { useEffect } from "react";


export const DashboardLayout = (props: { dashboardCtx: DashboardContext }) => {
    const { dashboardCtx } = props
    let propsTest = {
        aliasController: dashboardCtx.aliasController,
        customerList: dashboardCtx.customerList,
        dashboardTimewindow: dashboardCtx.dashboardTimewindow

    }

    let authService = new AuthService();

    useEffect(() => {
        console.log(dashboardCtx)

    }, [])
    return (
        <div>
            dashboard_layout
            {dashboardCtx ?
                <Dashboard
                    aliasController={dashboardCtx.aliasController}
                    customerList={dashboardCtx.customerList}
                    dashboardTimewindow={dashboardCtx.dashboardTimewindow}
                    authService={authService}
                />
                : null
            }
        </div>
    )
}