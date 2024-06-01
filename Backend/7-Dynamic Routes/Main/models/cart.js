const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addToCart(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
        // error -> reading json.parse -> it should have an empty obj.
      }
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products.at(existingProductIndex);
      let updatedProduct;
      if (existingProductIndex !== -1) {
        console.log(existingProduct);
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +price;
      fs.writeFile(p, JSON.stringify(cart), (err, fileContent) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const productToDelete = updatedCart.products.find((p) => p.id === id);
      // not every product is in the cart
      if (!productToDelete) return;
      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      const qty = productToDelete.qty;
      updatedCart.totalPrice -= qty * price;
      fs.writeFile(p, JSON.stringify(updatedCart), (err, fileContent) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb(null);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  }
};
