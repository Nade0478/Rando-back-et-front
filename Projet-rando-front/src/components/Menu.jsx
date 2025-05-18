import React from "react"; 
import Container from "react-bootstrap/Container"; 
import Nav from "react-bootstrap/Nav"; 
import Navbar from "react-bootstrap/Navbar"; 
import NavDropdown from "react-bootstrap/NavDropdown"; 
import Logo from "./Logo";
import "./Menu.css";

const Menu = () => { 
  return ( 
    <div>
      <Navbar className="navbar-custom navbar-dark w-100" expand="xl">
        <Logo />
        <Container fluid> 
          <Navbar.Toggle aria-controls="navbarScroll" /> 
          <Navbar.Collapse id="navbarScroll"> 
            {/* Menu à GAUCHE */}
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll> 
              <Nav.Link href="/">Home</Nav.Link> 
              <NavDropdown title="About" id="navbarScrollingDropdown"> 
                <NavDropdown.Item href="/about"> 
                  À propos de nous
                </NavDropdown.Item> 
              </NavDropdown> 
              <NavDropdown title="Randonnées pédestre" id="navbarScrollingDropdown"> 
                <NavDropdown.Item href="/place/page"> 
                  Page randonnées pédestre
                </NavDropdown.Item> 
                <NavDropdown.Item href="/place/page"> 
                  Liste des opinions 
                </NavDropdown.Item> 
                <NavDropdown.Item href="/opinion/add"> 
                  Donnez votre opinion
                </NavDropdown.Item> 
              </NavDropdown> 
              <NavDropdown title="Blog" id="navbarScrollingDropdown"> 
                <NavDropdown.Item href="/blog"> 
                  Mon Blog
                </NavDropdown.Item>
                <NavDropdown.Item href="/article/add"> 
                  Créer un nouvel article 
                </NavDropdown.Item> 
              </NavDropdown>
              <NavDropdown title="Contact" id="navbarScrollingDropdown"> 
                <NavDropdown.Item href="/contact"> 
                  Page contact 
                </NavDropdown.Item> 
              </NavDropdown> 
            </Nav> 
            <hr />
            {/* Menu à DROITE */}
            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <NavDropdown title="Login" id="navbarScrollingDropdown"> 
                <NavDropdown.Item href="/login"> 
                  Se connecter 
                </NavDropdown.Item> 
                <NavDropdown.Item href="/logout"> 
                  Déconnexion 
                </NavDropdown.Item> 
              </NavDropdown>
              <NavDropdown title="Register" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/register"> 
                  S'inscrire
                </NavDropdown.Item>
              </NavDropdown>
            </Nav> 
          </Navbar.Collapse> 
        </Container> 
      </Navbar> 
    </div> 
  ); 
};

export default Menu; 
