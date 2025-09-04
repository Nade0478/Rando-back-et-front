import { render } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  test('renders without crashing', () => {
    render(<Footer />);
    expect(document.body).toBeInTheDocument();
  });

  test('contains footer content', () => {
    render(<Footer />);
    // Adaptez selon le contenu réel de votre Footer
    // expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});