import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeHead.css";

const HomeHead = ({ item }) => {
  return (
    <section className="homeHead">
      <div
        className="image-container"
        style={{
          backgroundImage: `url('${process.env.REACT_APP_API_URL_IMG}/${
            item?.image_article ?? "arbre-centenaire.jpg"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="overlay">
          <div className="page-container">
            <div className="container text-container">
              <h1 className="titreHome">
                Bienvenue sur la page d'accueil de Rando-Ouest
              </h1>
              <div className="content-wrapper">
                <div className="text-box">
                  <p>
                    Rando-Ouest est votre guide ultime pour découvrir les
                    sentiers de randonnée pédestre les plus beaux et variés du
                    Grand Ouest de la France.
                  </p>
                </div>

                <div className="text-box">
                  <p>
                    Commencez votre exploration dès aujourd'hui avec Rando-Ouest
                    et organisez votre prochaine sortie en toute sérénité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHead;
