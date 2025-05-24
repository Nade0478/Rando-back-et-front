import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import DarkModeForm from "../../components/DarkModeForm";
// Déclaration de l'icône personnalisée
const customIcon = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-bluesky" viewBox="0 0 16 16"><path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/></svg>',
  className: "",
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
      <Menu />
      <DarkModeForm />
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
