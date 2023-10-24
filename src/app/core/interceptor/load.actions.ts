import { Action } from '../action';
import { User } from '../../../models/user.model';
import { LoadState } from './load.models';
import { createAction } from '@reduxjs/toolkit';

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
