import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditCategory = () => {
  const { category } = useParams(); // Récupération de l'ID de la catégorie depuis l'URL
  const navigate = useNavigate();

  const [nameCategory, setNameCategory] = useState(""); // État pour le nom de la catégorie
  const [validationError, setValidationError] = useState({}); // État pour les erreurs de validation

  // Charger les données de la catégorie au montage
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Vérifie si le token existe
        if (!token) {
          console.error("Aucun token trouvé. Redirection vers la connexion.");
          navigate("/login"); // Redirection si le token est absent
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/category/${category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Accept": "application/json", // Assure une réponse JSON
            },
          }
        );
        setNameCategory(response.data.name_category); // Assigner le nom existant au champ
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Non autorisé. Redirection vers la connexion.");
          navigate("/login"); // Redirection si la requête n'est pas autorisée
        } else {
          console.error("Erreur lors de la récupération de la catégorie :", error);
        }
      }
    };

    fetchCategory();
  }, [category, navigate]);

  // Fonction pour mettre à jour la catégorie
  const updateCategory = async (e) => {
    e.preventDefault();

    const data = {
      name_category: nameCategory, // Champ pour la mise à jour
    };

    try {
      const token = localStorage.getItem("access_token"); // Vérifie si le token existe
      if (!token) {
        console.error("Aucun token trouvé. Redirection vers la connexion.");
        navigate("/login");
        return;
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/category/${category}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Spécifie l'envoi en JSON
        },
      });

      navigate("/category"); // Redirection après succès
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setValidationError(error.response.data.errors); // Affiche les erreurs de validation
      } else if (error.response && error.response.status === 401) {
        console.error("Non autorisé. Redirection vers la connexion.");
        navigate("/login"); // Redirection si non autorisé
      } else {
        console.error("Erreur inattendue :", error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Modifier une catégorie</h2>

      {/* Affichage des erreurs de validation */}
      {Object.keys(validationError).length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {Object.entries(validationError).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulaire pour la mise à jour */}
      <Form onSubmit={updateCategory}>
        <Form.Group controlId="nameCategory" className="mb-3">
          <Form.Label>Nom de la catégorie</Form.Label>
          <Form.Control
            type="text"
            value={nameCategory}
            placeholder="Entrez le nom de la catégorie"
            onChange={(e) => setNameCategory(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Mettre à jour
        </Button>
      </Form>
    </div>
  );
};

export default EditCategory;
