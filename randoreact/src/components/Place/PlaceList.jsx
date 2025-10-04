import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FilterDropdown from '../FilterDropdown';
import { Table } from 'react-bootstrap';

const PlaceList = () => {
  const [place, setPlace] = useState([]);
  const [name_place, setName_place] = useState([]);
  const [selectedName_place, setSelectedName_place] = useState(null);

  // Fonction de sanitisation pour le texte
  const sanitizeText = (text) => {
    if (!text || typeof text !== 'string') return '';
    return text.replace(/[<>'"]/g, '');
  };

  // Fonction de sanitisation pour les chemins d'images
  const sanitizeImagePath = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') return 'placeholder.png';
    const cleaned = imagePath.replace(/[^a-zA-Z0-9._-]/g, '');
    const validPattern = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp|svg)$/i;
    if (!validPattern.test(cleaned) || cleaned.length === 0 || cleaned.length > 255) {
      return 'placeholder.png';
    }
    return cleaned;
  };

  useEffect(() => {
    displayPlace();
  }, []);

  const displayPlace = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/place`);
      setPlace(response.data);
      setName_place(response.data.map((place) => place.name_place));
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux :', error);
      alert('Une erreur est survenue lors de la récupération des lieux.');
    }
  };

  const filteredPlaces = place.filter((place) => {
    return !selectedName_place || place.name_place === selectedName_place;
  });

  return (
    <div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
          <FilterDropdown
            items={name_place}
            selectedItem={selectedName_place}
            onChange={setSelectedName_place}
          />
        </div>
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
                <td>{sanitizeText(place.name_place)}</td>
                <td>
                  {/* deepcode ignore DOMXSS: Image paths are sanitized via sanitizeImagePath function */}
                  <img
                    src={`${process.env.REACT_APP_IMAGES_URL}/uploads/${sanitizeImagePath(place.image_place)}`}
                    alt={sanitizeText(place.name_place) || 'Lieu'}
                    width="75px"
                    onError={(e) => {
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </td>
                <td>{sanitizeText(place.description_place)}</td>
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