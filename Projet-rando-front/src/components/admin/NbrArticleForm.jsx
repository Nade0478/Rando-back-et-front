import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CardDashboard.css";

function NbrArticleForm() {
  const [articleCount, setArticleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/article`);

        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.statusText);
        }

        const data = await response.json();
        console.log("Données reçues :", data); // Vérifie ce que l'API renvoie

        // Vérifie si la pagination est activée et récupère le total des articles
        if (data.meta && data.meta.total) {
          setArticleCount(data.meta.total);
        } else if (data.data) {
          setArticleCount(data.data.length); // Cas où `data.data` contient les articles
        } else {
          setArticleCount(data.length); // Cas sans pagination
        }

      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    
    <div className="nbr-article-container text-center mt-4">
      {loading ? (
        <h1 className="text-primary">Chargement des données...</h1>
      ) : error ? (
        <h1 className="text-danger">Erreur : {error}</h1>
      ) : (
        <h1>Nombre total : <span className="text">{articleCount}</span></h1>
      )}
    </div>
  );
}

export default NbrArticleForm;


