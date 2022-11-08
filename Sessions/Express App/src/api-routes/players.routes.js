const playersRoutes = require('express').Router();
const playersControllers = require('../controllers/players.controllers');
const playersValidators = require('../validators/players.validators');

//create players
playersRoutes.post('/', playersValidators.validateCreatePlayers, playersControllers.createPlayers);

//get players
playersRoutes.get('/', playersValidators.validateGetPlayers, playersControllers.getPlayers);

module.exports = playersRoutes;