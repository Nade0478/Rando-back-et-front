import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
import { Link } from "react-router-dom";

const HomeNewArticle = () => {
  const items = [
    {
      id: 52,
      title: "Expertise locale",
      description: "Nos itinéraires sont conçus pour vous faire découvrir les trésors cachés.",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/cartes-trésor.png`,
    },
    {
      id: 54,
      title: "Descriptions des parcours",
      description: "Chaque itinéraire est accompagné de descriptions détaillées.",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/Site-historique.jpg`,
    },
    {
      id: 53,
      title: "Cartes interactives",
      description: "Accédez à des cartes détaillées et interactives pour planifier vos randonnées.",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/carte-randonnée.png`,
    },
  ];

  return (
    <section className="homeNewArticle">
      <h3 className="text-center">ARTICLES</h3>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="image-container">
              <Link to={`/article/show/${item.id}`}>
                <img src={item.image} alt={item.title} />
              </Link>
            </div>
            <h3 className="item-title">{item.title}</h3>
            <p>{item.description}</p>
            <Link to={`/article/show/${item.id}`} className="btn custom-btn">
              Découvrir
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeNewArticle;