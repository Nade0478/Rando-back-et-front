import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock pour React Router DOM v7
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ children, element }) => <div data-testid="route">{element || children}</div>,
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  test('renders main app structure', () => {
    render(<App />);
    // Test que l'app se rend sans erreur
    expect(screen.getByTestId('router')).toBeInTheDocument();
  });
});