//dependencies
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// multer is a middleware to handle file uploads automatically
// const multer = require("multer");
const app = express();

//controllers
const homepageController = require("./controllers/homepageController");
const productsController = require("./controllers/productsController");
const testingController = require("./controllers/testingController");
const userController = require("./controllers/userController");
const contactController = require("./controllers/contactController");

require("dotenv").config();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

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

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.role = req.session.role;
  next();
});

app.use(homepageController);
app.use("/users", userController);
app.use("/products", productsController);
app.use("/testing", testingController);
app.use("/contact", contactController);

// app.use("*", (req, res) => {
//   res.status(404);
//   res.send("page not found");
// });

const server = app.listen(process.env.PORT);

process.on("SIGINT", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});
