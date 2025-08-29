import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/admin/Sidebar";

const Role = () => {
  const [role, setRole] = useState([]);

  useEffect(() => {
    displayRole();
  }, []);

  const displayRole = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/role`,	       
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      if (res.data ) {
        setRole(res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const deleteRole = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/role/${id}`).then(displayRole);
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {role.map((role) => (
              <tr key={role.id}>
                <td>{role.role}</td>
                <td>
                  <Link
                    to={`/role/edit/${role.id}`}
                    className="btn btn-dark me-4"
                  >
                    Éditer
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteRole(role.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default Role;



