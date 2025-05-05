import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import Sidebar from "../../components/admin/Sidebar";
import "../../styles/style.css";

const Article = () => {
  const [articles, setArticles] = useState([]); // Correction du nom pour plus de clarté
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  // const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    displayArticles();
  }, []);

  const displayArticles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/article`);
      const fetchedArticles = response.data.data || []; // Vérification de la structure des données
      setArticles(fetchedArticles);
      setTitles(fetchedArticles.map((article) => article.title_article));
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      alert("Une erreur est survenue lors du chargement des articles.");
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/article/${id}`);
      alert("Article supprimé avec succès !");
      displayArticles(); // Actualise la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de l'article.");
    }
  };

  const filteredArticles = articles.filter((article) => {
    return (
      !selectedTitle ||
      (article.title_article && article.title_article === selectedTitle)
    );
  });

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <Link to={`/article/add/`} className="btn btn-dark me-2">
          Créer nouveau article
        </Link>

        <div className="d-flex justify-content-between mb-3">
          <FilterDropdown
            items={titles}
            selectedItem={selectedTitle}
            onChange={setSelectedTitle}
          />
          <button
            className="btn btn-secondary"
            onClick={() => setSelectedTitle(null)}
          >
            Réinitialiser le filtre
          </button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre de l'article</th>
              <th>Image</th>
              <th>Date</th>
              <th>Contenu</th>
              <th>Catégorie</th>
              <th>Auteur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.map((article) => (
              <tr key={article.id}>
                <td>{article.title_article}</td>
                <td>
                  {article.image_article ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/storage/public/uploads/${article.image_article}`}
                      alt={article.title_article}
                      width="75px"
                    />
                  ) : (
                    <p>Aucune image</p>
                  )}
                </td>
                <td>{new Date(article.date_article).toLocaleDateString()}</td>
                <td className="content-article">{article.content_article}</td>
                <td>{article.category?.name_category || "Aucune catégorie"}</td>
                <td>{article.user?.name || "Auteur inconnu"}</td>
                <td>
                  <Link
                    to={`/article/edit/${article.id}`}
                    className="btn btn-light me-2"
                  >
                    Modifier
                  </Link>
                  <Link
                    to={`/article/show/${article.id}`}
                    className="btn btn-light me-2"
                  >
                    Montrer
                  </Link>
                  <Button
                    variant="dark"
                    onClick={() => deleteArticle(article.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Article;
