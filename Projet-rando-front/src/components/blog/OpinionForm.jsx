import React, { useState, useEffect } from "react";
import axios from "axios";
import OpinionCards from "./OpinionCards";

const OpinionForm = () => {
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    fetchOpinions();
  }, []);

  const fetchOpinions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/opinion`);
      setOpinions(response.data.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des opinions :", error);
    }
  };

  return (
    <div>
      <OpinionCards opinions={opinions} />
    </div>
  );
};

export default OpinionForm;
