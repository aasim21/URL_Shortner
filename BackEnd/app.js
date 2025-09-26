//Imports
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const { PORT, handleRedirectURL } = require("./controllers/url");
const cors = require("cors");
const { handleExpiredURL } = require("./Scheduler/cleaner");

//Initialising App
const app = express();

app.use(cors());

//Connecting to mongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short_url")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server has been started at PORT ${PORT}`);
    });
    handleExpiredURL();
  })
  .catch((err) => console.log(err));

//Handling MiddleWares

app.use(express.json());

//Handling Routes MiddleWares

app.use("/api/url", urlRoute);

app.get("/:id", handleRedirectURL);

app.use((req, res, next) => {
  res.json({ errorMessage: "Page Not Found" });
});
