var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser"); // Not Required on Slide 15

//import {order_controller} from "./order_controller.js";
var order = require ("./controllers/order_controller.js");

var product_control = require ("./controllers/product_controller.js");

var user = require ("./controllers/user_controller.js");

// ------------------------------------------//
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Serve images statically

// ---------------Connection Setup ------------//
const port = "8081";
const host = "localhost";

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

//const { MongoClient } = require("mongodb"); // Add mongoDB 

// Constants for MongoDB
const url = "mongodb+srv://ecabelin:lTRqpSFjM5hlVUAr@coms319.fwqnb.mongodb.net/?retryWrites=true&w=majority&appName=COMS319";
const dbName = "coms319final";

// Connect to MongoDB (replace with your own MongoDB URI)
mongoose.connect(url, 
    { dbName: dbName, useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB connected to MongoDB - ${mongoose.connection.db.databaseName}`))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// ---------------Connection Setup ------------//
order(app, mongoose)
product_control(app, mongoose)
user(app, mongoose)

