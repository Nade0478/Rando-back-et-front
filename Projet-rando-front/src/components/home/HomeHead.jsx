import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeHead.css";

const HomeHead = () => {
  return (
    <section className="homeHead">
      <div className="image-container">
        <div className="overlay">
          <div className="container text-container">
            <h1 className="titreHome">Bienvenue sur la page d'accueil de Rando-Ouest</h1>
            <div className="content-wrapper">
              <div className="text-box">
                <p>
                  Rando-Ouest est votre guide ultime pour découvrir les sentiers de
                  randonnée pédestre les plus beaux et variés du Grand Ouest de la
                  France. Que vous soyez novice ou expérimenté, notre site vous
                  propose des itinéraires adaptés, des conseils pratiques et une
                  communauté de passionnés.
                </p>
              </div>

              <div className="text-box">
                <p>
                  Commencez votre exploration dès aujourd'hui avec Rando-Ouest. Que
                  vous soyez en quête de randonnées en famille, de défis sportifs ou
                  de moments de détente en pleine nature, notre site a tout ce qu'il
                  vous faut pour organiser votre prochaine sortie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHead;
