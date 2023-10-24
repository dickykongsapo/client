import { Store } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useStore } from 'react-redux';
import { Navigate, Route, useNavigate } from 'react-router-dom';
import { connect } from 'rxjs';
import LogInPage from 'src/page/sign-in/sign-in-page.component';
import { AuthService } from 'src/services/auth.service';
import { AppState } from '../core.state';

export const ProtectedRoute = ({ children }) => {
    const authService = new AuthService()

    const store: Store<AppState> = useStore();
    const state: AppState = store.getState();
    const [isAuthenticated, setIsAuthenticated] = useState(state.auth.isAuthenticated)
    console.log(isAuthenticated)
    useEffect(() => {
        console.log(`ThingsBoard Version`);
        const jwtToken = localStorage.getItem('jwt_token')

        const fetchData = async () => {
            await authService.reloadUser()
            setIsAuthenticated(true)
            console.log(store.getState())
        }
        fetchData();
        // if (jwtToken) {
        //   fetchData();
        //   console.log(store.getState())

        // }
    }, [])
    if (!state.auth.isAuthenticated) {
        return (
            <Navigate to="/login" />
        )
    }
    return children;
};

