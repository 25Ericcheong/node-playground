const http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Hello World! \n");
  })
  .listen(8080);

console.log("\n Server running at localhost:8080/ \n");
