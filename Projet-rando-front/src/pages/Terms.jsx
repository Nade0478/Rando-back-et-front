import React from "react";
import { Container } from "react-bootstrap";
import DarkModeForm from "../components/DarkModeForm";

const TermsPage = () => {
  return (
    <div>
      <DarkModeForm />
      <Container className="mt-5">
        <h1 className="text-center">Conditions Générales d'Utilisation</h1>
        <p>
          Bienvenue sur Rando Ouest ! Ces Conditions Générales d'Utilisation (CGU)
          régissent votre utilisation de notre site web. En accédant ou en utilisant
          notre plateforme, vous acceptez les termes et conditions suivants.
        </p>

        <h2>1. Utilisation du site</h2>
        <p>
          Rando Ouest est un site dédié aux passionnés de randonnées pédestres dans le Grand Ouest. 
          Vous pouvez :
        </p>
        <ul>
          <li>Consulter une liste de chemins de randonnées.</li>
          <li>Poster des opinions sur les chemins de randonnées.</li>
          <li>Partager des articles avec des images sur notre blog.</li>
        </ul>

        <h2>2. Contenu généré par les utilisateurs</h2>
        <p>En publiant du contenu sur Rando Ouest, vous garantissez :</p>
        <ul>
          <li>Que le contenu est original et ne viole pas les droits d'auteur.</li>
          <li>Que le contenu est respectueux et ne contient aucun propos offensant.</li>
        </ul>
        <p>Nous nous réservons le droit de supprimer tout contenu non conforme à ces règles.</p>

        <h2>3. Responsabilité</h2>
        <p>
          Rando Ouest n'est pas responsable des accidents ou dommages pouvant survenir
          lors de l'utilisation des chemins listés sur notre site. Chaque utilisateur
          est responsable de sa propre sécurité.
        </p>

        <h2>4. Protection des données</h2>
        <p>
          Nous collectons et utilisons vos données conformément à notre 
          <a href="/Privacy" target="_blank" rel="noopener noreferrer">Politique de Confidentialité</a>.
        </p>

        <h2>5. Modification des conditions</h2>
        <p>
          Rando Ouest se réserve le droit de modifier ces termes et conditions à tout moment. 
          Les modifications seront publiées sur cette page.
        </p>

        <h2>6. Contact</h2>
        <p>
          Pour toute question ou préoccupation concernant ces termes, veuillez nous contacter 
          à <a href="mailto:contact@randouest.fr">contact@randouest.fr</a>.
        </p>

        <p className="mt-4 text-center">
          Merci de faire partie de notre communauté ! Profitez de vos randonnées !
        </p>
      </Container>
    </div>
  );
};

export default TermsPage;
