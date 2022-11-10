const authRoutes = require('express').Router();
const authControllers = require('../controllers/auth.controllers');
const authValidators = require('../validators/auth.validators');
const verifyToken = require('../middleware/verifyToken');

authRoutes.post('/signup', authValidators.validateSignup, authControllers.signupUser);

authRoutes.post('/login', authValidators.validateLogin, authControllers.loginUser);

authRoutes.get('/refresh', verifyToken, authControllers.refreshToken);

module.exports = authRoutes;