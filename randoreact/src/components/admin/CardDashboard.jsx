import React from 'react';
import NbrUserForm from './NbrUserFrom';
import NbrArticleForm from './NbrArticleForm';
import NbrLieuxForm from './NbrLieuxForm';
import NbrAvisForm from './NbrAvisForm';
import "./CardDashboard.css";

const CardDashboard = () => {
  // Données pour chaque carte
  const cards = [
    { title: "Nombre de randonnées", content: <NbrLieuxForm /> },
    { title: "Nombre d'avis", content: <NbrAvisForm /> },
    { title: "Nombre d'articles", content: <NbrArticleForm /> },
    { title: "Nombre d'utilisateurs", content: <NbrUserForm /> },
  ];

  return (
    <section className="cardNbrForm">
    <div className="dashboard-container center-container">
      <div className="row center-container">
        {cards.map((card, index) => (
          <div key={index} className="col-lg-6 col-md-6 col-sm-12">
            <div className="card">
              <div className="card-header">
                <h2>{card.title}</h2>
              </div>
              <div className="card-body">
                <p>{card.content}</p>
              </div>
              <div className="card-footer">
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default CardDashboard;
