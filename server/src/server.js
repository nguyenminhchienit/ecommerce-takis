const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnect");
const initRoute = require("./routes");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8888;

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_HOST || "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

initRoute(app);

app.listen(port, () => {
  console.log("Server run on the port: ", port);
});
