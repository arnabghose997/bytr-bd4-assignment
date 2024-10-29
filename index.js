const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { fetchAllRestaurants, fetchRestaurantById, fetchRestaurantByCuisine, filterRestaurants, sortRestaurantsByRatings } = require("./restaurant")
const { open } = require('sqlite');
const { fetchAllDishes, fetchDishesById, filterDishes, sortDishesByPrice } = require('./dishes');

const app = express();
const port = 3000;
app.use(cors())

let db;


(async () => {
  db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  })
})();

// Restaurant Endpoints

app.get("/restaurants", async (req, res) => {
  const results = await fetchAllRestaurants(db)
  res.status(200).send(results)
})

app.get("/restaurants/details/:id", async (req, res) => {
  const userId = req.params.id;
  
  const result = await fetchRestaurantById(db, userId)
  res.status(200).send(result)
})

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const userCuisine = req.params.cuisine;
  
  const result = await fetchRestaurantByCuisine(db, userCuisine)
  res.status(200).send(result)
})

app.get("/restaurants/filter", async (req, res) => {
  const isVeg = req.query.isVeg;
  const hasOutdoorSeating = req.query.hasOutdoorSeating;
  const isLuxury = req.query.isLuxury;
  
  const result = await filterRestaurants(db, isVeg, hasOutdoorSeating, isLuxury)
  res.status(200).send(result)
})

app.get("/restaurants/sort-by-rating", async (req, res) => {
  const result = await sortRestaurantsByRatings(db)
  res.status(200).send(result)
})

// Dishes Endpoints

app.get("/dishes", async (req, res) => {
  const results = await fetchAllDishes(db)
  res.status(200).send(results)
})

app.get("/dishes/details/:id", async (req, res) => {
  const dishId = req.params.id

  const results = await fetchDishesById(db, dishId)
  res.status(200).send(results)
})

app.get("/dishes/filter", async (req, res) => {
  const isVeg = req.query.isVeg

  const results = await filterDishes(db, isVeg)
  res.status(200).send(results)
})

app.get("/dishes/sort-by-price", async (req, res) => {
  const results = await sortDishesByPrice(db)
  res.status(200).send(results)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
