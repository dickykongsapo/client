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
import { Store } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';

import { AppState } from '../core.state';
export const ProtectedRoute = ({ children }) => {
    const store: Store<AppState> = useStore();
    const state: AppState = store.getState();
    const isAuthenticated = state.auth.isAuthenticated
    useEffect(() => {
        console.log(isAuthenticated)

    }, [])
    if (!isAuthenticated) {
        return (
            <Navigate to="/login" />
        )
    }
    return children;
};



// const mapStateToProps = (state, props) => {
//     console.log(state)
//     console.log(props)
//     return {
//         isAuthenticated: state.auth.isAuthenticated,
//         children: props.children
//     }
// }

// export default connect(mapStateToProps)(ProtectedRoute)