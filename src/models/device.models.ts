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

import { BaseData } from './base-data';
import { DeviceId } from './id/device-id';
import { TenantId } from './id/tenant-id';
import { CustomerId } from './id/customer-id';
import { DeviceCredentialsId } from './id/device-credentials-id';
import { EntitySearchQuery } from './relation.models';
import { DeviceProfileId } from './id/device-profile-id';
import { RuleChainId } from './id/rule-chain-id';
import { EntityInfoData } from './entity.models';
import { KeyFilter } from './query/query.models';
import { TimeUnit } from './public-api';
import _moment from 'moment';
import moment_ from 'moment';
import { PayloadDecoderId } from './id/payload-decoder-id';

export enum DeviceProfileType {
    DEFAULT = 'DEFAULT',
    LRS10701 = 'LRS10701',
    LRS10701_CHIRPSTACK = 'LRS10701_CHIRPSTACK',
    LRS20100 = 'LRS20100',
    LRS20100_CHIRPSTACK = 'LRS20100_CHIRPSTACK',
    LRS20200 = 'LRS20200',
    LRS20200_CHIRPSTACK = 'LRS20200_CHIRPSTACK',
    LRS20310 = 'LRS20310',
    LRS20310_CHIRPSTACK = 'LRS20310_CHIRPSTACK',
    LRS20600 = 'LRS20600',
    LRS20600_CHIRPSTACK = 'LRS20600_CHIRPSTACK',
    LRS20LD0 = 'LRS20LD0',
    LRS20LD0_CHIRPSTACK = 'LRS20LD0_CHIRPSTACK',
    LRS20U00 = 'LRS20U00',
    LRS20U00_CHIRPSTACK = 'LRS20U00_CHIRPSTACK',
    LRS20UD0 = 'LRS20UD0',
    LRS20UD0_CHIRPSTACK = 'LRS20UD0_CHIRPSTACK',
    LRS2M001_4P3P = 'LRS2M001_4P3P',
    LRS2M001_4P3P_CHIRPSTACK = 'LRS2M001_4P3P_CHIRPSTACK',
    LRS2M001_6000 = 'LRS2M001_6000',
    LRS2M001_6000_CHIRPSTACK = 'LRS2M001_6000_CHIRPSTACK',
    LRS2M001_BTDP = 'LRS2M001_BTDP',
    LRS2M001_BTDP_CHIRPSTACK = 'LRS2M001_BTDP_CHIRPSTACK',
    SEN10701 = 'SEN10701',
    SEN20100 = 'SEN20100',
    SEN20200 = 'SEN20200',
    SEN20310 = 'SEN20310',
    SEN20600 = 'SEN20600',
    SEN20LD0 = 'SEN20LD0',
    SEN20U00 = 'SEN20U00',
    SEN20UD0 = 'SEN20UD0',
    SEN2M401_PXXX = 'SEN2M401_PXXX',
    SEN2M401_PSXX = 'SEN2M401_PSXX',
    SEN2M401_SLXX = 'SEN2M401_SLXX',
    SEN2M601_00XX = 'SEN2M601_00XX',
    SEN2M601_TL00 = 'SEN2M601_TL00',
    SEN2MBT1_00XX = 'SEN2MBT1_00XX',
    NANO_S = 'NANO_S',
    NANO_S_D = 'NANO_S_D',
    NANO_S_P = 'NANO_S_P',
    I_SENSOR = 'I_SENSOR',
    WISE_2410_CHIRPSTACK = 'WISE_2410_CHIRPSTACK',
    DF520_CHIRPSTACK = 'DF520_CHIRPSTACK',
    LY_W1000 = 'LY_W1000',
    EM310_CHIRPSTACK = 'EM310_CHIRPSTACK',
    VS121 = 'VS121',
    R718Y = 'R718Y',
    PFLOW_F3CL_F3RO_SENSO8_LORA = 'PFLOW_F3CL_F3RO_SENSO8_LORA',
    AN_204A_CHIRPSTACK = 'AN_204A_CHIRPSTACK',
    F_W208_A3220_00_CHIRPSTACK = 'F_W208_A3220_00_CHIRPSTACK',
    P_W208_A4820_00_CHIRPSTACK = 'P_W208_A4820_00_CHIRPSTACK',
    BOAT_IMAGE_RECOGNITION_SENSOR = 'BOAT_IMAGE_RECOGNITION_SENSOR',
    BOAT_OIL_LEVEL_SENSOR = 'BOAT_OIL_LEVEL_SENSOR',
    BOAT_POWER_METER = 'BOAT_POWER_METER',
    BOAT_THERMAL_SENSOR = 'BOAT_THERMAL_SENSOR',
    LORIOT = 'LORIOT',
}

