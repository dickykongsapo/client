import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@store/store';
import { AxiosInterceptor } from '@app/core/interceptor/global-http-interceptor';
import { createTheme, ThemeProvider } from '@mui/material';
import './i18n';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    primary: {
      main: '#2397c7',
    },
  },

})

root.render(
  <Provider store={store}>
    {/* <IntlProvider locale='en_US'> */}
    {/* <ThemeProvider theme={theme}> */}
    <BrowserRouter>
      <AxiosInterceptor>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AxiosInterceptor>
    </BrowserRouter>
    {/* </ThemeProvider> */}
    {/* </IntlProvider> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
