import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import ModifProfil from "../components/profil/ModifProfil";
import ContactProfil from "../components/profil/ContactProfil";
import axios from "axios";
import ProfileCard from "../components/profil/ProfileCard";
import SidebarProfil from "../components/profil/SidebarProfil";

function Profil() {
  const [id_user, setId_user] = useState("");
  const [name_user, setName_user] = useState(""); 
  const [user, setUser] = useState(null);
  const [email_user, setEmail_user] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
if (storedUserId) {
  setId_user(storedUserId);
}

      getCurrentUser(); 
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/currentuser`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      );
      setUser(response.data.data);
      setId_user(response.data.data.id);
      setName_user(response.data.data.name);
      setEmail_user(response.data.data.email);
     
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles :", error);
    }
   
  };
  // Vérification si l'utilisateur est connecté
  return (
    <div>
      <SidebarProfil />
      {user ? (
        <>
          <h1>Bienvenue sur votre profil, {name_user}</h1>
          <ProfileCard id_user={id_user}/>
          <ModifProfil id_user={id_user} name_user={name_user} email_user={email_user} />
          <ContactProfil />
        </>
      ) : (
        <div className="alert alert-danger text-center mt-5">
          <h2>Utilisateur introuvable</h2>
          <p>Il semble que votre profil ne soit pas disponible. Veuillez vérifier votre connexion ou réessayer plus tard.</p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Profil;
