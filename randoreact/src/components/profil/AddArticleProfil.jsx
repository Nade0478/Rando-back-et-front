import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "../profil/CardProfil.css";

const AddArticleProfil = ({ id_user }) => {
  const [title_article, setTitle_article] = useState("");
  const [date_article, setDate_article] = useState("");
  const [content_article, setContent_article] = useState("");
  const [userId, setUserId] = useState(id_user || "");
  const [categoryId, setCategoryId] = useState("");
  const [image_article, setImage_article] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const changeHandler = (e) => {
    setImage_article(e.target.files[0]);
  };

  const addArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_article", title_article);
    formData.append("date_article", date_article);
    formData.append("content_article", content_article);
    formData.append("user_id", userId);
    formData.append("category_id", categoryId);
    if (image_article) {
      formData.append("image_article", image_article);
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/article`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Réinitialisation du formulaire
      setTitle_article("");
      setDate_article("");
      setContent_article("");
      setCategoryId("");
      setImage_article(null);
      setValidationError({});
      setSuccessMessage("Article créé avec succès !");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Erreur inattendue :", error.response || "Pas de réponse reçue");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="root">
        <div className="container-fluid">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Création d'un nouvel article</h4>
                    <hr />

                    {successMessage && (
                      <Alert variant="success" className="mt-3">
                        {successMessage}
                      </Alert>
                    )}

                    {Object.keys(validationError).length > 0 && (
                      <Alert variant="danger">
                        <ul>
                          {Object.entries(validationError).map(([key, value]) => (
                            <li key={key}>{value}</li>
                          ))}
                        </ul>
                      </Alert>
                    )}

                    <Form onSubmit={addArticle}>
                      <Row>
                        <Col>
                          <Form.Group controlId="title_article">
                            <Form.Label>Nom de l'article</Form.Label>
                            <Form.Control
                              type="text"
                              value={title_article}
                              onChange={(e) => setTitle_article(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group controlId="image_article">
                            <Form.Label>Image de l'article</Form.Label>
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={changeHandler}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group controlId="date_article">
                            <Form.Label>Date et heure</Form.Label>
                            <Form.Control
                              type="datetime-local"
                              value={date_article}
                              onChange={(e) => setDate_article(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group controlId="content_article">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={5}
                              value={content_article}
                              onChange={(e) => setContent_article(e.target.value)}
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group controlId="user_id">
                            <Form.Label>Auteur</Form.Label>
                            <Form.Control
                              type="text"
                              value={`Utilisateur #${userId}`}
                              disabled
                              readOnly
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group controlId="category_id">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Select
                              value={categoryId}
                              onChange={(e) => setCategoryId(e.target.value)}
                              required
                            >
                              <option value="">Sélectionner une catégorie</option>
                              {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name_category}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button variant="success" className="mt-2 w-100" type="submit">
                        Créer
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddArticleProfil;