//for React Widget
export enum DeviceProfileTypeForReactWidget {
    DEFAULT = 'DEFAULT',
    LRS10701 = 'LRS10701',
    LRS10701_CHIRPSTACK = 'LRS10701 (ChirpStack)',
    LRS20100 = 'LRS20100',
    LRS20100_CHIRPSTACK = 'LRS20100 (ChirpStack)',
    LRS20200 = 'LRS20200',
    LRS20200_CHIRPSTACK = 'LRS20200 (ChirpStack)',
    LRS20310 = 'LRS20310',
    LRS20310_CHIRPSTACK = 'LRS20310 (ChirpStack)',
    LRS20600 = 'LRS20600',
    LRS20600_CHIRPSTACK = 'LRS20600 (ChirpStack)',
    LRS20LD0 = 'LRS20LD0',
    LRS20LD0_CHIRPSTACK = 'LRS20LD0 (ChirpStack)',
    LRS20U00 = 'LRS20U00',
    LRS20U00_CHIRPSTACK = 'LRS20U00 (ChirpStack)',
    LRS20UD0 = 'LRS20UD0',
    LRS20UD0_CHIRPSTACK = 'LRS20UD0 (ChirpStack)',
    LRS2M001_4P3P = 'LRS2M001-4P3P',
    LRS2M001_4P3P_CHIRPSTACK = 'LRS2M001-4P3P (ChirpStack)',
    LRS2M001_6000 = 'LRS2M001-6000',
    LRS2M001_6000_CHIRPSTACK = 'LRS2M001-6000 (ChirpStack)',
    LRS2M001_BTDP = 'LRS2M001-BTDP',
    LRS2M001_BTDP_CHIRPSTACK = 'LRS2M001-BTDP (ChirpStack)',
    SEN10701 = 'SEN10701',
    SEN20100 = 'SEN20100',
    SEN20200 = 'SEN20200',
    SEN20310 = 'SEN20310',
    SEN20600 = 'SEN20600',
    SEN20LD0 = 'SEN20LD0',
    SEN20U00 = 'SEN20U00',
    SEN20UD0 = 'SEN20UD0',
    SEN2M401_PXXX = 'SEN2M401-PXXX',
    SEN2M401_PSXX = 'SEN2M401_PSXX',
    SEN2M401_SLXX = 'SEN2M401-SLXX',
    SEN2M601_00XX = 'SEN2M601-00XX',
    SEN2M601_TL00 = 'SEN2M601-TL00',
    SEN2MBT1_00XX = 'SEN2MBT1-00XX',
    NANO_S = 'nano S',
    NANO_S_D = 'nano S-D',
    NANO_S_P = 'nano S-P',
    I_SENSOR = 'i sensor',
    WISE_2410_CHIRPSTACK = 'Advantech WISE-2410 (ChirpStack)',
    DF520_CHIRPSTACK = 'CNDINGTEK DF520 (ChirpStack)',
    LY_W1000 = 'LANGYANG LY-W1000',
    EM310_CHIRPSTACK = 'Milesight EM310-UDL (ChirpStack)',
    VS121 = 'Milesight VS121',
    R718Y = 'Netvox R718Y',
    PFLOW_F3CL_F3RO_SENSO8_LORA = 'pFlow F3CL/F3RO (SENSO8 LoRa)',
    AN_204A_CHIRPSTACK = 'WINEXT AN-204A (ChirpStack)',
    F_W208_A3220_00_CHIRPSTACK = 'LT-CG-S/F-W208-A3220-00 (ChirpStack)',
    P_W208_A4820_00_CHIRPSTACK = 'LT-CG-S/P-W208-A4820-00 (ChirpStack)',
    BOAT_IMAGE_RECOGNITION_SENSOR = 'BOAT Meter Reader',
    BOAT_OIL_LEVEL_SENSOR = 'BOAT Oil Level Sensor',
    BOAT_POWER_METER = 'BOAT Power Meter',
    BOAT_THERMAL_SENSOR = 'BOAT Thermal Sensor'
}



export enum DeviceTransportType {
    DEFAULT = 'DEFAULT',
    MQTT = 'MQTT',
    // LWM2M = 'LWM2M'
    COAP = 'COAP'
}

export enum TransportPayloadType {
    JSON = 'JSON',
    PROTOBUF = 'PROTOBUF'
}

export enum CoapTransportDeviceType {
    DEFAULT = 'DEFAULT',
    EFENTO = 'EFENTO'
}

export enum DeviceProvisionType {
    DISABLED = 'DISABLED',
    ALLOW_CREATE_NEW_DEVICES = 'ALLOW_CREATE_NEW_DEVICES',
    CHECK_PRE_PROVISIONED_DEVICES = 'CHECK_PRE_PROVISIONED_DEVICES'
}

