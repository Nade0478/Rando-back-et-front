import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import DarkModeForm from "../../components/DarkModeForm";

const ShowOpinion = () => {
  const { id } = useParams();
  const [opinion, setOpinion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Utilisation de useCallback pour éviter des re-renders inutiles
  const fetchOpinion = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/opinion/${id}`
      );
      setOpinion(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails :", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOpinion();
  }, [fetchOpinion]);

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (!opinion) {
    return <p>Le lieu demandé est introuvable.</p>;
  }

  return (
    <div className="page-wrapper">
      <Menu />
      <DarkModeForm />
      <div className="root">
        <div className="container-fluid">
          <div className="container mt-5">
            <h1>{opinion?.title_opinion || "Titre non disponible"}</h1>
            <p>
              <strong>Titre de l'opinion :</strong>{" "}
              {opinion?.title_opinion || "Non renseigné"}
            </p>
            <p>
              <strong>Contenu :</strong>{" "}
              {opinion?.content_opinion || "Non disponible"}
            </p>
            <p>
              <strong>Note :</strong> {opinion?.note_opinion || "Non noté"}
            </p>
            <p>
              <strong>Auteur :</strong> {opinion?.user?.name || "Anonyme"}
            </p>
            <p>
              <strong>Lieux :</strong>{" "}
              {opinion?.place?.name_place || "Lieu inconnu"}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ShowOpinion;
