const express = require("express");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }), (err, _, res, next) => {
  if (err) {
    res.status(err.status).send({ error: err.message });
    return;
  }
  next();
});

//combine all routes
app.use("/", cors(corsOptions), routes);

//handle error path
app.use(function(req, res) {
  res.sendStatus(404);
});

module.exports = app;
