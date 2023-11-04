import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorPage>
      <App />
    </ErrorPage>
  </React.StrictMode>
);
