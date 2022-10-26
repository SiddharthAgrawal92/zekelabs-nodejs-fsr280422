
const url = require('url');
const { listDbs, insertUser } = require('./db');

const requestHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handleGetRequests(req, res);
            break;
        case 'POST':
            handlePostRequests(req, res);
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

        await listDbs();

        let pageSize = null;
        if (parsedUrl.query && parsedUrl.query.pageSize) {
            pageSize = parseInt(parsedUrl.query.pageSize);
        }
        // const res = db.users.find().limit(parsedUrl.query.pageSize);
        // if (res.length) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            msg: 'Data received successfully', items: [
                {
                    _id: 1,
                    name: 'Sid',
                    address: ''
                },
                {
                    _id: 2,
                    name: 'Adam',
                    address: ''
                }
            ]
        }));
        // }
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
                    res.setHeader("Content-Type", "application/json");
                    res.writeHead(201);
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