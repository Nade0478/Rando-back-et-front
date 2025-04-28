import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  // ✅ States for each input field
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [validationError, setValidationError] = useState({});

  const addUser = async (e) => {
    e.preventDefault();

    // ✅ Correcting field names expected by Laravel backend
    const formData = new FormData();
    formData.append("name", nameUser);
    formData.append("email", emailUser);
    formData.append("password", passwordUser);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/user",
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      navigate("/user"); // Redirect after successful user creation
    } catch ({ response }) {
      if (response && response.status === 422) {
        setValidationError(response.data.errors); // Handle validation errors
      } else {
        console.error("Unexpected error:", response);
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
        <Button variant="dark" type="submit" className="mt-3">
          Créer un utilisateur
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

export default AddUser;
