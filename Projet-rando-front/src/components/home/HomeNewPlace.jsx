import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNewPlace.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const HomeNewPlace = () => {
  const [items, setItems] = React.useState([]);
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
                <img src={`${process.env.REACT_APP_API_URL_IMG}/${item.image_place}`} alt={item.name_place} />
              </Link>
            </div>
            <h3 className="item-title">{item.name_place}</h3>
              <p className="content-place">{item.description_place.replace}</p>
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
