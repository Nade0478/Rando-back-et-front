import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModifProfil = ({ id_user, name_user, email_user }) => {
  const [name, setName] = useState(name_user);
  const [email, setEmail] = useState(email_user);
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setName(name_user);
    setEmail(email_user);
  }, [name_user, email_user]);

  const updateUser = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      ...(password && { password }) // N'ajoute password que s'il est fourni
    };

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/user/${id_user}`,
        userData
      );


      setMessage("Profil mis à jour avec succès !");
      setTimeout(() => navigate("/profil"), 2000); // Redirection après 2 sec
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      } else {
        console.error("Erreur inattendue :", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <h2>Modifier votre profil</h2>
        <div className="card-body">
          {message && <Alert variant="success">{message}</Alert>}
          {Object.keys(validationError).length > 0 && (
            <Alert variant="danger">
              <ul>
                {Object.entries(validationError).map(([key, value]) => (
                  <li key={key}>{Array.isArray(value) ? value.join(", ") : value}</li>
                ))}
              </ul>
            </Alert>
          )}
          <Form onSubmit={updateUser}>
            <Row>
              <Col>
                <Form.Group controlId="name_user">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="email_user">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="password_user">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="btn btn-success mt-3">
              Mettre à jour
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModifProfil;


