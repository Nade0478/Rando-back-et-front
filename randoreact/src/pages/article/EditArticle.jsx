import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const EditArticle = () => {
  const { article } = useParams();
  const navigate = useNavigate();

  const [title_article, setTitle_article] = useState("");
  const [date_article, setDate_article] = useState("");
  const [content_article, setContent_article] = useState("");
  const [image_article, setImage_article] = useState(null);
  const [userId, setUserId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [validationError, setValidationError] = useState({});

  // Récupérer les détails de l'article
  const getArticle = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/article/${article}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setTitle_article(res.data.title_article || "");
      setDate_article(res.data.date_article || "");
      setContent_article(res.data.content_article || "");
      setCategoryId(res.data.category_id || "");
      setUserId(res.data.user_id || "");
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article :", error);
    }
  }, [article]);

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  // Récupérer les catégories
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

  // Charger les données au montage du composant
  useEffect(() => {
    getArticle();
    fetchUsers();
    fetchCategories();
  }, [getArticle]);

  const changeHandler = (e) => {
    setImage_article(e.target.files[0]);
  };

  const updateArticle = async (e) => {
    e.preventDefault();

    if (
      !title_article ||
      !date_article ||
      !content_article ||
      !userId ||
      !categoryId
    ) {
      setValidationError({
        title_article: !title_article ? "Le titre est requis." : "",
        date_article: !date_article ? "La date est requise." : "",
        content_article: !content_article ? "Le contenu est requis." : "",
        user_id: !userId ? "L'auteur est requis." : "",
        category_id: !categoryId ? "La catégorie est requise." : "",
      });
      return;
    }

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("title_article", title_article);
    formData.append("date_article", date_article);
    formData.append("content_article", content_article);
    formData.append("user_id", userId);
    formData.append("category_id", categoryId);
    if (image_article) {
      formData.append("image_article", image_article);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/article/${article}`,
        formData
      );
      navigate("/article"); // Redirection après la mise à jour
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors); // Gestion des erreurs de validation
      } else {
        console.error("Erreur inattendue :", error);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Modifier un article</h4>
            <hr />
            <div className="form-wrapper">
              {Object.keys(validationError).length > 0 && (
                <div className="alert alert-danger">
                  <ul>
                    {Object.entries(validationError).map(([key, value]) => (
                      <li key={key}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Form onSubmit={updateArticle}>
                <Row>
                  <Col>
                    <Form.Group controlId="title_article">
                      <Form.Label>Titre de l'article</Form.Label>
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
                      <Form.Label>Date</Form.Label>
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
                      <Form.Label>Contenu</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={content_article}
                        onChange={(e) => setContent_article(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="user_id">
                      <Form.Label>Auteur</Form.Label>
                      <Form.Control
                        as="select"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      >
                        <option value="">Sélectionnez un auteur</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="category_id">
                      <Form.Label>Catégorie</Form.Label>
                      <Form.Control
                        as="select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name_category}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="image_article">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" onChange={changeHandler} />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="success"
                  type="submit"
                  className="mt-3"
                  block="block"
                >
                  Mettre à jour
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
