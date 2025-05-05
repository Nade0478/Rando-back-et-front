import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
import { Link } from "react-router-dom";
// import "../../styles/style.css";
import axios from "axios";
import { useEffect } from "react";

const HomeNewArticle = () => {
  const [items, setItems] = React.useState([]);
  // const items = [
  //   {
  //     id: 1,
  //     title: "Expertise locale",
  //     description: "Nos itinéraires sont conçus pour vous faire découvrir les trésors cachés.",
  //     image: `${process.env.REACT_APP_API_URL}/storage/app/public/public/uploads/alpes-mancelle72_1742481007.jpg`,
  //   },
  //   {
  //     id: 54,
  //     title: "Descriptions des parcours",
  //     description: "Chaque itinéraire est accompagné de descriptions détaillées.",
  //     image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/Site-historique.jpg`,
  //   },
  //   {
  //     id: 53,
  //     title: "Cartes interactives",
  //     description: "Accédez à des cartes détaillées et interactives pour planifier vos randonnées.",
  //     image: `${process.env.REACT_APP_API_URL}/storage/public/uploads/carte-randonnée.png`,
  //   },
  // ];

useEffect(() => {
    displayArticleHome(); // Appel de la fonction pour récupérer les articles au montage du composant
  }, []);

  const displayArticleHome = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/article-home`);
      setItems(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux :", error);
    }
  };

  return (
    <section className="homeNewArticle">
      <h3 className="text-center">ARTICLES</h3>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <div className="image-container">
              <Link to={`/article/show/${item.id}`}>
                <img src={item.image} alt={item.title_article} />
              </Link>
            </div>
            <h3 className="item-title">{item.title_article}</h3>
            <p>{item.content_article}</p>
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