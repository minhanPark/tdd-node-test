const request = require("supertest");
const app = require("../../server");
const newProduct = require("../data/new-product.json");

let firstProduct;

describe("/api/product post test", () => {
  it("POST /api/products", async () => {
    const response = await request(app).post("/api/products").send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.description).toBe(newProduct.description);
  });

  it("should throw an error 500", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({ name: "Pro" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message:
        "Product validation failed: description: Path `description` is required.",
    });
  });
});

describe("get /api/products test", () => {
  it("GET /api/products", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstProduct = response.body[0];
  });
});

describe("/api/product/:productId test", () => {
  it("GET /api/product/:productId", async () => {
    const response = await request(app).get(
      "/api/products/" + firstProduct._id
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
  });

  it("GET id does not exist /api/products/:productId", async () => {
    const response = await request(app).get(
      "/api/products/62948135cfde9d6731db36c4"
    );
    expect(response.statusCode).toBe(404);
  });
});

describe("/api/products test", () => {
  it("PUT /api/products", async () => {
    const response = await request(app)
      .put("/api/products/" + firstProduct._id)
      .send({ name: "updatedName", description: "updatedDesc", price: 1234 });
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("updatedName");
    expect(response.body.description).toBe("updatedDesc");
  });
  it("PUT id does not exist /api/products/:productId", async () => {
    const response = await request(app)
      .put("/api/products/62948135cfde9d6731db36c4")
      .send({ name: "updatedName", description: "updatedDesc", price: 1234 });
    expect(response.statusCode).toBe(404);
  });
});
