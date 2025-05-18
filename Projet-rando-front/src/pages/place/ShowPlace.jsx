import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import DarkModeForm from "../../components/DarkModeForm"; // Ajout de l'import manquant

// Déclaration correcte de l'icône personnalisée
const customIcon = new L.Icon({
  iconUrl: `${process.env.REACT_APP_API_URL}/storage/app/public/uploads/icon-randonneur.png`,
  alt: "Icons",
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const ShowPlace = () => {
  const { id } = useParams(); // Récupération de l'ID du lieu via l'URL
  const [place, setPlace] = useState(null); // Stocker les détails du lieu
  const [loading, setLoading] = useState(true); // Gestion du chargement

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/place/${id}`
        );
        setPlace(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du lieu :",
          error
        );
      } finally {
        setLoading(false); // S'assurer que le chargement est stoppé même en cas d'erreur
      }
    };

    fetchPlaceDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Chargement des informations...</p>;
  }

  if (!place) {
    return <p className="text-center mt-5">Aucun lieu trouvé.</p>;
  }

  return (
    <div className="page-wrapper">
      <DarkModeForm />
      <Menu />
      <div className="root">
        <div className="container-fluid">
          <div className="container mt-5">
            <h2 className="pb-2 border-bottom">
              Détails du lieu : {place.name_place}
            </h2>

            <div className="text-center">
              <img
                src={`${process.env.REACT_APP_API_URL_IMG}/storage/app/public/uploads/${place.image_place}`}
                alt={place.name_place}
                width="300px"
                className="mb-3"
              />
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                <strong>Nom :</strong> {place.name_place}
              </li>
              <li className="list-group-item">
                <strong>Description :</strong> {place.description_place}
              </li>
              <li className="list-group-item">
                <strong>Distance :</strong> {place.distance_place} km
              </li>
              <li className="list-group-item">
                <strong>Difficulté :</strong> {place.difficulty_place}
              </li>
              <li className="list-group-item">
                <strong>Temps estimé :</strong> {place.estimated_time_place}
              </li>
            </ul>

            <h3 className="mt-4">Localisation</h3>
            <MapContainer
              style={{ height: "300px", width: "100%" }}
              center={[place.latitude_place, place.longitude_place]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={[place.latitude_place, place.longitude_place]}
                icon={customIcon}
              >
                <Popup>{place.name_place}</Popup>
              </Marker>
            </MapContainer>

            <div className="mt-4">
              <Link to="/place" className="btn btn-dark">
                Retour à la liste
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowPlace;
