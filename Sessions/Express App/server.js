require('dotenv').config();

const fs = require('fs');
const express = require('express');
const path = require('path');
const serveIndex = require('serve-index');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./api-routes/index');

class Server {
    constructor() {
        this.initStaticFiles();
        this.initViewEngine();
        this.initMiddleware();
        this.initRoutes();
        this.startApp();
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

        //middleware to parse JSON type of content from http body
        app.use(bodyParser.json());
        app.use((req, res, next) => {
            fs.appendFile('./logger.txt', JSON.stringify({
                method: req.method,
                url: req.originalUrl,
                query: req.query,
                body: req.body,
                UserAgent: req.headers['user-agent'],
                origin: req.headers.origin,
                customHeader: req.headers['custom-header'],
                tms: new Date()
            }) + '\n', () => { });
            next();
        });

        app.use((req, res, next) => {
            console.log(`A new [${req.method}] Request received at: ${new Date}`);
            next();
        });
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