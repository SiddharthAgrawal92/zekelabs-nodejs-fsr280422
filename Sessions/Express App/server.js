require('dotenv').config();

const fs = require('fs');
const express = require('express');

const app = express();
const routes = require('./api-routes/index');

//Middleware
//Case 1 (Login) --> Lock --> key passed by client will be validated --> is success then move to next --> if fail then send back the error
//Case 1 (Logging) --> logger to log the http requests
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


//routes
//1. node-core (without framework)
// http.createHttpServer(routes)
//2. routes in express-app
app.use(routes);


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server is listening at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
});

//login module --> username & password --> validate in the backend --> send the token(expire in sometime)

//users module - (CRUD operation) --> User Create API  --> define endpoint