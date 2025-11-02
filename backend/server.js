const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});

    res.write('<h1>Hello, Node js http server!</h1>');
    res.end();
})

// const port = 3000;

// server.listen(port, () => {
//     console.log('Node.js HTTP port running on port ${port}')
// })

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello, express js server!</h1>');
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server is running on port ${port}')
})