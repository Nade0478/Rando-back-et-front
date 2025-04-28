import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const Category = () => {
  const [category, setCategory] = useState([]);

  // Chargement des catégories au montage du composant
  useEffect(() => {
    displayCategory();
  }, []);

  // Fonction pour récupérer les catégories depuis l'API
  const displayCategory = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/category",
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      if (res.data) {
        setCategory(res.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Fonction pour supprimer une catégorie
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/category/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      displayCategory(); // Rafraîchit la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression de la catégorie :", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5">
        <Link to={`/category/add`} className="btn btn-dark me-2">
          Ajouter une catégorie
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom de la catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category.id}>
                <td>{category.name_category}</td>
                <td>
                  <Link
                    to={`/category/edit/${category.id}`}
                    className="btn btn-light me-2"
                  >
                    Éditer
                  </Link>
                  <Button
                    variant="dark"
                    onClick={() => {
                      deleteCategory(category.id);
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
    </div>
  );
};

export default Category;
