const express = require('express');
const connectDB = require('./config/dbConnect');
const initRoute = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 8888;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

connectDB();

initRoute(app);

app.listen(port, () => {
    console.log("Server run on the port: ", port);
})