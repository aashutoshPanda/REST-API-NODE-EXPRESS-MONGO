// to import environment variables from .env files
require("dotenv").config();
const express = require("express");
// this app variable will be used to run express functions
const app = express();
const mongoose = require("mongoose");
// when uur website will go for production we don't want to use localhost ...
// thus we'll add it in the .env file
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

//We'll make a variable db nad hook up some events when our database is connected to  server
const db = mongoose.connection;
// first use of db can be to console log error so on 'error' a function with parameter error will be called and it will console log the error
db.on("error", error => console.error(err));
// Now this will run only one time when we'll be connected
db.once("open", () => console.log("Connected to Database"));

// now we will setup our server o accept json
// app.use() allows us to use any middleware when server gets a request but before it gets passed to you routes

app.use(express.json());

const subscribersRouter = require("./routes/susbscribers");
// Now whwenever we will have a route like   localhost/subscribers/ajkbhcaksd
// We want to use subscrbersRouter thus

app.use("/subscribers", subscribersRouter);

// the second parameter is a function which will be called when it will listen at port 3000
app.listen(3000, () => console.log("Listening at port 3000"));
