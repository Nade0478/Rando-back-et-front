import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// Helper pour wrapper avec Router si nécessaire
const AppWithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<AppWithRouter />);
  });

  test('renders main navigation', () => {
    render(<AppWithRouter />);
    // Adaptez selon votre structure
    // expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});