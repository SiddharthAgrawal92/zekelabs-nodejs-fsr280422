const userRoutes = require('express').Router();

//get user
userRoutes.get('/', (req, res) => {
    console.log('query params', req.query);
    res.send({ userList: [], totalRecords: null });
});

//nested uri route
// userRoutes.get('/new', (req, res) => {
//     res.send({ userList: [], totalRecords: null })
// });


//create user
userRoutes.post('/', (req, res) => {
    console.log(req.body);
    res.send({ msg: 'This is a mock data', userId: null });
});

//update user by ID
// userRoutes.put('/:userId', (req, res) => {
//     console.log('request body', req.body);
//     console.log('path params', req.params);
//     res.send({ msg: 'This is a mock data', userId: null });
// });

//update user by ID & role
userRoutes.put('/:userId/:role', (req, res) => {
    console.log('request body', req.body);
    console.log('path params', req.params);
    res.send({ msg: 'This is a mock data', userId: null });
});
// use case --> 2nd param is to differentiate between different collection to update the date in 
//company --> db
//adminUsers --> collection  --> db.adminUSers.updateOne({})
//publicUsers --> collection --> db.publicUsers.updateOne({})

module.exports = userRoutes;