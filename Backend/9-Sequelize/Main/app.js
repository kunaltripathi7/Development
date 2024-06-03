const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const db = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // attaching user to every request.
  // npm start will register this and first runs the sequelize method -> then upon req's these middlewares will be executed
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// app.use only registers middlewares

app.use(errorController.get404);

//relations before syncing
Product.belongsTo(User, { constraints: true, OnDelete: "CASCADE" });
User.hasMany(Product);
// to user relation
User.hasOne(Cart);
Cart.belongsTo(User);
//to product relation
Cart.belongsToMany(Product, { through: CartItem }); // creates a third table join using cartItem
Product.belongsToMany(Cart, { through: CartItem });

// order
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// creates table if not exists
sequelize
  // .sync({ force: true }) // to drop the prev tables & establish relations
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Xarvis", email: "xarvis123@gmail.com" });
    }
    return user; // if returning something in a then block its converted to a promise
  })
  .then((user) => {
    // console.log(user);
    return user.createCart(); // anything that returns a promise transfer it to next then.
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
