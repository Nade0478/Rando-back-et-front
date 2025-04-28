import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserPage = ({ handleLogout, user, setUser }) => {
  // Initialisation de react-hook-form pour la gestion du formulaire
  const {
    register, // Permet de connecter les champs du formulaire
    handleSubmit, // Gère la soumission du formulaire
    formState: { errors }, // Capture les erreurs de validation
  } = useForm({
    defaultValues: {
      name: user.name, // Valeurs initiales pour les champs du formulaire
      email: user.email,
    },
  });

  // Fonction déclenchée lors de la soumission du formulaire
  const onSubmit = async (data) => {
    try {
      // Appel à l'API avec méthode PUT pour envoyer les mises à jour
      const response = await axios.put(
        "http://127.0.0.1:8000/api/user/update", // Endpoint API
        data, // Données saisies dans le formulaire
        {
          headers: {
            "Content-Type": "application/json", // Type de contenu
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Token pour la sécurité
          },
        }
      );

      if (response.status === 200) {
        // Mettre à jour l'état utilisateur avec les nouvelles informations
        setUser(response.data.data.user);
        alert("Profil mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        {/* Titre accueillant */}
        <h2>Bienvenue sur votre page profil utilisateur, {user.name} !</h2>
        {/* Formulaire de modification */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Champ du nom */}
          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: "Le nom est obligatoire" })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          {/* Champ de l'email */}
          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validation de format d'email
                  message: "Format d'email invalide",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          {/* Bouton pour soumettre les modifications */}
          <button type="submit" className="btn btn-primary mt-3">
            Valider les modifications
          </button>
        </form>

        {/* Actions supplémentaires */}
        <div className="actions mt-4">
          <button onClick={handleLogout} className="btn btn-danger">
            Se déconnecter
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserPage;
