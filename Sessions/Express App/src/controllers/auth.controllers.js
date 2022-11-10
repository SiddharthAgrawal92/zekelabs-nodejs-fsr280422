
const Auth = require('../models/auth.model');
const JWT = require('jsonwebtoken');

const signupUser = (req, res) => {
    //check if user is already signed up
    Auth.findOne({ userName: req.body.userName }).exec((err, userDetail) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else if (userDetail) {
            res.status(406).send({ error: 'User already exists' });
        } else {
            const newUserDetail = new Auth(req.body);
            //get the hash password from model
            newUserDetail.password = newUserDetail.generateHash(req.body.password);
            newUserDetail.save((err, data) => {
                if (err) {
                    res.status(500).send({ error: 'Error while sing up. Please try again' });
                } else {
                    res.status(201).send({ msg: 'You\'ve signed up successfully' });
                }
            });
        }
    })
}

const loginUser = (req, res) => {
    Auth.findOne({ userName: req.body.userName }).exec((err, userDetail) => {
        if (err) {
            res.status(500).send({ error: 'Internal Server Error' });
        } else if ((!userDetail || (userDetail && !(userDetail.comparePassword(req.body.password))))) {
            res.status(401).send({ error: 'Login Failed! Please enter correct username/password' });
        } else {
            const token = generateJWTToken(userDetail);
            res.status(200).send({
                msg: 'Login Successful!',
                access_token: token,
                expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
            });
        }
    })
}

const refreshToken = (req, res) => {
    const userDetail = {
        mobileNumber: req.jwtPayload.mobile,
        role: req.jwtPayload.role
    }
    const token = generateJWTToken(userDetail);
    res.status(200).send({
        msg: 'Token Refreshed Successfully!',
        access_token: token,
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
    });
}

const generateJWTToken = (userDetail) => {
    const claims = {
        iss: "http://localhost:8080",
        mobile: userDetail.mobileNumber,
        role: userDetail.role
    }
    const jwtToken = JWT.sign(claims, process.env.JWT_TOKEN_KEY, {
        algorithm: 'HS256',
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
    });
    return jwtToken;
}

module.exports = {
    signupUser,
    loginUser,
    refreshToken
}

//jwt token - JSON Web Token

//1. Header = xxxx
//2. payload = yyyy
//3. Signature = zzzz
//xxxx.yyyy.zzzz

// headers: {
//     alg: "HS256",
//     typ: "JWT"
// }

// payload: {
//     iss: "www.example.com",
//     exp: "",
//     sub: "",
//     admin: true
// }

// Signature : base64Encoded value 
