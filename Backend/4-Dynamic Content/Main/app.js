const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs"); // express feature not node's -> like hashmap -> some reserved keys
app.set("views", "views"); // default set to views

const adminData = require("./routes/admin"); // works fine as a valid middleware function
const shopRoutes = require("./routes/shop");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // serving content statically means providing files directly to client -> w/o intervention of express
// filtering mech so don't need to write repeatedly
app.use("/admin", adminData.routes); // order matter in case of use.
app.use(shopRoutes);

app.use((req, res, next) => {
  //   res.status(404).send("<h1>Page not found</h1>");
  // res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found" });
  // can chain other meths too -> setHeader();
});

app.listen(3000);

// app vs router -> router is just the miniature version of express app used for middlewares and routing.
