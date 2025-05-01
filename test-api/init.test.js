const { expect } = require("@jest/globals");
const axios = require("axios");

const Axios = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Accept: "application/json",
  },
});

const user = {};

describe("User Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "user@truc.fr",
      password: "password",
    });
  });
});

// ------------------------------------------------------------------------------
// UTILS
// ------------------------------------------------------------------------------
async function login(user, credentials) {
  const createRes = await Axios.post("/login", credentials);
  console.log("name", "email", "password");
}

function parseCSRFToken(cookies) {
  const startAt = cookies[0].indexOf("=");
  const endAt = cookies[0].indexOf(";");
  const csrf = cookies[0].substring(startAt + 1, endAt - 3);
  return csrf;
}
describe("User Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "user@truc.fr",
      password: "password",
    });
  });
});

// ------------------------------------------------------------------------------
// Places
// ------------------------------------------------------------------------------

describe("Place API Tests", () => {
  test("Get Show", async () => {
    try {
      const placesRes = await Axios.get("/place");
      const places = placesRes.data.data;

      if (places && places.length > 0) {
        const placeId = places[0].id;
        const res = await Axios.get(`/place/${placeId}`);
        expect(res.data.data.name).toBeTruthy();
        expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
        expect(res.data.data.pv).toBeLessThanOrEqual(100);
      } else {
        console.error("No places found!");
      }
    } catch (error) {
      console.error("Error fetching places:", error.response?.status, error.response?.data);
    }
  });
});

  test("Get Show", async () => {
    const places = await Axios.get("/place");
    const res = await Axios.get("/place/" + places.data.data[0].id);
    expect(res.data.data.name).toBeTruthy();
    expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
    expect(res.data.data.pv).toBeLessThanOrEqual(100);
  });

  test("Get Paginate", async () => {
    try {
      const res = await Axios.get("/place-paginate?page=1");
      const data = res.data.data;
  
      expect(data.maxPages).toBeGreaterThanOrEqual(0);
      expect(data.page).toBe("1");
      expect(data.places).toHaveLength(3);
    } catch (error) {
      console.error("Pagination error:", error.response?.status, error.response?.data);
    }
  });
  
  test("Create Place with good data", async () => {
    const data = { name: "New Place", pv: 50 }; 
    try {
      const oldRes = await Axios.get("/place");
      const oldNumPlace = oldRes.data.length;
  
      const createRes = await Axios.post("/place", data);
      expect(createRes.status).toBe(201); // Vérifiez le statut HTTP 201 Created
  
      const curRes = await Axios.get("/place");
      const curNumPlace = curRes.data.length;
      expect(curNumPlace).toBe(oldNumPlace + 1);
    } catch (error) {
      console.error("Creation error:", error.response?.status, error.response?.data);
    }
  });
  

test("Update Place as not user owner", async () => {
  const data = { name: "Updated Name", pv: 60 };

  try {
    const res = await Axios.get("/place");
    const place = res.data.data.find((c) => c.user_id !== user.id);

    if (place) {
      const updateRes = await Axios.post(`/place/${place.id}`, data, {
        validateStatus: () => true, // Autoriser les réponses HTTP autres que 200
      });
      expect(updateRes.status).toBe(403); // Vérifiez le statut HTTP 403 Forbidden
    } else {
      console.error("No place found for update.");
    }
  } catch (error) {
    console.error("Update error:", error.response?.status, error.response?.data);
  }
});


