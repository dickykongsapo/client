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
import { AuthState } from './auth.models';
import { take } from 'rxjs/operators';
import { AuthUser } from '@models/user.model';
import { createSelector, Store } from '@reduxjs/toolkit';

export const selectAuthState = (state: { auth: AuthState; }) => state.auth;

export const selectAuth = createSelector(
    selectAuthState,
    (state: AuthState) => state
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state: AuthState) => state.isAuthenticated
);

export const selectIsUserLoaded = createSelector(
    selectAuthState,
    (state: AuthState) => state.isUserLoaded
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state: AuthState) => state.authUser
);

export const selectUserDetails = createSelector(
    selectAuthState,
    (state: AuthState) => state.userDetails
);

export const selectUserTokenAccessEnabled = createSelector(
    selectAuthState,
    (state: AuthState) => state.userTokenAccessEnabled
);

export function getCurrentAuthState(store: Store): AuthState {
    //   let state: AuthState;
    return selectAuth(store.getState())
    //   store.pipe(select(selectAuth), take(1)).subscribe(
    //     val => state = val
    //   );
    //   return state;
}

export function getCurrentAuthUser(store: Store): AuthUser {
    //   let authUser: AuthUser;
    return selectAuthUser(store.getState())
}
