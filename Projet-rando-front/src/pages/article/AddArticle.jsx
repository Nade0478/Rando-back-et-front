import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Menu from "../../components/Menu";
import DarkModeForm from "../../components/DarkModeForm"; // Ajout de l'import manquant

const AddArticle = () => {
  const navigate = useNavigate();

  // Déclaration des états
  const [title_article, setTitle_article] = useState("");
  const [date_article, setDate_article] = useState("");
  const [content_article, setContent_article] = useState("");
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image_article, setImage_article] = useState(null);
  const [validationError, setValidationError] = useState({});
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchCategories();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/category`
      );
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
        },
      });
      navigate("/article");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error(
          "Erreur inattendue :",
          error.response || "Pas de réponse reçue"
        );
      }
    }
  };

  return (
    <div className="page-wrapper">
      <DarkModeForm />
      <Menu />
      <div className="root">
        <div className="container-fluid">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Création d'un nouvel article</h4>
                    <hr />
                    {Object.keys(validationError).length > 0 && (
                      <div className="alert alert-danger">
                        <ul>
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
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
                              onChange={(e) =>
                                setContent_article(e.target.value)
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group controlId="user_id">
                            <Form.Label>Auteur</Form.Label>
                            <Form.Select
                              value={userId}
                              onChange={(e) => setUserId(e.target.value)}
                            >
                              <option value="">Sélectionner un auteur</option>
                              {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                            </Form.Select>
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
                      <Button variant="success" className="mt-2" type="submit">
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
      <Footer />
    </div>
  );
};

export default AddArticle;
