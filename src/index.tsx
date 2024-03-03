import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from "../src/redux/store";
import { AuthProvider } from './provider/Auth';
import {  Route, Routes } from 'react-router-dom';
import SignIn from './layout/signin';
import SignUp from './layout/signup';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';
import ar from "./locales/ar/common.json"
import en from "./locales/en/common.json"

i18next.init({
  fallbackLng: 'ar',
  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },resources: {
    en: {
      common: en // 'common' is our custom namespace
    },
    ar: {
      common: ar
    }
  }
 
});
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <AuthProvider>
     <BrowserRouter>
     
     <I18nextProvider i18n={i18next}>
      <App />
      </I18nextProvider>
  
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
