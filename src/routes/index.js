const express = require('express');
const router = express.Router();

const routerDirector = require("./director.router");
const routerActor = require("./actor.router");
const routerGenre = require("./genre.router");
const routerMovie = require("./movie.router");


// colocar las rutas aquí
router.use('/actors', routerActor)
router.use("/directors", routerDirector)
router.use("/genres", routerGenre)
router.use("/movies", routerMovie)


module.exports = router;