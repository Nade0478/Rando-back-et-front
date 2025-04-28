import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./CardDashboard.css";

function NbrAvisForm() {
  const [opinionCount, setOpinionCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/opinion");
  
        if (!response.ok) {
          throw new Error("Erreur réseau : " + response.statusText);
        }
  
        const data = await response.json();
        console.log("Données reçues :", data);
  
        if (data.meta && data.meta.total) {
          setOpinionCount(data.meta.total);
        } else {
          setOpinionCount(data.data.length);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des avis :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOpinions();
  }, []);
  
  return (
    <div className="nbr-avis-container text-center mt-4">
      {loading ? (
        <h1 className="text-primary">Chargement des données...</h1>
      ) : error ? (
        <h1 className="text-danger">Erreur : {error}</h1>
      ) : (
        <h1>Nombre total : <span className="text">{opinionCount}</span></h1>
      )}
    </div>
  );
}

export default NbrAvisForm;