export const telemetryTranslations = new Map<string, string>(
    [
        ['RH', 'device.telemetryList.rh'],
        ['temp', 'device.telemetryList.temp'],
        ['bat', 'device.telemetryList.bat'],
        ['aqi_value', 'device.telemetryList.aqi'],
        ['co_value', 'device.telemetryList.co'],
        ['co2_value', 'device.telemetryList.co2'],
        ['h2s_value', 'device.telemetryList.h2s'],
        ['hcho_value', 'device.telemetryList.hcho'],
        ['nh3_value', 'device.telemetryList.nh3'],
        ['no2_value', 'device.telemetryList.no2'],
        ['pm1p0_value', 'device.telemetryList.pm1p0'],
        ['pm2p5_value', 'device.telemetryList.pm2p5'],
        ['pm10_value', 'device.telemetryList.pm10'],
        ['o3_value', 'device.telemetryList.o3'],
        ['tvoc_value', 'device.telemetryList.tvoc'],
        ['voltage', 'device.telemetryList.voltage'],
        ['current', 'device.telemetryList.current'],
        ['dist', 'device.telemetryList.dist'],
        ['leak', 'device.telemetryList.leak'],
        ['LVL', 'device.telemetryList.lvl'],
        ['state', 'device.telemetryList.state'],
        ['state_for_occupancy', 'device.telemetryList.occupancy-state'],
        ['pressure', 'device.telemetryList.pressure'],
        ['reading', 'device.telemetryList.reading'],
        ['flow_rate', 'device.telemetryList.flow-rate'],
        ['return_temp', 'device.telemetryList.return-temp'],
        ['supply_temp', 'device.telemetryList.supply-temp'],
        ['occupied', 'device.telemetryList.occupied'],
        ['open', 'device.telemetryList.open'],
        ['attn', 'device.telemetryList.attn'],
        ['count', 'device.telemetryList.count'],
        ['flow_hour_1', 'device.telemetryList.flow-hour-1'],
        ['velocity_1', 'device.telemetryList.velocity-1'],
        ['flow_hour_2', 'device.telemetryList.flow-hour-2'],
        ['velocity_2', 'device.telemetryList.velocity-2'],
        ['flow_hour_3', 'device.telemetryList.flow-hour-3'],
        ['velocity_3', 'device.telemetryList.velocity-3'],
    ]
);
export interface DeviceConfigurationFormInfo {
    hasProfileConfiguration: boolean;
    hasDeviceConfiguration: boolean;
}

export const deviceProfileTypeTranslationMap = new Map<DeviceProfileType, string>(
    [
        [DeviceProfileType.DEFAULT, 'device-profile.type-default'],
        [DeviceProfileType.LRS10701, 'device-profile.type-lrs10701'],
        [DeviceProfileType.LRS10701_CHIRPSTACK, 'device-profile.type-lrs10701-chirpstack'],
        [DeviceProfileType.LRS20100, 'device-profile.type-lrs20100'],
        [DeviceProfileType.LRS20100_CHIRPSTACK, 'device-profile.type-lrs20100-chirpstack'],
        [DeviceProfileType.LRS20200, 'device-profile.type-lrs20200'],
        [DeviceProfileType.LRS20200_CHIRPSTACK, 'device-profile.type-lrs20200-chirpstack'],
        [DeviceProfileType.LRS20310, 'device-profile.type-lrs20310'],
        [DeviceProfileType.LRS20310_CHIRPSTACK, 'device-profile.type-lrs20310-chirpstack'],
        [DeviceProfileType.LRS20600, 'device-profile.type-lrs20600'],
        [DeviceProfileType.LRS20600_CHIRPSTACK, 'device-profile.type-lrs20600-chirpstack'],
        [DeviceProfileType.LRS20LD0, 'device-profile.type-lrs20ld0'],
        [DeviceProfileType.LRS20LD0_CHIRPSTACK, 'device-profile.type-lrs20ld0-chirpstack'],
        [DeviceProfileType.LRS20U00, 'device-profile.type-lrs20u00'],
        [DeviceProfileType.LRS20U00_CHIRPSTACK, 'device-profile.type-lrs20u00-chirpstack'],
        [DeviceProfileType.LRS20UD0, 'device-profile.type-lrs20ud0'],
        [DeviceProfileType.LRS20UD0_CHIRPSTACK, 'device-profile.type-lrs20ud0-chirpstack'],
        [DeviceProfileType.LRS2M001_4P3P, 'device-profile.type-lrs2m001-4p3p'],
        [DeviceProfileType.LRS2M001_4P3P_CHIRPSTACK, 'device-profile.type-lrs2m001-4p3p-chirpstack'],
        [DeviceProfileType.LRS2M001_6000, 'device-profile.type-lrs2m001-6000'],
        [DeviceProfileType.LRS2M001_6000_CHIRPSTACK, 'device-profile.type-lrs2m001-6000-chirpstack'],
        [DeviceProfileType.LRS2M001_BTDP, 'device-profile.type-lrs2m001-btdp'],
        [DeviceProfileType.LRS2M001_BTDP_CHIRPSTACK, 'device-profile.type-lrs2m001-btdp-chirpstack'],
        [DeviceProfileType.SEN10701, 'device-profile.type-sen10701'],
        [DeviceProfileType.SEN20100, 'device-profile.type-sen20100'],
        [DeviceProfileType.SEN20200, 'device-profile.type-sen20200'],
        [DeviceProfileType.SEN20310, 'device-profile.type-sen20310'],
        [DeviceProfileType.SEN20600, 'device-profile.type-sen20600'],
        [DeviceProfileType.SEN20LD0, 'device-profile.type-sen20ld0'],
        [DeviceProfileType.SEN20U00, 'device-profile.type-sen20u00'],
        [DeviceProfileType.SEN20UD0, 'device-profile.type-sen20ud0'],
        [DeviceProfileType.SEN2M401_PXXX, 'device-profile.type-sen2m401-pxxx'],
        [DeviceProfileType.SEN2M401_SLXX, 'device-profile.type-sen2m401-slxx'],
        [DeviceProfileType.SEN2M601_00XX, 'device-profile.type-sen2m601-00xx'],
        [DeviceProfileType.SEN2M601_TL00, 'device-profile.type-sen2m601-tl00'],
        [DeviceProfileType.SEN2MBT1_00XX, 'device-profile.type-sen2mbt1-00xx'],
        [DeviceProfileType.NANO_S, 'device-profile.type-nano-s'],
        [DeviceProfileType.NANO_S_D, 'device-profile.type-nano-s-d'],
        [DeviceProfileType.NANO_S_P, 'device-profile.type-nano-s-p'],
        [DeviceProfileType.I_SENSOR, 'device-profile.type-i-sensor'],
        [DeviceProfileType.AN_204A_CHIRPSTACK, 'device-profile.type-an-204a-chirpstack'],
        [DeviceProfileType.BOAT_IMAGE_RECOGNITION_SENSOR, 'device-profile.type-boat-image-recognition-sensor'],
        [DeviceProfileType.BOAT_OIL_LEVEL_SENSOR, 'device-profile.type-boat-oil-level-sensor'],
        [DeviceProfileType.BOAT_POWER_METER, 'device-profile.type-boat-power-meter'],
        [DeviceProfileType.BOAT_THERMAL_SENSOR, 'device-profile.type-boat-thermal-sensor'],
        [DeviceProfileType.DF520_CHIRPSTACK, 'device-profile.type-df520-chirpstack'],
        [DeviceProfileType.EM310_CHIRPSTACK, 'device-profile.type-em310-chirpstack'],
        [DeviceProfileType.VS121, 'device-profile.type-vs121'],
        [DeviceProfileType.F_W208_A3220_00_CHIRPSTACK, 'device-profile.type-f-w208-a3220-00-chirpstack'],
        [DeviceProfileType.LORIOT, 'device-profile.type-loriot'],
        [DeviceProfileType.P_W208_A4820_00_CHIRPSTACK, 'device-profile.type-p-w208-a4820-00-chirpstack'],
        [DeviceProfileType.WISE_2410_CHIRPSTACK, 'device-profile.type-wise-2410-chirpstack'],
        [DeviceProfileType.LY_W1000, 'device-profile.type-ly-w1000'],
        [DeviceProfileType.R718Y, 'device-profile.type-r718y'],
        [DeviceProfileType.PFLOW_F3CL_F3RO_SENSO8_LORA, 'device-profile.type-pflow-f3cl-f3ro-senso8-lora']
    ]
);

