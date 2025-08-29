import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Sidebar from "../../components/admin/Sidebar";

const ShowUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log("Données récupérées :", response.data);
        setUser(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des détails :", err);
        setError("Utilisateur introuvable.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Chargement des informations...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="alert alert-danger text-center mt-5">
        <h2>Utilisateur introuvable</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <h1>Détails de l'utilisateur</h1>
        <p><strong>Nom :</strong> {user.name || "Non renseigné"}</p>
        <p><strong>E-mail :</strong> {user.email || "Non renseigné"}</p>
        <p><strong>Mot de passe :</strong> Mot de passe masqué pour des raisons de sécurité</p>
        <div className="mt-4">
          <Link to="/user" className="btn btn-dark">
            Retour à la liste
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShowUser;
