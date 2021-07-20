import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './components/setting/i18n';

ReactDOM.render(
  <Suspense fallback={<div></div>}>
    <App />
  </Suspense>,
  document.getElementById('root')
);
