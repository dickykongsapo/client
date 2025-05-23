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

import { Action } from "../action";
import { WhiteLabel } from "@models/white-label.model";

export enum WhiteLabelActionTypes {
    LOAD_WHITE_LABEL = '[WhiteLabel] Load White Label',
    CLEAR_WHITE_LABEL = '[WhiteLabel] Clear White Label'
}

export const ActionLoadWhiteLabel = (whiteLabel: WhiteLabel) => {
    return {
        type: WhiteLabelActionTypes.LOAD_WHITE_LABEL,
        payload: { whiteLabel: whiteLabel }
    }
}

export const ActionClearWhiteLabel = () => {
    return {
        type: WhiteLabelActionTypes.CLEAR_WHITE_LABEL,
    }
}