export const deviceProfileTypeConfigurationInfoMap = new Map<DeviceProfileType, DeviceConfigurationFormInfo>(
    [
        [
            DeviceProfileType.DEFAULT,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS10701,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS10701_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20100,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20100_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20200,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20200_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20310,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20310_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20600,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20600_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20LD0,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20LD0_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20U00,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20U00_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20UD0,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS20UD0_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_4P3P,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_4P3P_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_6000,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_6000_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_BTDP,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LRS2M001_BTDP_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.F_W208_A3220_00_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN10701,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20100,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20200,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20310,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20600,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20LD0,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20U00,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN20UD0,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN2M401_PXXX,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN2M401_SLXX,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN2M601_00XX,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN2MBT1_00XX,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.NANO_S,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.NANO_S_D,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.NANO_S_P,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.I_SENSOR,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.AN_204A_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.BOAT_IMAGE_RECOGNITION_SENSOR,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.BOAT_OIL_LEVEL_SENSOR,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.BOAT_POWER_METER,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.BOAT_THERMAL_SENSOR,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.DF520_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.EM310_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.VS121,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.LORIOT,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.P_W208_A4820_00_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ],
        [
            DeviceProfileType.WISE_2410_CHIRPSTACK,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.LY_W1000,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.R718Y,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.SEN2M601_TL00,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceProfileType.PFLOW_F3CL_F3RO_SENSO8_LORA,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false
            }
        ]
    ]
);

export const deviceTransportTypeTranslationMap = new Map<DeviceTransportType, string>(
    [
        [DeviceTransportType.DEFAULT, 'device-profile.transport-type-default'],
        [DeviceTransportType.MQTT, 'device-profile.transport-type-mqtt'],
        // [DeviceTransportType.LWM2M, 'device-profile.transport-type-lwm2m']
        [DeviceTransportType.COAP, 'device-profile.transport-type-coap']
    ]
);


