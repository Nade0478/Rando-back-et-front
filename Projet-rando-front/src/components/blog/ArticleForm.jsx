import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleCards from "./ArticleCards";

const ArticleForm = () => {
  const [articles, setArticles] = useState([]);

  // Chargement des articles lors du montage du composant
  useEffect(() => {
    fetchArticles();
  }, []);

  // Fonction pour récupérer les articles depuis l'API
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/article");
      if (response.data && response.data.data) {
        setArticles(response.data.data); // Mise à jour de l'état avec les articles récupérés
      } else {
        console.warn("Aucune donnée d'article reçue.");
        setArticles([]);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      alert("Une erreur est survenue lors du chargement des articles.");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="pb-2 border-bottom">VOICI LA LISTE DE NOS ARTICLES</h3>
      <ArticleCards articles={articles} /> {/* Composant enfant qui affiche les cartes */}
    </div>
  );
};

export default ArticleForm;
