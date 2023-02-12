const http = require("http");
const dt = require("./datetime");
const url = require("url");
const fs = require("fs").promises;

http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`DATE: ${dt.date()} <br/>`);
    res.write(`URL: ${req.url} <br/>`);

    const query = url.parse(req.url, true).query;

    if (query && query.month && query.year) {
      res.write(`QUERY: Month - ${query.month} Year - ${query.year} <br/>`);
    }

    fs.readFile("./files/file.html", {
      encoding: "utf8",
      flag: "r",
    })
      .then((data) => {
        res.write(`FILE FOUND: \n`);
        res.write(data);
        res.write(`That is all!`);
        res.end();
      })
      .catch((err) => {
        res.write("ERROR: \n");
        res.write(err.message);
        res.end();
        return;
      });
  })
  .listen(8080);

console.log("\n Server running at localhost:8080/ \n");