export const deviceProvisionTypeTranslationMap = new Map<DeviceProvisionType, string>(
    [
        [DeviceProvisionType.DISABLED, 'device-profile.provision-strategy-disabled'],
        [DeviceProvisionType.ALLOW_CREATE_NEW_DEVICES, 'device-profile.provision-strategy-created-new'],
        [DeviceProvisionType.CHECK_PRE_PROVISIONED_DEVICES, 'device-profile.provision-strategy-check-pre-provisioned']
    ]
);

export const deviceTransportTypeHintMap = new Map<DeviceTransportType, string>(
    [
        [DeviceTransportType.DEFAULT, 'device-profile.transport-type-default-hint'],
        [DeviceTransportType.MQTT, 'device-profile.transport-type-mqtt-hint'],
        // [DeviceTransportType.LWM2M, 'device-profile.transport-type-lwm2m-hint']
        [DeviceTransportType.COAP, 'device-profile.transport-type-coap-hint']
    ]
);

export const transportPayloadTypeTranslationMap = new Map<TransportPayloadType, string>(
    [
        [TransportPayloadType.JSON, 'device-profile.transport-device-payload-type-json'],
        [TransportPayloadType.PROTOBUF, 'device-profile.transport-device-payload-type-proto']
    ]
);

export const defaultTelemetrySchema =
    'syntax ="proto3";\n' +
    'package telemetry;\n' +
    '\n' +
    'message SensorDataReading {\n' +
    '\n' +
    '  double temperature = 1;\n' +
    '  double humidity = 2;\n' +
    '  InnerObject innerObject = 3;\n' +
    '\n' +
    '  message InnerObject {\n' +
    '    string key1 = 1;\n' +
    '    bool key2 = 2;\n' +
    '    double key3 = 3;\n' +
    '    int32 key4 = 4;\n' +
    '    string key5 = 5;\n' +
    '  }\n' +
    '}\n';

export const defaultAttributesSchema =
    'syntax ="proto3";\n' +
    'package attributes;\n' +
    '\n' +
    'message SensorConfiguration {\n' +
    '  string firmwareVersion = 1;\n' +
    '  string serialNumber = 2;\n' +
    '}';

export const defaultDownlinkSchema =
    'syntax ="proto3";\n' +
    'package downlink;\n' +
    '\n' +
    'message SensorConfiguration {\n' +
    '  string firmwareVersion = 1;\n' +
    '  string serialNumber = 2;\n' +
    '}';

export const coapDeviceTypeTranslationMap = new Map<CoapTransportDeviceType, string>(
    [
        [CoapTransportDeviceType.DEFAULT, 'device-profile.coap-device-type-default'],
        [CoapTransportDeviceType.EFENTO, 'device-profile.coap-device-type-efento']
    ]
);

export const deviceTransportTypeConfigurationInfoMap = new Map<DeviceTransportType, DeviceConfigurationFormInfo>(
    [
        [
            DeviceTransportType.DEFAULT,
            {
                hasProfileConfiguration: false,
                hasDeviceConfiguration: false,
            }
        ],
        [
            DeviceTransportType.MQTT,
            {
                hasProfileConfiguration: true,
                hasDeviceConfiguration: false,
            }
        ],
        /*[
          DeviceTransportType.LWM2M,
          {
            hasProfileConfiguration: true,
            hasDeviceConfiguration: false,
          }
        ]*/
        [
            DeviceTransportType.COAP,
            {
                hasProfileConfiguration: true,
                hasDeviceConfiguration: false,
            }
        ]
    ]
);

export interface DefaultDeviceProfileConfiguration {
    [key: string]: any;
}

export type DeviceProfileConfigurations = DefaultDeviceProfileConfiguration;

export interface DeviceProfileConfiguration extends DeviceProfileConfigurations {
    type: DeviceProfileType;
}

export interface DefaultDeviceProfileTransportConfiguration {
    [key: string]: any;
}

export interface MqttDeviceProfileTransportConfiguration {
    deviceTelemetryTopic?: string;
    deviceAttributesTopic?: string;
    deviceDownlinkTopic?: string;
    transportPayloadTypeConfiguration?: {
        transportPayloadType?: TransportPayloadType;
    };
    [key: string]: any;
}

export interface CoapDeviceProfileTransportConfiguration {
    coapDeviceTypeConfiguration?: {
        coapDeviceType?: CoapTransportDeviceType;
        transportPayloadTypeConfiguration?: {
            transportPayloadType?: TransportPayloadType;
            [key: string]: any;
        };
    };
}

export interface Lwm2mDeviceProfileTransportConfiguration {
    [key: string]: any;
}

export type DeviceProfileTransportConfigurations = DefaultDeviceProfileTransportConfiguration &
    MqttDeviceProfileTransportConfiguration &
    CoapDeviceProfileTransportConfiguration &
    Lwm2mDeviceProfileTransportConfiguration;

export interface DeviceProfileTransportConfiguration extends DeviceProfileTransportConfigurations {
    type: DeviceTransportType;
}

export interface DeviceProvisionConfiguration {
    type: DeviceProvisionType;
    provisionDeviceSecret?: string;
    provisionDeviceKey?: string;
}

