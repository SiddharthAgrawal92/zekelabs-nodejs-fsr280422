const iotRoutes = require('express').Router();
const iotControllers = require('../controllers/iot.controllers');

//create random packets
iotRoutes.post('/:count', iotControllers.createRandomPackets);

//get iot packets
iotRoutes.get('/', iotControllers.getIotPackets);

module.exports = iotRoutes;