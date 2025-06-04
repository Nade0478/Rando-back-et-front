import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeNewArticle = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/article-home`
        );
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Données API inattendues :", response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };
    

    fetchArticles(); // Appel de la fonction au montage du composant
  }, []);

  return (
    <section className="homeNewArticle">
      <div className="page-container">
        <h3 className="text-center">ARTICLES</h3>

        {/* Vérification de la présence des articles avant affichage */}
        {items.length > 0 ? (
          <div className="items scroll-container">
            {items.map((item) => (
              <div key={item.id} className="item">
                <div className="image-container">
                  <Link to={`/article/show/${item.id}`}>
                    <img
                      src={`${process.env.REACT_APP_API_URL_IMG}/${item.image_article}`}
                      alt={item.title_article}
                      width="75px"
                    />
                  </Link>
                </div>
                <h3 className="item-title">{item.title_article}</h3>
                <Link
                  to={`/article/show/${item.id}`}
                  className="btn custom-btn"
                >
                  Découvrir
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">
            Aucun article disponible pour le moment.
          </p>
        )}
      </div>
    </section>
  );
};

export default HomeNewArticle;
