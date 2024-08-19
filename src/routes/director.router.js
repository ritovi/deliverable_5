const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const routerArtist = express.Router();

routerArtist.route('/')
    .get(getAll)
    .post(create);

routerArtist.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerArtist;