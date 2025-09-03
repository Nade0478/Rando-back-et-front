import '@testing-library/jest-dom';

// Mock pour EmailJS si utilisé
global.emailjs = {
  send: jest.fn(() => Promise.resolve({ status: 200, text: 'OK' })),
  init: jest.fn()
};

// Mock pour Leaflet
Object.defineProperty(window, 'L', {
  value: {
    map: jest.fn(() => ({
      setView: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
      remove: jest.fn()
    })),
    tileLayer: jest.fn(() => ({
      addTo: jest.fn()
    })),
    marker: jest.fn(() => ({
      addTo: jest.fn(),
      bindPopup: jest.fn()
    })),
    Icon: {
      Default: {
        mergeOptions: jest.fn(),
        prototype: {
          _getIconUrl: undefined
        }
      }
    }
  }
});

// Mock pour les variables d'environnement
process.env.REACT_APP_API_URL = 'http://localhost:8000/api';
process.env.REACT_APP_EMAILJS_SERVICE_ID = 'test_service';
process.env.REACT_APP_EMAILJS_TEMPLATE_ID = 'test_template';
process.env.REACT_APP_EMAILJS_PUBLIC_KEY = 'test_key';
