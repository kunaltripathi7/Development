const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  //   res.send("<h1>Hello from Express!</h1>");
  //requires absolute path.
  res.sendFile(path.join(__dirname, "../", "views", "shop.html")); // provides a global var which gives path to this folder's dir in os. so need to go one parent
});

module.exports = router;

// all other -> get/post does an exact match so order doesn't matter
