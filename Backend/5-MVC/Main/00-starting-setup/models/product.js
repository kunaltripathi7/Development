const products = [];
const path = require("path");
const fs = require("fs");
const currPath = require("../util/path");
const p = path.join(currPath, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) cb([]);
    else cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    // its stored on this func's prototype
    getProductsFromFile((products) => {
      products.push(this); // use arrow func. to point this to lexical scope
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
    // fs.writeFile(p, JSON.stringify(products), (err) => {
    //   console.log(err);
    // }); // doesn't works due to async nature of these meths
  }

  // handling async data => callback -> exec when done.
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
