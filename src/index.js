import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { NotificationProvider } from './helpers/Notificathions';
import { TonConnectUIProvider } from '@tonconnect/ui-react';



let htmlElement = window.document.getElementsByTagName("html")[0];

let themeColor = "dark";

if (window.Telegram.WebApp) {
    window.Telegram.WebApp.onEvent('themeChanged', applyTheme); 

    function applyTheme() {
        const theme = window.Telegram.WebApp.themeParams;

        if (theme && theme.bg_color) {
            const bgColor = theme.bg_color.toLowerCase();
            if (bgColor === '#000000' || bgColor.startsWith('#1') || bgColor.startsWith('#2')) {
                themeColor = 'dark';
            } else {
                themeColor = 'light';
            }
        }

        htmlElement.classList.add(themeColor);
    }

    applyTheme();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl="https://cdn.joincommunity.xyz/assets/manifest.json">
    <AppRoot platform='ios' appearance='light'>
      <NotificationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationProvider>
    </AppRoot>
  </TonConnectUIProvider>
);