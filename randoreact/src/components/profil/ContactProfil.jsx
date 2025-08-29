import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ContactProfil = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card className="shadow-lg p-4" style={{ width: "140rem" }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card">
              <h2 className="text-center">Demande de contact</h2>
              <div className="card-body">
                <h4 className="card-title text-center">
                  Envoyez une demande via ce lien :
                </h4>
                <Link
                  to="/contact"
                  className="btn btn-success btn-lg mx-auto d-block"
                >
                  Demande de contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactProfil;
