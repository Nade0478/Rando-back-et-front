import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
// import "../styles/About.css";
import AboutForm1 from "../components/AboutForm1";
import AboutForm2 from "../components/AboutForm2";
import AboutForm3 from "../components/AboutForm3";
import AboutForm4 from "../components/AboutForm4";
import AboutForm from "../components/AboutForm";
import DarkModeForm from "../components/DarkModeForm";

const About = () => {
  return (
    <div className="page-wrapper">
      <DarkModeForm />
      <Menu />
      <div className="root">
        <div className="container-fluid">
          <h1>A PROPOS DE RANDO-OUEST</h1>
          <p>Bienvenue sur la page à propos de nous !</p>
          <p>
            Nous sommes ravis de vous accueillir sur notre site dédié aux
            randonnées.
          </p>
          <p>
            Notre équipe est passionnée par la nature et l'aventure, et nous
            avons créé cet espace pour partager notre amour des randonnées avec
            vous.
          </p>
          <p>
            Nous espérons que vous trouverez ici toutes les informations
            nécessaires pour planifier vos prochaines aventures en plein air.
          </p>

          <hr />
          <AboutForm />
          <hr />

          <h2>Notre histoire</h2>
          <AboutForm4 />
          <hr />

          <h2>Qui sommes-nous ?</h2>
          <AboutForm3 />
          <hr />

          <h2>Pourquoi nous ?</h2>
          <AboutForm2 />
          <hr />

          <h2>Nouveautés</h2>
          <AboutForm1 />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
