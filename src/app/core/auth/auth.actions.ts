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

// import { Action } from '@ngrx/store';
import { Action } from '../action';
import { User } from '../../../models/user.model';
import { AuthPayload } from './auth.models';
import { createAction } from '@reduxjs/toolkit';

export enum AuthActionTypes {
    AUTHENTICATED = '[Auth] Authenticated',
    UNAUTHENTICATED = '[Auth] Unauthenticated',
    LOAD_USER = '[Auth] Load User',
    UPDATE_USER_DETAILS = '[Auth] Update User Details',
    UPDATE_LAST_PUBLIC_DASHBOARD_ID = '[Auth] Update Last Public Dashboard Id'
}

// export class ActionAuthAuthenticated implements Action {
//     readonly type = AuthActionTypes.AUTHENTICATED;

//     constructor(readonly payload: AuthPayload) { }
// }

export const ActionAuthAuthenticated = (authPayload: AuthPayload) => {
    return {
        type: AuthActionTypes.AUTHENTICATED,
        payload: authPayload
    }
}


// export class ActionAuthUnauthenticated implements Action {
//     readonly type = AuthActionTypes.UNAUTHENTICATED;
// }
export const ActionAuthUnauthenticated = () => {
    return {
        type: AuthActionTypes.UNAUTHENTICATED,
        payload: {}
    }
}

// export class ActionAuthLoadUser implements Action {
//     readonly type = AuthActionTypes.LOAD_USER;

//     constructor(readonly payload: { isUserLoaded: boolean }) { }
// }

export const ActionAuthLoadUser = (isUserLoaded: boolean) => {
    return {
        type: AuthActionTypes.LOAD_USER,
        payload: { isUserLoaded: isUserLoaded }
    }
}

// export class ActionAuthUpdateUserDetails implements Action {
//     readonly type = AuthActionTypes.UPDATE_USER_DETAILS;

//     constructor(readonly payload: { userDetails: User }) { }
// }
export const ActionAuthUpdateUserDetails = (userDetails: User) => {
    return {
        type: AuthActionTypes.UPDATE_USER_DETAILS,
        payload: { userDetails: userDetails }
    }
}
// export class ActionAuthUpdateLastPublicDashboardId implements Action {
//     readonly type = AuthActionTypes.UPDATE_LAST_PUBLIC_DASHBOARD_ID;

//     constructor(readonly payload: { lastPublicDashboardId: string }) { }
// }
export const ActionAuthUpdateLastPublicDashboardId = (lastPublicDashboardId: string) => {
    return {
        type: AuthActionTypes.UPDATE_LAST_PUBLIC_DASHBOARD_ID,
        payload: { lastPublicDashboardId: lastPublicDashboardId }
    }
}

// export type AuthActions = ActionAuthAuthenticated | ActionAuthUnauthenticated |
//     ActionAuthLoadUser | ActionAuthUpdateUserDetails | ActionAuthUpdateLastPublicDashboardId;
