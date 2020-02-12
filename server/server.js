const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { port } = require('./settings.json');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);

run();

function run() {
    setupRoutes();
}

function setupRoutes() {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'client-dist', 'index.html'));
    });
    app.get('/index.js', (req, res) => {
        res.sendFile(path.join(__dirname, 'client-dist', 'index.js'));
    });

    server.listen(port, () => {
        console.log(`\n\n --- Running on port ${port} ---`)
    });
}