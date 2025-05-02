import React from 'react'; 
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import HomeHead from '../components/home/HomeHead';
import HomeNewArticle from '../components/home/HomeNewArticle';
import HomeNewPlace from '../components/home/HomeNewPlace';
import '../styles/style-home.css';
import DarkModeForm from '../components/DarkModeForm';

const Home = () => { 
    return ( 
        <div> 
            <DarkModeForm />
            <Menu />
            <HomeHead />
            <hr /> 
            <h2>Nouveautés</h2>
            <HomeNewArticle />
            <HomeNewPlace />
            <Footer />
        </div> 
    );
}; 

export default Home;
