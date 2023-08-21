const express = require("express");
const cors = require("cors");
require("dotenv").config();
// require('dotenv').config({ silent: process.env.NODE_ENV === 'production' })
const app = express();
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const postRouter = require("./routes/post.routes.js");

// (app);

// var corsOptions = {
//   origin: "http://localhost:7500",
// };

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// const router = require("./routes/auth.routes.js");

db.mongoose
  .connect(
    "mongodb+srv://socio:admin@cluster0.zkkaw8v.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to socio application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 7500;
// console.log(process.env.PORT, "port");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
