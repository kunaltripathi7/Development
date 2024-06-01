// console.log("Welcome");
// const fs = require("fs");
// fs.writeFileSync("hello.txt", "YZ");

const http = require("http");

const server = http.createServer((req, res) => {
  //   console.log(req);
  //   process.exit();
  res.setHeader("content-type", "text/html");
  res.write("<html>");
  res.write("<head><title>Whats up!</title></head>");
  res.write("<html>");
  res.end();
});
server.listen(3000);
