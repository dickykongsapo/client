import React, { LegacyRef, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import Dashboard from './component/header/header.component';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './component/header/header.component';
import HomePage from './page/home/home-page.component';
import CustomersPage from './page/customers/customers-page.component';
import RuleChainsPage from './page/ruleChains/ruleChains-page.component';
import LogInPage from './page/sign-in/sign-in-page.component';
import { ProtectedRoute } from './app/core/guards/auth.guard';
import GlobalTheme from './styles/theme';
import WhiteLabelPage from './page/white-label/white-label-page.component';
import { AuthService } from './services/auth.service';
import { connect, useStore } from "react-redux";

const App = () => {

  return (
    <div >
      <GlobalTheme>
        {/* <GlobalStyle /> */}
        <Header />
        <div style={{ marginTop: '64px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path='/login' element={<LogInPage />} />
            <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path='/customers' element={<ProtectedRoute><CustomersPage /></ProtectedRoute>} />
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
    // </ThemeProvider>

  );
}


export default App;
