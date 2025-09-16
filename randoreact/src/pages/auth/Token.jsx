// src/services/token.js - VERSION AMÉLIORÉE

import jwtDecode from "jwt-decode";

/**
 * Récupère le token depuis localStorage
 */
function getToken() {
    return localStorage.getItem('access_token');
}

/**
 * Décode le token JWT
 */
let getDecodedToken = () => {
    const token = getToken();
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.warn('Token invalide:', error);
            localStorage.removeItem('access_token');
            return false;
        }
    }
    return false;
}

/**
 * Vérifie si le token est expiré
 */
let isTokenExpired = () => {
    const decoded = getDecodedToken();
    if (!decoded) return true;
    
    return decoded.exp * 1000 < Date.now();
}

/**
 * Vérifie la validité du token et le supprime s'il est expiré
 */
let getExpiryTime = () => {
    if (getDecodedToken() && !isTokenExpired()) {
        return true;
    } else {
        // Token expiré ou invalide - supprimer
        localStorage.removeItem('access_token');
        localStorage.removeItem('user'); // Nettoyer aussi les données utilisateur
        return false;
    }
}

/**
 * Récupère les rôles de l'utilisateur
 */
let getRoles = () => {
    if (getExpiryTime()) {
        try {
            const decoded = getDecodedToken();
            return JSON.parse(decoded.roles).toString();
        } catch (error) {
            console.warn('Erreur lors de la récupération des rôles:', error);
            return false;
        }
    }
    return false;
}

/**
 * Récupère l'email de l'utilisateur
 */
let getEmail = () => {
    if (getExpiryTime()) {
        return getDecodedToken().email;
    }
    return false;
}

/**
 * Vérifie si l'utilisateur est connecté et admin
 */
let loggedAndAdmin = () => {
    return !!(getExpiryTime() && getRoles() === 'ROLE_ADMIN');
}

/**
 * Déconnecte l'utilisateur en cas de token expiré
 */
let handleTokenExpiration = () => {
    if (isTokenExpired()) {
        // Nettoyer le localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('preferences');
        
        // Rediriger vers login (optionnel)
        if (window.location.pathname !== '/login') {
            window.location.href = '/login';
        }
        
        return true; // Token était expiré
    }
    return false; // Token encore valide
}

/**
 * Vérifie périodiquement l'expiration du token
 */
let startTokenExpirationCheck = () => {
    // Vérifier toutes les 5 minutes
    return setInterval(() => {
        if (getToken()) {
            handleTokenExpiration();
        }
    }, 5 * 60 * 1000); // 5 minutes
}

/**
 * Arrête la vérification périodique
 */
let stopTokenExpirationCheck = (intervalId) => {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

/**
 * Obtient le temps restant avant expiration (en secondes)
 */
let getTimeUntilExpiration = () => {
    const decoded = getDecodedToken();
    if (!decoded) return 0;
    
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeLeft = Math.max(0, (expirationTime - currentTime) / 1000);
    
    return Math.floor(timeLeft);
}

/**
 * Vérifie l'authentification de base
 */
let isAuthenticated = () => {
    return getExpiryTime(); // Utilise la fonction existante qui gère l'expiration
}

export default {
    getToken,
    getDecodedToken,
    getRoles,
    getEmail,
    loggedAndAdmin,
    getExpiryTime,
    isTokenExpired,
    handleTokenExpiration,
    startTokenExpirationCheck,
    stopTokenExpirationCheck,
    getTimeUntilExpiration,
    isAuthenticated
};