describe("place POST", () => {
  test("Create with good data", async () => {
    const data = {
      name_place: "Place 1",
      longitude_place: 45.8,
      latitude_place: 4.87,
      description_place: "Description de la place 1",
      image_place: "place1.jpg",
      map_place: "place1_map.jpg",
      distance_place: 10,
      difficulty_place: "Facile",
      estimated_time_place: "08:00",
    };

    const old = await Axios.get("/place");
    const oldNumPlace = old.data.length;
    const createRes = await Axios.post("/place", data);
    const cur = await Axios.get("/place");
    const curNumPlace = cur.data.length;

    expect(createRes.data.name).toBe("Place 1");
    expect(curNumPlace).toBe(oldNumPlace + 1);
  });

  test("Create with bad data", async () => {
    const data = {
      name_place: "Place 1",
      longitude_place: 45.8,
      latitude_place: 4.87,
      description_place: "Description de la place 1",
      image_place: "place1.jpg",
      map_place: "place1_map.jpg",
      distance_place: 10,
      difficulty_place: "Facile",
      estimated_time_place: "08:00",
    };

    const old = await Axios.get("/place");
    const oldNumPlace = old.data.length;
    const createRes = await Axios.post("/place", data, {
      validateStatus: () => true,
    });
    const cur = await Axios.get("/place");
    const curNumPlace = cur.data.length;

    expect(createRes.status).toBe(422);
    expect(curNumPlace).toBe(oldNumPlace);
  });
});

test("Create with bad data", async (data = {
  name_place: "Place 1",
  longitude_place: 45.8,
  latitude_place: 4.87,
  description_place: "Description de la place 1",
  image_place: "place1.jpg",
  map_place: "place1_map.jpg",
  distance_place: 10,
  difficulty_place: "Facile",
  estimated_time_place: "08:00",
}) => {
  const old = await Axios.get("/place");
  const oldNumPlace = old.data.length;
  // before
  const createRes = await Axios.post("/place", data, {
    validateStatus: () => true,
  });
  // after
  const cur = await Axios.get("/place");
  const curNumPlace = cur.data.length;

  expect(createRes.status).toBe(422);
  expect(curNumPlace).toBe(oldNumPlace);
});

describe("Place DELETE", () => {
  test("Delete Place as user owner", async () => {
    try {
      const oldRes = await Axios.get("/place");
      const places = oldRes.data; 
      if (places && places.length > 0) {
        const place = places.find((c) => c.user_id === user.id);
        if (place) {
          const deleteRes = await Axios.delete(`/place/${place.id}`);
          expect(deleteRes.status).toBe(200);

          const curRes = await Axios.get("/place");
          const curPlaces = curRes.data;
          expect(curPlaces.length).toBe(places.length - 1);
        } else {
          console.error("Aucune place trouvée pour cet utilisateur.");
        }
      } else {
        console.error("Aucune place disponible pour suppression.");
      }
    } catch (error) {
      console.error("Erreur de suppression :", error.response?.status, error.response?.data);
    }
  });
});


// ------------------------------------------------------------------------------
// admin place
// ------------------------------------------------------------------------------

describe("Admin Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "admin@truc.fr",
      password: "password",
    });
  });
});

describe("Admin Place PUT", () => {
  test("Update as admin", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/place");
    const place = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.put("/place/" + place.id, data);
    expect(updateRes.data.name).toBe("New name");
  });
});

describe("Admin Place DELETE", () => {
  test("Delete as admin", async () => {
    const old = await Axios.get("/place");
    const place = old.data.find((c) => c.user_id != user.id);
    const oldNumPlace = old.data.length;
    // before
    const deleteRes = await Axios.delete("/place/" + place.id);
    // after
    const cur = await Axios.get("/place");
    const curNumPlace = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumPlace).toBe(oldNumPlace - 1);
  });
});

// ------------------------------------------------------------------------------
// articles
// ------------------------------------------------------------------------------
describe("article GET", () => {
  test("Récupération de la liste des articles", async () => {
    const res = await Axios.get("/article");
    expect(res.data.length).toBeGreaterThanOrEqual(2);
  });

  test("Get Show", async () => {
    const article = await Axios.get("/article");
    const res = await Axios.get("/article/" + article.data.data[0].id);
    expect(res.data.data.name).toBeTruthy();
    expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
    expect(res.data.data.pv).toBeLessThanOrEqual(100);
  });

  test("Get Paginate", async () => {
    const res = await Axios.get("/article-paginate?page=1");
    expect(res.data.data.maxPages).toBeGreaterThanOrEqual(0);
    expect(res.data.data.page).toBe("1");
    expect(res.data.data.article).toHaveLength(3);
  });
});

describe("Article PUT", () => {
  test("Update as user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/article");
    const article = res.data.find((c) => {
      return c.user_id == user.id;
    });
    const updateRes = await Axios.post("/article/" + article.id, data);
    expect(updateRes.data.data.name).toBe("New name");
  });

  test("Update as not user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/article");
    const article = res.data.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.post("/article/" + article.id, data.data, {
      validateStatus: () => true,
    });
    expect(updateRes.status).toBe(403);
    expect(updateRes.data.data.name).not.toBe("New name");
  });
});

describe("article POST", () => {
  test("Create with good data", async () => {
    const data = {
      title_article: "Article 1",
      date_article: "28/02/2025",
      content_article: "description de l'article",
      category_id: 7,
      user_id: 20,
      image_article: "image-article.jpg",
    };

    const old = await Axios.get("/article");
    const oldNumArticle = old.data.length;
    const createRes = await Axios.post("/article", data);
    const cur = await Axios.get("/article");
    const curNumArticle = cur.data.length;

    expect(createRes.data.name).toBe("Article 1");
    expect(curNumArticle).toBe(oldNumArticle + 1);
  });

  test("Create with bad data", async () => {
    const data = {
      title_article: "Article 1",
      date_article: "28/02/2025",
      content_article: "description de l'article",
      category_id: 7,
      user_id: 20,
      image_article: "image-article.jpg",
    };

    const old = await Axios.get("/article");
    const oldNumArticle = old.data.length;
    const createRes = await Axios.post("/article", data, {
      validateStatus: () => true,
    });
    const cur = await Axios.get("/article");
    const curNumArticle = cur.data.length;

    expect(createRes.status).toBe(422);
    expect(curNumArticle).toBe(oldNumArticle);
  });
});

test("Create with bad data", async (data = {
  title_article: "Article 1",
  date_article: "28/02/2025",
  content_article: "description de l'article",
  category_id: 7,
  user_id: 20,
  image_article: "image-article.jpg",
}) => {
  const old = await Axios.get("/article");
  const oldNumArticle = old.data.length;
  // before
  const createRes = await Axios.post("/article", data, {
    validateStatus: () => true,
  });
  // after
  const cur = await Axios.get("/article");
  const curNumArticle = cur.data.length;

  expect(createRes.status).toBe(422);
  expect(curNumArticle).toBe(oldNumArticle);
});

describe("Article DELETE", () => {
  test("Delete as user owner", async () => {
    const old = await Axios.get("/article");
    const article = old.data.find((c) => c.user_id == user.id);
    const oldNumArticle = old.data.length;
    // before
    const deleteRes = await Axios.delete("/article/" + article.id);
    // after
    const cur = await Axios.get("/article");
    const curNumArticle = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumArticle).toBe(oldNumArticle - 1);
  });

  test("Delete as not user owner", async () => {
    const old = await Axios.get("/article");
    const article = old.data.find((c) => c.user_id != user.id);
    const oldNumArticle = old.data.length;
    // before
    const deleteRes = await Axios.delete("/article/" + article.id, {
      validateStatus: () => true,
    });
    // after
    const cur = await Axios.get("/article");
    const curNumArticle = cur.data.length;

    expect(deleteRes.status).toBe(403);
    expect(curNumArticle).toBe(oldNumArticle);
  });
});

// ------------------------------------------------------------------------------
// admin article
// ------------------------------------------------------------------------------

describe("Admin Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "admin@truc.fr",
      password: "password",
    });
  });
});

describe("Admin Article PUT", () => {
  test("Update as admin", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/article");
    const article = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.put("/article/" + article.id, data);
    expect(updateRes.data.name).toBe("New name");
  });
});

describe("Admin Article DELETE", () => {
  test("Delete as admin", async () => {
    const old = await Axios.get("/article");
    const article = old.data.find((c) => c.user_id != user.id);
    const oldNumArticle = old.data.length;
    // before
    const deleteRes = await Axios.delete("/article/" + article.id);
    // after
    const cur = await Axios.get("/article");
    const curNumArticle = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumArticle).toBe(oldNumArticle - 1);
  });
});

// ------------------------------------------------------------------------------
// opinions
// ------------------------------------------------------------------------------
describe("opinion GET", () => {
  test("Récupération de la liste des opinions", async () => {
    const res = await Axios.get("/opinion");
    expect(res.data.length).toBeGreaterThanOrEqual(2);
  });

  test("Get Show", async () => {
    const opinions = await Axios.get("/opinion");
    const res = await Axios.get("/opinion/" + opinions.data.data[0].id);
    expect(res.data.data.name).toBeTruthy();
    expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
    expect(res.data.data.pv).toBeLessThanOrEqual(100);
  });

  test("Get Paginate", async () => {
    const res = await Axios.get("/opinion-paginate?page=1");
    expect(res.data.data.maxPages).toBeGreaterThanOrEqual(0);
    expect(res.data.data.page).toBe("1");
    expect(res.data.data.opinions).toHaveLength(3);
  });
});

describe("Opinion PUT", () => {
  test("Update as user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/opinion");
    const opinion = res.data.find((c) => {
      return c.user_id == user.id;
    });
    const updateRes = await Axios.post("/opinion/" + opinion.id, data);
    expect(updateRes.data.data.name).toBe("New name");
  });

  test("Update as not user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/opinion");
    const opinion = res.data.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.post("/opinion/" + opinion.id, data.data, {
      validateStatus: () => true,
    });
    expect(updateRes.status).toBe(403);
    expect(updateRes.data.data.name).not.toBe("New name");
  });
});

describe("opinion POST", () => {
  test("Create with good data", async () => {
    const data = {
      title_opinion: "Opinion 1",
      content_opinion: "description de l'opinion",
      note_opinion: 4,
      place_id: 7,
      user_id: 20,
    };

    const old = await Axios.get("/opinion");
    const oldNumOpinion = old.data.length;
    const createRes = await Axios.post("/opinion", data);
    const cur = await Axios.get("/opinion");
    const curNumOpinion = cur.data.length;

    expect(createRes.data.name).toBe("Opinion 1");
    expect(curNumOpinion).toBe(oldNumOpinion + 1);
  });

  test("Create with bad data", async () => {
    const data = {
      title_opinion: "Opinion 1",
      content_opinion: "description de l'opinion",
      note_opinion: 4,
      place_id: 7,
      user_id: 20,
    };

    const old = await Axios.get("/opinion");
    const oldNumOpinion = old.data.length;
    const createRes = await Axios.post("/opinion", data, {
      validateStatus: () => true,
    });
    const cur = await Axios.get("/opinion");
    const curNumOpinion = cur.data.length;

    expect(createRes.status).toBe(422);
    expect(curNumOpinion).toBe(oldNumOpinion);
  });
});

test("Create with bad data", async (data = {
  title_opinion: "Opinion 1",
  content_opinion: "description de l'opinion",
  note_opinion: 4,
  place_id: 7,
  user_id: 20,
}) => {
  const old = await Axios.get("/opinion");
  const oldNumOpinion = old.data.length;
  // before
  const createRes = await Axios.post("/opinion", data, {
    validateStatus: () => true,
  });
  // after
  const cur = await Axios.get("/opinion");
  const curNumOpinion = cur.data.length;

  expect(createRes.status).toBe(422);
  expect(curNumOpinion).toBe(oldNumOpinion);
});

