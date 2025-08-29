import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Map from "../../components/Map";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Sidebar from "../../components/admin/Sidebar";

const customIcon = L.divIcon({
  html: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="green" class="bi bi-bluesky" viewBox="0 0 16 16"><path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948"/></svg>',
  className: '',
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
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
                      <Map
                        latitude={latitude_place}
                        longitude={longitude_place}
                        icon={customIcon}
                      />
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
