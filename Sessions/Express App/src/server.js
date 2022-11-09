require('dotenv').config();

const fs = require('fs'),
    express = require('express'),
    path = require('path'),
    serveIndex = require('serve-index'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    app = express(),
    routes = require('./api-routes/index');

class Server {
    constructor() {
        this.initDb();
        this.initStaticFiles();
        this.initViewEngine();
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

    initMiddleware() {
        //Middleware
        //Case 1 (Login) --> Lock --> key passed by client will be validated --> is success then move to next --> if fail then send back the error
        //Case 1 (Logging) --> logger to log the http requests

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
        
        //logger to log all requests to a logger.txt file
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