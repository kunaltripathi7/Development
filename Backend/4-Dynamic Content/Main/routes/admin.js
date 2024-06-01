const express = require("express");
const path = require("path");

const router = express.Router(); // returns a mini express app tied to our express app

const rootDir = require("../util/path");

const products = []; // data is shared through all users cuz server is running & storing the data

router.get("/add-product", (req, res, next) => {
  //   res.send(
  //     '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  //   );

  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  // res.render("add-product", {
  //   pageTitle: "Add Product",
  //   path: "/admin/add-product", // conditional rendering change some prop
  // });
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  // console.log(req.body);
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
