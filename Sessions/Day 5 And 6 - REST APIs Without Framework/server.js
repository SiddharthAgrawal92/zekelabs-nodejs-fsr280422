// const http = require('http');

// const dotenv = require('dotenv');
// dotenv.config();
// const requestHandler = require('./routes');

// // const fs = require('fs');
// //check file stats
// // fs.stat('./local_modules', (err, data) => {
// //     console.log(data.isFile());
// // });

// // const getCurrentDate = require('./local_modules/currentDate');
// // console.log(getCurrentDate());

// const server = http.createServer(requestHandler);


// server.listen(process.env.PORT, process.env.HOSTNAME, () => {
//     console.log(`Server has started at: http://${process.env.HOSTNAME}:${process.env.PORT}`);
// });


const path = require('path');

const pathForNotes = './static/notes.txt';
console.log('File Stored in: ', path.dirname(pathForNotes));
console.log('File Name is: ', path.basename(pathForNotes)); //with extension
console.log('File Name is: ', path.basename(pathForNotes, path.extname(pathForNotes))); //without extension
console.log('File Extension is: ', path.extname(pathForNotes));

//joins the path
console.log(path.join('/', 'static', 'temp-files', 'temp.txt'));

//path resolve to get the absolute path
console.log('Absolute Resolve: ', path.resolve(pathForNotes));
console.log('Absolute Path with New Folder: ', path.resolve('another-folder', pathForNotes));