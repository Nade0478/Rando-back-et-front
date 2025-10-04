import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../components/home/HomeNew.css';
import { Link } from 'react-router-dom';

const PlaceForm = () => {
    const [items, setItems] = useState([]);

    // Fonction de sanitisation pour le texte
    const sanitizeText = (text) => {
        if (!text || typeof text !== 'string') return '';
        return text.replace(/[<>'"]/g, '');
    };

    // Fonction de sanitisation maximale pour les chemins d'images
    const sanitizeImagePath = (imagePath) => {
        if (!imagePath || typeof imagePath !== 'string') return 'placeholder.png';
        
        // Supprimer tout ce qui n'est pas alphanumérique, tiret, underscore ou point
        const cleaned = imagePath.replace(/[^a-zA-Z0-9._-]/g, '');
        
        // Vérification stricte : nom de fichier valide + extension image
        const validPattern = /^[a-zA-Z0-9_-]+\.(jpg|jpeg|png|gif|webp|svg)$/i;
        
        // Vérifier longueur et format
        if (!validPattern.test(cleaned) || cleaned.length === 0 || cleaned.length > 255) {
            return 'placeholder.png';
        }
        
        return cleaned;
    };

    // Fonction pour générer une URL d'image sécurisée
    const getSecureImageUrl = (imageFilename) => {
        const sanitized = sanitizeImagePath(imageFilename);
        return `${process.env.REACT_APP_IMAGES_URL}/uploads/${sanitized}`;
    };

    useEffect(() => {
        displayPlaceHome();
    }, []);

    const displayPlaceHome = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/places-home`);
            setItems(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des lieux :', error);
        }
    };

    return (
        <section className="nouveautes">
            <h3>SITES DE RANDONNÉES VEDETTES</h3>
            <div className="items">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className="item">
                            <Link to={`/place/show/${item.id}`}>
                                <div className="image-container">
                                    <img
                                        src={getSecureImageUrl(item.image)}
                                        alt={sanitizeText(item.title) || 'Randonnée'}
                                        onError={(e) => {
                                            e.target.src = '/images/placeholder.png';
                                        }}
                                    />
                                </div>
                            </Link>
                            <h3>{sanitizeText(item.title)}</h3>
                            <p>{sanitizeText(item.description)}</p>
                            <Link to={`/place/show/${item.id}`} className="btn btn-success">
                                Découvrir
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>Aucun site de randonnée disponible.</p>
                )}
            </div>
        </section>
    );
};

export default PlaceForm;