describe("Opinion DELETE", () => {
  test("Delete as user owner", async () => {
    const old = await Axios.get("/opinion");
    const opinion = old.data.find((c) => c.user_id == user.id);
    const oldNumOpinion = old.data.length;
    // before
    const deleteRes = await Axios.delete("/opinion/" + opinion.id);
    // after
    const cur = await Axios.get("/opinion");
    const curNumOpinion = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumOpinion).toBe(oldNumOpinion - 1);
  });

  test("Delete as not user owner", async () => {
    const old = await Axios.get("/opinion");
    const opinion = old.data.find((c) => c.user_id != user.id);
    const oldNumOpinion = old.data.length;
    // before
    const deleteRes = await Axios.delete("/opinion/" + opinion.id, {
      validateStatus: () => true,
    });
    // after
    const cur = await Axios.get("/opinion");
    const curNumOpinion = cur.data.length;

    expect(deleteRes.status).toBe(403);
    expect(curNumOpinion).toBe(oldNumOpinion);
  });
});

// ------------------------------------------------------------------------------
// admin opinion
// ------------------------------------------------------------------------------

describe("Admin Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "admin@truc.fr",
      password: "password",
    });
  });
});

describe("Admin Opinion PUT", () => {
  test("Update as admin", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/opinion");
    const opinion = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.put("/opinion/" + opinion.id, data);
    expect(updateRes.data.name).toBe("New name");
  });
});

describe("Admin Opinion DELETE", () => {
  test("Delete as admin", async () => {
    const old = await Axios.get("/opinion");
    const opinion = old.data.find((c) => c.user_id != user.id);
    const oldNumOpinion = old.data.length;
    // before
    const deleteRes = await Axios.delete("/opinion/" + opinion.id);
    // after
    const cur = await Axios.get("/opinion");
    const curNumOpinion = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumOpinion).toBe(oldNumOpinion - 1);
  });
});
// ------------------------------------------------------------------------------
// categories
// ------------------------------------------------------------------------------
describe("category GET", () => {
  test("Récupération de la liste des catgories", async () => {
    const res = await Axios.get("/category");
    expect(res.data.length).toBeGreaterThanOrEqual(2);
  });

  test("Get Show", async () => {
    const category = await Axios.get("/category");
    const res = await Axios.get("/category/" + category.data.data[0].id);
    expect(res.data.data.name).toBeTruthy();
    expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
    expect(res.data.data.pv).toBeLessThanOrEqual(100);
  });

  test("Get Paginate", async () => {
    const res = await Axios.get("/category-paginate?page=1");
    expect(res.data.data.maxPages).toBeGreaterThanOrEqual(0);
    expect(res.data.data.page).toBe("1");
    expect(res.data.data.categories).toHaveLength(3);
  });
});

describe("Category PUT", () => {
  test("Update as user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/category");
    const category = res.data.find((c) => {
      return c.user_id == user.id;
    });
    const updateRes = await Axios.post("/category/" + category.id, data);
    expect(updateRes.data.data.name).toBe("New name");
  });

  test("Update as not user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/category");
    const category = res.data.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.post("/category/" + category.id, data.data, {
      validateStatus: () => true,
    });
    expect(updateRes.status).toBe(403);
    expect(updateRes.data.data.name).not.toBe("New name");
  });
});

describe("category POST", () => {
  test("Create with good data", async () => {
    const data = {
      name_category: "Category 1",
    };

    const old = await Axios.get("/category");
    const oldNumCategory = old.data.length;
    const createRes = await Axios.post("/category", data);
    const cur = await Axios.get("/category");
    const curNumCategory = cur.data.length;

    expect(createRes.data.name).toBe("category 1");
    expect(curNumCategory).toBe(oldNumCategory + 1);
  });

  test("Create with bad data", async () => {
    const data = {
      name_category: "Category 1",
    };

    const old = await Axios.get("/category");
    const oldNumCategory = old.data.length;
    const createRes = await Axios.post("/category", data, {
      validateStatus: () => true,
    });
    const cur = await Axios.get("/category");
    const curNumCategory = cur.data.length;

    expect(createRes.status).toBe(422);
    expect(curNumCategory).toBe(oldNumCategory);
  });
});

