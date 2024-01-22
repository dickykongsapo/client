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
import { styled, createTheme, ThemeProvider, withStyles, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { ListItem, ListItemIcon, ListItemText, MenuItem, Popover, Select } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AccountCircle, Brightness4, Brightness7, DarkMode, Fullscreen, Home, LightMode, More, MoreVert, SettingsEthernet, SupervisorAccount } from '@mui/icons-material';
import { MENU_LIST } from '@components/header/menu-list';
import NoticePopup from '@components/notice-popup/notice-popup.component';
import AccountPopup from '@components/account-popup/account-popup.component';
import store from '@store/store';
import '@components/header/header.styles.scss'
import { ActionSettingsChangeColorMode, ActionSettingsChangeLanguage } from '@app/core/settings/settings.actions';
import { connect, useDispatch } from 'react-redux';
import { sampleLanguages } from '@models/translate.model';
import { useTranslation } from 'react-i18next';
import { red } from '@mui/material/colors';

// import AppBar from '@mui/material/AppBar';

// TODO remove, this demo shouldn't need to reset the theme.



const IconSwitch = (menuItem: any) => {
    return menuItem.icon
}

const MenuLink = (toggleDrawer: any, t) => (
    <div>
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List>
                {MENU_LIST.map(menuItem => {
                    return (

                        <ListItem key={menuItem.id} component={Link} to={menuItem.link} >
                            <ListItemIcon>
                                {IconSwitch(menuItem)}
                            </ListItemIcon>

                            <ListItemText primary={t(menuItem.name)} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    </div>
);

const Header = (props) => {
    const { colorMode, userLang } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [openNoticePopup, setOpenNoticePopup] = useState<HTMLElement>();
    const [openAccountPopup, setOpenAccountPopup] = useState<HTMLElement>();

    const isAuthenticated = store.getState().auth.isAuthenticated;
    // const [userLang, setUserLang] = useState(i18n.language)
    // const userLang = store.getState().settings.userLang;
    const theme = useTheme();

    // const whiteLabel = store.getState().whiteLabel.whiteLabel;

    // let defaultTheme = createTheme({
    //     palette: {
    //         secondary: {
    //             main: purple[500],
    //         },
    //         primary: {
    //             main: whiteLabel.color ? whiteLabel.color : blue[500],
    //         },
    //     },
    // });
    // useEffect(() => {
    //     defaultTheme.palette.primary.main = whiteLabel.color ? whiteLabel.color : blue[500]
    //     console.log('defaultTheme')
    //     console.log(defaultTheme)
    // }, [whiteLabel])

    useEffect(() => {
        setOpenAccountPopup(null)
    }, [isAuthenticated])



    const toggleMenuDrawer = () => {
        setOpenMenuDrawer(!openMenuDrawer);
    };

    const handleChangeLang = (event) => {
        dispatch(ActionSettingsChangeLanguage(event.target.value))
        i18n.changeLanguage(event.target.value);
    }

    // const handleNoticePopupOpen = (e: React.MouseEvent<HTMLElement>) => {
    //     console.log(e)
    //     setOpenNoticePopup(e.nativeEve);
    // }

    const handleNoticePopupOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpenNoticePopup(event.currentTarget);
    };


    const handleNoticePopupClose = () => {
        setOpenNoticePopup(undefined)
    }

    const handleAccountPopupOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpenAccountPopup(event.currentTarget);
    };


    const handleAccountPopupClose = useCallback(() => {
        setOpenAccountPopup(undefined)
    }, [])

    const toggleColorMode = () => {

        const colorMode = store.getState().settings.colorMode;
        dispatch(ActionSettingsChangeColorMode(colorMode == 'dark' ? 'light' : 'dark'))
    }

    return (
        // <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar className='mui-header'>


                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleMenuDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(openMenuDrawer && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {t('dashboard.dashboard')}
                    </Typography>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={userLang ? userLang : 'en_US'}
                        name='lang'
                        onChange={handleChangeLang}
                        sx={{
                            color: 'inherit',
                            border: 'none',
                            ".MuiOutlinedInput-notchedOutline": {
                                border: 'none'
                            }
                        }}
                    >

                        {sampleLanguages.map((sampleLanguage, key) =>
                            <MenuItem
                                value={sampleLanguage}
                                key={key}
                                sx={{
                                    height: 50
                                }}>
                                {t(`language.locales.${sampleLanguage}`)}

                            </MenuItem>

                        )}
                    </Select>
                    <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleColorMode}>
                        {colorMode === 'dark' ? <DarkMode /> : <LightMode />}
                    </IconButton>
                    <IconButton
                        color="inherit"
                    // onClick={toggleNoticeDrawer}
                    >
                        <Fullscreen />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleAccountPopupOpen}
                    // onClick={() => navigateTo('/sign-in')}
                    >
                        <AccountCircle />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={handleNoticePopupOpen}
                    >
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        color="inherit"
                    // onClick={toggleNoticeDrawer}
                    >
                        <MoreVert />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                open={openMenuDrawer}
                onClose={toggleMenuDrawer}
            >
                <div className='mui-list'>
                    <Box
                        sx={{ width: 250 }}
                        role='presentation'
                        onClick={toggleMenuDrawer}
                        onKeyDown={toggleMenuDrawer}
                    >
                        {MenuLink(toggleMenuDrawer, t)}
                    </Box></div>
            </Drawer>
            <Popover
                id={`${Boolean(openAccountPopup) ? 'simple-popover' : undefined}`}
                open={Boolean(openAccountPopup)}
                anchorEl={openAccountPopup}
                onClose={handleAccountPopupClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                {/* <Typography component={'span'}> */}
                <AccountPopup handleAccountPopupClose={handleAccountPopupClose} />
                {/* </Typography> */}

            </Popover>
            <Popover
                id={`${Boolean(openNoticePopup) ? 'simple-popover' : undefined}`}
                open={Boolean(openNoticePopup)}
                anchorEl={openNoticePopup}
                onClose={handleNoticePopupClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography component={'span'}><NoticePopup searchString={'ewewooo'} /></Typography>

            </Popover>

            {/* <Drawer
                    open={openNoticeDrawer}
                    onClose={toggleNoticeDrawer}

                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleNoticeDrawer}
                        onKeyDown={toggleNoticeDrawer}
                    >
                        <li>dllm</li>
                    </Box>
                </Drawer> */}

        </Box>
        // </ThemeProvider>
    );
}

const mapStateToProps = (state) => {

    return {
        colorMode: state.settings.colorMode,
        userLang: state.settings.userLang
    }
}


export default connect(mapStateToProps)(Header);