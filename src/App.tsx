import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import '@/App.css';
import { Button, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import Dashboard from '@components/header/header.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '@components/header/header.component';
import HomePage from '@pages/home/home-page.component';
import CustomersPage from '@pages/customers/customers-page.component';
import RuleChainsPage from '@pages/rule-chains/rule-chains-page.component';
import LogInPage from '@pages/sign-in/sign-in-page.component';
import { ProtectedRoute } from '@app/core/guards/auth.guard';
import GlobalTheme from '@styles/theme';
import WhiteLabelPage from '@pages/white-label/white-label-page.component';
// import { AuthService } from './services/auth.service';
// import { AuthService } from '@/services/auth.service';

import { AuthService } from '@app/core/services/auth.service';
import { connect, useStore } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { deepClone, isDefined, isUndefined } from '@app/core/utils';
import { AlarmCenter } from '@pages/alarm-center/alarm-center.component';

const App = () => {
  const authService = new AuthService()
  const [loaded, setLoaded] = useState(false)


  function reloadUser() {
    // deepClone('')
    this.loadUser(true).subscribe(
      (authPayload) => {
        this.notifyAuthenticated(authPayload);
        this.notifyUserLoaded(true);
        setLoaded(true)
        console.log('start1')
      },
      () => {
        this.notifyUnauthenticated();
        this.notifyUserLoaded(true);
        setLoaded(true)

        console.log('start2')
      }
    );
  }

  useEffect(() => {
    console.log(`ThingsBoard Version`);
    const jwtToken = localStorage.getItem('jwt_token')
    if (jwtToken) {
      console.log(authService)
      authService.loadUser(true).subscribe(
        (authPayload) => {
          authService.notifyAuthenticated(authPayload);
          authService.notifyUserLoaded(true);
          setLoaded(true)
          console.log(authService)

        },
        () => {
          authService.notifyUnauthenticated();
          authService.notifyUserLoaded(true);
          setLoaded(true)
          console.log(authService)

        }
      );

    } else {
      setLoaded(true)

    }
    // if (jwtToken) {
    //   fetchData();
    //   console.log(store.getState())

    // }
  }, [])

  return (

    loaded ?
      <div >
        <GlobalTheme>
          {/* notify toast */}
          <ToastContainer />

          {/* <GlobalStyle /> */}
          <Header />
          <div style={{ marginTop: '64px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path='/login' element={<LogInPage />} />
              <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path='/customers' element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
              <Route path='/alarm-center' element={<ProtectedRoute><AlarmCenter></AlarmCenter></ProtectedRoute>} />
              <Route path='/ruleChains' element={<ProtectedRoute><RuleChainsPage /></ProtectedRoute>} />
              <Route path='/whiteLabel' element={<ProtectedRoute><WhiteLabelPage /></ProtectedRoute>} />
            </Routes>

          </div>
        </GlobalTheme>




        {/* </div>
          )
        }


      </ReactFullscreen> */}

      </div>
      :

      <div style={{ alignSelf: 'center', textAlign: 'center' }}>
        <CircularProgress size='200px' />
      </div>


    // </ThemeProvider>

  );
}


export default App;
