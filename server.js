const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const port = process.env.PORT || 4000;
const userRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json());

let User = require("./userModel");

mongoose.connect(
  process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/users",
  { useNewUrlParser: true }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB Connection Est. Yay!!");
});

app.listen(port, () => {
  console.log(`Started @ ${port}`);
});
