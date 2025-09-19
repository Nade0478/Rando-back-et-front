import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeNewArticle = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        
        // URL corrigée pour votre API
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
        const response = await axios.get(`${apiUrl}/article-home`);
        
        console.log('Réponse API:', response.data); // Debug
        
        // Gestion des différents formats de réponse
        let articlesData;
        if (response.data.status === 'success' && response.data.data) {
          // Format : { status: "success", data: [...] }
          articlesData = response.data.data;
        } else if (Array.isArray(response.data)) {
          // Format : [...]
          articlesData = response.data;
        } else {
          throw new Error('Format de données inattendu');
        }
        
        setItems(articlesData);
        setError(null);
        
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        setError(error.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Gestion du fallback d'image améliorée
  const handleImageError = (e) => {
    e.target.style.display = "none";
    
    // Créer un div de fallback si il n'existe pas déjà
    if (!e.target.parentNode.querySelector('.fallback-image')) {
      const fallback = document.createElement("div");
      fallback.className = "fallback-image";
      fallback.style.cssText = `
        width: 75px; 
        height: 75px; 
        background-color: #f8f9fa; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        border: 1px solid #dee2e6;
        color: #6c757d;
        font-size: 12px;
      `;
      fallback.textContent = "Image indisponible";
      e.target.parentNode.appendChild(fallback);
    }
  };

  if (loading) {
    return (
      <section className="homeNewArticle">
        <div className="page-container">
          <h3 className="text-center">ARTICLES</h3>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="homeNewArticle">
        <div className="page-container">
          <h3 className="text-center">ARTICLES</h3>
          <div className="alert alert-danger text-center">
            Erreur : {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="homeNewArticle">
      <div className="page-container">
        <h3 className="text-center">ARTICLES</h3>

        {items.length > 0 ? (
          <div className="items scroll-container">
            {items.map((item) => (
              <div key={item.id} className="item">
                <div className="image-container">
                  <Link to={`/article/show/${item.id}`}>
                    <img
                      src={`${process.env.REACT_APP_IMAGES_URL || 'http://localhost:8080'}/images/${item.image_article}`}
                      alt={item.title_article}
                      width="75px"
                      onError={handleImageError}
                    />
                  </Link>
                </div>
                <h3 className="item-title">{item.title_article}</h3>
                <p className="item-content">
                  {item.content_article?.substring(0, 100)}
                  {item.content_article?.length > 100 ? '...' : ''}
                </p>
                <div className="item-meta">
                  <small className="text-muted">
                    Par {item.user?.name} • {item.category?.name_category}
                  </small>
                </div>
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