export function createDeviceProfileConfiguration(type: DeviceProfileType): DeviceProfileConfiguration {
    let configuration: DeviceProfileConfiguration = null;
    if (type) {
        const defaultConfiguration: DefaultDeviceProfileConfiguration = {};
        configuration = { ...defaultConfiguration, type: type };
    }
    return configuration;
}

export function createDeviceConfiguration(type: DeviceProfileType): DeviceConfiguration {
    let configuration: DeviceConfiguration = null;
    if (type) {
        switch (type) {
            case DeviceProfileType.DEFAULT:
                const defaultConfiguration: DefaultDeviceConfiguration = {};
                configuration = { ...defaultConfiguration, type: DeviceProfileType.DEFAULT };
                break;
        }
    }
    return configuration;
}

export function createDeviceProfileTransportConfiguration(type: DeviceTransportType): DeviceProfileTransportConfiguration {
    let transportConfiguration: DeviceProfileTransportConfiguration = null;
    if (type) {
        switch (type) {
            case DeviceTransportType.DEFAULT:
                const defaultTransportConfiguration: DefaultDeviceProfileTransportConfiguration = {};
                transportConfiguration = { ...defaultTransportConfiguration, type: DeviceTransportType.DEFAULT };
                break;
            case DeviceTransportType.MQTT:
                const mqttTransportConfiguration: MqttDeviceProfileTransportConfiguration = {
                    deviceTelemetryTopic: 'v1/devices/me/telemetry',
                    deviceAttributesTopic: 'v1/devices/me/attributes',
                    deviceDownlinkTopic: 'v1/devices/me/downlink',
                    transportPayloadTypeConfiguration: { transportPayloadType: TransportPayloadType.JSON }
                };
                transportConfiguration = { ...mqttTransportConfiguration, type: DeviceTransportType.MQTT };
                break;
            /*case DeviceTransportType.LWM2M:
              const lwm2mTransportConfiguration: Lwm2mDeviceProfileTransportConfiguration = {};
              transportConfiguration = {...lwm2mTransportConfiguration, type: DeviceTransportType.LWM2M};
              break;*/
            case DeviceTransportType.COAP:
                const coapTransportConfiguration: CoapDeviceProfileTransportConfiguration = {
                    coapDeviceTypeConfiguration: { coapDeviceType: CoapTransportDeviceType.DEFAULT, transportPayloadTypeConfiguration: { transportPayloadType: TransportPayloadType.JSON } }
                };
                transportConfiguration = { ...coapTransportConfiguration, type: DeviceTransportType.COAP };
                break;
        }
    }
    return transportConfiguration;
}

export function createDeviceTransportConfiguration(type: DeviceTransportType): DeviceTransportConfiguration {
    let transportConfiguration: DeviceTransportConfiguration = null;
    if (type) {
        switch (type) {
            case DeviceTransportType.DEFAULT:
                const defaultTransportConfiguration: DefaultDeviceTransportConfiguration = {};
                transportConfiguration = { ...defaultTransportConfiguration, type: DeviceTransportType.DEFAULT };
                break;
            case DeviceTransportType.MQTT:
                const mqttTransportConfiguration: MqttDeviceTransportConfiguration = {};
                transportConfiguration = { ...mqttTransportConfiguration, type: DeviceTransportType.MQTT };
                break;
            /* case DeviceTransportType.LWM2M:
              const lwm2mTransportConfiguration: Lwm2mDeviceTransportConfiguration = {};
              transportConfiguration = {...lwm2mTransportConfiguration, type: DeviceTransportType.LWM2M};
              break;*/
            case DeviceTransportType.COAP:
                const coapTransportConfiguration: CoapDeviceTransportConfiguration = {};
                transportConfiguration = { ...coapTransportConfiguration, type: DeviceTransportType.COAP };
                break;
        }
    }
    return transportConfiguration;
}

export enum AlarmConditionType {
    SIMPLE = 'SIMPLE',
    DURATION = 'DURATION',
    REPEATING = 'REPEATING'
}

export const AlarmConditionTypeTranslationMap = new Map<AlarmConditionType, string>(
    [
        [AlarmConditionType.SIMPLE, 'device-profile.condition-type-simple'],
        [AlarmConditionType.DURATION, 'device-profile.condition-type-duration'],
        [AlarmConditionType.REPEATING, 'device-profile.condition-type-repeating']
    ]
);

export interface AlarmConditionSpec {
    type?: AlarmConditionType;
    unit?: TimeUnit;
    value?: number;
    count?: number;
}

export interface AlarmCondition {
    condition: Array<KeyFilter>;
    spec?: AlarmConditionSpec;
}

export enum AlarmScheduleType {
    ANY_TIME = 'ANY_TIME',
    SPECIFIC_TIME = 'SPECIFIC_TIME',
    CUSTOM = 'CUSTOM'
}

export const AlarmScheduleTypeTranslationMap = new Map<AlarmScheduleType, string>(
    [
        [AlarmScheduleType.ANY_TIME, 'device-profile.schedule-any-time'],
        [AlarmScheduleType.SPECIFIC_TIME, 'device-profile.schedule-specific-time'],
        [AlarmScheduleType.CUSTOM, 'device-profile.schedule-custom']
    ]
);

