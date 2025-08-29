import React from 'react';
import { Link } from 'react-router-dom';
import "../profil/SidebarProfil.css"; 
import Logo from '../Logo';


const SidebarProfil = () => {
  return (
    <div className="sidebarProfil">
      <Logo />
      <div className="sidebarContent"> {/* Ajout d'un conteneur interne */}
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <hr />
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/place/page">Randonnées</Link></li>
          <hr />
          <li><Link to="/login"><strong><em>Se connecter</em></strong></Link></li>
          <li><Link to="/logout"><strong><em>Déconnexion</em></strong></Link></li>
        </ul>
      </div>
    </div>
  );
};


export default SidebarProfil;
