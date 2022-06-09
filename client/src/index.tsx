import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import React from 'react';
import './css/index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);