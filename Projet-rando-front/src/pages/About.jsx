import React from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import "../components/About.css";
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
          <AboutForm />
          <hr /> {/* Ligne horizontale */}
          <h2>Notre histoire</h2>
          <AboutForm4 />
          <hr /> {/* Ligne horizontale */}
          <h2>Qui sommes-nous ?</h2>
          <AboutForm1 />
          <hr /> {/* Ligne horizontale */}
          <h2>Pourquoi nous ?</h2>
          <AboutForm2 />
          <hr /> {/* Ligne horizontale */}
          <h2>Nouveautés</h2>
          <AboutForm3 />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
