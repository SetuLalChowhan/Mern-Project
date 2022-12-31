const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
const userRouter = require("./routes/userRoute");
const blogRouter = require("./routes/blogRoute");
const cors = require('cors')

//middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookieParser());

//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", blogRouter);
app.use(errorMiddleware);

module.exports = app;
