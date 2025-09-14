import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistor, store } from './Redux/store.js';
import { FormProvider } from './componnent/context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  
      <PersistGate loading={null} persistor={persistor}>  
        <FormProvider>
          <App />
        </FormProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
