import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNewPlace.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const HomeNewPlace = () => {
  const [items, setItems] = React.useState([]);
    // {
    //   id: 72,
    //   title: "Parcours de randonnée ville",
    //   image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/cite-plantagenet72.jpg`,
    //   alt: "parcours cité Plantagenet 72 ville"
    // },
    // {
    //   id: 64,
    //   title: "Parcours de randonnée mer",
    //   image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/GR34-Bretagne.jpg`,
    //   alt: "Parcours GR34 Bretagne"
    // },
    // {
    //   id: 66,
    //   title: "Parcours de randonnée campagne",
    //   image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/Vallee-Blavet56.jpg`,
    //   alt: "parcours vallée Blavet 56 campagne"
    // },

    useEffect(() => {
      displayNewPlace(); // Appel de la fonction pour récupérer les lieux au montage du composant
    }, []);
  
    const displayNewPlace = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/place-home`);
        setItems(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux :", error);
      }
    };

  return (
    <section className="homeNewPlace">
      <h3 className="text-center">SITES DE RANDONNÉES</h3>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="image-container">
              <Link to={`/place/show/${item.id}`}>
                <img src={item.image} alt={item.title_place} />
              </Link>
            </div>
            <h3 className="item-title">{item.title_place}</h3>
            <p>{item.content_place}</p>
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
