/*
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { UtilsService } from "@app/core/services/utils.service";
import { deepClone } from "@app/core/utils";
import { Widget, WidgetActionDescriptor } from "@models/widget.models";
import { useEffect } from "react"

export const WidgetComponent = (props) => {

    const { isEdit, isMobile, dashboardWidget, alarmsDatasource, entityDatasource } = props
    const utils = new UtilsService(window);
    let loadingData: boolean;
    // let widgetContext: WidgetContext;
    let widget: Widget

    useEffect(() => {
        loadingData = true
        widget = dashboardWidget.widget;

        const actionDescriptorsBySourceId: { [actionSourceId: string]: Array<WidgetActionDescriptor> } = {};
        if (widget.config.actions) {
            for (const actionSourceId of Object.keys(widget.config.actions)) {
                const descriptors = widget.config.actions[actionSourceId];
                const actionDescriptors: Array<WidgetActionDescriptor> = [];
                descriptors.forEach((descriptor) => {
                    const actionDescriptor: WidgetActionDescriptor = deepClone(descriptor);
                    actionDescriptor.displayName = utils.customTranslation(descriptor.name, descriptor.name);
                    actionDescriptors.push(actionDescriptor);
                });
                actionDescriptorsBySourceId[actionSourceId] = actionDescriptors;
            }
        }


        // widgetContext = dashboardWidget.widgetContext;
        // widgetContext.changeDetector = cd;
        // widgetContext.ngZone = this.ngZone;
        // widgetContext.store = this.store;
        // widgetContext.servicesMap = ServicesMap;
        // widgetContext.isEdit = isEdit;
        // widgetContext.isMobile = isMobile;

    }, [])
}