export interface AlarmSchedule {
    type: AlarmScheduleType;
    timezone?: string;
    daysOfWeek?: number[];
    startsOn?: number;
    endsOn?: number;
    items?: CustomTimeSchedulerItem[];
}

export interface CustomTimeSchedulerItem {
    enabled: boolean;
    dayOfWeek: number;
    startsOn: number;
    endsOn: number;
}

export interface AlarmRule {
    condition: AlarmCondition;
    alarmDetails?: string;
    schedule?: AlarmSchedule;
}

//   export function alarmRuleValidator(control: AbstractControl): ValidationErrors | null {
//     const alarmRule: AlarmRule = control.value;
//     return alarmRuleValid(alarmRule) ? null : { alarmRule: true };
//   }

function alarmRuleValid(alarmRule: AlarmRule): boolean {
    if (!alarmRule || !alarmRule.condition || !alarmRule.condition.condition || !alarmRule.condition.condition.length) {
        return false;
    }
    return true;
}

export interface DeviceProfileAlarm {
    id: string;
    alarmType: string;
    createRules: { [severity: string]: AlarmRule };
    clearRule?: AlarmRule;
    propagate?: boolean;
    propagateRelationTypes?: Array<string>;
}

export interface DeviceAlarm {
    id: string;
    alarmType: string;
    createRules: { [severity: string]: AlarmRule };
    clearRule?: AlarmRule;
    propagate?: boolean;
    propagateRelationTypes?: Array<string>;
}

//   export function deviceProfileAlarmValidator(control: AbstractControl): ValidationErrors | null {
//     const deviceProfileAlarm: DeviceProfileAlarm = control.value;
//     if (deviceProfileAlarm && deviceProfileAlarm.id && deviceProfileAlarm.alarmType &&
//       deviceProfileAlarm.createRules) {
//       const severities = Object.keys(deviceProfileAlarm.createRules);
//       if (severities.length) {
//         let alarmRulesValid = true;
//         for (const severity of severities) {
//           const alarmRule = deviceProfileAlarm.createRules[severity];
//           if (!alarmRuleValid(alarmRule)) {
//             alarmRulesValid = false;
//             break;
//           }
//         }
//         if (alarmRulesValid) {
//           if (deviceProfileAlarm.clearRule && !alarmRuleValid(deviceProfileAlarm.clearRule)) {
//             alarmRulesValid = false;
//           }
//         }
//         if (alarmRulesValid) {
//           return null;
//         }
//       }
//     }
//     return { deviceProfileAlarm: true };
//   }

//   export function deviceAlarmValidator(control: AbstractControl): ValidationErrors | null {
//     const deviceAlarm: DeviceAlarm = control.value;
//     if (deviceAlarm && deviceAlarm.id && deviceAlarm.alarmType &&
//       deviceAlarm.createRules) {
//       const severities = Object.keys(deviceAlarm.createRules);
//       if (severities.length) {
//         let alarmRulesValid = true;
//         for (const severity of severities) {
//           const alarmRule = deviceAlarm.createRules[severity];
//           if (!alarmRuleValid(alarmRule)) {
//             alarmRulesValid = false;
//             break;
//           }
//         }
//         if (alarmRulesValid) {
//           if (deviceAlarm.clearRule && !alarmRuleValid(deviceAlarm.clearRule)) {
//             alarmRulesValid = false;
//           }
//         }
//         if (alarmRulesValid) {
//           return null;
//         }
//       }
//     }
//     return { deviceAlarm: true };
//   }


export interface DeviceProfileData {
    configuration: DeviceProfileConfiguration;
    transportConfiguration: DeviceProfileTransportConfiguration;
    alarms?: Array<DeviceProfileAlarm>;
    provisionConfiguration?: DeviceProvisionConfiguration;
}

export interface DeviceAlarmData {
    alarms?: Array<DeviceAlarm>;
    enable?: Boolean;
}

export interface DeviceProfile extends BaseData<DeviceProfileId> {
    tenantId?: TenantId;
    name: string;
    description?: string;
    default?: boolean;
    type: DeviceProfileType;
    transportType: DeviceTransportType;
    provisionType: DeviceProvisionType;
    provisionDeviceKey?: string;
    defaultRuleChainId?: RuleChainId;
    defaultPayloadDecoderId?: PayloadDecoderId;
    defaultQueueName?: string;
    profileData: DeviceProfileData;
}

export interface DeviceProfileInfo extends EntityInfoData {
    type: DeviceProfileType;
    transportType: DeviceTransportType;
}

export interface DefaultDeviceConfiguration {
    [key: string]: any;
}

export type DeviceConfigurations = DefaultDeviceConfiguration;

export interface DeviceConfiguration extends DeviceConfigurations {
    type: DeviceProfileType;
}

export interface DefaultDeviceTransportConfiguration {
    [key: string]: any;
}

