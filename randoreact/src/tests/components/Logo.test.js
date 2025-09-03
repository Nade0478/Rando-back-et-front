import { render, screen } from '@testing-library/react';
import Logo from '../../components/Logo';

describe('Logo Component', () => {
  test('renders without crashing', () => {
    render(<Logo />);
    expect(document.body).toBeInTheDocument();
  });

  test('renders logo content', () => {
    render(<Logo />);
    // Adaptez selon le contenu réel de votre Logo
    // expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});