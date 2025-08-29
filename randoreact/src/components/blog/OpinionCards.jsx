import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const OpinionCards = ({ opinions }) => {
  return (
    <div className="container mt-4">
      <h3 className="pb-2 border-bottom">LES AVIS</h3>
      <Link to={`/opinion/add`}>
      <Button variant="dark">Créer ton avis</Button>
    </Link>      

      <div className="row text-center">
        {opinions.map((opinion) => (
          <div key={opinion.id} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  {opinion.title_opinion || "Titre non disponible"}
                </Card.Title>
                <Card.Text>
                  <strong>Lieux: </strong>
                  {(opinion.place && opinion.place.name_place) ||
                    "Lieu inconnu"}
                </Card.Text>
                <Card.Text>
                  <strong> <justifyL>Contenu: </justifyL></strong>
                  {opinion.content_opinion || "Contenu non disponible"}
                </Card.Text>
                <Link to={`/opinion/show/${opinion.id}`}>
                  <Button variant="secondary">Voir</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpinionCards;
