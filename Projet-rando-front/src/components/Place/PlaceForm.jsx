import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../components/home/HomeNew.css';
import { Link } from "react-router-dom";


const PlaceForm = () => {
    const items = [
    
        {
          id: 1,
          title: "Alpes Mancelles",
          description: "Découvrez les paysages époustouflants des Alpes Mancelles.",
          image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/alpes-mancelle72_1742481051.jpg`,
          alt: "Alpes Mancelles",
    
        },
        {
          id: 2,
          title: "Circuit des vignes",
          description: "Parcourez les vignobles pittoresques de la région.",
          image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/circuit-des-vignes72_1743030460.jpg`,
          alt: "Circuit des vignes"
        },
        {
          id: 3,
          title: "Vallée Ernée",
          description: "Explorez la beauté naturelle de la Vallée Ernée.",
          image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/vallée-ernée49_1742477785.jpg`,
          alt: "Vallée Ernée"
        }
    
      ];
    
      return (
        <section className="nouveautes">
          <h3>SITE DE RANDONNES VEDETTES</h3>
          <div className="items">
            {items.map((item, index) => (
              <div key={index} className="item">
                <Link to={`/place/show/${item.id}`}>
                  <div className="image-container">
                    <img src={item.image} alt={item.title} />
                  </div>
                </Link>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link to={`/place/show/${item.id}`} className="btn btn-success">
                  Découvrir
                </Link>
              </div>
            ))}
          </div>
        </section>
      );
    };

export default PlaceForm;
