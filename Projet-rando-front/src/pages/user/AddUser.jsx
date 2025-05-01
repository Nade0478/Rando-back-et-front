import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  // States for each input field
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [confirmPasswordUser, setConfirmPasswordUser] = useState(""); // Ajout de la confirmation
  const [validationError, setValidationError] = useState({});

  const addUser = async (e) => {
    e.preventDefault();

    // Vérifier que les mots de passe correspondent
    if (passwordUser !== confirmPasswordUser) {
      setValidationError({ password: ["Les mots de passe ne correspondent pas."] });
      return;
    }

    const formData = new FormData();
    formData.append("name", nameUser);
    formData.append("email", emailUser);
    formData.append("password", passwordUser);
    formData.append("password_confirmation", confirmPasswordUser); // Ajout de la confirmation

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/user`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      navigate("/user"); // Redirection après succès
    } catch ({ response }) {
      if (response && response.status === 422) {
        setValidationError(response.data.errors); // Gestion des erreurs de validation côté Laravel
      } else {
        console.error("Erreur inattendue :", response);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h4>Créer un nouvel utilisateur</h4>
      <Form onSubmit={addUser}>
        <Row>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={emailUser}
                onChange={(e) => setEmailUser(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={passwordUser}
                onChange={(e) => setPasswordUser(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={confirmPasswordUser}
                onChange={(e) => setConfirmPasswordUser(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="dark" type="submit" className="mt-3">
          Créer un utilisateur
        </Button>
      </Form>

      {/* Affichage des erreurs */}
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

export default AddUser;
