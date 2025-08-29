import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../styles/style-contact.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './ContactForm.css';
import '../styles/style-footer.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert('Veuillez accepter les conditions générales.');
      return;
    }

    emailjs.send(
      "service_9yyn298",
      "template_xonrprq",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      "VbFTJBjMjf2w-GqC8"
    ).then(() => {
      alert('Votre message a été envoyé avec succès !');
      setFormData({ name: '', email: '', message: '', agree: false });
    }).catch((error) => {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nom :</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">Message :</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          J'accepte les <a href="/terms" target="_blank" rel="noopener noreferrer">conditions générales</a>.
        </label>
      </div>
      <button type="submit" className="btn btn-dark">
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;
