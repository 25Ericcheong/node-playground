const http = require("http");
const formidable = require("formidable");
const dt = require("./datetime");
const url = require("url");
const fs = require("fs").promises;
const events = require("events");

const eventEmitter = new events.EventEmitter();

const successfulEmitterHandler = function () {
  console.log("Successful responds!");
};

eventEmitter.on("success", successfulEmitterHandler);

http
  .createServer(function (req, res) {
    if (req.url === "./fileupload") {
      const form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        res.write("File uploaded");
        eventEmitter.emit("success");
        res.end();
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`DATE: ${dt.date()} <br/>`);
      res.write(`URL: ${req.url} <br/>`);

      const query = url.parse(req.url, true).query;

      if (query && query.month && query.year) {
        res.write(`QUERY: Month - ${query.month} Year - ${query.year} <br/>`);
      }

      res.write("<h1>Try uploading a file too!</h1>");
      res.write(
        '<form action="fileupload" method="post" enctype="multipart/form-data">'
      );
      res.write('<input type="file" name="filetoupload"><br>');
      res.write('<input type="submit">');
      res.write("</form>");

      // fs.readFile("./files/file.html", {
      //   encoding: "utf8",
      //   flag: "r",
      // })
      //   .then((data) => {
      //     res.write(`FILE FOUND: \n`);
      //     res.write(data);

      //     eventEmitter.emit("success");

      //     res.write("<h1>Try uploading a file too!</h1>");
      //     res.write(
      //       '<form action="fileupload" method="post" enctype="multipart/form-data">'
      //     );
      //     res.write('<input type="file" name="filetoupload"><br>');
      //     res.write('<input type="submit">');
      //     res.write("</form>");

      //     res.write(`That is all!`);
      //     res.end();
      //   })
      //   .catch((err) => {
      //     res.write("ERROR: \n");
      //     res.write(err.message);

      //     res.write(`That is all!`);
      //     res.end();
      //   });
    }
  })
  .listen(8080);

console.log("\n Server running at localhost:8080/ \n");
