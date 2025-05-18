import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './About.css';


const AboutForm1 = () => {
    return (
      <section
      // className="presentation"
      // style={{
      //     backgroundImage: `url(`${process.env.REACT_APP_API_URL}/storage/public/uploads/cheminForet_1742477581.png`)`, // Assurez-vous que ce chemin est correct
      //     backgroundSize: 'cover',
      //     backgroundPosition: 'center'
      // }}
      >
        <div className="content">
          <p>Randonnées découverte pour les novices.</p>

          <block>
            <p>Sentiers exigeants pour les aventuriers aguerris.</p>
          </block>
          <p>Randonnées nature axées sur la préservation de l’environnement.</p>
          <form>
            <article>
              <p>
                "Que vous soyez débutant ou marcheur confirmé, nous avons des
                parcours pour vous !"
            </p>
            <p>
                Prochaiement plus de fonctionnalités dans votre profil avec l'affichage de vos favoris.
            </p>
              {/* Ajoutez des champs de formulaire ici si nécessaire */}
            </article>
          </form>
        </div>
      </section>
    );
};

export default AboutForm1;