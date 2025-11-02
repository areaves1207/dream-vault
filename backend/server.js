const http = require('http');
const cors = require('cors');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html'});

    res.write('<h1>Hello, Node js http server!</h1>');
    res.end();
})


server.listen(port, () => {
    console.log('Node.js HTTP port running on port ${port}')
})

