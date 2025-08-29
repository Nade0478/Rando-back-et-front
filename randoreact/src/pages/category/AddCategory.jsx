import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AddCategory = () => {
  const navigate = useNavigate();
  const [nameCategory, setNameCategory] = useState(""); 
  const [validationError, setValidationError] = useState({});

  // Fonction pour ajouter une catégorie
  const addCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name_category", nameCategory);

    try {
      // Envoi de la requête POST
      await axios.post(
        `${process.env.REACT_APP_API_URL}/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Authentification
          },
        }
      );
      navigate("/category"); // Redirection après succès
    } catch (error) {
      const { response } = error;
      if (response && response.status === 422) {
        setValidationError(response.data.errors); // Gestion des erreurs de validation
      } else {
        console.error("Erreur inattendue :", response || "Pas de réponse reçue");
      }
    }
  };

  return (
    <div className="container mt-5">
      <Sidebar />
      <h4>Créer une nouvelle catégorie</h4>
      <Form onSubmit={addCategory}> {/* La fonction est utilisée ici */}
        <Row>
          <Col>
            <Form.Group controlId="Name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="dark" type="submit" className="mt-3">
          Créer une catégorie
        </Button>
      </Form>
      {Object.keys(validationError).length > 0 && (
        <div className="mt-3">
          <h6>Erreurs de validation :</h6>
          <ul>
            {Object.entries(validationError).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
