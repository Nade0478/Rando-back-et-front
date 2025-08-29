import React, { useState, useEffect } from "react"; // Import des hooks React
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../components/home/HomeNew.css';
import { Table } from "react-bootstrap"; // Import correct du tableau
import FilterDropdown from "../FilterDropdown";

const PlaceOpinion = () => {
    // Composant Opinion séparé
    const Opinion = () => {
        const [opinion, setOpinion] = useState([]);
        const [titleOpinion, setTitleOpinion] = useState([]);
        const [selectedTitleOpinion, setSelectedTitleOpinion] = useState(null);

        useEffect(() => {
            fetchOpinions();
        }, []);

        // Récupération des opinions depuis l'API
        const fetchOpinions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/opinion`);
                if (response.data && response.data.data) {
                    setOpinion(response.data.data);
                    setTitleOpinion(
                        response.data.data.map((opinion) => opinion.title_opinion || "Titre inconnu")
                    );
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des opinions :", error);
                alert("Une erreur est survenue lors de la récupération des opinions.");
            }
        };

        // Suppression d'une opinion
        const deleteOpinion = async (id) => {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/opinion/${id}`);
                fetchOpinions(); // Rafraîchir la liste après suppression
            } catch (error) {
                console.error("Erreur lors de la suppression de l'opinion :", error);
                alert("Une erreur est survenue lors de la suppression de l'opinion.");
            }
        };

        // Filtrage des opinions selon le titre sélectionné
        const filteredOpinions = opinion.filter((opinion) => {
            return !selectedTitleOpinion || opinion.title_opinion === selectedTitleOpinion;
        });

        return (
            <div>
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-3">
                        <Link to={`/opinion/add`} className="btn btn-dark me-2">
                            Créer une nouvelle opinion
                        </Link>
                        <FilterDropdown
                            items={titleOpinion}
                            selectedItem={selectedTitleOpinion}
                            onChange={setSelectedTitleOpinion}
                        />
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Titre de l'opinion</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOpinions.map((opinion) => (
                                <tr key={opinion.id}>
                                    <td>{opinion.title_opinion || "Titre non disponible"}</td>
                                    <td>
                                        <Link
                                            to={`/opinion/show/${opinion.id}`}
                                            className="btn btn-light me-2"
                                        >
                                            Voir
                                        </Link>
                                        <button
                                            onClick={() => deleteOpinion(opinion.id)}
                                            className="btn btn-danger"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    };

    return <Opinion />;
};

export default PlaceOpinion;
