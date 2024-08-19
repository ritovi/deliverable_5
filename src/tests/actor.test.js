require('../models'); 
const request = require("supertest");
const app = require("../app");

let actorId;

const actor = {
  firstName: "Leonardo",
  lastName: "DiCaprio",
  nationality: "American",
  image: "http://example.com/leonardo.jpg",
  birhtdate: '1974-11-11'
};

const BASE_URL = '/api/v1/actors';

test("POST '/actors' should return status code 201 and res.body.firstName = actor.firstName", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(actor);

//   if (res.status !== 201) {
//     console.error('POST /actors failed:', res.body);
//   }

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
});

test("GET '/actors' should return a statusCode 200", async () => {
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

test("GET '/actors/:id' should return status code 200, res.body to be defined and res.body.firstName === actor.firstName", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${actorId}`);

//   if (res.status !== 200) {
//     console.error('GET /actors/:id failed:', res.body);
//   }

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actor.firstName);
  expect(res.body.lastName).toBe(actor.lastName);
  expect(res.body.nationality).toBe(actor.nationality);
  expect(res.body.image).toBe(actor.image);
  expect(res.body.birhtdate).toBe(actor.birhtdate);
});

test("PUT '/actors/:id' should return status code 200, res.body.firstName === actorUpdate.firstName", async () => {
  const actorUpdate = {
    firstName: "Leonardo",
    lastName: "DiCaprio Updated",
    nationality: "American",
    image: "http://example.com/leonardo_updated.jpg",
    birthdate: '1974-11-11'
  };

  const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(actorUpdate);

//   if (res.status !== 200) {
//     console.error('PUT /actors/:id failed:', res.body);
//   }

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorUpdate.firstName);
  expect(res.body.lastName).toBe(actorUpdate.lastName);
  expect(res.body.nationality).toBe(actorUpdate.nationality);
  expect(res.body.image).toBe(actorUpdate.image);
  expect(res.body.birhtdate).toBe(actorUpdate.birthdate);
});

test("DELETE '/actors/:id' should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`);

//   if (res.statusCode !== 204) {
//     console.error('DELETE /actors/:id failed:', res.body);
//   }

  expect(res.statusCode).toBe(204);
});
