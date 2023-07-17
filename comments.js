//create web server
//const http = require('http');
//const hostname = 'localhost';
//const port = 3000;
//const server = http.createServer((req, res) => {
//    res.statusCode = 200;
//res.setHeader('Content-Type', 'text/plain');
//res.end('Hello World');
//});
//server.listen(port, hostname, () => {
//    console.log(`Server running at http://${hostname}:${port}/`);
//});
//create web server
const express = require('express');
const bodyParser = require('body-parser');
const commentsRouter = require('./routes/comments');
const app = express();
const hostname = 'localhost';
const port = 3000;
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/comments', commentsRouter);
//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send(err.message);
});
//start server
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
