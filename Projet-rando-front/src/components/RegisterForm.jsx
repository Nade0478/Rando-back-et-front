import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiTwotoneEyeInvisible } from "react-icons/ai";

function RegisterForm() {
  document.title = "Inscription au site";

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(""); // Gestion des erreurs serveur

  const handleShowPasswordToggle = () => setShowPassword(!showPassword);

  const onSubmit = async (data) => {
    try {
      // Appel à l'API pour l'inscription
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json", // Ajout de cet en-tête
          },
        }
      );

      if (response.status === 200) {
        // Récupération du token et du rôle utilisateur depuis la réponse
        const { token } = response.data.data.access_token;
        const role_id = parseInt(response.data.data.user.role_id, 10); // Transformation en nombre
        localStorage.setItem("access_token", token);

        // Redirection en fonction du rôle
        if (role_id === 2) {
          navigate("/profil", { replace: true });
        } else if (role_id === 1) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/home", { replace: true });
        }
      }
    } catch (error) {
      // Gestion des erreurs serveur
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors || {};
        Object.keys(validationErrors).forEach((field) => {
          setError(field, { message: validationErrors[field][0] });
        });
      } else if (error.response && error.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("Une erreur inattendue est survenue. Veuillez réessayer.");
      }
      console.error("Erreur serveur :", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="Auth-form-title">Créer un compte</h3>

      {serverError && <div className="alert alert-danger">{serverError}</div>}

      <Form.Group controlId="formBasicText" className="mb-3">
        <Form.Label>Pseudo</Form.Label>
        <Form.Control
          type="text"
          placeholder="Votre pseudo"
          {...register("name", { required: "Pseudo obligatoire" })}
        />
        {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
      </Form.Group>

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
        <InputGroup>
          <InputGroup.Text onClick={handleShowPasswordToggle} style={{ cursor: "pointer" }}>
            {showPassword ? <AiOutlineEye /> : <AiTwotoneEyeInvisible />}
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            {...register("password", {
              required: "Mot de passe obligatoire",
              minLength: { value: 8, message: "Longueur minimale de 8 caractères" },
              pattern: {
                value: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.?,])/,
                message: "Incluez une minuscule, majuscule, chiffre et caractère spécial",
              },
            })}
          />
        </InputGroup>
        {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
      </Form.Group>

      <Button type="submit" variant="success">
        Créer un compte
      </Button>
    </Form>
  );
}

export default RegisterForm;
