

import { AppState } from '../core.state';
import { AuthState } from './auth.models';
import { take } from 'rxjs/operators';
import { AuthUser } from '../../../models/user.model';
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
