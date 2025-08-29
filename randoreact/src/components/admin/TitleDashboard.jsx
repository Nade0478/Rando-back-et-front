import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './CardDashboard.css';

const TitleDashboard = () => {
  const [title, setTitle] = useState('Bienvenue sur ton Dashboard');

  const handleChangeTitle = () => {
    setTitle('Le Dashboard est mis à jour !');
  };

  return (
    <div className="container-fluid text-white">
      <h1>{title}</h1>
      <button className="btn btn-light mt-3" onClick={handleChangeTitle}>
        Mettre à jour le titre
      </button>
    </div>
  );
};

export default TitleDashboard;
