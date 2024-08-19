require('../models'); 
const request = require("supertest");
const app = require("../app");

let directorId;

const director = {
  firstName: "Steven",
  lastName: "Spielberg",
  nationality: "American",
  image: "http://example.com/spielberg.jpg",
  birhtdate: '1946-12-18'
};

const BASE_URL = '/api/v1/directors';

test("POST '/directors' should return status code 201 and res.body.firstName = director.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(director);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
});

test("GET '/directors' should return a statusCode 200", async () => {
  const res = await request(app)
    .get(BASE_URL);

//   console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].lastName).toBeDefined();
  expect(res.body[0].nationality).toBeDefined();
  expect(res.body[0].image).toBeDefined();
  expect(res.body[0].birhtdate).toBeDefined();
});

test("GET '/directors/:id' should return status code 200, res.body to be defined and res.body.firstName === director.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(director.firstName);
  expect(res.body.lastName).toBe(director.lastName);
  expect(res.body.nationality).toBe(director.nationality);
  expect(res.body.image).toBe(director.image);
  expect(res.body.birhtdate).toBe(director.birhtdate);
});

test("PUT '/directors/:id' should return status code 200, res.body.firstName === directorUpdate.firstName", async () => {
  const directorUpdate = {
    firstName: "Steven",
    lastName: "Spielberg Updated",
    nationality: "American",
    image: "http://example.com/spielberg_updated.jpg",
    birhtdate: '1946-12-18'
  };

  const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(directorUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorUpdate.firstName);
  expect(res.body.lastName).toBe(directorUpdate.lastName);
  expect(res.body.nationality).toBe(directorUpdate.nationality);
  expect(res.body.image).toBe(directorUpdate.image);
  expect(res.body.birhtdate).toBe(directorUpdate.birhtdate);
});

test
