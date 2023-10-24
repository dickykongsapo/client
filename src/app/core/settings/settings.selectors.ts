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

import { AppState } from '../core.state';
import { SettingsState } from './settings.models';
import { take } from 'rxjs/operators';
import { AuthUser } from '../../../models/user.model';
import { createSelector, Store } from '@reduxjs/toolkit';
import { Settings } from 'http2';


export const selectSettingsState = (state: { settings: SettingsState; }) => state.settings

export const selectSettings = createSelector(
    selectSettingsState,
    (state: SettingsState) => state
);

export const selectUserLang = createSelector(
    selectSettingsState,
    (state: SettingsState) => state.userLang
);

export const selectColorMode = createSelector(
    selectSettingsState,
    (state: SettingsState) => state.colorMode
)