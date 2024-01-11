const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors");
const express = require("express");
const app = express();
require("./model/config");
var fs = require("fs");
const bcrypt = require("bcrypt");
const cron = require("node-cron");
const bodyParser = require("body-parser");
const router = require("./routes/commonRoutes");
const csp = require("express-csp-header");

const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");

app.use(express.json());

// app.use(
//     cors({
//       credentials : true,
//       origin: 'http://localhost:3000', // origin should be where the frontend code is hosted
//     })
//   );

app.use("/uploads", express.static("uploads"));

app.use(
  expressCspHeader({
    policies: {
      "default-src": [expressCspHeader.NONE],
      "img-src": [expressCspHeader.SELF],
    },
  })
);

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/", router);

const server = app.listen(process.env.port, function (req, res) {
  console.log(`Server is running on Port: ${process.env.port} `);
});

module.exports = server;
