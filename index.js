const http = require("http");
var dt = require("./datetime");

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`Today's date is ${dt.date()} <br/>`);
    res.write(`That is all!`);
    res.end("");
  })
  .listen(8080);

console.log("\n Server running at localhost:8080/ \n");
