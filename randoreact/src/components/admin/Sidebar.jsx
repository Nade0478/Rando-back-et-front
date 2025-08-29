import React from 'react';
import { Link } from 'react-router-dom';
import './CardDashboard.css';
import './Sidebar.css';
import Logo from '../Logo';


const Sidebar = () => {
  return (
    <div className="sidebar">
    <Logo />
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>

        <hr />
       <strong><em>GESTION DU SITE</em></strong>
        <li><Link to="/place">Lieux de randonnée</Link></li>
        <li><Link to="/category">Catégories</Link></li>
        <li><Link to="/opinion">Opinions</Link></li>
        <li><Link to="/article">Articles</Link></li>
        <li><Link to="/user">Utilisateurs</Link></li>
        <li><Link to="/home">Contenu de la page d'accueil</Link></li>
        <hr />
        <li><Link to="/terms">Conditions d'utilisation</Link></li>
        <li><Link to="/privacy">Politique de confidentialité</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <hr />
        <li><Link to="/login"><strong><em>Se connecter</em></strong></Link></li>
        <li><Link to="/logout"><strong><em>Déconnexion</em></strong></Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
