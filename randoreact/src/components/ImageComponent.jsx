import React from "react";
import PropTypes from "prop-types"; // Pour valider les props
import "./ImageComponent.css";

const ImageComponent = ({ imageUrl, altText, width = "100%", height = "auto" }) => {
  return (
    <div className="image-container" style={styles.container}>
      <img
        src={imageUrl}
        alt={altText}
        style={{
          ...styles.image,
          width: width,
          height: height,
        }}
      />
    </div>
  );
};

// Styles en JS
const styles = {
  container: {
    display: "flex",
    justifyContent: "center", // Centre horizontalement
    alignItems: "center", // Centre verticalement si une hauteur est définie
    margin: "20px auto", // Centre avec des marges automatiques
    maxWidth: "800px", // Optionnel : Limite la largeur maximale
  },
  image: {
    borderRadius: "8px", // Arrondit les coins
    objectFit: "contain", // Ajuste l'image dans le conteneur
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Ajoute une ombre
  },
};

// Définir les types de propriétés attendues
ImageComponent.propTypes = {
  imageUrl: PropTypes.string.isRequired, // URL de l'image (obligatoire)
  altText: PropTypes.string.isRequired, // Texte alternatif pour l'image (obligatoire)
  width: PropTypes.string, // Largeur (optionnelle)
  height: PropTypes.string, // Hauteur (optionnelle)
};

export default ImageComponent;
