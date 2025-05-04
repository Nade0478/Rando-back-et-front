import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNewPlace.css";
import { Link } from "react-router-dom";

const HomeNewPlace = () => {
  const items = [
    {
      id: 72,
      title: "Parcours de randonnée ville",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/cite-plantagenet72.jpg`,
      alt: "parcours cité Plantagenet 72 ville"
    },
    {
      id: 64,
      title: "Parcours de randonnée mer",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/GR34-Bretagne.jpg`,
      alt: "Parcours GR34 Bretagne"
    },
    {
      id: 66,
      title: "Parcours de randonnée campagne",
      image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/Vallee-Blavet56.jpg`,
      alt: "parcours vallée Blavet 56 campagne"
    },
  ];

  return (
    <section className="homeNewPlace">
      <h3 className="text-center">SITES DE RANDONNÉES</h3>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="image-container">
              <img src={item.image} alt={item.alt} />
            </div>
            <h3 className="item-title">{item.title}</h3>
            <Link to={`/place/show/${item.id}`} className="btn custom-btn">
              Découvrir
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeNewPlace;
