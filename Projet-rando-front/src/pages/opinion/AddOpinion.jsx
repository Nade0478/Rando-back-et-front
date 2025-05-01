import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const OpinionAdd = () => {
  const navigate = useNavigate();

  const [title_opinion, setTitle_opinion] = useState("");
  const [content_opinion, setContent_opinion] = useState("");
  const [note_opinion, setNote_opinion] = useState("");
  const [userId, setUserId] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [validationError, setValidationError] = useState({});
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/place`);
        setPlaces(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des lieux :", error);
      }
    };

    fetchUsers();
    fetchPlaces();
  }, []);

  const addOpinion = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title_opinion", title_opinion);
    formData.append("content_opinion", content_opinion);
    formData.append("note_opinion", note_opinion);
    formData.append("user_id", parseInt(userId, 10));
    formData.append("place_id", parseInt(placeId, 10));

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/opinion`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      navigate("/opinion");
    } catch ({ response }) {
      if (response.status === 422) {
        setValidationError(response.data.errors);
      }
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Créer une nouvelle opinion</h4>
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
            <Form onSubmit={addOpinion}>
              <Row>
                <Col>
                  <Form.Group controlId="title_opinion">
                    <Form.Label>Titre de l'opinion</Form.Label>
                    <Form.Control
                      type="text"
                      value={title_opinion}
                      onChange={(e) => setTitle_opinion(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="content_opinion">
                    <Form.Label>Contenu</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      value={content_opinion}
                      onChange={(e) => setContent_opinion(e.target.value)}
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
                      as="select"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un utilisateur</option>
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
                  <Form.Group controlId="place_id">
                    <Form.Label>Lieux</Form.Label>
                    <Form.Control
                      as="select"
                      value={placeId}
                      onChange={(e) => setPlaceId(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un endroit</option>
                      {places.map((place) => (
                        <option key={place.id} value={place.id}>
                          {place.name_place}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="note_opinion">
                    <Form.Label>Note de 0 à 5</Form.Label>
                    <Form.Control
                      type="number"
                      value={note_opinion}
                      onChange={(e) => setNote_opinion(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="success" className="mt-3 w-100" type="submit">
                Ajouter l'opinion
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpinionAdd;
