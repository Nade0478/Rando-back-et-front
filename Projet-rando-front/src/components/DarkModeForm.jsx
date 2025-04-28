import React, { useState, useEffect } from "react";
import "./DarkModeForm.css";

function DarkModeForm() {
    const [darkMode, setDarkMode] = useState(false);

    // Appliquer la classe au body quand le darkMode change
    useEffect(() => {
        document.body.className = darkMode ? "dark" : "light";
    }, [darkMode]);

    return (
        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Mode clair ☀️" : "Mode sombre 🌙"}
        </button>
    );
}

export default DarkModeForm;
