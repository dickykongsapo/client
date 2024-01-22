/*
 * Copyright © 2016-2021 The Thingsboard Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Paper } from '@mui/material';
import TextField from '@mui/material';
import './account-popup.styles.scss';
import { selectAuthState, selectAuthUser } from 'src/app/core/auth/auth.selectors';
import { useStore } from 'react-redux';
import { AppState } from 'src/app/core/core.state';
import { Store } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { AuthService } from 'src/services/auth.service';
import ThemedButton from 'src/components/button/button.component';



const AccountPopup = (props: { handleAccountPopupClose: () => void }
    // props: {
    //  searchString: any; handleSearchClose: React.MouseEventHandler<HTMLButtonElement> | undefined; handleSearchApply: (arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>, arg1: React.RefObject<HTMLInputElement>) => void;
    //  }
) => {
    const { handleAccountPopupClose } = props
    const store: Store<AppState> = useStore();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [userAuthority, setUserAuthority] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(true)
    const authService = new AuthService();
    const state: AppState = store.getState();

    useEffect(() => {
        auth()
    }, [])

    const auth = () => {
        const authuser = selectAuthUser(state)

        if (authuser) {
            setUserName(authuser.sub)
            setUserAuthority(authuser.authority)
            setShowLoginButton(false)
        }
    }

    // const searchChange = (e: { target: { value: any; }; }) => {
    //     setSearchString(e.target.value)
    // }

    const clickLoginButton = () => {
        handleAccountPopupClose()
        navigate('/login')
    }

    const clickLogoutButton = () => {
        handleAccountPopupClose()
        authService.logout();
        auth()
        navigate('/login')
    }

    return (
        <Paper sx={{ width: 375, pt: 10, pr: 10, pb: 10, pl: 10 }}>


            {showLoginButton ?
                <div>
                    <div>You are not logged in</div>
                    <ThemedButton onClick={clickLoginButton} word='Login' />
                </div>
                :
                <div>
                    <div>{userName}</div>
                    <div>{userAuthority}</div>
                    <ThemedButton onClick={clickLogoutButton} word='Logout' />
                </div>}
        </Paper>
    )
}


export default AccountPopup;