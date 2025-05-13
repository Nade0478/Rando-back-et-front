import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeNewArticle = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    displayArticleHome(); // Appel de la fonction pour récupérer les articles au montage du composant
  }, []);

  const displayArticleHome = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/article-home`
      );
      setItems(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    }
  };

  return (
    <section className="homeNewArticle">
      <div className="page-container">
        <h3 className="text-center">ARTICLES</h3>

        {/* Scroll horizontal */}
        <div className="items scroll-container">
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
      </div>
    </section>
  );
};

export default HomeNewArticle;
