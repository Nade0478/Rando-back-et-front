// const { expect } = require("@jest/globals");
const axios = require("axios");

const Axios = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

const user = {};

// describe("User Login", () => {
//   test("Vérification de l'authentification", async () => {
//     await login(user, {
//       email: "user@truc.fr",
//       password: "password",
//     });
//   });
// });

// ------------------------------------------------------------------------------
// UTILS
// ------------------------------------------------------------------------------
async function login(user, credentials) {
    const createRes = await Axios.post("http://127.0.0.1:8000/api/login", credentials);
    console.log("name", "email", "password");
    return createRes; // Retourner la réponse pour pouvoir l'utiliser
  }
  
  function parseCSRFToken(cookies) {
    const startAt = cookies[0].indexOf("=");
    const endAt = cookies[0].indexOf(";");
    const csrf = cookies[0].substring(startAt + 1, endAt - 3);
    return csrf;
  }
  
  // ------------------------------------------------------------------------------
  // TESTS
  // ------------------------------------------------------------------------------
  describe("User Authentication", () => {
    test("Vérification de l'authentification", async () => {
      const credentials = {
        email: "user@truc.fr",
        password: "password",
      };
      
      const response = await login(user, credentials);
      
      // Ajouter des assertions pour vérifier le comportement
      expect(response).toBeDefined();
      // expect(response.status).toBe(200); // exemple d'assertion
    });
  
    test("Parsing du token CSRF", () => {
      const mockCookies = ["csrf-token=abc123def; Path=/"];
      const token = parseCSRFToken(mockCookies);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });