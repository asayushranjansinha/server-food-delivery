const express = require("express");
const router = express.Router();

const RestaurantController = require("../controllers/RestaurantController.js");

// Search restaurants by their name or prefix
router.get("/search", RestaurantController.searchRestaurantByName);

// Fetch menu for a particular Restaurants
router.get("/:restaurantId/menu", RestaurantController.fetchMenubyRestaurantId);

// List new restaurant
router.post("/list", RestaurantController.listRestaurant);

// Add new menu to restaurant
router.post("/:restaurantId/menu", RestaurantController.addMenuToRestaurant);

// Add food items to a restaurant menu
router.post(
  "/menus/:menuId/fooditems",
  RestaurantController.addFoodItemByMenuId
);

// Add food item to all menus of a name
router.post("/menus/fooditems", RestaurantController.addFoodItemByMenuName);

module.exports = router;
