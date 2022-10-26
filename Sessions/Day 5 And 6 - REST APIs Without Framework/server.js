const http = require('http');

const dotenv = require('dotenv');
dotenv.config();
const requestHandler = require('./routes');

// const fs = require('fs');
//check file stats
// fs.stat('./local_modules', (err, data) => {
//     console.log(data.isFile());
// });

// const getCurrentDate = require('./local_modules/currentDate');
// console.log(getCurrentDate());

const server = http.createServer(requestHandler);


server.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server has started at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
});