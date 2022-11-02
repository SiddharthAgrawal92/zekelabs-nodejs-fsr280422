const routes = require('express').Router();
const usersRoutes = require('./users.routes');

routes.get('/', (req, res) => {
    res.status(202).send('Hello From Server!');
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