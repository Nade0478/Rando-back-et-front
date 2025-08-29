import React from "react";
import { Container } from "react-bootstrap";
import DarkModeForm from "../components/DarkModeForm";
import Menu from "../components/Menu";

const PrivacyPage = () => {
  return (
    <div>
      <Menu />
      <DarkModeForm />
      <Container className="mt-5">
        <h1 className="text-center">Politique de Confidentialité</h1>
        <p>
          Chez Rando Ouest, nous nous engageons à protéger la confidentialité et la sécurité de vos
          informations personnelles. Cette politique explique comment nous collectons, utilisons et
          protégeons vos données.
        </p>

        <h2>1. Collecte des informations</h2>
        <p>Nous collectons les informations suivantes lorsque vous utilisez notre site :</p>
        <ul>
          <li>Nom et adresse email (fournis lors de la création de contenu ou du contact).</li>
          <li>Pages visitées et interactions avec le site.</li>
          <li>Fichiers téléchargés ou publiés (ex. images des articles de blog).</li>
        </ul>

        <h2>2. Utilisation des informations</h2>
        <ul>
          <li>Afficher et partager vos avis sur les chemins de randonnées.</li>
          <li>Améliorer l'expérience utilisateur sur le site.</li>
          <li>Publier et afficher vos contributions (articles et images).</li>
          <li>Répondre à vos questions ou demandes via le formulaire de contact.</li>
        </ul>

        <h2>3. Partage des informations</h2>
        <p>
          Nous ne partageons pas vos informations personnelles avec des tiers, sauf dans les cas suivants :
        </p>
        <ul>
          <li>Obligation légale.</li>
          <li>Avec des prestataires de services nécessaires au bon fonctionnement du site.</li>
        </ul>

        <h2>4. Sécurité des données</h2>
        <p>
          Nous appliquons des mesures techniques et organisationnelles pour protéger vos données
          contre tout accès non autorisé, perte ou altération.
        </p>

        <h2>5. Cookies</h2>
        <p>
          Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez configurer votre
          navigateur pour les désactiver, bien que certaines fonctionnalités puissent être affectées.
        </p>

        <h2>6. Vos droits</h2>
        <ul>
          <li>Accéder à vos données personnelles.</li>
          <li>Demander leur modification ou suppression.</li>
          <li>Limiter ou s'opposer à leur traitement.</li>
        </ul>
        <p>
          Contactez-nous à : <a href="mailto:privacy@randouest.fr">privacy@randouest.fr</a>.
        </p>

        <h2>7. Modifications de la Politique</h2>
        <p>
          Toute mise à jour sera publiée sur cette page avec une date de modification.
        </p>

        <p className="mt-4 text-center">Dernière mise à jour : [date].</p>
      </Container>
    </div>
  );
};

export default PrivacyPage;
