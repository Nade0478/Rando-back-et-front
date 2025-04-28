import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/style.scss";
// import "./styles/style-contact.css"
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import 'leaflet/dist/leaflet.css';
import 'react-bootstrap/Button';
import 'react-bootstrap/Form';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
