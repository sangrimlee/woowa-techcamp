import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import AsyncBoundary from 'components/boundary/AsyncBoundary';

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <AsyncBoundary>
        <App />
      </AsyncBoundary>
    </RecoilRoot>
  </React.StrictMode>
);
