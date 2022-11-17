const routes = require('express').Router();
const usersRoutes = require('./users.routes');
const playersRoutes = require('./players.routes');
const authRoutes = require('./auth.routes');
const postsRoutes = require('./posts.routes');
const verifyToken = require('../middleware/verifyToken');
let iotInterval;
routes.get('/', (req, res) => {
    // res.status(200).send('Hello From Server!');
    //rendering dynamic  file using pug template engine
    // res.render('index1', { title: 'Express App', message: 'Welcome to our server' });

    // //rendering dynamic  file using jade template engine
    res.render('index2', {
        title: "Express App",
        usersList: [
            {
                "name": "Karl Marx",
                "age": 75,
                "address": "Russia"
            },
            {
                "name": "Mona Litens",
                "age": 42,
                "address": "YT, Poland"
            }
        ]
    });

    //rendering dynamic  file using vash template engine
    // res.render('index3', { title: 'Express App', content: 'This app seems to be working fine :)' });
});

// kafka server 
// sensor(in device) connected to gps and internet --> location packet is being sent every 5 sec
// sensor will be pushed to mqtt server(device server)
// kafka server will produce the packets(producers--> producer.js) by taking them from mqtt server(device server)
// kafka consumer (consumer.js) you will use to consume the data packet

routes.get('/iot', (req, res) => {
    res.status(200).send('Success');
    const socket_io = req.app.get('socket.io');
    iotInterval = setInterval(() => {
        const iot_packet = {
            temperature: Math.floor(Math.random() * 100),
            batteryLevel: Math.floor(Math.random() * 100),
            timeStamp: new Date().toLocaleString()
        }
        socket_io.emit('iot-packet', iot_packet);
    }, 5000);
});

routes.put('/iot', (req, res) => {
    if (iotInterval) {
        clearInterval(iotInterval);
        res.status(200).send('IOT Packets Subscription cancelled successfully!');
    } else {
        res.status(400).send('IOT Packets Not Subscribed');
    }
});

//users-module routes --> http://localhost:8080/users
routes.use('/users', verifyToken, usersRoutes);

//players-module routes --> http://localhost:8080/players
routes.use('/players', verifyToken, playersRoutes);

//posts-module routes --> http://localhost:8080/posts
routes.use('/posts', postsRoutes);

//auth-module
// signup - http://localhost:8080/auth/signup
// login - http://localhost:8080/auth/login
routes.use('/auth', authRoutes);

routes.use((req, res) => {
    res.status(400).send(`
    <html>
        <body>
            <h1>
                Sorry this APIe endpoint is not Available in the server 
            </h1>
        </body>
    </html>
    `);
});

module.exports = routes;