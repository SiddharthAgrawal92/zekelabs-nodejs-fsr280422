
// //event-loop in action
// console.log('*** Event Loop Starts Here ***');
// const secondsAtStarting = new Date().getTime() / 1000;

// //non-blocking operation
// setTimeout(() => {
//     console.log(`Time taken for it to log here is ${(new Date().getTime() / 1000) - secondsAtStarting} Seconds`);
// }, 500);

// //blocking operation
// while (true) {
//     if ((new Date().getTime() / 1000 - secondsAtStarting) >= 2) {
//         console.log('Logged after 2 seconds from starting');
//         break;
//     }
// }

//Case - 1
//Stack             //Event Queue   //Event Loop    //async function passed to timer phase to handle it
//1.//setTimeout    setTimeout      setTimeout      //timer is assigned
//2.//  ____          ____          ___             //timer is expired this will send the callback to event loop
//3.//  ____          ____          setTimeout_callback sent to event loop for execution

//Case - 2
//  Stack             //Event Queue   //Event Loop    //async function passed to timer phase to handle it
//1.setTimeout          setTimeout      setTimeout      //timer is assigned
//2.  While loop        While loop      While loop(event loop will be blocked/busy until loop is not finished)
//4.//  ____          ____              setTimeout_callback sent to event loop for execution


// **************************************************************************************

// //Path module
// const path = require('path');

// const pathForNotes = './static/notes.txt';
// console.log('File Stored in: ', path.dirname(pathForNotes));
// console.log('File Name is: ', path.basename(pathForNotes)); //with extension
// console.log('File Name is: ', path.basename(pathForNotes, path.extname(pathForNotes))); //without extension
// console.log('File Extension is: ', path.extname(pathForNotes));

// //joins the path
// console.log(path.join('/', 'static', 'temp-files', 'temp.txt'));

// //path resolve to get the absolute path
// console.log('Absolute Resolve: ', path.resolve(pathForNotes));
// console.log('Absolute Path with New Folder: ', path.resolve('another-folder', pathForNotes));

// **************************************************************************************

//events module in practice
// const events = require('events');
// const myEmitter = new events.EventEmitter();

// //listener-1 to listen to 'our-event'
// myEmitter.on('our-event', () => {
//     console.log('listener-1');
// });

// //listener-2 to listen to 'our-event'
// myEmitter.on('our-event', (param1, param2) => {
//     console.log(`listener-2 wih 2 parameters: ${param1} & ${param2}`);
// });

// //listener-3 to listen to 'our-event'
// myEmitter.on('our-event', (...args) => {
//     console.log(args);
//     console.log(`listener-3 wih all parameters: ${args.join(',')}`);
// });

// myEmitter.emit('data', 'abc', 123, { a: 1, b: 2 }, [10, 20, 30]);


// **************************************************************************************

//streams in practice
const fs = require('fs');
const zlib = require('zlib');

// //creating a read stream to read the data in streamed manner
// const readStream = fs.createReadStream('./static/notes.txt');

// //create read stream with data truncation by providing start & end
// const readStream = fs.createReadStream('./static/notes.txt', { start: 0, end: 100 });

// readStream.on('data', chunk => {
//     console.log(chunk.toString());
// });

// //compress the data using chaining of pipes(pipe()) - create a compressed file
// //step-1 --> read the data from source file
// //step-2 --> compress the read data
// //step-3 --> write the compressed data to a target file

// //example of pipes
// //pipe-1 --> pipe-2 --> pipe-3
// //output of pipe-1 will be the input to the pipe22
// //output of pipe-2 will be the input to the pipe-3

// fs.createReadStream('./static/notes.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('./compressed/notes.txt.7z'));
// console.log('File has been zipped!');

// //pipe with transformed values
// const readStream = fs.createReadStream('./static/notes.txt');
// const compressedData = zlib.createGzip();
// const writeStream = fs.createWriteStream('./compressed/notes.txt.7z');

// readStream.pipe(compressedData).pipe(writeStream);


// //Copy files using streams
// const readStream = fs.createReadStream('./static/notes.txt');
// const writeStream = fs.createWriteStream('./static/notes(copy).txt');
// readStream.on('data', chunk => {
//     writeStream.write(chunk);
// });

//generator method for async streams

// function* myGen() {
//     let index = 0;
//     while (true) {
//         yield ++index;
//     }
// }
// const gen = myGen();
// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log(gen.next().value);

// const { Readable } = require('stream');

// function* generate() {
//     yield 'abc';
//     yield 123;
//     yield { a: 1, b: 2 };
// }

// const readable = Readable.from(generate());
// readable.on('data', chunk => {
//     console.log(chunk);
// });
