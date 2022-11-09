const playersRoutes = require('express').Router();
const playersControllers = require('../controllers/players.controllers');
const playersValidators = require('../validators/players.validators');

//create players
playersRoutes.post('/', playersValidators.validateCreatePlayers, playersControllers.createPlayer);

//create multiple players
playersRoutes.post('/many', playersValidators.validateCreateManyPlayers, playersControllers.createManyPlayers);

//get players
playersRoutes.get('/', playersValidators.validateGetPlayers, playersControllers.getPlayers);

module.exports = playersRoutes;