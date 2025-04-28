import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import axios from "axios";

const PagePlace = () => {
  const { id } = useParams(); 
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/place/${id}`);
        setPlace(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du lieu :", error);
        setError("Le lieu demandé est introuvable.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error || !place) {
    return <p className="text-center">{error}</p>;
  }

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card className="shadow-lg" style={{ width: "25rem" }}>
        {place.image_place && (
          <Card.Img 
            variant="top" 
            src={place.image_place} 
            alt={place.name_place} 
          />
        )}
        <Card.Body>
          <Card.Title className="text-center">{place.name_place}</Card.Title>
          <Card.Text>
            <strong>Description :</strong> {place.description_place} <br />
            <strong>Longitude :</strong> {place.longitude_place} <br />
            <strong>Latitude :</strong> {place.latitude_place} <br />
            <strong>Distance :</strong> {place.distance_place} km <br />
            <strong>Difficulté :</strong> {place.difficulty_place} <br />
            <strong>Temps estimé :</strong> {place.estimated_time_place}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PagePlace;
