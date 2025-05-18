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
            "Chez Rando-Ouest, nous ne sommes pas juste des randonneurs. Nous
            sommes des explorateurs, des amoureux de la nature et des partageurs
            d’expériences. Si vous cherchez un groupe engagé, bienveillant et
            dynamique, vous êtes au bon endroit !"
          </p>

          <block>
            <p>
              "Explorer, c’est bien. Protéger, c’est mieux !" Nous sensibilisons
              nos membres à des pratiques écoresponsables, en privilégiant le
              respect des sentiers, la faune et la flore.
            </p>
          </block>
          <p>
            Grâce à nos recherches et notre expertise locale, nous vous
            proposons des sentiers uniques, loin des circuits trop touristiques.
            Vous découvrirez des paysages que peu connaissent !
          </p>
          <form>
            <article>
              <p>
                "Parce que nous allions découverte, convivialité et respect de
                l’environnement. Notre mission : transformer chaque randonnée en
                une expérience mémorable !"
              </p>
              {/* Ajoutez des champs de formulaire ici si nécessaire */}
            </article>
          </form>
        </div>
      </section>
    );
};

export default AboutForm3;