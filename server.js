//dependencies
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// multer is a middleware to handle file uploads automatically
const multer = require("multer");
const app = express();
const productsModel = require("./models/products");

//controllers
const homepageController = require("./controllers/homepageController");
const productsController = require("./controllers/productsController");

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

app.use(homepageController);
// app.use("/users", userController);
app.use("/products", productsController);
// app.use("/testing", testingController);

// app.use("*", (req, res) => {
//   res.status(404);
//   res.send("page not found");
// });

// FOR SEEDING
// app.get("/seeds", async (req, res) => {
//   await productsModel.insertMany([
//     {
//       sku: "8203905",
//       name: "1-Speed Bike Chain",
//       productType: "Chain",
//       category: "Bike Spare Parts",
//       manufacturer: "KMC",
//       title: "Designed for replacing your single-speed bike chain.",
//       description:
//         "Our chain was designed in collaboration with KMC, a globally-recognised brand and a leader in bike drive train parts. The chain has 110 links and is sold with a quick release",

//       compatibility: "1-speed",
//       material: "Steel",
//       weight: 50,

//       img: "https://contents.mediadecathlon.com/p115951/k$3211a5007fc8b8f7940117e3526e8757/1-speed-bike-chain-decathlon-8203905.jpg/400x400",
//       price: 14,
//       qty: 999,
//     },
//     {
//       sku: "8555637",
//       name: "10-Speed Bike Chain",
//       productType: "Chain",
//       category: "Bike Spare Parts",
//       manufacturer: "KMC",
//       title: "Designed for replacing the chain of your 10-speed bike.",
//       description:
//         "Our chain was designed in collaboration with KMC, a globally-recognised brand and a leader in bike drive train parts. The chain has 118 links and is sold with a quick release",

//       compatibility: "10-speed",
//       material: "Steel",
//       weight: 45,

//       img: "https://contents.mediadecathlon.com/p1799688/k$ca03980750ab2caf5bc7a74c9be7e901/10-speed-bike-chain-decathlon-8555637.jpg/400x400",
//       price: 28,
//       qty: 999,
//     },
//     {
//       sku: "8404869",
//       name: "11-Speed Bike Chain",
//       productType: "Chain",
//       category: "Bike Spare Parts",
//       manufacturer: "KMC",
//       title: "Designed for replacing the chain of your 11-speed bike",
//       description:
//         "Our chain was designed in collaboration with KMC, a globally-recognised brand and a leader in bike drive train parts. The chain has 118 links and is sold with a quick release",

//       compatibility: "11-speed",
//       material: "Steel",
//       weight: 40,

//       img: "https://contents.mediadecathlon.com/p1799693/k$062f08ab67df5f0770dd966d21928d3a/11-speed-bike-chain-decathlon-8404869.jpg/400x400",
//       price: 38,
//       qty: 999,
//     },
//     {
//       sku: "8640930",
//       name: "3-8 Speed Bike Chain",
//       productType: "Chain",
//       category: "Bike Spare Parts",
//       manufacturer: "KMC",
//       title: "Designed for replacing the chain of your 3-8-speed bike.",
//       description:
//         "Our chain was designed in collaboration with KMC, a globally-recognised brand and a leader in bike drive train parts. The chain has 118 links and is sold with a quick release",

//       compatibility: "3-8-speed",
//       material: "Steel",
//       weight: 60,

//       img: "https://contents.mediadecathlon.com/p124003/k$b3bdf4d195bf8d9bf7c82cd31361de75/3-to-8-speed-bike-chain-decathlon-8640930.jpg/400x400",
//       price: 18,
//       qty: 999,
//     },
//     {
//       sku: "8298767",
//       name: "9-Speed 11x32 Bike Cassette",
//       productType: "Cassette",
//       category: "Bike Spare Parts",
//       manufacturer: "Btwin",
//       title: "Designed for bikes equipped with cassette bodies and a 9-speed chain.",
//       description:
//         "Versatile 11x32 9-speed cassette for all gradients and compatible with all 9-speed derailleurs and chains: Shimano, SRAM, MicroSHIFT, Btwin and KMC",

//       compatibility: "9-speed",
//       material: "Steel",
//       weight: 55,

//       img: "https://contents.mediadecathlon.com/p1681200/k$ec183bad5df17ac807b18e931d626655/9-speed-11x32-bike-cassette-decathlon-8298767.jpg/sq/400x400",
//       price: 26,
//       qty: 999,
//     },
//   ]);
//   res.send("seeding the B2B portal");
// });

app.listen(3000);

process.on("SIGTERM", () => {
  console.log("My process is exiting");
  server.close(() => {
    dbConnection.close();
  });
});
