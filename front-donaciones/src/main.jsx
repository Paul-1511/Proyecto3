import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <header className="main-header">
  Administración de campañas de donación y voluntariado
  </header>
    <App />
  </React.StrictMode>
);
