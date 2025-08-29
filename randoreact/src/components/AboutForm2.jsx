import React from "react";
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AboutForm2 = () => {
    return (
      <section
      // className="presentation"
      // // style={{
      //     backgroundImage: `url(`${process.env.REACT_APP_API_URL}/storage/public/uploads/cheminForet_1742477581.png`)`, // Assurez-vous que ce chemin est correct
      //     backgroundSize: 'cover',
      //     backgroundPosition: 'center'
      // }}
      >
        <div className="content">
          <p>Pourquoi choisir Rando Ouest ?</p>

          <block>
            <p>
              Passion pour la randonnée – Nous sommes avant tout des passionnés
              de nature et d'aventure. Nous avons conçu Rando Ouest pour
              partager les meilleurs itinéraires avec une communauté engagée.
            </p>
          </block>
          <p>
            Itinéraires authentiques et vérifiés – Chaque randonnée est
            soigneusement sélectionnée et vérifiée pour garantir une expérience
            immersive et sécurisée.
          </p>
          <form>
            <article>
              <p>
                Accessibilité et diversité – Que tu sois randonneur débutant ou expérimenté, nous proposons des parcours adaptés à tous les niveaux.
              </p>
              {/* Ajoutez des champs de formulaire ici si nécessaire */}
            </article>
          </form>
        </div>
      </section>
    );
};

export default AboutForm2;