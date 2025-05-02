import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "../../components/Map";
import "leaflet/dist/leaflet.css";

import Sidebar from "../../components/admin/Sidebar";

const AddPlace = () => {
  const [name_place, setName_place] = useState("");
  const [image_place, setImage_place] = useState("");
  const [longitude_place, setLongitude_place] = useState("");
  const [latitude_place, setLatitude_place] = useState("");
  const [description_place, setDescription_place] = useState("");
  const [map_place, setMap_place] = useState("");
  const [distance_place, setDistance_place] = useState("");
  const [difficulty_place, setDifficulty_place] = useState("");
  const [estimated_time_place, setEstimated_time_place] = useState("");
  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate();

  const addPlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_place", name_place);
    formData.append("longitude_place", longitude_place);
    formData.append("latitude_place", latitude_place);
    formData.append("description_place", description_place);
    formData.append("distance_place", distance_place);
    formData.append("difficulty_place", difficulty_place);
    formData.append("estimated_time_place", estimated_time_place);
    if (image_place) {
      formData.append("image_place", image_place);
    }
    if (map_place) {
      formData.append("map_place", map_place);
    }

    await axios
      .post(`${process.env.REACT_APP_API_URL}/place`, formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
      )
      .then(() => navigate("/place"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  const changeImageHandler = (e) => {
    setImage_place(e.target.files[0]);
  };

  const changeMapHandler = (e) => {
    setMap_place(e.target.files[0]);
  };

  const handleLatitudeChange = (e) => {
    setLatitude_place(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude_place(e.target.value);
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Ajouter une randonnée</h4>
                <hr />
                <div className="form-wrapper">
                  {Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {Object.entries(validationError).map(
                              ([key, value]) => (
                                <li key={key}>{value}</li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  <Form onSubmit={addPlace}>
                    <Row>
                      <Col>
                        <Form.Group controlId="name_place">
                          <Form.Label>Nom de l'endroit</Form.Label>
                          <Form.Control
                            type="text"
                            value={name_place}
                            onChange={(place) => {
                              setName_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="longitude_place">
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="text"
                            value={longitude_place}
                            onChange={handleLongitudeChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="latitude_place">
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                            type="text"
                            value={latitude_place}
                            onChange={handleLatitudeChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {latitude_place && longitude_place && (
                      <Row className="my-3">
                        <Col>
                          <Map latitude={latitude_place} longitude={longitude_place} />
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col>
                        <Form.Group controlId="description_place">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            value={description_place}
                            onChange={(place) => {
                              setDescription_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="image_place" className="mb-3">
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={changeImageHandler}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="map_place" className="mb-3">
                          <Form.Label>Carte</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={changeMapHandler}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="distance_place">
                          <Form.Label>Distance</Form.Label>
                          <Form.Control
                            type="text"
                            value={distance_place}
                            onChange={(place) => {
                              setDistance_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="difficulty_place">
                          <Form.Label>Difficulté</Form.Label>
                          <Form.Control
                            type="text"
                            value={difficulty_place}
                            onChange={(place) => {
                              setDifficulty_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="estimated_time_place">
                          <Form.Label>Temps estimé</Form.Label>
                          <Form.Control
                            type="text"
                            value={estimated_time_place}
                            onChange={(place) => {
                              setEstimated_time_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="success"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Créer
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};

export default AddPlace;