export interface MqttDeviceTransportConfiguration {
    [key: string]: any;
}

export interface CoapDeviceTransportConfiguration {
    [key: string]: any;
}

export interface Lwm2mDeviceTransportConfiguration {
    [key: string]: any;
}

export type DeviceTransportConfigurations = DefaultDeviceTransportConfiguration &
    MqttDeviceTransportConfiguration &
    CoapDeviceTransportConfiguration &
    Lwm2mDeviceTransportConfiguration;

export interface DeviceTransportConfiguration extends DeviceTransportConfigurations {
    type: DeviceTransportType;
}

export interface DeviceData {
    configuration: DeviceConfiguration;
    transportConfiguration: DeviceTransportConfiguration;
}

export interface Device extends BaseData<DeviceId> {
    tenantId?: TenantId;
    customerId?: CustomerId;
    name: string;
    type: string;
    label: string;
    deviceProfileId?: DeviceProfileId;
    deviceData?: DeviceData;
    additionalInfo?: any;
    deviceAlarmData?: DeviceAlarmData
}

export interface DeviceInfo extends Device {
    customerTitle: string;
    customerIsPublic: boolean;
    deviceProfileName: string;
    deviceProfileType: DeviceProfileType;
}

export enum DeviceCredentialsType {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    X509_CERTIFICATE = 'X509_CERTIFICATE',
    MQTT_BASIC = 'MQTT_BASIC'
}

export const credentialTypeNames = new Map<DeviceCredentialsType, string>(
    [
        [DeviceCredentialsType.ACCESS_TOKEN, 'Access token'],
        [DeviceCredentialsType.X509_CERTIFICATE, 'MQTT X.509'],
        [DeviceCredentialsType.MQTT_BASIC, 'MQTT Basic']
    ]
);

export interface DeviceCredentials extends BaseData<DeviceCredentialsId> {
    deviceId: DeviceId;
    credentialsType: DeviceCredentialsType;
    credentialsId: string;
    credentialsValue: string;
}

export interface DeviceCredentialMQTTBasic {
    clientId: string;
    userName: string;
    password: string;
}

export interface DeviceSearchQuery extends EntitySearchQuery {
    deviceTypes: Array<string>;
}

export interface ClaimRequest {
    secretKey: string;
}

export enum ClaimResponse {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
    CLAIMED = 'CLAIMED'
}

export interface ClaimResult {
    device: Device;
    response: ClaimResponse;
}

export const dayOfWeekTranslations = new Array<string>(
    'device-profile.schedule-day.monday',
    'device-profile.schedule-day.tuesday',
    'device-profile.schedule-day.wednesday',
    'device-profile.schedule-day.thursday',
    'device-profile.schedule-day.friday',
    'device-profile.schedule-day.saturday',
    'device-profile.schedule-day.sunday'
);

export function getDayString(day: number): string {
    switch (day) {
        case 0:
            return 'device-profile.schedule-day.monday';
        case 1:
            return this.translate.instant('device-profile.schedule-day.tuesday');
        case 2:
            return this.translate.instant('device-profile.schedule-day.wednesday');
        case 3:
            return this.translate.instant('device-profile.schedule-day.thursday');
        case 4:
            return this.translate.instant('device-profile.schedule-day.friday');
        case 5:
            return this.translate.instant('device-profile.schedule-day.saturday');
        case 6:
            return this.translate.instant('device-profile.schedule-day.sunday');
    }
}

export function timeOfDayToUTCTimestamp(date: Date | number): number {
    if (typeof date === 'number' || date === null) {
        return 0;
    }
    return _moment.utc([1970, 0, 1, date.getHours(), date.getMinutes(), date.getSeconds(), 0]).valueOf();
}

export function utcTimestampToTimeOfDay(time = 0): Date {
    return new Date(time + new Date(time).getTimezoneOffset() * 60 * 1000);
}

function timeOfDayToMoment(date: Date | number): _moment.Moment {
    if (typeof date === 'number' || date === null) {
        return _moment([1970, 0, 1, 0, 0, 0, 0]);
    }
    return _moment([1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0]);
}

export function getAlarmScheduleRangeText(startsOn: Date | number, endsOn: Date | number): string {
    const start = timeOfDayToMoment(startsOn);
    const end = timeOfDayToMoment(endsOn);
    if (start < end) {
        return `<span><span class="nowrap">${start.format('hh:mm A')}</span> – <span class="nowrap">${end.format('hh:mm A')}</span></span>`;
    } else if (start.valueOf() === 0 && end.valueOf() === 0 || start.isSame(_moment([1970, 0])) && end.isSame(_moment([1970, 0]))) {
        return '<span><span class="nowrap">12:00 AM</span> – <span class="nowrap">12:00 PM</span></span>';
    }
    return `<span><span class="nowrap">12:00 AM</span> – <span class="nowrap">${end.format('hh:mm A')}</span>` +
        ` and <span class="nowrap">${start.format('hh:mm A')}</span> – <span class="nowrap">12:00 PM</span></span>`;
}
