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

import { DeviceProfileTypeForReactWidget } from '@models/device.models';

export enum Senso8DeviceType {
    All,
    IAQ,
    TH,
    TEMPERATURE,
    WATER_LEAK,
    OPEN_CLOSE,
    ANALOG_INPUT,
    POWER_METER,
    RS485_GATEWAY,
    SOIL_MOISTURE,
    SOUND_LEVEL,
    DRY_CONTACT,
    BLE_NBIOT_GATEWAY,
    DISTANCE,
    I_SENSOR,
    VIBRATION,
    PRESSURE,
    VOLTAGE,
    UNKNOWN,
    OCR,
    OCCUPANCY,
    PEOPLE_COUNT,
    WATER_FLOW
}

export const senso8DeviceTypesTranslationMap = new Map<Senso8DeviceType, string>(
    [
        [Senso8DeviceType.All, 'device.senso8.all'],
        [Senso8DeviceType.IAQ, 'device.senso8.iaq'],
        [Senso8DeviceType.TH, 'device.senso8.th'],
        [Senso8DeviceType.TEMPERATURE, 'device.senso8.temperature'],
        [Senso8DeviceType.WATER_LEAK, 'device.senso8.water-leak'],
        [Senso8DeviceType.OPEN_CLOSE, 'device.senso8.open-close'],
        [Senso8DeviceType.ANALOG_INPUT, 'device.senso8.analog-input'],
        [Senso8DeviceType.POWER_METER, 'device.senso8.power-meter'],
        [Senso8DeviceType.RS485_GATEWAY, 'device.senso8.rs485-gateway'],
        [Senso8DeviceType.SOIL_MOISTURE, 'device.senso8.soil-moisture'],
        [Senso8DeviceType.SOUND_LEVEL, 'device.senso8.sound-level'],
        [Senso8DeviceType.DRY_CONTACT, 'device.senso8.dry-contact'],
        [Senso8DeviceType.BLE_NBIOT_GATEWAY, 'device.senso8.ble-nbiot-gateway'],
        [Senso8DeviceType.DISTANCE, 'device.senso8.distance'],
        [Senso8DeviceType.I_SENSOR, 'device.senso8.i-sensor'],
        [Senso8DeviceType.VIBRATION, 'device.senso8.vibration'],
        [Senso8DeviceType.PRESSURE, 'device.senso8.pressure'],
        [Senso8DeviceType.VOLTAGE, 'device.senso8.voltage'],
        [Senso8DeviceType.OCR, 'device.senso8.ocr'],
        [Senso8DeviceType.OCCUPANCY, 'device.senso8.occupancy'],
        [Senso8DeviceType.PEOPLE_COUNT, 'device.senso8.people-count'],
        [Senso8DeviceType.WATER_FLOW, 'device.senso8.water-flow'],
        [Senso8DeviceType.UNKNOWN, 'device.senso8.unknown']
    ]
);

// export function getDeviceType(deviceProfileType: DeviceProfileType): Senso8DeviceType {
//   switch (deviceProfileType) {
//     case DeviceProfileType.SEN10701:
//     case DeviceProfileType.LRS10701:
//       return Senso8DeviceType.IAQ;
//     case DeviceProfileType.SEN20100:
//     case DeviceProfileType.LRS20100:
//       return Senso8DeviceType.TH;
//     case DeviceProfileType.SEN20200:
//       return Senso8DeviceType.TEMPERATURE;
//     case DeviceProfileType.SEN20310:
//     case DeviceProfileType.LRS20310:
//       return Senso8DeviceType.WATER_LEAK;
//     case DeviceProfileType.SEN20600:
//     case DeviceProfileType.LRS20600:
//       return Senso8DeviceType.OPEN_CLOSE;
//     // case 'SEN2M6A1-00D1':
//     // case 'SEN2M6A1-0000'
//     //   return Senso8DeviceType.ANALOG_INPUT;
//     // case 'SEN2M201-00D1':
//     // case 'SEN2M201-0000':
//     //   return Senso8DeviceType.TEMPERATURE;
//     case DeviceProfileType.SEN2M401_PXXX:
//       return Senso8DeviceType.POWER_METER;
//     // case 'SEN2M401-0000':
//     // case 'SEN2M401-00D1':
//     //   return Senso8DeviceType.RS485_GATEWAY;
//     case DeviceProfileType.SEN2M401_SLXX:
//       return Senso8DeviceType.SOUND_LEVEL;
//     case DeviceProfileType.SEN2M601_00XX:
//       return Senso8DeviceType.DRY_CONTACT;
//     case DeviceProfileType.SEN2MBT1_00XX:
//       return Senso8DeviceType.BLE_NBIOT_GATEWAY;
//     case DeviceProfileType.NANO_S:
//       return Senso8DeviceType.TH;
//     case DeviceProfileType.NANO_S_D:
//       return Senso8DeviceType.DISTANCE;
//     case DeviceProfileType.I_SENSOR:
//       return Senso8DeviceType.I_SENSOR;
//     default:
//       return Senso8DeviceType.UNKNOWN;
//   }
// }

