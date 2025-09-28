import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./HomeNewPlace.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// Liste blanche des images autorisées (constante hors composant)
const ALLOWED_IMAGES = [
  'default.jpg',
  'placeholder.jpg',
  'rando1.jpg',
  'rando2.jpg',
  'rando3.jpg',
  // Ajoutez ici les noms d'images que vous autorisez
];

const HomeNewPlace = () => {
  const [items, setItems] = useState([]);

  // Fonction pour valider et nettoyer les noms d'images
  const getImageUrl = useCallback((imageName) => {
    // Si pas de nom d'image, retourner l'image par défaut
    if (!imageName || typeof imageName !== 'string') {
      return '/images/placeholder.jpg';
    }
    
    // Nettoyer le nom en supprimant tous caractères dangereux
    const cleanImageName = imageName.replace(/[^a-zA-Z0-9._-]/g, '');
    
    // Vérifier que c'est dans la liste blanche OU que c'est une extension d'image valide
    const isAllowed = ALLOWED_IMAGES.includes(cleanImageName) || 
                     /^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|gif|webp)$/i.test(cleanImageName);
    
    if (!isAllowed) {
      return '/images/placeholder.jpg';
    }
    
    // Utiliser une URL statique sécurisée
    return `/images/upload/${cleanImageName}`;
  }, []);

  // Fonction pour valider les données reçues
  const validatePlaceData = useCallback((data) => {
    if (!Array.isArray(data)) {
      console.error("Les données reçues ne sont pas un tableau:", data);
      return [];
    }
    
    // Filtrer les éléments valides
    return data.filter(item => 
      item && 
      typeof item === 'object' && 
      item.id && 
      item.name_place && 
      item.description_place
    );
  }, []);

  const displayNewPlace = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/place-home`);
      
      // Vérifier que la réponse contient des données JSON valides
      if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
        console.error("Erreur: L'API retourne du HTML au lieu de JSON");
        console.error("Vérifiez votre configuration d'API:", process.env.REACT_APP_API_URL);
        setItems([]);
        return;
      }

      const validatedData = validatePlaceData(response.data);
      setItems(validatedData);
      console.log("Places récupérées:", validatedData);
      
    } catch (error) {
      console.error("Erreur lors de la récupération des lieux:", error);
      
      // Afficher des détails de l'erreur pour debug
      if (error.response) {
        console.error("Statut de l'erreur:", error.response.status);
        console.error("Données de l'erreur:", error.response.data);
      } else if (error.request) {
        console.error("Aucune réponse reçue:", error.request);
      } else {
        console.error("Erreur de configuration:", error.message);
      }
      
      setItems([]);
    }
  }, [validatePlaceData]);

  useEffect(() => {
    displayNewPlace();
  }, [displayNewPlace]);

  return (
    <section className="homeNewPlace">
      <h3 className="text-center">SITES DE RANDONNÉES</h3>
      <div className="items">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className="item">
              <div className="image-container">
                <img
                  src="/images/placeholder.jpg" // URL statique pour éviter XSS complètement
                  alt={item.name_place || 'lieu de randonnée'}
                  className="item-image"
                  onLoad={(e) => {
                    // Charger l'image réelle après montage du composant
                    const validatedUrl = getImageUrl(item.image_place);
                    if (validatedUrl !== '/images/placeholder.jpg') {
                      e.target.src = validatedUrl;
                    }
                    console.log("✅ Place chargée:", item.image_place);
                  }}
                  onError={(e) => {
                    console.log("❌ Erreur place:", e.target.src);
                    console.log("Non du fichier place:", item.image_place);
                    // Remettre l'image par défaut en cas d'erreur
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <Link to={`/place/show/${item.id}`}>
                <h3 className="item-title">{item.name_place}</h3>
                <p className="content-place">{item.description_place}</p>
                <Link to={`/place/show/${item.id}`} className="btn custom-btn">
                  Découvrir
                </Link>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-data">
            <p>Aucun lieu de randonnée disponible pour le moment.</p>
            <small>Vérifiez votre connexion API : {process.env.REACT_APP_API_URL}</small>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeNewPlace;