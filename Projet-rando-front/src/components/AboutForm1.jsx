import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./About.css";

const AboutForm1 = () => {
  return (
    <section
      className="presentation"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_API_URL}/storage/public/uploads/cheminForet_1742477581.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="content">
        <p>
          Face à l’abondance d’informations sur les randonnées, il peut être
          difficile de trouver des sources fiables et adaptées à ses besoins.
          C’est ici que Rando-Ouest intervient !
        </p>

        <h5>Ce que nous offrons :</h5>
        <ul>
          <li>
            Une sélection d’itinéraires authentiques avec des conseils
            détaillés.
          </li>
          <li>
            Des fiches complètes comprenant difficulté, durée et points
            d’intérêt.
          </li>
          <li>
            Une communauté passionnée, prête à partager astuces et bons plans.
          </li>
          <li>
            Une approche responsable qui encourage le respect de la nature et la
            préservation des sentiers.
          </li>
        </ul>

        <p>
          Notre mission est simple : vous aider à profiter pleinement de vos
          randonnées avec des ressources claires, fiables et inspirantes !
        </p>

        <form>
          <article>
            <p>
              Inscrivez-vous pour recevoir nos itinéraires et conseils
              exclusifs.
            </p>
            {/* Ajoutez des champs de formulaire ici si nécessaire */}
          </article>
        </form>
      </div>
    </section>
  );
};

export default AboutForm1;
