const { check, validationResult, query } = require('express-validator');

const validateCreatePlayers = async (req, res, next) => {
    //## Validations
    //check if string
    // await check('name', 'Name should be a string').isString().run(req);

    // //check for length
    // await check('name', 'Length is not in the range').isLength({ min: 6, max: 30 }).run(req);

    //chaining of validations & bail() to stop the next validation to be called in the chain
    await check('name', 'Name should be a string & in a valid range').isString().bail().isLength({ min: 6, max: 30 }).run(req);

    //required field
    // await check('manager', 'Field is required').exists().run(req);

    //check if should be empty
    // await check('manager', 'Field should be empty').isEmpty().run(req);

    //validate email
    // await check('username', 'Please send a correct email').isEmail().run(req);

    // //validate alphanumeric password with length
    // // await check('password', 'Please send a password in correct format').isAlphanumeric().isLength({ min: 7, max: 16 }).run(req);

    // //validate strong password with length
    // await check('password', 'Please send a password in correct format').isStrongPassword({ minLength: 7, minLowercase: 1, minUppercase: 1, minSymbols: 1 }).isLength({ max: 16 }).run(req);

    // //to validate the value of confirm password
    // await check('confirmPassword', 'confirmPassword & password should be same').custom((value, { req }) => value === req.body.password).run(req);

    // //optional to check but if passed then check with specified values
    // await check('version', 'version should be correct').optional().isIn(["1.0.0", "1.0.1"]).run(req);

    // //validate a correct UUID --> 8-4-4-4-12
    // await check('uuid', 'uuid should be correct').isUUID(["1.0.0", "1.0.1"]).run(req);

    // //## Sanitization
    // //replace values with new one 
    // //[foo, bar]  has to be replace with --> football
    // await check('note').replace(["foo", "bar"], "football").trim().run(req);

    // //set value to UpperCase
    // await check('note').toUpperCase().run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send({ errors: errors.array() });
    }

}

const validateCreateManyPlayers = async (req, res, next) => {
    await check('playerList', 'playerList is required').exists().run(req);
    await check('playerList', 'playerList should be an array').isArray().run(req);

    await check('playerList.*.name', 'name is required in the playerList object').exists().run(req);
    await check('playerList.*.name', 'name should be a string in the playerList object').isString().run(req);

    await check('playerList.*.sport', 'sport is required in the playerList object').exists().run(req);
    await check('playerList.*.sport', 'sport should be a string in the playerList object').isString().run(req);

    await check('playerList.*.rank', 'rank is required in the playerList object').exists().run(req);
    await check('playerList.*.rank', 'rank should be a number in the playerList object').isNumeric().run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send({ errors: errors.array() });
    }
}

const validateGetPlayers = async (req, res, next) => {

    await query('skip', 'skip value is invalid').isNumeric().custom((value) => value >= 0).run(req);
    await query('limit', 'limit value is invalid').isNumeric().custom((value) => value >= 1).run(req);

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();
    } else {
        res.status(400).send({ errors: errors.array() });
    }
}


module.exports = {
    validateCreatePlayers,
    validateCreateManyPlayers,
    validateGetPlayers,
}

//API - DOCUMENT
//1. Endpoint --> http://localhost:8080/players
//2. Method --> POST
//3. Request --> { name: <String> <Length {Min:6, Max: 30} >}
