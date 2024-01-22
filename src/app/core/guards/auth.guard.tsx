import { Store } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { connect, defer } from 'rxjs';
import LogInPage from 'src/page/sign-in/sign-in-page.component';
import { AuthService } from 'src/services/auth.service';
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