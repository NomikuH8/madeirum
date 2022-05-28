import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './css/index.css'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);