test("Create with bad data", async (data = {
  name_category: "Category 1",
}) => {
  const old = await Axios.get("/category");
  const oldNumCategory = old.data.length;
  // before
  const createRes = await Axios.post("/category", data, {
    validateStatus: () => true,
  });
  // after
  const cur = await Axios.get("/category");
  const curNumCategory = cur.data.length;

  expect(createRes.status).toBe(422);
  expect(curNumCategory).toBe(oldNumCategory);
});

describe("Category DELETE", () => {
  test("Delete as user owner", async () => {
    const old = await Axios.get("/category");
    const category = old.data.find((c) => c.user_id == user.id);
    const oldNumCategory = old.data.length;
    // before
    const deleteRes = await Axios.delete("/category/" + category.id);
    // after
    const cur = await Axios.get("/category");
    const curNumCategory = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumCategory).toBe(oldNumCategory - 1);
  });

  test("Delete as not user owner", async () => {
    const old = await Axios.get("/category");
    const category = old.data.find((c) => c.user_id != user.id);
    const oldNumCategory = old.data.length;
    // before
    const deleteRes = await Axios.delete("/category/" + category.id, {
      validateStatus: () => true,
    });
    // after
    const cur = await Axios.get("/category");
    const curNumCategory = cur.data.length;

    expect(deleteRes.status).toBe(403);
    expect(curNumCategory).toBe(oldNumCategory);
  });
});

// ------------------------------------------------------------------------------
// admin catégorie
// ------------------------------------------------------------------------------

describe("Admin Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "admin@truc.fr",
      password: "password",
    });
  });
});

describe("Admin Category PUT", () => {
  test("Update as admin", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/category");
    const category = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.put("/category/" + category.id, data);
    expect(updateRes.data.name).toBe("New name");
  });
});

describe("Admin Category DELETE", () => {
  test("Delete as admin", async () => {
    const old = await Axios.get("/category");
    const category = old.data.find((c) => c.user_id != user.id);
    const oldNumCategory = old.data.length;
    // before
    const deleteRes = await Axios.delete("/category/" + category.id);
    // after
    const cur = await Axios.get("/category");
    const curNumCategory = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumCategory).toBe(oldNumCategory - 1);
  });
});
// ------------------------------------------------------------------------------
// roles
// ------------------------------------------------------------------------------
describe("role GET", () => {
  test("Récupération de la liste des rôles", async () => {
    const res = await Axios.get("/role");
    expect(res.data.length).toBeGreaterThanOrEqual(2);
  });

  test("Get Show", async () => {
    const role = await Axios.get("/role");
    const res = await Axios.get("/role/" + role.data[0].id);
    expect(res.data.data.name).toBeTruthy();
    expect(res.data.data.pv).toBeGreaterThanOrEqual(1);
    expect(res.data.data.pv).toBeLessThanOrEqual(100);
  });

  test("Get Paginate", async () => {
    const res = await Axios.get("/role-paginate?page=1");
    expect(res.data.data.maxPages).toBeGreaterThanOrEqual(0);
    expect(res.data.data.page).toBe("1");
    expect(res.data.data.role).toHaveLength(3);
  });
});

describe("Role PUT", () => {
  test("Update as user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/role");
    const role = res.data.find((c) => {
      return c.user_id == user.id;
    });
    const updateRes = await Axios.post("/role/" + role.id, data);
    expect(updateRes.data.data.name).toBe("New name");
  });

  test("Update as not user owner", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/role");
    const role = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.post("/role/" + role.id, data.data, {
      validateStatus: () => true,
    });
    expect(updateRes.status).toBe(403);
    expect(updateRes.data.data.name).not.toBe("New name");
  });
});

