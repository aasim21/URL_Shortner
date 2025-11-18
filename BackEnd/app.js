//Imports
const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const { handleRedirectURL } = require("./controllers/url");
const cors = require("cors");
const cleanerRoute = require("./routes/cleanup");

//Initialising App
const app = express();

//ENV configuration

dotenv.config();

app.use(cors());

//PORT No

const PORT = process.env.PORT || 5000;

//Handling MiddleWares

app.use(express.json());

//Handling Routes MiddleWares

app.use("/api/url", urlRoute);

app.use("/api/cleanup", cleanerRoute);

app.get("/:id", handleRedirectURL);

app.use((req, res, next) => {
  res.json({ errorMessage: "Page Not Found" });
});

//Connecting to mongoDB
connectToMongoDB(process.env.MONGO_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server has been started at PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
