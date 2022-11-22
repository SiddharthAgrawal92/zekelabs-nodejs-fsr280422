const express = require('express');
const app = express();
const port = 8000 || process.env.PORT;
app.get('/', (req, res) => res.send(200));

//API Endpoints
app.get('/posts', (req, res) => {
    res.send({ result: [{ name: 'Sid', article: 'Hello World' }] })
});

app.listen(port, () => { console.log(`Server is running at: http://localhost:${port}`); });