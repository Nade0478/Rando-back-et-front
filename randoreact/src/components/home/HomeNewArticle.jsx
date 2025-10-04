import React, { useEffect, useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNew.css";
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
        const apiUrl = process.env.REACT_APP_API_URL || 'https://api.rando-ouest.com/api';        const response = await axios.get(`${apiUrl}/article-home`);
        console.log('Réponse API:', response.data); // Debug
        
        // Vérifier que la réponse contient des données JSON valides
        if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
          throw new Error("L'API retourne du HTML au lieu de JSON - Vérifiez votre configuration serveur");
        }
        
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
        
        // Valider que articlesData est un tableau
        if (!Array.isArray(articlesData)) {
          throw new Error('Les données reçues ne sont pas un tableau');
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
  const handleImageError = useCallback((e) => {
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
  }, []);

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
            <br />
            <small>API URL: {process.env.REACT_APP_API_URL}</small>
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
            {items.map((item, index) => (
              <div key={`article-${index}`} className="item">
                <div className="image-container">
                  <div className="static-link">
                    <img
                      src="/images/placeholder.jpg"
                      alt="Article"
                      width="75px"
                      onError={handleImageError}
                    />
                  </div>
                </div>
                <h3 className="item-title">Article #{index + 1}</h3>
                <p className="item-content">
                  Contenu de l'article disponible...
                </p>
                <div className="item-meta">
                  <small className="text-muted">
                    Par Auteur • Catégorie
                  </small>
                </div>
                <button
                  type="button"
                  className="btn custom-btn"
                  onClick={() => {
                    // Navigation programmatique sécurisée
                    window.location.href = `/article/show/${index + 1}`;
                  }}
                >
                  Découvrir
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>Aucun article disponible pour le moment.</p>
            <small className="text-muted">Vérifiez votre connexion API : {process.env.REACT_APP_API_URL}</small>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeNewArticle;