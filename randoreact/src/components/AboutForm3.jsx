import React from "react";
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const AboutForm3 = () => {
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
          <p>
            🌿 Cartes interactives améliorées : Explorez facilement vos parcours
            avec un système de navigation enrichi.
          </p>

          <block>
            <p>
              Nouveaux itinéraires : Ajout de sentiers encore méconnus pour les
              aventuriers en quête d’expériences inédites.
            </p>
          </block>
          <p>
            Événements exclusifs : Rencontres et randonnées collectives pour se
            connecter avec d’autres passionnés.
          </p>
          <form>
            <article>
              <p>
                Nous continuons d’améliorer Rando-Ouest pour offrir la meilleure
                expérience possible aux randonneurs. Rejoignez-nous et partez à
                l’aventure !
              </p>
              {/* Ajoutez des champs de formulaire ici si nécessaire */}
            </article>
          </form>
        </div>
      </section>
    );
};

export default AboutForm3;