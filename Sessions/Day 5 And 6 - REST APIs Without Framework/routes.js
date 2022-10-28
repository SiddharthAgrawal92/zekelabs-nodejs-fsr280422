
const url = require('url');
const { listDbs, insertUser, getUsers, updateUser, deleteUser } = require('./db');

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-headers': '*',
    'Content-Type': 'application/json'
}

const requestHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handleGetRequests(req, res);
            break;
        case 'POST':
            handlePostRequests(req, res);
            break;
        case 'OPTIONS':
            res.writeHead(204, headers);
            res.end();
            break;
        case 'PUT':
            handlePutRequests(req, res);
            break;
        case 'DELETE':
            handleDeleteRequests(req, res);
            break;
        default:
            res.writeHead(404);
            res.end('This API Method is not supported');
    }
}

const handleGetRequests = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // console.log(`Path Name: ${parsedUrl.pathname}`);
    // console.log(`URL Query: ${parsedUrl.query}`);
    // console.log(`Query Param 1: ${parsedUrl.query.key1}`);
    // console.log(`Query Param 2: ${parsedUrl.query.key2}`);
    // res.end('done');

    //endpoint to get the users
    if (parsedUrl.pathname === '/users') {

        // await listDbs();

        let limit = null;
        if (parsedUrl.query && parsedUrl.query.limit) {
            limit = parseInt(parsedUrl.query.limit);
        }

        let skip = null;
        if (parsedUrl.query && parsedUrl.query.skip) {
            skip = parseInt(parsedUrl.query.skip);
        }

        //write a API doc for server REST APIs telling the front-end that allowed query params are
        //1. limit
        //2. skip

        const dbResult = await getUsers(limit, skip);

        if (dbResult.success) {
            res.writeHead(200, headers);
            res.end(JSON.stringify(dbResult.data));
        } else if (dbResult.error) {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
        }
    } else if (parsedUrl.pathname === '/items') {
        //another API endpoint for getting items from db
    }
}

//axios.post('http://localhost:8080/user', {"name": "abc", "age": 18, "address": "" });

//HTTP Method
//GET - Read
//POST - Create
//PUT - Update
//DELETE - Delete
//PATCH - Update/Path a small part of data

// in express project - body-parser module -  you can do it in 1 line of code

const handlePostRequests = (req, res) => {
    const parsedUrl = url.parse(req.url);
    if (parsedUrl.pathname === '/users') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            const requestBody = JSON.parse(data);
            if (requestBody && requestBody.name && requestBody.age && requestBody.address) {
                const dbResult = await insertUser(requestBody);
                if (dbResult.success) {
                    res.writeHead(201, headers);
                    res.end(JSON.stringify({
                        msg: 'User is Successfully inserted',
                        userId: dbResult.data.insertedId
                    }));
                } else if (dbResult.error) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        error: 'Unable to create the user'
                    }));
                }
            } else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(402);
                res.end(JSON.stringify({ msg: 'Wrong Data Received!' }));
            }
        });

        // chunk_1 = "{\"username\"\: \"abc\","
        // chunk_2 = "\"password\": \"QWERTy@123#\"}"
        // finalChunk = chunk_1 + chunk_2;
        // JSON.parse();
        // JSON.stringify();
    }
}

const handlePutRequests = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const endpoint = parsedUrl.pathname.split('/').slice(1); // "/users/635be913b38ccc29f701989c" --> ['', 'users', '635be913b38ccc29f701989c'] --> ['users', '635be913b38ccc29f701989c']
    if (endpoint[0] === 'users') { //endpoint[1] = userId
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });

        req.on('end', async () => {
            const requestBody = JSON.parse(data);
            if (requestBody && requestBody.name || requestBody.age || requestBody.address) {
                const dbResult = await updateUser(endpoint[1], requestBody);
                res.writeHead(dbResult.statusCode, headers);
                res.end(JSON.stringify({
                    msg: dbResult.msg,
                    userDetail: dbResult.data
                }));
            } else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(400);
                res.end(JSON.stringify({ msg: 'Wrong Data Received!' }));
            }
        });
    }
}

//front end --> axios.delete('http://localhost:8080/users/635be913b38ccc29f701989c');
const handleDeleteRequests = async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const endpoint = parsedUrl.pathname.split('/').slice(1); // "/users/635be913b38ccc29f701989c" --> ['', 'users', '635be913b38ccc29f701989c'] --> ['users', '635be913b38ccc29f701989c']
    if (endpoint[0] === 'users') { //endpoint[1] = userId
        if (endpoint[1]) {
            const dbResult = await deleteUser(endpoint[1]);
            res.writeHead(dbResult.statusCode, headers);
            res.end(JSON.stringify({
                msg: dbResult.msg
            }));
        } else {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400);
            res.end(JSON.stringify({ msg: 'User ID is required' }));
        }
    }
}

module.exports = requestHandler;

//pagination GET API example
//http://mock-api.com?pageNumber=1&pageSize=10

// ### CORS explanation ###
//www.example.com - front-end
//www.example.com - back-end(same origin)
//www.xyz.com - api/web server url(different origin)

//browser checks for the origin of calling place and server if they are same then sends the
//command to the server or else if server contains a CORS config of requesting calls from any origin OR a
// specific origin else browser rejects the request to be served from the browser

//send a preflight to the server to check for the configuration

//case 1
//analytics engine from where data is being stored in the db(cluster)
//nodejs will use the pre-stored data to generate a meaningful data out of it.

//case 2 (e-commerce)
//front-end for inventory(to store the products)
//server-APIs for doing CRUD of products --> POST http://localhost:8080/product , {product object}
//product (db) --> grocery (collection) --> document

//DB cluster will be blank

//10,000 records we have in database

//total number of records = 10,000
//number of record in one page = 5

//1. call to server to give me 5 records
// {
//     totalRecords: 10,000,
//     userList: {5}
// }

//DB Queries parsing
//GET Request
//Resolving CORS

//const pagination = { numberOfRecordsPerPage: 3}
//first call - GET skip=0&limit=3  --> response from server will contain total totalNoOfRecords,

//react-js-pagination module

//totalNoOfRecords - 8
// numberOfRecordsPerPage - 3
// Pagination UI - [1][2][3]..[10]