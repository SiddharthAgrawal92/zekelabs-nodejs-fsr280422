const authRoutes = require('express').Router();
const authControllers = require('../controllers/auth.controllers');
const authValidators = require('../validators/auth.validators');

authRoutes.post('/signup', authValidators.validateSignup, authControllers.signupUser);

authRoutes.post('/login', authValidators.validateLogin, authControllers.loginUser);

module.exports = authRoutes;