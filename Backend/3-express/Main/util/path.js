const path = require("path");
module.exports = path.dirname(require.main.filename);
//For example, if your main module is located at /path/to/app.js, then path.dirname(require.main.filename) will return /path/to.
