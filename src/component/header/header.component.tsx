import { styled, createTheme, ThemeProvider, withStyles, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { KeyboardEventHandler, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import { ListItem, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AccountCircle, Brightness4, Brightness7, DarkMode, Fullscreen, Home, LightMode, More, MoreVert, SettingsEthernet, SupervisorAccount } from '@mui/icons-material';
import { blue, green, purple } from '@mui/material/colors';
import { MENU_LIST } from './menu-list';
import NoticePopup from '../notice-popup/notice-popup.component';
import AccountPopup from '../account-popup/account-popup.component';
import store from 'src/store';
import { WhiteLabel } from 'src/models/white-label.model';
import './header.component.scss'
import { ActionSettingsChangeColorMode } from 'src/app/core/settings/settings.actions';
import { connect, useDispatch } from 'react-redux';

// import AppBar from '@mui/material/AppBar';

// TODO remove, this demo shouldn't need to reset the theme.



const IconSwitch = (menuItem: any) => {
    return menuItem.icon
}

const MenuLink = (toggleDrawer: any) => (
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
                            <ListItemText primary={menuItem.name} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>

    </div>
);

const Header = (props) => {
    const { colorMode } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openMenuDrawer, setOpenMenuDrawer] = useState(false);
    const [openNoticePopup, setOpenNoticePopup] = useState<HTMLElement>();
    const [openAccountPopup, setOpenAccountPopup] = useState<HTMLElement>();

    const isAuthenticated = store.getState().auth.isAuthenticated;
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
        console.log(store.getState())
        setOpenAccountPopup(null)
    }, [isAuthenticated])



    const toggleMenuDrawer = () => {
        setOpenMenuDrawer(!openMenuDrawer);
    };

    const navigateTo = (path: any) => {
        navigate(path)
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
                        Dashboard
                    </Typography>
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
                        {MenuLink(toggleMenuDrawer)}
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
        colorMode: state.settings.colorMode
    }
}


export default connect(mapStateToProps)(Header);