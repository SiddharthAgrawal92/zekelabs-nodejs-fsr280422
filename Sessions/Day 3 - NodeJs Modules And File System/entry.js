
//core module
// const path = require('path');

//local modules
// const { myDate, getCurrentEpoch } = require('./local_modules/myDate');
// const { defaultPagination } = require('./config/config');
// const config = require('./config/config');
const fs = require('fs');

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
    console.log('File is appended written');
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