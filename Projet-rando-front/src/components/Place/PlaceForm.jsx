import React, { useState, useEffect } from "react";
import axios from "axios"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../components/home/HomeNew.css';
import { Link } from "react-router-dom";

const PlaceForm = () => {
    const [items, setItems] = useState([]); 

    useEffect(() => {
        displayPlaceHome(); 
    }, []);

    const displayPlaceHome = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/places-home`);
            setItems(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des lieux :", error);
        }
    };

    return (
        <section className="nouveautes">
            <h3>SITES DE RANDONNÉES VEDETTES</h3>
            <div className="items">
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} className="item">
                            <Link to={`/place/show/${item.id}`}>
                                <div className="image-container">
                                    <img src={item.image} alt={item.title} />
                                </div>
                            </Link>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
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

