const express = require("express");
const db = require("./mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRouter = require("./route/userRouter");
const MongoSession = require("connect-mongodb-session")(session);

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const startServer = async () => {
  try {
    await db();
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
startServer();
const store = new MongoSession({
  uri: process.env.MONGO_URL,
  collection: "userSession", /// SAVING THE SESSION DATA IN userSession COLLECTION IN MONGODB//
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hithisisakey",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use("/user", userRouter);

////  MIDDLEWARE FOR ERROR CONTROL///
app.use((err, req, res, next) => {
  return res.status(500).json({ err });
});

app.listen(3000, (req, res) => {
  console.log("server is running");
});
