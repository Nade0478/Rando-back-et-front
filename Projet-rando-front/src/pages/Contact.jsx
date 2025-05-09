import React from 'react'; 
import Menu from '../components/Menu';
import Footer from '../components/Footer';
// import '../styles/style-contact.min.css';
import '../styles/style-contact.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContactForm from '../components/ContactForm';
import DarkModeForm from '../components/DarkModeForm';

 
const Contact = () => { 
    return ( 
        <div> 
            <DarkModeForm />
            <Menu />
            <h1>BIENVENU SUR LA PAGE CONTACT</h1> 
            <p>Pour toute question ou suggestion, n'hésitez pas à me contacter en remplissant le formaulaire de contact</p> 
            <ContactForm /> 
            <p>Sinon vous pouvez écrire à mon adresse email : contact.rando.ouest@gmail.com </p>
            <Footer/>
        </div> 
    ); 
}; 
 
export default Contact;