import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterDropdown from "../FilterDropdown";
import { Table } from "react-bootstrap";

const PlaceList = () => {
  const [place, setPlace] = useState([]); // Liste des lieux
  const [name_place, setName_place] = useState([]); // Liste des noms de lieux
  const [selectedName_place, setSelectedName_place] = useState(null); // Nom sélectionné pour le filtre

  // Charger les lieux au montage du composant
  useEffect(() => {
    displayPlace();
  }, []);

  // Fonction pour récupérer les lieux depuis l'API
  const displayPlace = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/place`);
      setPlace(response.data); // Met à jour les lieux
      setName_place(response.data.map((place) => place.name_place)); // Met à jour la liste des noms
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux :", error);
      alert("Une erreur est survenue lors de la récupération des lieux.");
    }
  };

  // Filtrage des lieux selon le nom sélectionné
  const filteredPlaces = place.filter((place) => {
    return !selectedName_place || place.name_place === selectedName_place;
  });

  return (
    <div>
      <div className="container mt-5">
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
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlaces.map((place) => (
              <tr key={place.id}>
                <td>{place.name_place}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL_IMG}/storage/app/public/uploads/${place.image_place}`}
                    alt={place.name_place}
                    width="75px"
                  />
                </td>
                <td>{place.description_place}</td>
                <td>
                  <Link to={`/place/show/${place.id}`} className="btn btn-light me-2">
                    Détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PlaceList;
