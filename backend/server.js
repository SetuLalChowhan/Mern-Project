const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connection = require("./config/databaseConnect");
mongoose.set("strictQuery", true);
const express =require('express')

// handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

dotenv.config();

connection();

const port = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production'){
  app.use(express.static("client/build"))
}

app.listen(port, () => {
  console.log(`server running on ${port} port`);
});

//unhandle Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to Unhandle Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
