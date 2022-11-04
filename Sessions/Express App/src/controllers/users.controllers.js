const Users = require('../models/users.model');

//method to get the users in paginated manner
const getUser = async (req, res) => {

    //method-1 using exec()
    // Users.find({}).skip(req.query.skip).limit(req.query.limit).exec((err, usersList) => {
    //     if (err) {
    //         return res.status(500).send({ error: 'Something went wrong. Please try again!' });
    //     }
    //     res.status(200).send({ userList: usersList });
    // });

    //method-2 using async-await
    const usersList = await Users.find({}).skip(req.query.skip).limit(req.query.limit).catch(err => {
        res.status(500).send({ error: 'Something went wrong. Please try again!' });
    });
    const totalCount = await Users.countDocuments().catch(err => {
        res.status(500).send({ error: 'Something went wrong. Please try again!' });
    });
    res.status(200).send({ userList: usersList, totalRecords: totalCount });
}

const createUser = (req, res) => {
    console.log(req.body);
    res.send({ msg: 'This is a mock data', userId: null });
}

const updateUser = (req, res) => {
    console.log('request body', req.body);
    console.log('path params', req.params);
    res.send({ msg: 'This is a mock data', userId: null });
}

module.exports = {
    getUser,
    createUser,
    updateUser
}