const userRoutes = require('express').Router();

userRoutes.get('/', (req, res) => {
    res.send({ userList: [], totalRecords: null })
});

//nested uri route
// userRoutes.get('/new', (req, res) => {
//     res.send({ userList: [], totalRecords: null })
// });

userRoutes.post('/', (req, res) => {
    res.send({ msg: 'This is a mock data', userId: null });
});

module.exports = userRoutes;