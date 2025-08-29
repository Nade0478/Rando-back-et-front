import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../Logo";

const CustomNavbar = () => {
  return (
    <div>
      <Logo />
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Parameter" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/user">Gestion des utilisateurs</NavDropdown.Item>
                <NavDropdown.Item href="/blog">Modification blog</NavDropdown.Item>
                <NavDropdown.Item href="/article">Gestion des articles</NavDropdown.Item>
                <NavDropdown.Item href="/place">Gestion des sites de randonnées</NavDropdown.Item>
                <NavDropdown.Item href="/opinion">Gestions des opinions</NavDropdown.Item>
                <NavDropdown.Item href="/category">Gestion des catégories</NavDropdown.Item>
                <NavDropdown.Item href="/home">Gestion du contenu de la page d'accueil</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Login" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/login">Se connecter</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Déconnexion</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default CustomNavbar;
