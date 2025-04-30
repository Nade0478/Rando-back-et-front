const axios = require("axios");
const { login } = require("../login");

jest.mock("axios");

describe("Tests de connexion", () => {
  test("Connexion réussie avec des identifiants valides", async () => {
    // Mock la réponse de l'API
    axios.post.mockResolvedValue({
      status: 200,
      data: {
        access_token: "fake_token",
      },
    });

    const credentials = {
      email: "user@truc.fr",
      password: "password",
    };

    const token = await login(credentials);

    expect(token).toBe("fake_token");
  });

  test("Échec de la connexion avec des identifiants invalides", async () => {
    // Mock la réponse de l'API
    axios.post.mockResolvedValue({
      status: 401,
      data: {
        message: "Identifiants invalides.",
      },
    });

    const credentials = {
      email: "wrong@truc.fr",
      password: "wrong_password",
    };

    const token = await login(credentials);

    expect(token).toBeNull();
  });

  test("Erreur lors de la connexion", async () => {
    // Mock une erreur dans la réponse de l'API
    axios.post.mockRejectedValue({
      response: {
        data: {
          error: "Serveur indisponible.",
        },
      },
    });

    const credentials = {
      email: "user@truc.fr",
      password: "password",
    };

    const token = await login(credentials);

    expect(token).toBeNull();
  });
});
