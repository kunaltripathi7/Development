const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(Buffer);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title><head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

// can import this file via require in some other file

exports.handler = requestHandler;
exports.someText = "Some hard coded text";

// The main difference is that module.exports allows you to replace the entire export object, while exports allows you to add properties to the export object.

// // file: myModule.js
//
// module.exports = {
//   name: 'John'
// };

// exports.age = 30; // This will be added to the module.exports object

// console.log(module.exports); // Output: { name: 'John', age: 30 }

// exports = { // This creates a new object that is not connected to module.exports
//   occupation: 'Developer'
// }; // couldn't be exported

// console.log(module.exports); // Output: { name: 'John', age: 30 }
