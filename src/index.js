import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import PWAPrompt from 'react-ios-pwa-prompt'

import App from './App';
import './components/i18n';

ReactDOM.render(
  <Suspense fallback={<div></div>}>
    <App />
    <PWAPrompt />
  </Suspense>,
  document.getElementById('root')
);