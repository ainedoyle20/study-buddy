import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';

import SuspenseLoader from './components/SuspenseLoader';

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Suspense fallback={<SuspenseLoader />}>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
