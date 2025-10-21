require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connectDb");
const verifyJWT = require("./middlewares/verifyJWTMiddleware");

connectDB();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cosmic-craze/api/auth", require("./routes/auth-login.routes"));
app.use("/cosmic-craze/api/auth", require("./routes/auth-register.routes"));
app.use(verifyJWT);
app.use(errorHandler);

let serverPromise = new Promise((resolve, reject) => {
  mongoose.connection.once("open", () => {
    console.log(`🚀 Connected to the mongo db successfully! 🚀`);
    const server = app.listen(PORT, () => {
      console.log(`🤖 Server is up and running on port: ${PORT} 🤖`);
      resolve(server);
    });
  });
});

module.exports = { app, serverPromise };
