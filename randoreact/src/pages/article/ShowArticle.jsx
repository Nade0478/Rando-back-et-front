import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import DarkModeForm from "../../components/DarkModeForm"; // Ajout de l'import manquant
import "../../styles/style.css";
import { Link } from "react-router-dom";

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
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
    } finally {
      setLoading(false); // Garantir l'arrêt du chargement même en cas d'erreur
    }
  }, [id]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (!article) {
    return <p>L'article demandé est introuvable.</p>;
  }

  return (
    <div className="page-wrapper">
      <DarkModeForm />
      <Menu />
      <div className="root">
        <div className="container-fluid">
          <div className="container mt-5">
            <h1 className="text-center">{article.title_article}</h1>

            {article.image_article && (
              <div className="text-center my-4">
                <img
                  src={`${process.env.REACT_APP_API_URL_IMG}/${article.image_article}`}
                  alt={article.title_article}
                  className="img-fluid"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            )}

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
            <p className="content-article">
              <strong>Contenu :</strong> {article.content_article}
            </p>
          </div>
          <div className="mt-4">
              <Link to="/article" className="btn btn-dark">
                Retour à la liste
              </Link>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowArticle;
