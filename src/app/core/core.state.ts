import { combineReducers } from "redux";
import { AuthState } from "./auth/auth.models";
import { authReducer } from "./auth/auth.reducer";
import { LoadState } from "./interceptor/load.models";
import { loadReducer } from "./interceptor/load.reducer";
import { NotificationState } from "./notification/notification.models";
import { notificationReducer } from "./notification/notification.reducer";
import { SettingsState } from "./settings/settings.models";
import { settingsReducer } from "./settings/settings.reducer";
import { WhiteLabelState } from "./white-label/white-label.models";
import { whiteLabelReducer } from "./white-label/white-label.reducer";
export const rootReducer = combineReducers({
    auth: authReducer,
    load: loadReducer,
    settings: settingsReducer,
    notification: notificationReducer,
    whiteLabel: whiteLabelReducer
})
// export const reducers: ActionReducerMap<AppState> = {
//     load: loadReducer,
//     auth: authReducer,
//     settings: settingsReducer,
//     notification: notificationReducer,
//     whiteLabel: whiteLabelReducer
//   };

//   export const metaReducers: MetaReducer<AppState>[] = [
//     initStateFromLocalStorage
//   ];
//   if (!env.production) {
//     metaReducers.unshift(storeFreeze);
//     metaReducers.unshift(debug);
//   }

//   export const effects: Type<any>[] = [
//     SettingsEffects,
//     NotificationEffects
//   ];

export interface AppState {
    load: LoadState;
    auth: AuthState;
    settings: SettingsState;
    notification: NotificationState;
    whiteLabel: WhiteLabelState;
}
