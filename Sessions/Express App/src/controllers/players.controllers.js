const Players = require('../models/players.model');

const createPlayer = async (req, res) => {
    if (req.body && req.body.length) {
        const response = await Players.insertOne(req.body).catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server error' });
        });
        res.status(201).send({ msg: 'Records inserted successfully', result: response });
    } else {
        res.status(400).send({ error: 'Empty Request received' });
    }
}

const createManyPlayers = async (req, res) => {
    if (req.body && req.body.playerList.length) {
        const response = await Players.insertMany(req.body.playerList).catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server error' });
        });
        res.status(201).send({ msg: 'Records inserted successfully', result: response });
    } else {
        res.status(400).send({ error: 'Empty Request received' });
    }
}

const getPlayers = async (req, res) => {
    if (req.query.skip && req.query.limit) {
        const totalRecords = await Players.countDocuments();
        const response = await Players.find({}).skip(req.query.skip).limit(req.query.limit).catch(err => {
            console.log(err);
            res.status(500).send({ error: 'Internal Server error' });
        });
        res.status(200).send({ msg: 'success', playerList: response, totalRecords: totalRecords });
    } else {
        res.status(400).send({ error: 'Skip & Limit Query Params are required' });
    }
}

module.exports = {
    createPlayer,
    createManyPlayers,
    getPlayers
}