export function getDeviceType(deviceProfileType: DeviceProfileTypeForReactWidget): Senso8DeviceType {
    switch (deviceProfileType) {
        case DeviceProfileTypeForReactWidget.SEN10701:
        case DeviceProfileTypeForReactWidget.LRS10701:
        case DeviceProfileTypeForReactWidget.LRS10701_CHIRPSTACK:
            return Senso8DeviceType.IAQ;
        case DeviceProfileTypeForReactWidget.SEN20100:
        case DeviceProfileTypeForReactWidget.LRS20100:
        case DeviceProfileTypeForReactWidget.LRS20100_CHIRPSTACK:
            return Senso8DeviceType.TH;
        case DeviceProfileTypeForReactWidget.LRS20200:
        case DeviceProfileTypeForReactWidget.LRS20200_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.SEN20200:
        case DeviceProfileTypeForReactWidget.BOAT_THERMAL_SENSOR:
            return Senso8DeviceType.TEMPERATURE;
        case DeviceProfileTypeForReactWidget.SEN20310:
        case DeviceProfileTypeForReactWidget.LRS20310:
        case DeviceProfileTypeForReactWidget.LRS20310_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.AN_204A_CHIRPSTACK:
            return Senso8DeviceType.WATER_LEAK;
        case DeviceProfileTypeForReactWidget.SEN20600:
            return Senso8DeviceType.OPEN_CLOSE;
        // case 'SEN2M6A1-00D1':
        // case 'SEN2M6A1-0000'
        //   return Senso8DeviceType.ANALOG_INPUT;
        // case 'SEN2M201-00D1':
        // case 'SEN2M201-0000':
        //   return Senso8DeviceType.TEMPERATURE;
        case DeviceProfileTypeForReactWidget.LRS2M001_4P3P:
        case DeviceProfileTypeForReactWidget.LRS2M001_4P3P_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.SEN2M401_PXXX:
        case DeviceProfileTypeForReactWidget.BOAT_POWER_METER:
            return Senso8DeviceType.POWER_METER;
        // case 'SEN2M401-0000':
        // case 'SEN2M401-00D1':
        //   return Senso8DeviceType.RS485_GATEWAY;
        case DeviceProfileTypeForReactWidget.SEN2M401_SLXX:
            return Senso8DeviceType.SOUND_LEVEL;
        case DeviceProfileTypeForReactWidget.SEN2M601_00XX:
        case DeviceProfileTypeForReactWidget.LRS20600_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.LRS20600:
        case DeviceProfileTypeForReactWidget.LRS2M001_6000:
        case DeviceProfileTypeForReactWidget.LRS2M001_6000_CHIRPSTACK:
            return Senso8DeviceType.DRY_CONTACT;
        case DeviceProfileTypeForReactWidget.SEN2MBT1_00XX:
            return Senso8DeviceType.BLE_NBIOT_GATEWAY;
        case DeviceProfileTypeForReactWidget.NANO_S:
            return Senso8DeviceType.TH;
        case DeviceProfileTypeForReactWidget.LRS20LD0:
        case DeviceProfileTypeForReactWidget.LRS20LD0_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.LRS20U00:
        case DeviceProfileTypeForReactWidget.LRS20U00_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.LRS20UD0:
        case DeviceProfileTypeForReactWidget.LRS20UD0_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.SEN20LD0:
        case DeviceProfileTypeForReactWidget.SEN20U00:
        case DeviceProfileTypeForReactWidget.SEN20UD0:
        case DeviceProfileTypeForReactWidget.NANO_S_D:
        case DeviceProfileTypeForReactWidget.NANO_S_P:
        case DeviceProfileTypeForReactWidget.EM310_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.BOAT_OIL_LEVEL_SENSOR:
        case DeviceProfileTypeForReactWidget.DF520_CHIRPSTACK:
            return Senso8DeviceType.DISTANCE;
        case DeviceProfileTypeForReactWidget.I_SENSOR:
            return Senso8DeviceType.I_SENSOR;
        case DeviceProfileTypeForReactWidget.WISE_2410_CHIRPSTACK:
            return Senso8DeviceType.VIBRATION;
        case DeviceProfileTypeForReactWidget.F_W208_A3220_00_CHIRPSTACK:
        case DeviceProfileTypeForReactWidget.R718Y:
            return Senso8DeviceType.PRESSURE;
        case DeviceProfileTypeForReactWidget.P_W208_A4820_00_CHIRPSTACK:
            return Senso8DeviceType.VOLTAGE;
        case DeviceProfileTypeForReactWidget.BOAT_IMAGE_RECOGNITION_SENSOR:
        case DeviceProfileTypeForReactWidget.LY_W1000:
            return Senso8DeviceType.OCR;
        case DeviceProfileTypeForReactWidget.SEN2M601_TL00:
            return Senso8DeviceType.OCCUPANCY;
        case DeviceProfileTypeForReactWidget.VS121:
            return Senso8DeviceType.PEOPLE_COUNT;
        case DeviceProfileTypeForReactWidget.PFLOW_F3CL_F3RO_SENSO8_LORA:
            return Senso8DeviceType.WATER_FLOW;
        default:
            return Senso8DeviceType.UNKNOWN;
    }
}

