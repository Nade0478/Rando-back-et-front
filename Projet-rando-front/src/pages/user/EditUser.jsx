import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState(""); 
  const [role_id, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/user/${id}`);
        setName(res.data.name || res.data.name_user);
        setEmail(res.data.email || res.data.email_user);
        setRoleId(res.data.role_id);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur :", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/role");
        setRoles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles :", error);
      }
    };

    fetchUserData();
    fetchRoles();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      role_id: parseInt(role_id, 10),
    };

    if (password) {
      formData.password = password;
      formData.password_confirmation = passwordConfirmation;
    }

    try {
      await axios.patch(`http://127.0.0.1:8000/api/user/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      navigate("/user");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Modifier un utilisateur</h4>
            <hr />
            {Object.keys(validationError).length > 0 && (
              <div className="alert alert-danger">
                <ul className="mb-0">
                  {Object.entries(validationError).map(([key, value]) => (
                    <li key={key}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            <Form onSubmit={updateUser}>
              <Row>
                <Col md={12}> {/* Tous les champs sont alignés sur une seule colonne */}
                  <Form.Group controlId="name">
                  <Form.Label className="text-center w-100">Nom</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="email" className="mt-10">
                  <Form.Label className="text-center w-100">Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="password" className="mt-10">
                  <Form.Label className="text-center w-100">Mot de passe (optionnel)</Form.Label>
                    <Form.Control type="password" placeholder="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="passwordConfirmation" className="mt-10">
                  <Form.Label className="text-center w-100">Confirmation du mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Confirmez votre mot de passe" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="role_id" className="mt-10">
                  <Form.Label className="text-center w-100">Rôle</Form.Label>
                    <Form.Control as="select" value={role_id} onChange={(e) => setRoleId(e.target.value)}>
                      <option value="">Sélectionnez un rôle</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.role}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="dark" className="mt-4 w-100" type="submit">
                Mettre à jour
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
