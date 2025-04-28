import React from 'react'; 
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import '../components/About.css';
import AboutForm1 from '../components/AboutForm1';
import AboutForm2 from '../components/AboutForm2';
import AboutForm3 from '../components/AboutForm3';
import AboutForm4 from '../components/AboutForm4';
import AboutForm from '../components/AboutForm';


const About = () => { 
    return ( 
        <div> 
            <Menu />
            <h1>A PROPOS DE RANDO-OUEST</h1>
            <AboutForm />
            <hr /> {/* Corrected the horizontal rule */}
            <h2>Notre histoire</h2>
            <AboutForm4 />
            <hr /> {/* Corrected the horizontal rule */}
            <h2>Qui sommes-nous ?</h2>
            <AboutForm1 />
            <hr /> {/* Corrected the horizontal rule */}
            <h2>Pourquoi-nous ?</h2>
            <AboutForm2 />
            <hr /> {/* Corrected the horizontal rule */}
            <h2>Nouveautés</h2>
            <AboutForm3 />
            <Footer />
        </div> 
    );
}; 

export default About;