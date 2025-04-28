import Container from "react-bootstrap/Container"; 
import RegisterForm from "../../components/RegisterForm";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
 
function Register() { 
  return ( 
    <div> 
      <Menu /> 
      <Container fluid className="loginContainer"> 
        <RegisterForm />
      </Container> 
      <Footer />
    </div> 
  ); 
} 

export default Register;
