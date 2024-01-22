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
import '@components/account-popup/account-popup.styles.scss';
import { selectAuthState, selectAuthUser } from '@app/core/auth/auth.selectors';
import { connect, useStore } from 'react-redux';
import { AppState } from '@app/core/core.state';
import { Store } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@app/core/services/auth.service';
import ThemedButton from '@components/button/button.component';
import { Authority, AuthUser } from '@app/shared/public-api';
import { useTranslation } from 'react-i18next';



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
    const { t, i18n } = useTranslation();
    const authService = new AuthService();
    const state: AppState = store.getState();

    useEffect(() => {
        auth()
    }, [])

    const auth = () => {
        const authuser = selectAuthUser(state)
        if (authuser) {
            setUserName(authuser.sub)
            setUserAuthority(getAuthorityName(authuser))
            setShowLoginButton(false)
        }
    }

    const clickLoginButton = () => {
        handleAccountPopupClose()
        navigate('/login')
    }

    const clickLogoutButton = () => {
        authService.logout();
    }

    return (
        <Paper sx={{ width: 375, pt: 10, pr: 10, pb: 10, pl: 10 }}>


            {showLoginButton ?
                <div>
                    <div>{t('user.not-logged-in')}</div>
                    <ThemedButton onClick={clickLoginButton} word={t('user.login')} />
                </div>
                :
                <div>
                    <div>{userName}</div>
                    <div>{t(userAuthority)}</div>
                    <ThemedButton onClick={clickLogoutButton} word={t('user.logout')} />
                </div>}
        </Paper>
    )
}


const mapStateToProps = (state) => {

    return {
        authuser: state.auth.authUser,
    }
}


export default (AccountPopup);

const getAuthorityName = (authUser: AuthUser): string => {
    let name = null;
    if (authUser) {
        const authority = authUser.authority;
        switch (authority) {
            case Authority.SYS_ADMIN:
                name = 'user.sys-admin';
                break;
            case Authority.TENANT_ADMIN:
                name = 'user.tenant-admin';
                break;
            case Authority.CUSTOMER_ADMIN:
                name = 'user.customer-admin';
                break;
            case Authority.CUSTOMER_USER:
                name = 'user.customer';
                break;
            case Authority.TENANT_USER:
                name = 'user.tenant-user';
                break;
        }
    }
    return name;
}
