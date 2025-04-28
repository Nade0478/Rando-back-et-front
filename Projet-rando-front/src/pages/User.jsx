import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom"; 
import FilterDropdown from "../components/FilterDropdown";
import Sidebar from "../components/admin/Sidebar";

const User = () => {
  const [users, setUsers] = useState([]);
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    displayUsers();
  }, []);

  const displayUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user",
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      const fetchedUsers = response.data || [];
      const filteredUsers = fetchedUsers.filter((user) => user.role_id === 2);
      setUsers(filteredUsers);
      setNames(filteredUsers.map((user) => user.name));
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      alert("Une erreur est survenue lors du chargement des utilisateurs.");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      alert("Utilisateur supprimé avec succès !");
      displayUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const filteredUsers = users.filter((user) => {
    return !selectedName || (user.name && user.name === selectedName);
  });

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <div className="d-flex justify-content-between mb-3">
          <FilterDropdown
            items={names}
            selectedItem={selectedName}
            onChange={setSelectedName}
          />
          <button className="btn btn-secondary" onClick={() => setSelectedName(null)}>
            Réinitialiser le filtre
          </button>
        </div>
        <div className="row">
          {filteredUsers.map((user) => (
            <div className="col-md-4 mb-4 sm-4" key={user.id}>
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Email :</strong> {user.email} <br />
                    <strong>Rôle ID :</strong> {user.role_id}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Link to={`/user/edit/${user.id}`} className="btn btn">
                      Éditer
                    </Link>
                    <Link to={`/user/show/${user.id}`} className="btn btn">
                      Voir
                    </Link>
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                      Supprimer
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
