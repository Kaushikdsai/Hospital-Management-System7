import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';  // Ensure this matches the actual file name (App.js or App.jsx)
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA functionality (Optional)
serviceWorkerRegistration.unregister();

// Measure performance (Optional)
reportWebVitals();