export const senso8DeviceIconMap = new Map<Senso8DeviceType, string>(
    [
        [Senso8DeviceType.TEMPERATURE, '01_temp.svg'],
        [Senso8DeviceType.TH, '02_temp_humidity.svg'],
        [Senso8DeviceType.WATER_LEAK, '03_water_leakage.svg'],
        [Senso8DeviceType.SOIL_MOISTURE, '03_water_leakage.svg'],
        [Senso8DeviceType.OPEN_CLOSE, '04_door.svg'],
        [Senso8DeviceType.IAQ, '05_iaq.svg'],
        [Senso8DeviceType.DISTANCE, '07_distance.svg'],
        [Senso8DeviceType.ANALOG_INPUT, '07_distance.svg'],
        [Senso8DeviceType.DRY_CONTACT, '13_dry_contact.svg'],
        [Senso8DeviceType.SOUND_LEVEL, '08_sound_level.svg'],
        [Senso8DeviceType.POWER_METER, '10_power_meter.svg'],
        [Senso8DeviceType.VIBRATION, '11_vibration.svg'],
        [Senso8DeviceType.PRESSURE, '14_pressure.svg'],
        [Senso8DeviceType.VOLTAGE, '12_voltage.svg'],
        [Senso8DeviceType.OCR, '15_ocr.svg'],
        [Senso8DeviceType.OCCUPANCY, '16_occupancy.svg'],
        [Senso8DeviceType.PEOPLE_COUNT, '17_people_count.svg'],
        [Senso8DeviceType.WATER_FLOW, '18_water_flow.svg']
    ]
);

export function getDeviceIcon(deviceType: Senso8DeviceType, sensorScenarioIcon?: string): string {
    const fallbackIconSrc = '00_loading.svg';
    const iconSrc = senso8DeviceIconMap.get(deviceType);
    if (iconSrc) {
        return `assets/react/${iconSrc}`
    } else if (sensorScenarioIcon) {
        return `assets/react/${sensorScenarioIcon}`
    }

    return `assets/react/${fallbackIconSrc}`;
}
