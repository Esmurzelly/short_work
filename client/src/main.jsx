import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react';
import './i18next.js';

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
