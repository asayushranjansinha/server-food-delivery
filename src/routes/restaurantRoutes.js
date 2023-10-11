const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/RestaurantController.js");

// Search restaurants by their name or prefix
// http://localhost:3000/api/restaurant/search?name=restaurant
router.get("/search", RestaurantController.searchRestaurantByName);

// Fetch menu for a particular Restaurants
// http://localhost:3000/api/restaurant/1/menu
router.get("/:restaurantId/menu", RestaurantController.fetchMenubyRestaurantId);

// Get restaurants from food item
// http://localhost:3000/api/restaurant/menu?item=pizza
router.get("/menu", RestaurantController.fetchRestaurantsByFoodItem);

// List new restaurant
router.post("/list", RestaurantController.listRestaurant);

// Add new menu to restaurant
// http://localhost:3000/api/restaurant/2/menu
router.post("/:restaurantId/menu", RestaurantController.addMenuToRestaurant);

// Add food items to a restaurant menu
// http://localhost:3000/api/restaurant/menus/1/fooditems
router.post(
  "/menus/:menuId/fooditems",
  RestaurantController.addFoodItemByMenuId
);

// Add food item to all menus of a name
router.post("/menus/fooditems", RestaurantController.addFoodItemByMenuName);

module.exports = router;
