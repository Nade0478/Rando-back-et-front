import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";


const EditPlace = () => {
  const { place } = useParams();
  const navigate = useNavigate();

  const [name_place, setName_place] = useState("");
  const [image_place, setImage_place] = useState(null);
  const [longitude_place, setLongitude_place] = useState("");
  const [latitude_place, setLatitude_place] = useState("");
  const [description_place, setDescription_place] = useState("");
  const [map_place, setMap_place] = useState(null);
  const [distance_place, setDistance_place] = useState("");
  const [difficulty_place, setDifficulty_place] = useState("");
  const [estimated_time_place, setEstimated_time_place] = useState("");
  const [validationError, setValidationError] = useState({});

  // Fetch the Place details
  const getPlace = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/place/${place}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      const placeData = res.data;
      setName_place(placeData.name_place);
      setImage_place(placeData.image_place);
      setLongitude_place(placeData.longitude_place);
      setLatitude_place(placeData.latitude_place);
      setDescription_place(placeData.description_place);
      setMap_place(placeData.map_place);
      setDistance_place(placeData.distance_place);
      setDifficulty_place(placeData.difficulty_place);
      setEstimated_time_place(placeData.estimated_time_place);
    } catch (error) {
      console.log(error);
    }
  }, [place]);

  // Use useEffect to fetch data
  useEffect(() => {
    getPlace();
  }, [getPlace]);

  const changeImageHandler = (e) => {
    setImage_place(e.target.files[0]);
  };

  const changeMapHandler = (e) => {
    setMap_place(e.target.files[0]);
  };

  const updatePlace = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
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
      .post(`${process.env.REACT_APP_API_URL}/place/${place}`, formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
    )
      .then(() => navigate("/place"))
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        }
      });
  };

  return (
    <div>
      <Sidebar />
      <div className="container mt-5 card-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Modifier une randonnée</h4>
                <hr />
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
                  <Form onSubmit={updatePlace}>
                    <Row>
                      <Col>
                        <Form.Group controlId="name_place">
                          <Form.Label>Nom de l'endroit</Form.Label>
                          <Form.Control
                            type="text"
                            value={name_place}
                            onChange={(e) => setName_place(e.target.value)}
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
                            onChange={(place) => {
                              setLongitude_place(place.target.value);
                            }}
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
                            onChange={(place) => {
                              setLatitude_place(place.target.value);
                            }}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="my-3">
                      <Col>
                        {/* <MapContainer
                          style={{ height: "300px", width: "100%" }}
                          center={[
                            parseFloat(latitude_place) || 48.8566, // Valeur par défaut (Paris)
                            parseFloat(longitude_place) || 2.3522, // Valeur par défaut (Paris)
                          ]}
                          zoom={13}
                          scrollWheelZoom={false}
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                          />
                          {latitude_place && longitude_place && (
                            <Marker
                              position={[
                                parseFloat(latitude_place),
                                parseFloat(longitude_place),
                              ]}
                            >
                              <Popup>
                                Position : {latitude_place}, {longitude_place}
                              </Popup>
                            </Marker>
                          )}
                        </MapContainer> */}
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group controlId="description_place">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            value={description_place}
                            onChange={(e) => setDescription_place(e.target.value)}
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
                            onChange={(e) => setDistance_place(e.target.value)}
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
                            onChange={(e) => setDifficulty_place(e.target.value)}
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
                            onChange={(e) => setEstimated_time_place(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="image_place" className="mb-3">
                          <Form.Label>Photo</Form.Label>
                          <Form.Control type="file" onChange={changeImageHandler} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group controlId="map_place">
                          <Form.Label>Carte</Form.Label>
                          <Form.Control
                            type="file"
                            onChange={changeMapHandler}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Button
                      variant="dark"
                      className="mt-2"
                      size="lg"
                      block="block"
                      type="submit"
                    >
                      Mettre à jour
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
  );
};

export default EditPlace;
