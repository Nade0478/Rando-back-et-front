import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      )
        console.log("Données récupérées :", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails :", error);
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
        <h1>{user.name}</h1>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>E-mail :</strong> {user.email}</p>
        <p><strong>Password :</strong> {user.password ? user.password : "Mot de passe non disponible"}</p>
      </div>
      <Footer />
    </div>
  );
};

export default ShowUser;
