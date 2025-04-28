import React from "react";
import PlaceList from "../../components/Place/PlaceList";
import PlaceForm from "../../components/Place/PlaceForm";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import PlaceOpinion from "../../components/Place/PlaceOpinion";

const Page = () => {
    return (
        <div>
        <Menu />
            <PlaceForm />
            <PlaceList />
            <PlaceOpinion />
        <Footer />
        </div>
    );
};

export default Page;
