import React, { useState, useEffect } from "react";
import "./DarkModeForm.css";

function DarkModeForm() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" // Sauvegarde l'état du dark mode
  );

  useEffect(() => {
    console.log("DarkMode activé :", darkMode);

    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "Mode clair ☀️" : "Mode sombre 🌙"}
    </button>
  );
}

export default DarkModeForm;
