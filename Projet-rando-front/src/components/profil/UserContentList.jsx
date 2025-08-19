import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Alert } from "react-bootstrap";

const UserContentList = ({ id_user, refreshKey }) => {
  const [articles, setArticles] = useState([]);
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError("");

      try {
        const [articleRes, opinionRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/article`),
          axios.get(`${process.env.REACT_APP_API_URL}/opinion`)
        ]);

        const userArticles = articleRes.data
          .filter(
            (article) =>
              article.user_id === parseInt(id_user) && article.validated === true
          )
          .sort((a, b) => new Date(b.date_article) - new Date(a.date_article));

        const userOpinions = opinionRes.data
          .filter(
            (opinion) =>
              opinion.user_id === parseInt(id_user) && opinion.validated === true
          )
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setArticles(userArticles);
        setOpinions(userOpinions);
      } catch (err) {
        setError("Erreur lors du chargement des contenus.");
      } finally {
        setLoading(false);
      }
    };

    if (id_user) {
      fetchContent();
    }
  }, [id_user, refreshKey]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="mt-4">
      <h3>📝 Vos articles validés</h3>
      {articles.length > 0 ? (
        articles.map((article) => (
          <Card key={article.id} className="mb-3">
            {article.image_article && (
              <Card.Img
                variant="top"
                src={`${process.env.REACT_APP_API_URL}/images/${article.image_article}`}
                alt="Illustration de l'article"
              />
            )}
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>{article.content}</Card.Text>
              <Card.Text>
                <strong>Date :</strong>{" "}
                {new Date(article.date_article).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Aucun article validé trouvé.</p>
      )}

      <h3 className="mt-5">💬 Vos opinions validées</h3>
      {opinions.length > 0 ? (
        opinions.map((opinion) => (
          <Card key={opinion.id} className="mb-3">
            <Card.Body>
              <Card.Title>{opinion.title_opinion}</Card.Title>
              <Card.Text>{opinion.content_opinion}</Card.Text>
              <Card.Text>
                <strong>Note :</strong> {opinion.note_opinion}/5
              </Card.Text>
              <Card.Text>
                <strong>Date :</strong>{" "}
                {new Date(opinion.created_at).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Aucune opinion validée trouvée.</p>
      )}
    </div>
  );
};

export default UserContentList;
