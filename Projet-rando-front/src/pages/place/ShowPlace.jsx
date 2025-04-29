import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Déclaration correcte de l'icône personnalisée
const customIcon = new L.Icon({
  iconUrl: `${process.env.REACT_APP_API_URL}/storage/public/uploads/icon-randonneur.png`,
  alt: "Icons",
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ShowOpinion = () => {
  const { id } = useParams();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilisation de useCallback pour stabiliser la fonction fetchOpinion
  const fetchOpinion = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/opinion/${id}`);
      setOpinion(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
      setLoading(false);
    }
  }, [id]); // Dépendance sur 'id'

  useEffect(() => {
    fetchOpinion();
  }, [fetchOpinion]); // Ajout de fetchOpinion comme dépendance

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (!opinion) {
    return <p>Le lieu demandé est introuvable.</p>;
  }

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <h1>{opinion.title_opinion}</h1>
        <p><strong>Titre de l'opinion :</strong> {opinion.title_opinion}</p>
        <p><strong>Contenu :</strong> {opinion.content_opinion}</p>
        <p><strong>Note :</strong> {opinion.note_opinion}</p>
        <p><strong>Auteur :</strong> {opinion.user && opinion.user.name}</p>
        <p><strong>Lieux :</strong> {opinion.place && opinion.place.name_place}</p>
        
        {/* Affichage de la carte avec les coordonnées du lieu */}
        {opinion.place && opinion.place.latitude_place && opinion.place.longitude_place && (
          <div className="mt-4">
            <h3>Localisation</h3>
            <MapContainer
              style={{ height: "300px", width: "100%" }}
              center={[opinion.place.latitude_place, opinion.place.longitude_place]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[opinion.place.latitude_place, opinion.place.longitude_place]}
                icon={customIcon}
              >
                <Popup>{opinion.place.name_place}</Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShowOpinion;
