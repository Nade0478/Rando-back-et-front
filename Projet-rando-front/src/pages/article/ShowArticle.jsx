import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import "../../styles/style.css";

const ShowArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/article/${id}`
      );
      setArticle(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
      setLoading(false);
    }
  };

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

        {/* Image Component */}
        <div className="row">
          {/* Image Component */}
          <div className="col-md-6-center">
            {article.image_article && (
              <div className="image-component">
                <img
                  src={`http://127.0.0.1:8000/storage/public/uploads/${article.image_article}`}
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
