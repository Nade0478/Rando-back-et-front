import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../styles/style.css";

const ShowArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/article/${id}`
      );
      setArticle(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (!article) {
    return <p>Le lieu demandé est introuvable.</p>;
  }

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <h1>{article.title_article}</h1>
        <p>
          <strong>Date :</strong> {article.date_article}
        </p>
        <p>
          <strong>Catégorie :</strong>{" "}
          {article.category?.name_category || "Aucune catégorie"}
        </p>
        <p>
          <strong>Auteur :</strong> {article.user?.name || "Auteur inconnu"}
        </p>
        <p>
          <strong>Contenu :</strong> {article.content_article}
        </p>
        <p>
          <strong>Image :</strong> {article.image_article}
        </p>

        <div className="row">
          <div className="col-md-6-center">
            {article.image_article && (
              <div className="image-component">
                <img
                  src={`${process.env.REACT_APP_API_URL}/storage/public/uploads/${article.image_article}`}
                  alt={article.title_article}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowArticle;
