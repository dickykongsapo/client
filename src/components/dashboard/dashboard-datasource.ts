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

export const dataSource = (entityAliasId: string) => {
    return {
        type: "entity",
        dataKeys: [
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
                _hash: 0.2780007118856158
            },
            {
                name: "type",
                type: DataKeyType.entityField,
                label: "Type",
                color: "#4caf50",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.2549448094730742
            },
            {
                name: "lastActivityTime",
                type: DataKeyType.attribute,
                label: "lastActivityTime",
                color: "#f44336",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "active",
                type: DataKeyType.attribute,
                label: "active",
                color: "#ffc107",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.575494812839191
            },
            {
                name: "location",
                type: DataKeyType.attribute,
                label: "location",
                color: "#9c27b0",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.575494112839191
            },
            {
                name: "temp",
                type: DataKeyType.timeseries,
                label: "temp",
                color: "#607d8b",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.04132935281660921
            },
            {
                name: "RH",
                type: DataKeyType.timeseries,
                label: "RH",
                color: "#2196f3",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.5002197803743578
            },
            {
                name: "aqi_value",
                type: DataKeyType.timeseries,
                label: "aqi_value",
                color: "#8bc34a",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8808341679480414
            },
            {
                name: "co2_value",
                type: DataKeyType.timeseries,
                label: "co2_value",
                color: "#3f51b5",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8696424748618463
            },
            {
                name: "tvoc_value",
                type: DataKeyType.timeseries,
                label: "tvoc_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "pm10_value",
                type: DataKeyType.timeseries,
                label: "pm10_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "pm2p5_value",
                type: DataKeyType.timeseries,
                label: "pm2p5_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "pm1p0_value",
                type: DataKeyType.timeseries,
                label: "pm1p0_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "co_value",
                type: DataKeyType.timeseries,
                label: "co_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "co2_value",
                type: DataKeyType.timeseries,
                label: "co2_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "h2s_value",
                type: DataKeyType.timeseries,
                label: "h2s_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "nh3_value",
                type: DataKeyType.timeseries,
                label: "nh3_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "no2_value",
                type: DataKeyType.timeseries,
                label: "no2_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "o3_value",
                type: DataKeyType.timeseries,
                label: "o3_value",
                color: "#e91e63",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.0794494882500194
            },
            {
                name: "hcho_value",
                type: DataKeyType.timeseries,
                label: "hcho_value",
                color: "#92bbce",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8640756625737231
            },
            {
                name: "bat",
                type: DataKeyType.timeseries,
                label: "bat",
                color: "#ffeb3b",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.03311853123743824
            },
            {
                name: "leak",
                type: DataKeyType.timeseries,
                label: "leak",
                color: "#03a9f4",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.5530767576327784
            },
            {
                name: "db_value",
                type: DataKeyType.timeseries,
                label: "db_value",
                color: "#ff9800",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.4402698666417082
            },
            {
                name: "state",
                type: DataKeyType.timeseries,
                label: "state",
                color: "#673ab7",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8402698666417082
            },
            {
                name: "dist",
                type: DataKeyType.timeseries,
                label: "dist",
                color: "#00abfe",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8402699666417082
            },
            {
                name: "low_batt",
                type: DataKeyType.timeseries,
                label: "low_batt",
                color: "#00abfe",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8442699666417082
            },
            {
                name: "activeAlarm",
                type: DataKeyType.attribute,
                label: "activeAlarm",
                color: "#00abfe",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.8442299666417082
            },
            {
                name: "alertState",
                type: DataKeyType.attribute,
                label: "alertState",
                color: "#f41336",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "normalStateLabel",
                type: DataKeyType.attribute,
                label: "normalStateLabel",
                color: "#f44336",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "alertStateLabel",
                type: DataKeyType.attribute,
                label: "alertStateLabel",
                color: "#f44236",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "accXOAVelocity",
                type: DataKeyType.timeseries,
                label: "accXOAVelocity",
                color: "#f44136",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "accYOAVelocity",
                type: DataKeyType.timeseries,
                label: "accYOAVelocity",
                color: "#f44736",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "accZOAVelocity",
                type: DataKeyType.timeseries,
                label: "accZOAVelocity",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "sensorScenario",
                type: DataKeyType.attribute,
                label: "sensorScenario",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "pressure",
                type: DataKeyType.timeseries,
                label: "pressure",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "voltage",
                type: DataKeyType.timeseries,
                label: "voltage",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "reading",
                type: DataKeyType.timeseries,
                label: "reading",
                color: "#616161",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.9533898171720105
            },
            {
                name: "occupied",
                type: DataKeyType.timeseries,
                label: "occupied",
                color: "#616161",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.9533898171720225
            },
            {
                name: "open",
                type: DataKeyType.timeseries,
                label: "open",
                color: "#616161",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.9533898171111105
            },
            {
                name: "attn",
                type: DataKeyType.timeseries,
                label: "attn",
                color: "#616161",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.9533898172120105
            },
            {
                name: "count",
                type: DataKeyType.timeseries,
                label: "count",
                color: "#616161",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.9533812171720105
            },
            {
                name: "deviceProfileType",
                type: DataKeyType.entityField,
                label: "deviceProfileType",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591574406797321
            },
            {
                name: "in",
                type: DataKeyType.timeseries,
                label: "in",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591571106797321
            },
            {
                name: "out",
                type: DataKeyType.timeseries,
                label: "out",
                color: "#f44231",
                settings: {
                    "useCellStyleFunction": false,
                    "cellStyleFunction": "",
                    "useCellContentFunction": false,
                    "cellContentFunction": ""
                },
                _hash: 0.7591571106797321
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
