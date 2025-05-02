import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  document.title = "Connexion au site";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch, // Pour surveiller la valeur du champ password
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [serverError, setServerError] = useState("");

  const onSubmit = async (data) => {
    try {
      // Vérification côté frontend
      if (data.password !== data.password_confirmation) {
        setServerError("Les mots de passe ne correspondent pas.");
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.data.access_token.token;
        const role_id = parseInt(response.data.data.user.role_id, 10);
        localStorage.setItem("access_token", token);

        // Redirection selon le rôle
        if (role_id === 1) {
          navigate("/dashboard", { replace: true });
        } else if (role_id === 2) {
          navigate("/profil", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setServerError("Identifiants incorrects. Veuillez réessayer.");
      } else if (error.response && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Une erreur inattendue est survenue. Veuillez réessayer.");
      }
      console.error("Erreur serveur :", error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="Auth-form-title">Connexion</h3>

        {serverError && <div className="alert alert-danger">{serverError}</div>}

        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Adresse mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="johndoe@unknown.fr"
            {...register("email", {
              required: "Adresse mail obligatoire",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format d'adresse mail invalide",
              },
            })}
          />
          {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            {...register("password", {
              required: "Mot de passe obligatoire",
            })}
          />
          {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
        </Form.Group>

        {/* Champ confirmation de mot de passe ajouté */}
        <Form.Group controlId="formBasicPasswordConfirmation" className="mb-3">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmez votre mot de passe"
            {...register("password_confirmation", {
              required: "Confirmation du mot de passe obligatoire",
              validate: (value) => value === watch("password") || "Les mots de passe ne correspondent pas",
            })}
          />
          {errors.password_confirmation && (
            <Form.Text className="text-danger">{errors.password_confirmation.message}</Form.Text>
          )}
        </Form.Group>

        <Button type="submit" variant="success">
          Se connecter
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;

