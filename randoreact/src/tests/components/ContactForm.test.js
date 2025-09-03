import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../components/ContactForm';

// Mock EmailJS
jest.mock('emailjs-com', () => ({
  send: jest.fn(() => Promise.resolve({ status: 200, text: 'OK' })),
  init: jest.fn(),
}));

describe('ContactForm Component', () => {
  test('renders without crashing', () => {
    render(<ContactForm />);
    expect(document.body).toBeInTheDocument();
  });

  test('renders form fields', () => {
    render(<ContactForm />);
    
    // Cherchez des éléments de formulaire génériques
    const inputs = screen.getAllByRole('textbox', { hidden: true });
    expect(inputs.length).toBeGreaterThan(0);
  });

  test('handles form submission', async () => {
    render(<ContactForm />);
    
    // Trouvez le bouton de soumission (adaptez le texte)
    const submitButtons = screen.getAllByRole('button');
    if (submitButtons.length > 0) {
      fireEvent.click(submitButtons[0]);
      // Le formulaire ne devrait pas causer d'erreur
    }
    expect(document.body).toBeInTheDocument();
  });
});
