const express = require("express");
const logger = require("morgan");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION

const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

mongoose
  .connect(MONGODB_URI)
  .then((res) => {
    console.log(`connected to database: ${res.connections[0].name}`);
  })
  .catch(() => {
    console.error("Error connecting to database", err);
  });

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

const Recipe = require("./models/Recipe.model");

app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    created: req.body.created,
  })
    .then((newRecipe) => {
      res.status(201).json(newRecipe);
    })
    .catch((err) => {
      res.status(500).json();
    });

  //   Recipe.create(req.body)
  //     .then((newRecipe) => {
  //         res.status(201).json();
  //     })
  //     .catch((err) => {
  //       res.status(500).json();
  //     });
});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((allRecipies) => {
      res.status(200).json(allRecipies);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((oneRecipie) => {
      res.status(200).json(oneRecipie);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((err) => {
      res.status(500).json();
    });
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res.status(500).json();
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
