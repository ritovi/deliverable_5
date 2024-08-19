const { getAll, create, getOne, remove, update, specialSetActors, specialSetDirectors, specialSetGenres } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route("/:user_id/actors")
    .post(specialSetActors)

routerMovie.route("/:user_id/directors")
    .post(specialSetDirectors)


routerMovie.route("/:user_id/genres")
    .post(specialSetGenres)


routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;