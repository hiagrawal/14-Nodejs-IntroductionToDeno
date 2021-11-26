
//Writing to a file using Node
const fs = require('fs').promises;

const text="This is a test and it should be stored in a file!";

fs.writeFile('node-message.txt', text).then(() => {
    console.log('wrote to file!');
})

//creating a server using node
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello World from Node!');
})
  
server.listen(3000);