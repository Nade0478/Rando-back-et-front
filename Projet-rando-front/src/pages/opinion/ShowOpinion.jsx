import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

const ShowOpinion = () => {
  const { id } = useParams();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilisation de useCallback pour stabiliser la fonction fetchOpinion
  const fetchOpinion = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/opinion/${id}`);
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
        {/* Image Component */}
        <div className="row">
          {/* Image Component */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowOpinion;
