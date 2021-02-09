// Creates an Express application (line 2 & 5)
const express = require("express");
// import Node.js body parsing middleware
const bodyParser = require("body-parser");
const app = express();
// Import data from pokemon.js
const data = require("./data/pokemon.js");

// To load misddleware function
// - returns middleware that only parses 'json' and only looks at requests where the 'Content-Type' header mtches the 'type' option
app.use(bodyParser.json());
// Using middleware (Apllication-level middleware)
// - Bind application-level middleware to an instance of the app object by using the app.use() and app.METHOD() functions.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
  res.contentType("application/json");
  next();
});

// (for study) create middleware function
const myLogger = function(req, res, next) {
  console.log("LOGGED");
  next();
};
// (for study) to load middle function, call app.use()
app.use(myLogger);

// Writing misddleware for use in Express apps
// Routing = how a application's endpoints (URIs) respond to client requests
// - GET method route

// GET - layer 1 (most specific)
app.get("/pokemon/:id/attacks", function(req, res) {
  const pokemon = data.find(e => parseInt(e.id) === parseInt(req.params.id));

  if (!pokemon) {
    res.status(404).send("Pokemon does not exist");
  }
  res.send(pokemon.attacks);
});

// GET - layer 2
// using req.params ':id' to get specific data point param on the url.
app.get("/pokemon/:id", function(req, res) {
  /*  // Using for loop to iterate the list of data + if condition; same with the .find method below
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    if (parseInt(data[i].id) === parseInt(req.params.id)) {
      // return result to client if id found
      return res.send(data[i]);
    }
  }
  // return error status 
  res.status(404).send("Pokemon does not exist"); */

  const pokemon = data.find(e => parseInt(e.id) === parseInt(req.params.id));

  if (!pokemon) {
    res.status(404).send("Pokemon does not exist");
  }
  res.send(pokemon);
});

// GET - layer 3 (This layer is less specific; has been moved form layer 1 to the bottom layer)
app.get("/pokemon", function(req, res) {
  res.send(data);
});

// - POST method route
app.post("/pokemon", function(req, res) {
  console.log(req.body);
  data.push(req.body);
  res.send(data);
});

app.get("/", function(req, res) {
  res.send("Hello world");
});

app.listen(3000);
console.log("Listening on port 3000...");
