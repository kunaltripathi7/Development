const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// extended false -> which lib to use for parsing
app.use(bodyParser.urlencoded({ extended: false })); // by def. req.body is not parsed
// returns a middleware with next() attached to it. after parsing the body.

app.use("/add-product", (req, res, next) => {
  // from top to bottom if url matches the front part then it will go under that request.
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.post("/product", (req, res, next) => {
  // should come prior to the last one o/w that req will be sent
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

app.listen(3000);
