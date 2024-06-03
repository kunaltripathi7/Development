const Sequelize = require("sequelize");

// creates a db pool
const sequelize = new Sequelize("node-complete", "root", "12345678", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
