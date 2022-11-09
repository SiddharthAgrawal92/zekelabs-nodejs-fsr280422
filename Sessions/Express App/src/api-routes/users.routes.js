const userRoutes = require('express').Router();
const userControllers = require('../controllers/users.controllers');
//get user
userRoutes.get('/', userControllers.getUser);

//nested uri route
// userRoutes.get('/new', (req, res) => {
//     res.send({ userList: [], totalRecords: null })
// });

//create user
userRoutes.post('/', userControllers.createUser);


//update user by ID
// userRoutes.put('/:userId', (req, res) => {
//     console.log('request body', req.body);
//     console.log('path params', req.params);
//     res.send({ msg: 'This is a mock data', userId: null });
// });

//update user by ID & role
userRoutes.put('/:userId/:role', userControllers.updateUser);
// use case --> 2nd param is to differentiate between different collection to update the date in 
//company --> db
//adminUsers --> collection  --> db.adminUSers.updateOne({})
//publicUsers --> collection --> db.publicUsers.updateOne({})

module.exports = userRoutes;