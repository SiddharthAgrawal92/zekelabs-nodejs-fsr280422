//core modules of nodejs
//path 
//fs
//os
//http
// const path = require('path');

//local modules
// const { myDate, getCurrentEpoch } = require('./local_modules/myDate');
// const { defaultPagination } = require('./config/config');
// const config = require('./config/config');
const fs = require('fs');
const os = require('os');
const axios = require('axios');

//OS concepts
console.log(`OS Architecture: ${os.arch()}`);
console.log(`System Free Memory: ${((os.freemem() / (1024 * 1024 * 1024))).toFixed(2)} GBs`);
console.log(`System Total Memory: ${((os.totalmem() / (1024 * 1024 * 1024))).toFixed(2)} GBs`);
console.log(`System OS Platform: ${os.platform()}`);

//Template String Example
// const name = 'Siddharth';
// function myFunc(){
//     return 'Siddharth'
// }
// console.log(`FirstName: ${myFunc()}`);

//read file synchronously
// const fileData = fs.readFileSync('./readMe.txt', 'utf-8');
// console.log(fileData);

//read file asynchronously
// fs.readFile('./readMe.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.log('Error:: ', err);
//     } else {
//         console.log(data);
//     }
// });

//write a file synchronously
// fs.writeFileSync('./readMe.txt', 'Siddharth');

//write a file asynchronously
// fs.writeFile('./readMe.txt', 'Siddharth', () => {
//     console.log('File is successfully written');
// });

//append a file synchronously
// fs.appendFileSync('./readMeS.txt', 'Hello World\n');

//append a file asynchronously
fs.appendFile('./readMe.txt', `${Date()}\n`, () => {
    console.log('File is successfully appended');
});

//ops1 - sync
//ops2 is dependent on ops1

//blocking code 
// while(condition){
//     condition = !condition;
// }
//regex('')
//Triangle movie

// console.log(path.join(__dirname));

// console.log('Date ', myDate());
// console.log('Epoch ', getCurrentEpoch());
// console.log(defaultPagination);

// console.log('Hello World');

console.log('End');

//break down to smaller functionality
// components --> Header component (JSX) --> customer, sales
// Modules --> Get current Date (yyyy-dd-mm)


//callbacks synchronously
// const firstFunction = (name) => {
//     console.log(`Hello my name is: ${name}`);
// }

// const secondFunction = (callbackFunction) => {
//     const name = "Siddharth";
//     callbackFunction(name);
// }

// secondFunction(firstFunction);

//callbacks asynchronously

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Siddharth');
        reject('Error: Something went wrong!')
    }, 3000);
});

myPromise.then((name) => {
    console.log(`Hello my name is: ${name}`);
}).catch((err) => {
    console.log(err);
});

axios.get('https://jsonplaceholder.typicode.com/posts?name=saa').then(res => {
    console.log(res.status);
});

console.log('EOF');