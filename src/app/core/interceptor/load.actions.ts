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
export enum LoadActionTypes {
    START_LOAD = '[Load] Start',
    FINISH_LOAD = '[Load] Finish'
}


export const ActionLoadStart = () => {
    return {
        type: LoadActionTypes.START_LOAD,
        payload: {}
    }
}
export const ActionLoadFinish = () => {
    return {
        type: LoadActionTypes.FINISH_LOAD,
        payload: {}
    }
}

// export type LoadActions = ActionLoadStart | ActionLoadFinish;
