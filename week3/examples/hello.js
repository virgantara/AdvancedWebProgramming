// Load the built-in http module
const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    // Set the response header content type
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    // Send the response "Hello, World!"
    res.end('Hello, World!\n');
});

// The server listens on port 3000
let port = 3000
server.listen(port, () => {
    console.log('Server is running at http://localhost:'+port);
});