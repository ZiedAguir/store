import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import React from 'react';
import { Provider } from 'react-redux'; 
import { PersistGate } from 'redux-persist/integration/react'; 
import { persistor, store } from './Redux/store.js';
import { FormProvider } from './componnent/context/AuthContext.jsx';

// Import CSS files
import '../public/vendor/bootstrap/css/bootstrap.css';
import '../public/vendor/animate/animate.compat.css';
import '../public/vendor/font-awesome/css/all.min.css';
import '../public/vendor/boxicons/css/boxicons.min.css';
import '../public/vendor/magnific-popup/magnific-popup.css';
import '../public/vendor/bootstrap-datepicker/css/bootstrap-datepicker3.css';
import '../public/vendor/owl.carousel/assets/owl.carousel.css';
import '../public/vendor/owl.carousel/assets/owl.theme.default.css';
import '../public/vendor/jquery-ui/jquery-ui.css';
import '../public/vendor/jquery-ui/jquery-ui.theme.css';
import '../public/vendor/select2/css/select2.css';
import '../public/vendor/select2-bootstrap-theme/select2-bootstrap.min.css';
import '../public/vendor/dropzone/basic.css';
import '../public/vendor/dropzone/dropzone.css';
import '../public/vendor/bootstrap-markdown/css/bootstrap-markdown.min.css';
import '../public/vendor/pnotify/pnotify.custom.css';
import '../public/css/theme.css';
import '../public/css/layouts/modern.css';
import '../public/css/landing.css';
import '../public/css/skins/default.css';
import '../public/css/custom.css';

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
