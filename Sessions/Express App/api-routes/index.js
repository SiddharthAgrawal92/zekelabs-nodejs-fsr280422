const routes = require('express').Router();
const usersRoutes = require('./users.routes');

routes.get('/', (req, res) => {
    // res.status(200).send('Hello From Server!');
    //rendering dynamic  file using pug template engine
    // res.render('index1', { title: 'Express App', message: 'Welcome to our server' });

    // //rendering dynamic  file using jade template engine
    res.render('index2', {
        title: "Express App",
        usersList: [
            {
                "name": "Karl Marx",
                "age": 75,
                "address": "Russia"
            },
            {
                "name": "Mona Litens",
                "age": 42,
                "address": "YT, Poland"
            }
        ]
    });

    //rendering dynamic  file using vash template engine
    // res.render('index3', { title: 'Express App', content: 'This app seems to be working fine :)' });
});

//users-module routes
routes.use('/users', usersRoutes);

routes.use((req, res) => {
    res.status(400).send(`
    <html>
        <body>
            <h1>
                Sorry this APIe endpoint is not Available in the server 
            </h1>
        </body>
    </html>
    `);
})

module.exports = routes;