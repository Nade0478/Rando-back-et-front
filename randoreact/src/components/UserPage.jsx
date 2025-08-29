import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import axios from "axios";

const UserPage = ({ handleLogout, user, setUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.data.user);
        alert("Profil mis à jour avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      if (error.response && error.response.data) {
        alert(`Erreur : ${error.response.data.message || "Une erreur est survenue."}`);
      } else {
        alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
      }
    }
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <h2>Bienvenue sur votre page profil utilisateur, {user.name} !</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              id="name"
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Le nom est obligatoire" })}
            />
            {errors.name && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          <div className="form-group mt-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Format d'email invalide",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Valider les modifications"}
          </button>
        </form>

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
