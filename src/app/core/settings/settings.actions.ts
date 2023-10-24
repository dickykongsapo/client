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

export enum SettingsActionTypes {
    CHANGE_LANGUAGE = '[Settings] Change Language',
    CHANGE_COLOR_MODE = '[Settings] Change Color Mode'
}


export const ActionSettingsChangeLanguage = (userLang: string) => {
    return {
        type: SettingsActionTypes.CHANGE_LANGUAGE,
        payload: { userLang: userLang }
    }
}



export const ActionSettingsChangeColorMode = (colorMode: string) => {
    return {
        type: SettingsActionTypes.CHANGE_COLOR_MODE,
        payload: { colorMode: colorMode }
    }
}
