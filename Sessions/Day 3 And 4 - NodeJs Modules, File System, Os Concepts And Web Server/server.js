
const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        handleGETRequest(req, res);
    } else if (req.method === 'POST') {
        handlePOSTRequest(req, res);
    }
});

const handleGETRequest = (req, res) => {
    // method = 'GET/POST/PUT'
    ///Steps
    //connect to db
    //get data from db -> query()
    //fetch the data from db

    // if (dataFromDatabase && dataFromDatabase) {

    // } else {
    // res.writeHead(400);
    // res.end(JSON.stringify({ Error: 'Resource Not Found' }));
    // }

    switch (req.url) {
        case '/orders':
            res.writeHead(200);
            res.end('Response from GET API');
            break;
        default:
            res.writeHead(404);
            res.end('This API endpoint is not available in the server');
            break;
    }
}

const handlePOSTRequest = (req, res) => {
    res.writeHead(200);
    res.end('Response from POST API');
}

server.listen(port, hostname, () => {
    console.log(`Server has started at: http://${hostname}:${port}`);
});