require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const Routes = require("./app/routes.js");

// // // Add Access Control Allow Origin headers
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Metodes", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  Routes,
]);

const io = (module.exports.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
}));

const socketManager = require("./app/socketManager");
io.on("connection", socketManager);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
