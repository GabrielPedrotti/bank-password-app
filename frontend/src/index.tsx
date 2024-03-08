import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRoutes from "./routes";

ReactDOM.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
