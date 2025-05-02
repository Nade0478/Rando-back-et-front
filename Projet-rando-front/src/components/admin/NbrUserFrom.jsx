import React, { useState, useEffect } from 'react'; // Import correct de useEffect
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './CardDashboard.css';

const NbrUserForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Récupération des utilisateurs depuis une API
    fetch(`${process.env.REACT_APP_API_URL}/user`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur réseau : ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs :', error));
  }, []);

  const getUserCount = () => {
    return users.length;
  };

  return (
    <div>
      <h1>Nombre inscrits : {getUserCount()}</h1>
    </div>
  );
};

export default NbrUserForm;

