const express = require("express");
const dotenv = require("dotenv");

//creating route for api
const authRouter = require("./src/routes/auth");
const app = express();

//for managing app settings during development
require("dotenv").config();
const connectDB = require("./src/database/connect");
dotenv.config();

//to allow cross-origin requests 
var cors = require("cors");
app.use(cors());

//to parse the incoming requests with JSON payloads
app.use(express.json());

//Port and Connect to DB
const port = process.env.PORT || 5000;

app.use("/api", authRouter);

//connecting server to database in mongoBD
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
      console.log("error =>", error);
  }
};
start();












