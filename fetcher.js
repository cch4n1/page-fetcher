
// require fs for fileWrite
const fs = require('fs');

// process.argv to take in command line inputs - get URL and local path
const args = process.argv;
const URL = args[2];
const path = args[3];

// **** Setup code ****
const net = require('net');
const conn = net.createConnection({ 
  host: URL,
  port: 80
});
conn.setEncoding('UTF8');

// **** HTTP Request code ****
conn.on('connect', () => {
  console.log(`Connected to server!`);
  // send HTTP get request to server
  conn.write(`GET / HTTP/1.1\r\n`);
  // specify host we are connecting to
  conn.write(`Host: example.edu\r\n`);
  // send empty line to signal end of request headers
  conn.write(`\r\n`);
});

// **** HTTP Response code ****
conn.on('data', (data) => {
  // write file code: take data and write to specified file path
fs.writeFile(path, data, err => {
  if (err) {
    console.error(err);
  }
});
  // file written successfully; display msg
  const bytes = data.length
  console.log(`Downloaded and saved ${bytes} bytes to ${path}`)
  conn.end();
});

