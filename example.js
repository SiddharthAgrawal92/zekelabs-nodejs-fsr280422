setTimeout(() => {
    console.log('operation 2');
});
setTimeout(() => {
    console.log('operation 4');
}, 100);
console.log('operation 1');
//.
//.
//.
//1m
console.log('operation 3');



//Angular & ReactJS
//Framework Library
//HTTP fetch or axios

//NodeJS - Consists a lot code and configuration
//Express - very less number of code as most of the operations are performed in the background

//nest.JS
//Next.JS
//Angular server side

//Java - spring boot
//

//front-end
//making a request to get the list of users --> HTTP web server --> GET/POST/PUT/DELETE --> operation is performed

//ReactJS
//index.html
//src/app.jsx
//listens to localhost:3000

//Node.JS
//server.js - entry file
//listens to localhost:8080
//http request --> localhost:8080/posts --> get the document from a db.collection --> send it as a response to the request place

//multi threading --> in modern os kernel multi threading is available
//os -> kernel is program that has full control over the system, it can interact with the hardware & software
//cores - processing our operations are done using these
//more the cores more processes will be available to perform the concurrent task

//100 processs --> 20 system calls
//80 processess --> high end operations read/write file
//multi threading --> 80 tasks --> other 20 tasks

//asynchronous --> it doesn't wait for the operation to get completed 200 ops

//async 1
//async 2
//computation in the js file


// operation get all posts -->  web server --> request for the resource --> create an event('done') and tells that when task is completed please inform me
//operation 2 -->

//java --> 1m users are streaming a video --> threads
//node.js --> do it without creating threads with simple async architecture using a single thread


//call stack
//ops1 - executed immediately and popped out
//ops2 - async don't immediately call it but rather assign a callback to os and popped out(removed immediately)
//ops3 - executed immediately and popped out
//ops2 - executed immediately and popped out
//.
//.
//.ops1m

//after 1000 syc operations if we get the callback in the event queue for the operation , then it has to wait to for the call stack to get emtpy