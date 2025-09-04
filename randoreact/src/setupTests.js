import '@testing-library/jest-dom';

// Configuration basique pour vos tests
process.env.REACT_APP_API_URL = 'http://localhost:8000/api';

// Mock pour fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({ message: 'Test response' }),
  })
);

// Mock pour localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock pour EmailJS
jest.mock('emailjs-com', () => ({
  send: jest.fn(() => Promise.resolve({ status: 200, text: 'OK' })),
  init: jest.fn(),
}));

// AJOUTEZ CES LIGNES :
// Mock pour window.alert (évite les erreurs JSDOM)
global.alert = jest.fn();

// Mock pour les images
jest.mock('../Logo-rando-ouest.png', () => 'logo-image.png');

// Nettoyage après chaque test
afterEach(() => {
  jest.clearAllMocks();
  if (fetch.mockClear) {
    fetch.mockClear();
  }
});