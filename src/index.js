import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Loader from 'react-loader-spinner';
import './components/setting/i18n';

ReactDOM.render(
  <Suspense fallback={(
    <div id="loading">
      <Loader
        type="MutatingDots"
        color="#BBD2C5"
        secondaryColor="#536976"
        height={100}
        width={100}
      />
    </div>)}>
    <App /> 
  </Suspense>
  , document.getElementById('root'));
