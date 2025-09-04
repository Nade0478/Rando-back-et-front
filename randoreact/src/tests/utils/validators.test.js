// src/tests/components/ContactFormValidation.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ContactForm from '../../components/ContactForm';

describe('ContactForm Validation', () => {
  test('validates email format in form', () => {
    render(<ContactForm />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /envoyer/i });
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    
    // Le navigateur gère la validation HTML5 pour type="email"
    expect(emailInput).toBeInvalid();
  });

  test('requires checkbox agreement', () => {
    render(<ContactForm />);
    
    // Remplir le formulaire sans cocher la case
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Test message' } });
    
    // Mock alert pour éviter l'erreur JSDOM
    window.alert = jest.fn();
    
    fireEvent.click(screen.getByRole('button', { name: /envoyer/i }));
    
    expect(window.alert).toHaveBeenCalledWith('Veuillez accepter les conditions générales.');
  });
});