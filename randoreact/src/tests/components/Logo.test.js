import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Logo from '../../components/Logo';

// Mock du fichier image pour éviter les erreurs Jest
jest.mock('../Logo-rando-ouest.png', () => 'logo-image.png');

// Helper global pour render le composant avec Router
const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Logo />
    </MemoryRouter>
  );
};

describe('Logo Component', () => {

  test('renders without crashing', () => {
    renderWithRouter();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  test('displays logo image correctly', () => {
    renderWithRouter();
    
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'logo-image.png');
  });

  test('logo is wrapped in a link to home page', () => {
    renderWithRouter();
    
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('logo image is inside the navigation link', () => {
    renderWithRouter();
    
    // Méthode Testing Library recommandée : vérifier la relation parent-enfant
    const logoLink = screen.getByRole('link');
    const logoImage = screen.getByAltText('logo');
    
    expect(logoLink).toContainElement(logoImage);
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('logo link has correct accessibility attributes', () => {
    renderWithRouter();
    
    const logoLink = screen.getByRole('link');
    const logoImage = screen.getByAltText('logo');
    
    // Vérifie que l'image a un alt text approprié pour l'accessibilité
    expect(logoImage).toHaveAttribute('alt', 'logo');
    expect(logoLink).toHaveAttribute('href', '/');
  });
});

// Test d'intégration avec navigation
describe('Logo Navigation Integration', () => {
  test('logo link points to home route', () => {
    renderWithRouter(['/some-other-page']);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('logo is accessible via keyboard navigation', () => {
    renderWithRouter();

    const logoLink = screen.getByRole('link');
    
    // Vérifie que le lien est focusable (important pour l'accessibilité)
    logoLink.focus();
    expect(logoLink).toHaveFocus();
  });
});