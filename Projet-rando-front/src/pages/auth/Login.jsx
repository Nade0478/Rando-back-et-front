import Container from "react-bootstrap/Container"; 
import LoginForm from "../../components/LoginForm";
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
 
function Login() { 
  return ( 
    <div> 
      <Menu />
      <Container fluid className="loginContainer"> 
      <LoginForm />
      </Container> 
      <Footer/> 
    </div> 
  ); 
} 
 
export default Login;