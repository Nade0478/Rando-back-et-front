import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import "../profil/CardProfil.css";

const ProfileCard = ({ id_user }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/${id_user}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
        );
        setUser(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id_user]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <Spinner animation="border" />
        <p>Chargement des informations...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <Alert variant="danger">L'utilisateur demandé est introuvable.</Alert>
    );
  }

  return (
    <section className="profileCard">
      <div className="container mt-10 d-flex justify-content-center">
        <Card className="shadow-lg p-12" style={{ width: "40rem" }}>
          <Card.Body>
            <Card.Title className="text-center larger">
              <strong>{user.name}</strong>
            </Card.Title>
            <Card.Text>
              <strong>Email :</strong> {user.email}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </section>
  );
};

export default ProfileCard;
