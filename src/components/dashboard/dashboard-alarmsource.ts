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

import { DataKeyType } from "@models/telemetry/telemetry.models"

export const alarmSource = (entityAliasId: string) => {

    return {
        type: "entity",
        dataKeys: [
            {
                name: "createdTime",
                type: DataKeyType.alarm,
                label: "Created time",
                color: "#2196f3",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.021092237451093787
            },
            {
                name: "originator",
                type: DataKeyType.alarm,
                label: "Originator",
                color: "#4caf50",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.2780007688856758
            },
            {
                name: "label",
                type: DataKeyType.entityField,
                label: "Label",
                color: "#9c27b0",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.2780007688856158
            },
            {
                name: "type",
                type: DataKeyType.alarm,
                label: "Type",
                color: "#f44336",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7323586880398418
            },
            {
                name: "severity",
                type: DataKeyType.alarm,
                label: "Severity",
                color: "#ffc107",
                settings: {
                    "useCellStyleFunction": false,
                    "useCellContentFunction": false
                },
                "_hash": 0.09927019860088193
            },
            {
                name: "status",
                type: DataKeyType.alarm,
                label: "Status",
                color: "#607d8b",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                "_hash": 0.6588418951443418
            },
            {
                name: "location",
                type: DataKeyType.attribute,
                label: "location",
                color: "#607d8b",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                "_hash": 0.6518418951443418
            },
            {
                name: "type",
                type: DataKeyType.entityField,
                label: "Device type",
                color: "#607d8b",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                "_hash": 0.6518418951443418
            },
            {
                name: "customerId",
                type: DataKeyType.entityField,
                label: "customerId",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
        ],
        entityAliasId: entityAliasId,
        filterId: null,
        name: "alarms"
    }

}
