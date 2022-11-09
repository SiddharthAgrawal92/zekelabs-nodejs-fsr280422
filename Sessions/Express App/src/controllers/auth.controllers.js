
const Auth = require('../models/auth.model');

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
            res.status(200).send({ msg: 'Login Successful!' });
        }
    })
}

module.exports = {
    signupUser,
    loginUser
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
