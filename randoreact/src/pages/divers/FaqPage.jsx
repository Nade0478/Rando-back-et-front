import React, { useState } from "react";
import Menu from "../../components/Menu";
import DarkModeForm from "../../components/DarkModeForm";

const faqData = [
  {
    question: "Quels sont les équipements indispensables pour randonner ?",
    answer: (
      <>
        <p>
          Pour une randonnée réussie, il est essentiel de bien s'équiper ! Voici
          les indispensables :
        </p>
        <ul>
          <li>
            <strong>Chaussures adaptées :</strong> Confortables avec une bonne
            accroche.
          </li>
          <li>
            <strong>Sac à dos :</strong> Pour transporter tes affaires sans te
            fatiguer.
          </li>
          <li>
            <strong>Eau :</strong> Une gourde ou un système d'hydratation.
          </li>
          <li>
            <strong>Vêtements adaptés :</strong> Superposition selon la météo.
          </li>
          <li>
            <strong>Carte ou GPS :</strong> Toujours savoir où tu es.
          </li>
          <li>
            <strong>Trousse de secours :</strong> Premiers soins en cas de
            blessure.
          </li>
          <li>
            <strong>Nourriture :</strong> En-cas énergétiques.
          </li>
          <li>
            <strong>Lampe frontale :</strong> Utile si la nuit tombe plus tôt.
          </li>
          <li>
            <strong>Protection solaire :</strong> Lunettes, crème, chapeau.
          </li>
          <li>
            <strong>Bâtons de randonnée :</strong> Soutien sur terrains
            accidentés.
          </li>
        </ul>
      </>
    ),
  },
  {
    question: "Faut-il une autorisation pour randonner sur certains sentiers ?",
    answer: (
      <>
        <p>
          Ça dépend du sentier ! En général, les chemins publics ne nécessitent
          pas d'autorisation.
        </p>
        <p>Voici quelques cas où une autorisation est requise :</p>
        <ul>
          <li>
            <strong>Réserves naturelles :</strong> Restrictions pour protéger la
            faune et la flore.
          </li>
          <li>
            <strong>Parcs nationaux :</strong> Certaines zones sont
            réglementées.
          </li>
          <li>
            <strong>Propriétés privées :</strong> Nécessite l'accord du
            propriétaire.
          </li>
          <li>
            <strong>Zones militaires :</strong> Parfois soumises à des
            autorisations spéciales.
          </li>
        </ul>
      </>
    ),
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button onClick={() => setIsOpen(!isOpen)} className="faq-question">
        {question}
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FaqPage = () => {
  return (
    <div className="page-wrapper">
      <Menu />
      <DarkModeForm /> {/* Ajout du dark mode */}
      <div className="root">
        <div className="container-fluid">
          <div className="container mt-5 card-wrapper">
            <div className="card">
              <div className="card-body">
                <h1>Foire Aux Questions - Randonnée</h1>
                {faqData.map((item, index) => (
                  <FAQItem key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
