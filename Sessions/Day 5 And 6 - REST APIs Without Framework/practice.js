console.log('*** Event Loop Starts Here ***');

const secondsAtStarting = new Date().getTime() / 1000;

//non-blocking operation
setTimeout(() => {
    console.log(`Time taken for it to log here is ${(new Date().getTime() / 1000) - secondsAtStarting} Seconds`);
}, 500);

//blocking operation
while (true) {
    if ((new Date().getTime() / 1000 - secondsAtStarting) >= 2) {
        console.log('Logged after 2 seconds from starting');
        break;
    }
}

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