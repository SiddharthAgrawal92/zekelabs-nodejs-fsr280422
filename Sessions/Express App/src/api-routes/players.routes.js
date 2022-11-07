const playersRoutes = require('express').Router();
const playersControllers = require('../controllers/players.controllers');

//create players
playersRoutes.post('/', playersControllers.createPlayers);

//get players
playersRoutes.get('/', playersControllers.getPlayers);

module.exports = playersRoutes;