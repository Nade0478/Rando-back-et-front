import React, { useState, useEffect } from "react"; // Import correct
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './CardDashboard.css';

function NbrLieuxForm() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout pour gérer l'état de chargement
  const [error, setError] = useState(null); // Ajout pour gérer les erreurs

  useEffect(() => {
    // Récupération des lieux depuis une API
    fetch(`${process.env.REACT_APP_API_URL}/place/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau : ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setPlaces(data);
        setLoading(false); // Fin du chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des endroits :', error);
        setError(error.message); // Stocker le message d'erreur
        setLoading(false); // Fin du chargement même en cas d'erreur
      });
  }, []); // Exécution au montage uniquement

  const getPlaceCount = () => {
    return places.length;
  };

  return (
    <div className="nbr-lieux-container">
      {loading ? (
        <h1>Chargement des données...</h1>
      ) : error ? (
        <h1 className="text-danger">Erreur : {error}</h1>
      ) : (
        <h1>Nombre total : {getPlaceCount()}</h1>
      )}
    </div>
  );
}

export default NbrLieuxForm;

