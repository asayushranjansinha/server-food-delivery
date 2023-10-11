const { FoodItem, Restaurant, Menu } = require("../models");

const RestaurantServices = require("../services/index.js")(Restaurant);
const MenuServices = require("../services")(Menu);
const FoodItemServices = require("../services")(FoodItem);

module.exports = { RestaurantServices, MenuServices, FoodItemServices };
