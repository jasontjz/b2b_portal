const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// multer is a middleware to handle file uploads automatically
const multer = require("multer");
const app = express();

require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
  })
);

const mongoURI = process.env.MONGO_URI;
const dbConnection = mongoose.connection;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbConnection.on("connected", () => console.log("My database is connected"));
dbConnection.on("error", (err) => console.log(`Got error! ${err.message}`));
dbConnection.on("disconnected", () =>
  console.log("My database is disconnected")
);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("homepage.ejs");
});

app.listen(3000);
