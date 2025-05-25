import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import FilterDropdown from "../../components/FilterDropdown";
import Sidebar from "../../components/admin/Sidebar";

const Opinion = () => {
  const [opinion, setOpinion] = useState([]);
  const [title_opinion, setTitle_opinion] = useState([]);
  const [selectedTitle_opinion, setSelectedTitle_opinion] = useState(null);

  useEffect(() => {
    displayOpinion();
  }, []);

  const displayOpinion = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/opinion`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      if (res.data && res.data.data) {
        setOpinion(res.data.data);
        setTitle_opinion(
          res.data.data.map(
            (opinion) => opinion.title_opinion || "Titre inconnu"
          )
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des opinions :", error);
    }
  };

  const deleteOpinion = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/opinion/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      displayOpinion(); // Rafraîchir la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de l'opinion :", error);
    }
  };

  const filteredOpinions = opinion.filter((opinion) => {
    return (
      !selectedTitle_opinion || opinion.title_opinion === selectedTitle_opinion
    );
  });

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
        <Link to={`/opinion/add`} className="btn btn-dark me-2">
          Créer un nouvel opinion
        </Link>
          <FilterDropdown
            items={title_opinion}
            selectedItem={selectedTitle_opinion}
            onChange={setSelectedTitle_opinion}
          />
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Titre de l'opinion</th>
              <th>Contenu</th>
              <th>Note</th>
              <th>Auteur</th>
              <th>Lieux</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpinions.map((opinion) => (
              <tr key={opinion.id}>
                <td>{opinion.title_opinion || "Titre non disponible"}</td>
                <td className="content-opinion">{opinion.content_opinion || "Contenu non disponible"}</td>
                <td>{opinion.note_opinion || "Note non disponible"}</td>
                <td>
                  {(opinion.user && opinion.user.name) || "Auteur inconnu"}
                </td>
                <td>
                  {(opinion.place && opinion.place.name_place) ||
                    "Lieu inconnu"}
                </td>
                <td>
                  <Link
                    to={`/opinion/edit/${opinion.id}`}
                    className="btn btn-light me-2"
                  >
                    Editer
                  </Link>
                  <Link
                    to={`/opinion/show/${opinion.id}`}
                    className="btn btn-light me-2"
                  >
                    Montrer
                  </Link>

                  <Button
                    variant="dark"
                    onClick={() => deleteOpinion(opinion.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Opinion;
