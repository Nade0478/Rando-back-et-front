import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AddUser = () => {
  const navigate = useNavigate();

  // States pour les champs du formulaire
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [confirmPasswordUser, setConfirmPasswordUser] = useState("");
  const [validationError, setValidationError] = useState({});

  const addUser = async (e) => {
    e.preventDefault();

    // Vérification des champs requis
    if (!nameUser || !emailUser || !passwordUser || !confirmPasswordUser) {
      setValidationError({ general: ["Tous les champs sont obligatoires."] });
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (passwordUser !== confirmPasswordUser) {
      setValidationError({
        password: ["Les mots de passe ne correspondent pas."],
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", nameUser);
    formData.append("email", emailUser);
    formData.append("password", passwordUser);
    formData.append("password_confirmation", confirmPasswordUser);

    const token = localStorage.getItem("access_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user`, formData, {
        headers,
      });
      navigate("/user"); // Redirection après succès
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors); // Gestion des erreurs Laravel
      } else {
        setValidationError({
          general: ["Une erreur inattendue s'est produite."],
        });
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">
              Créer un nouvel utilisateur
            </h4>
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
            {validationError.general && (
              <p className="text-danger">{validationError.general}</p>
            )}
            {Object.entries(validationError).map(
              ([key, value]) =>
                key !== "general" && (
                  <li key={key} className="text-danger">
                    {value}
                  </li>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
