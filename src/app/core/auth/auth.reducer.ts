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

import { AuthPayload, AuthState } from './auth.models';
import { AuthActionTypes } from './auth.actions';
import { Action } from '../action';
const emptyUserAuthState: AuthPayload = {
    authUser: null,
    userDetails: null,
    userTokenAccessEnabled: false,
    forceFullscreen: false,
    whiteLabel: {},
    allowedDashboardIds: []
};

export const initialState: AuthState = {
    isAuthenticated: false,
    isUserLoaded: false,
    lastPublicDashboardId: null,
    whiteLabel: {},
    ...emptyUserAuthState
};

export function authReducer(
    state: AuthState = initialState,
    action: Action
): AuthState {
    switch (action.type) {
        case AuthActionTypes.AUTHENTICATED:
            return { ...state, isAuthenticated: true, ...action.payload };

        case AuthActionTypes.UNAUTHENTICATED:
            return { ...state, isAuthenticated: false, ...emptyUserAuthState };

        case AuthActionTypes.LOAD_USER:
            return {
                ...state, ...action.payload, isAuthenticated: action.payload.isUserLoaded ? state.isAuthenticated : false,
                ...action.payload.isUserLoaded ? {} : emptyUserAuthState
            };

        case AuthActionTypes.UPDATE_USER_DETAILS:
            return { ...state, ...action.payload };

        case AuthActionTypes.UPDATE_LAST_PUBLIC_DASHBOARD_ID:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}
