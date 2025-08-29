import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/admin/Sidebar";

// Déclaration correcte de l'icône personnalisée
const customIcon = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-bluesky" viewBox="0 0 16 16"><path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/></svg>',
  className: '',
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Place = () => {
  const [place, setPlace] = useState([]); 
  const [name_place, setName_place] = useState([]); 
  const [selectedName_place, setSelectedName_place] = useState(null); 

  // Charger les lieux au montage du composant
  useEffect(() => {
    displayPlace();
  }, []);

  // Fonction pour récupérer les lieux depuis l'API
  const displayPlace = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/place`);
      setPlace(response.data); 
      setName_place(response.data.map((place) => place.name_place));
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux :", error);
    }
  };

  // Fonction pour supprimer un lieu
  const deletePlace = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/place/${id}`);
      displayPlace(); // Rafraîchit la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du lieu :", error);
    }
  };

  // Filtrage des lieux selon le nom sélectionné
  const filteredPlaces = place.filter((place) => {
    return !selectedName_place || place.name_place === selectedName_place;
  });
console.log(process.env);
  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <Link to={`/place/add`} className="btn btn-dark me-2">
          Ajouter un lieu de randonnée
        </Link>
        {/* Dropdown pour le filtrage */}
        <div className="d-flex justify-content-between mb-3">
          <FilterDropdown
            items={name_place}
            selectedItem={selectedName_place}
            onChange={setSelectedName_place}
          />
        </div>
        {/* Tableau des lieux */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du lieu</th>
              <th>Image</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>Description</th>
              <th>Carte</th>
              <th>Distance (km)</th>
              <th>Difficulté</th>
              <th>Temps estimé</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.map((place) => (
              <tr key={place.id}>
                <td>{place.name_place}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL_IMG}/${place.image_place}`}
                    alt={place.name_place}
                    width="75px"
                  />
                </td>
                <td>{place.longitude_place}</td>
                <td>{place.latitude_place}</td>
                <td className="content-place">{place.description_place}</td>
                <td>
                  <MapContainer
                    style={{ height: "100px", width: "75px" }}
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
                </td>
                <td>{place.distance_place}</td>
                <td>{place.difficulty_place}</td>
                <td>{place.estimated_time_place}</td>
                <td>
                  <Link
                    to={`/place/edit/${place.id}`}
                    className="btn btn-light me-2"
                  >
                    Modifier
                  </Link>
                  <Link
                    to={`/place/show/${place.id}`}
                    className="btn btn-light me-2"
                  >
                    Détails
                  </Link>
                  <Button variant="dark" onClick={() => deletePlace(place.id)}>
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Place;
