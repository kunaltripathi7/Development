const http = require("http");

const express = require("express"); // returns a func.

const app = express(); // returns an obj

// flows from top to bottom

app.use((req, res, next) => {
  console.log("In the middleware!");
  next(); // Allows the request to continue to the next middleware in line
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello from Express!</h1>"); // by default content-type -> html
});

const server = http.createServer(app); // works as a req handler

server.listen(3000);
