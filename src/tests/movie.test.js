require('../models')

const request = require("supertest")
const app = require("../app");

let movieId

const movie = {
  name: "Inception",
  image: "http://example.com/inception.jpg",
  synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
  releaseYear: '2010-07-16'
}


const BASE_URL = '/api/v1/movies'

test("POST '/movies' should return status code 201 and res.body.name = movie.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(movie)

  movieId = res.body.id

  expect(res.status).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)
})

test("GET '/movies' should return a statusCode 200", async () => {
  const res = await request(app)
    .get(BASE_URL)

  // console.log(res.body);

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)

  expect(res.body[0].image).toBeDefined()
  expect(res.body[0].synopsis).toBeDefined()
  expect(res.body[0].releaseYear).toBeDefined()

  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].actors).toHaveLength(0); // Assuming no actors are associated yet
});


test("GET '/movies/:id' should return status code 200, res.body to be defined and res.body.name === movie.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movie.name)

  expect(res.body.image).toBe(movie.image)
  expect(res.body.synopsis).toBe(movie.synopsis)
  expect(res.body.releaseYear).toBe(movie.releaseYear)
})

test("PUT '/movies/:id' should return status code 200, res.body.name === movieUpdate.name", async () => {
  const movieUpdate = {
    name: "Inception Updated",
    image: "http://example.com/inception_updated.jpg",
    synopsis: "An updated synopsis for Inception.",
    releaseYear: '2010-07-17'
  }

  const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(movieUpdate)

  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(movieUpdate.name)
  expect(res.body.image).toBe(movieUpdate.image)
  expect(res.body.synopsis).toBe(movieUpdate.synopsis)
  expect(res.body.releaseYear).toBe(movieUpdate.releaseYear)
})

test("DELETE '/movies/:id' should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

  expect(res.statusCode).toBe(204)
})
