import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/style-footer.scss"; 

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="fluid">
        <Row className="text-center py-2">
          <Col md={12}>
            <h4>Rando-Ouest</h4>
            <p>Préparez-vous pour l'aventure !</p>
            <h5>Nos coordonnées</h5>
            <p>Email : <a href="mailto:contact.rando.ouest@gmail.com">contact.rando.ouest@gmail.com</a></p>
            <p>Téléphone : +33 6 01 02 03 04</p>
            <p>Adresse : 123 Rue de la Randonnée, 72000 Le Mans, France</p>
          </Col>

          <Col md={12}>
            <h5>Suivez-nous</h5>
            <div className="social-icons mt-2">
              <a href="https://www.facebook.com/votre-page" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com/votre-profil" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/votre-compte" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>
        </Row>

        <Row className="text-center mt-3">
          <Col>
            <p>
              <a href="/terms" target="_blank" rel="noopener noreferrer">Conditions Générales d'Utilisation</a> | 
              <a href="/privacy" target="_blank" rel="noopener noreferrer">Politique de Confidentialité</a> |
              <a href="/divers/FaqPage" target="_blank" rel="noopener noreferrer">Foire Aux Questions</a>
            </p>
            <p className="mt-2 copyright">&copy; 2025 Rando-Ouest. Tous droits réservés.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
