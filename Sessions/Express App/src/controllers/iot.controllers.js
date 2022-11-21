const Iot = require('../models/iot.model');

//method to get iot packets
const getIotPackets = async (req, res) => {
    let errors = [];
    let dateFilter = null;
    if (req.query.sortOrder && ['1', '-1'].indexOf(req.query.sortOrder) < 0) {
        errors.push("sortOrder is required as a query param");
    }
    if (!(req.query.limit && parseInt(req.query.limit) > 0)) {
        errors.push("limit is required as a query param");
    }
    if ((req.query.startDate && !req.query.endDate) || (!req.query.startDate && req.query.endDate)) {
        errors.push("startDate & endDate both are required");
    } else if (req.query.startDate && req.query.endDate) {
        dateFilter = {
            timeStamp: {
                $gte: req.query.startDate,
                $lt: req.query.endDate
            }
        }
    }
    if (errors.length) {
        res.status(400).send({ errors: errors });
    } else {
        let iotList = [];
        if (dateFilter) {
            iotList = await Iot.find({}).where(dateFilter).limit(req.query.limit).sort({ timeStamp: req.query.sortOrder }).catch(err => {
                res.status(500).send({ error: 'Something went wrong. Please try again!' });
            });
        } else {
            iotList = await Iot.find({}).limit(req.query.limit).sort({ timeStamp: req.query.sortOrder }).catch(err => {
                res.status(500).send({ error: 'Something went wrong. Please try again!' });
            });
        }
        res.status(200).send({ iotList: iotList });
    }
}

//method to create random packets
const createRandomPackets = async (req, res) => {
    if (parseInt(req.params.count)) {
        let list = [];
        for (let index = 0; index < req.params.count; index++) {
            list.push({
                temperature: Math.floor(Math.random() * 100),
                batteryLevel: Math.floor(Math.random() * 100),
                timeStamp: new Date(`2022-${Math.floor(Math.random() * 10) + 1}-${Math.floor(Math.random() * 10) + 1}`)
            });
        }
        const result = await Iot.insertMany(list).catch(err => {
            console.log(err);
            res.status(500).send({ error: "Internal Server Error" });
        });
        res.status(201).send({ result: result });
        const socket_instance = req.app.get('socket.io');
        socket_instance.emit('new-iot-value', result);
    } else {
        res.status(400).send({ error: "count is required as a path param" });
    }
}

module.exports = {
    createRandomPackets,
    getIotPackets
}
