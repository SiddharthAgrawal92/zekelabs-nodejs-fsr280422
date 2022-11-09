const { check, validationResult } = require('express-validator');

const validateSignup = async (req, res, next) => {
    await check('userName', 'userName is required').exists().run(req);
    await check('userName', 'userName should be an email').isEmail().run(req);

    await check('password', 'password is required').exists().run(req);
    await check('password', 'password should be strong with minimum 8 characters, at least 1 lowerCase, 1 upperCase & 1 special character').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1
    }).run(req);

    await check('role', 'role is required').exists().run(req);
    await check('role', 'role is invalid').isIn(["admin", "user"]).run(req);

    await check('mobileNumber', 'mobileNumber is required').exists().run(req);
    await check('mobileNumber', 'mobileNumber should be numeric').isNumeric().run(req);
    await check('mobileNumber', 'mobileNumber should be of 10 digits').isLength({ min: 10, max: 10 }).run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send({ errors: errors.array() });
    }
}

const validateLogin = async (req, res, next) => {
    await check('userName', 'userName is required').exists().run(req);
    await check('userName', 'userName/password is incorrect').isEmail().run(req);

    await check('password', 'password is required').exists().run(req);
    await check('password', 'userName/password is incorrect').isLength({ min: 8 }).run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send({ errors: errors.array() });
    }
}

module.exports = {
    validateSignup,
    validateLogin
}