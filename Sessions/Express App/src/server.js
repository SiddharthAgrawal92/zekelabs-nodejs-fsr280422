require('dotenv').config();

const fs = require('fs'),
    express = require('express'),
    path = require('path'),
    serveIndex = require('serve-index'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    routes = require('./api-routes/index'),
    cookieParser = require('cookie-parser'),
    winston = require('winston'),
    expressWinston = require('express-winston'),
    compression = require('compression'),
    helmet = require('helmet'),
    io = require('socket.io')(process.env.SOCKET_PORT, {
        cors: {
            origin: '*'
        }
    });

class Server {
    constructor() {
        this.initDb();
        this.initStaticFiles();
        this.initViewEngine();
        this.initSocketConnection();
        this.initMiddleware();
        this.initRoutes();
        this.startApp();
    }

    initDb() {
        mongoose.connect(process.env.DB_CONNECTION_STRING);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error Connecting to db'));
        db.on('open', () => {
            console.log('You are connected to MongoDB successfully');
        });
    }

    initStaticFiles() {
        app.use('/public', express.static(path.join(__dirname, './public')));
        app.use('/public', serveIndex(path.join(__dirname, './public')));
    }

    initViewEngine() {
        app.set('views', path.join(__dirname, './views'));
        // app.set('view engine', 'pug');
        app.set('view engine', 'jade');
        // app.set('view engine', 'vash');
    }

    initSocketConnection() {
        let users = {};
        io.on('connection', clientSocket => {
            console.log(`Client with ID ${clientSocket.id} is connected Successfully!`);

            //event 'new-user' will emit(send) the value which we are listening(capturing/getting) here
            clientSocket.on('new-user', userName => {
                users[clientSocket.id] = userName;
                //emitting a message to same user
                clientSocket.emit('chat-message', { name: 'Admin', msg: `Hello ${userName}! Welcome to our chatroom.` });
                //different clients who are connected needs to be informed about this new user
                clientSocket.broadcast.emit('new-user-connected', userName);
            });

            clientSocket.on('send-chat-message', msg => {
                clientSocket.broadcast.emit('chat-message', { name: users[clientSocket.id], msg: msg });
            });

            clientSocket.on('disconnect', () => {
                // console.log('Client Instance Disconnected');
                console.log(`Client with ID ${clientSocket.id} is disconnected Successfully!`);
                clientSocket.broadcast.emit('user-disconnected', users[clientSocket.id]);
                delete users[clientSocket.id];
            });
        });
        app.set('socket.io', io);
    }

    initMiddleware() {
        //Middleware
        //Case 1 (Login) --> Lock --> key passed by client will be validated --> is success then move to next --> if fail then send back the error
        //Case 1 (Logging) --> logger to log the http requests

        //compression to compress the response before sending it
        app.use(compression({
            level: 9
        }));

        //securing the http headers
        // app.use(helmet());

        //middleware to configure cors
        app.use(cors((req, cb) => {
            let corsOptions = { origin: false, credentials: false };
            if (process.env.WHITELISTED_ORIGINS.indexOf(req.headers.origin) !== -1) {
                corsOptions.origin = true;
                corsOptions.credentials = true;
            }
            cb(null, corsOptions);
        }));

        //middleware to parse JSON type of content from http body
        app.use(bodyParser.json());

        //cookie parser
        app.use(cookieParser());

        //winston logger for logging the requests
        // app.use(expressWinston.logger({
        //     transports: [new winston.transports.File({ filename: path.join(__dirname, './logs/request-logs.log') })],
        //     // format: winston.format.combine(
        //     //     winston.format.colorize(),
        //     //     winston.format.json
        //     // ),
        //     msg: "HTTP {{req.method}} {{req.url}}",
        //     ignoreRoute: function (req, res) {
        //         if (process.env.IGNORE_ROUTES_IN_LOGGER.indexOf(req.url) > -1) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     },
        //     headerBlacklist: ['cookie', 'authorization']
        // }));

        //custom logger to log all requests to a logger.txt file
        // app.use((req, res, next) => {
        //     fs.appendFile(path.join(__dirname, '../logger.txt'), JSON.stringify({
        //         method: req.method,
        //         url: req.originalUrl,
        //         query: req.query,
        //         body: req.body,
        //         UserAgent: req.headers['user-agent'],
        //         origin: req.headers.origin,
        //         customHeader: req.headers['custom-header'],
        //         tms: new Date()
        //     }) + '\n', () => { });
        //     next();
        // });

        //logger to log all requests to the console
        // app.use((req, res, next) => {
        //     console.log(`A new [${req.method}] Request received at: ${new Date}`);
        //     next();
        // });
    }


    initRoutes() {
        //routes
        //1. node-core (without framework)
        // const http = require('http');
        // const server = http.createHttpServer((req, res) => { })
        // server.listen(8080, ()=>{});
        //2. routes in express-app
        app.use(routes);
    }

    startApp() {
        app.listen(process.env.PORT, process.env.HOSTNAME, () => {
            console.log(`Server is listening at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
        });
    }
}

new Server();

module.exports = app;



// ## Misslaneous
//Sing-up --> Create User

//login module --> username & password --> validate in the backend --> send the token(expire in sometime)

//users module - (CRUD operation) --> User Create API  --> define endpoint

//1. template engines
//configuration in the express

//2. Serving static files from web server
//middleware
//images files has to be served from the server
//metadata files


//### Socket ###
// it provides a bidirectional from frontend to backend and vice versa
// two way communication can be done between the server and the frontend
// from single socket connection placed in the server multiple clients can get connected to the same
// this is all done using async-programming

// how to achieve it?
//Steps for socket programming
// 1. Server will create a socket connection
// 2. front end will send a handshake request to the socket server
// 3. socket will accept the request and create a channel for communication 