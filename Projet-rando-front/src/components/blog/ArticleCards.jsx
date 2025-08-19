import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// import FilterDropdown from "../FilterDropdown";

const ArticleCards = ({ articles }) => {
  return (
    <div className="container mt-4">
    <Link to={`/article/add/`}>
      <Button variant="dark">Créer ton article</Button>
    </Link>      
      <h3 className="pb-2 border-bottom">Les Articles</h3>
      <div className="row text-center">
        {articles.map((article) => (
          <div key={article.id} className="col-md-12 mb-2">
            <Card>
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_API_URL_IMG}/${article.image_article}`}
                alt={article.title_article || "Image non disponible"}
                width="75px"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none"; // cache l'image cassée

                  const fallback = document.createElement("div");
                  fallback.className = "fallback-image";
                  e.target.parentNode.appendChild(fallback);
                }}
              />
              <Card.Body>
                <Card.Title>
                  {article.title_article || "Titre non disponible"}
                </Card.Title>
                <Card.Text>
                  <strong>Contenu : </strong>
                  {article.content_article || "Contenu non disponible"}
                </Card.Text>
                <Link to={`/article/show/${article.id}`}>
                  <Button variant="secondary">Voir</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleCards;

