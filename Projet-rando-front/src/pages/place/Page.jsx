import React from 'react'; 
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import PlaceList from "../../components/Place/PlaceList";
import PlaceForm from "../../components/Place/PlaceForm";
// import '../../styles/style-home.css';
import '../../styles/style.css';
import PlaceOpinion from "../../components/Place/PlaceOpinion";
import DarkModeForm from "../../components/DarkModeForm";

const Page = () => {
    return (
        <div>
            <DarkModeForm />
            <Menu />
            <PlaceForm />
            <PlaceList />
            <PlaceOpinion />
            <Footer />
        </div>
    );
};

export default Page;