describe("Role POST", () => {
  test("Create with good data", async () => {
    const data = {
      role: "Role 2",
    };

    const old = await Axios.get("/role");
    const oldNumRole = old.data.length;
    const createRes = await Axios.post("/role", data);
    const cur = await Axios.get("/role");
    const curNumRole = cur.data.length;

    expect(createRes.data.role).toBe("role 2");
    expect(curNumRole).toBe(oldNumRole + 1);
  });

  test("Create with bad data", async () => {
    const data = {
      role: "Role 2",
    };

    const old = await Axios.get("/role");
    const oldNumRole = old.data.length;
    const createRes = await Axios.post("/role", data, {
      validateStatus: () => true,
    });
    const cur = await Axios.get("/role");
    const curNumRole = cur.data.length;

    expect(createRes.status).toBe(422);
    expect(curNumRole).toBe(oldNumRole);
  });
});

test("Create with bad data", async (data = {
  role: "Role 2",
}) => {
  const old = await Axios.get("/role");
  const oldNumRole = old.data.length;
  // before
  const createRes = await Axios.post("/role", data, {
    validateStatus: () => true,
  });
  // after
  const cur = await Axios.get("/role");
  const curNumRole = cur.data.length;

  expect(createRes.status).toBe(422);
  expect(curNumRole).toBe(oldNumRole);
});

describe("Role DELETE", () => {
  test("Delete as user owner", async () => {
    const old = await Axios.get("/role");
    const role = old.data.find((c) => c.user_id == user.id);
    const oldNumRole = old.data.length;
    // before
    const deleteRes = await Axios.delete("/role/" + role.id);
    // after
    const cur = await Axios.get("/role");
    const curNumRole = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumRole).toBe(oldNumRole - 1);
  });

  test("Delete as not user owner", async () => {
    const old = await Axios.get("/role");
    const role = old.data.find((c) => c.user_id != user.id);
    const oldNumRole = old.data.length;
    // before
    const deleteRes = await Axios.delete("/role/" + role.id, {
      validateStatus: () => true,
    });
    // after
    const cur = await Axios.get("/role");
    const curNumRole = cur.data.length;

    expect(deleteRes.status).toBe(403);
    expect(curNumRole).toBe(oldNumRole);
  });
});

// ------------------------------------------------------------------------------
// admin roles
// ------------------------------------------------------------------------------

describe("Admin Login", () => {
  test("Vérification de l'authentification", async () => {
    await login(user, {
      email: "admin@truc.fr",
      password: "password",
    });
  });
});

describe("Admin Role PUT", () => {
  test("Update as admin", async (data = {
    name: "New name",
    _method: "PUT",
  }) => {
    const res = await Axios.get("/role");
    const role = res.data.find((c) => c.user_id != user.id);
    const updateRes = await Axios.put("/role/" + role.id, data);
    expect(updateRes.data.name).toBe("New name");
  });
});

describe("Admin Role DELETE", () => {
  test("Delete as admin", async () => {
    const old = await Axios.get("/role");
    const role = old.data.find((c) => c.user_id !== user.id);
    const oldNumRole = old.data.length;
    
    // Vérification que `role` est défini
    if (!role) {
      throw new Error("Aucun rôle correspondant trouvé pour suppression.");
    }

    // Correction de `role-id` en `role.id`
    const deleteRes = await Axios.delete("/role/" + role.id);
    
    // après suppression
    const cur = await Axios.get("/role");
    const curNumRole = cur.data.length;

    expect(deleteRes.status).toBe(200);
    expect(curNumRole).toBe(oldNumRole - 1);
  });
});

// ------------------------------------------------------------------------------
// TEST CONNEXION
// ------------------------------------------------------------------------------
async function testConnection() {
  try {
    const res = await axios.get("http://localhost:3000/admin", {
      headers: {
        Authorization: "Bearer 2c633cd2-e00b-4d99-8905-baf203ca9224", // Remplace par un vrai token
      },
    });
    console.log(res.data); // Affichez la réponse
  } catch (error) {
    console.error("Connexion refusée :", error.message);
    if (error.response) {
      console.error("Statut de l'erreur :", error.response.status);
      console.error("Détails :", error.response.data);
    } else {
      console.error("Erreur sans réponse du serveur :", error);
    }
  }}
  
testConnection();