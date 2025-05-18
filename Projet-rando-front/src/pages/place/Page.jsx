import React from "react";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import PlaceList from "../../components/Place/PlaceList";
import PlaceForm from "../../components/Place/PlaceForm";
import PlaceOpinion from "../../components/Place/PlaceOpinion";
import DarkModeForm from "../../components/DarkModeForm";

// Import du fichier de styles global
import "../../styles/style.css";

const Page = () => {
  return (
    <div className="page-wrapper">
      <DarkModeForm />
      <Menu />
      <div className="root">
        <div className="container-fluid">
          <PlaceForm />
          <PlaceList />
          <PlaceOpinion />
        </div>{" "}
        {/* Correction : fermeture correcte de la div */}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
