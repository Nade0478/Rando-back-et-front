import { render, screen } from '@testing-library/react';
import MapComponent from '../../components/MapComponent'; // Adaptez le chemin

describe('MapComponent', () => {
  test('renders map container', () => {
    render(<MapComponent />);
    // Vérifiez que votre composant de carte se rend
    // expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  test('initializes with default position', () => {
    const defaultProps = {
      center: [48.1173, -1.6778],
      zoom: 10
    };
    render(<MapComponent {...defaultProps} />);
    // Testez l'initialisation avec les bonnes coordonnées
  });
});
