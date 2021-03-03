// server.js
// where your node app starts

// init project
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

// In case we're behind a proxy:
app.set("trust proxy", true);

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(path.join(`${__dirname}`, "/views/index.html"));
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

app.get("/api/whoami", (req, res) => {
  // get IP address through X-Forwarded-For header or
  // use req.connection.remoteAddress
  const ipAddress = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const language = req.headers["accept-language"];
  const userAgent = req.headers["user-agent"];

  res.json({
    ipaddress: ipAddress,
    language: language,
    software: userAgent
  });
});
