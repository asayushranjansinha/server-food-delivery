const { Op } = require("sequelize");
const { Restaurant, Menu, FoodItem } = require("../models");
const {
  RestaurantServices,
  MenuServices,
  FoodItemServices,
} = require("../services/RestaurantServices.js");

class RestaurantController {
  async listRestaurant(req, res) {
    let { name, email, phone, restaurantType } = req.body;

    try {
      let resInfo = {
        name: name,
        email: email,
        phone: phone,
        restaurantType: restaurantType,
      };
      const restaurant = await RestaurantServices.create(resInfo);
      if (restaurant) {
        return res.status(200).json({
          error: false,
          message: "Restaurant Listing Successful.",
        });
      }
      return res
        .status(401)
        .json({ error: true, message: "Restaurant Listing Failure." });
    } catch (error) {
      console.log("Restaurant Listing Error.", error);
      return res.status(501).json({ error: true, message: "Server Error." });
    }
  }

  async searchRestaurantByName(req, res) {
    const { name } = req.query;
    try {
      let filter = {
        name: {
          [Op.like]: `%${name}%`,
        },
      };
      let attributes = ["id", "name", "email", "phone", "restaurantType"];
      let includes = [
        {
          model: Menu,
          attributes: ["id", "name"],
          include: {
            model: FoodItem,
            attributes: ["name", "price"],
          },
        },
      ];
      let restaurants = await RestaurantServices.getMany(
        filter,
        attributes,
        includes
      );
      if (restaurants) {
        return res.status(200).json({
          error: false,
          restaurants: restaurants,
        });
      }
      return res
        .status(404)
        .json({ error: true, message: "Restaurant not found" });
    } catch (error) {
      console.log("Error in getting restaurant", error);
      return res.status(501).json({ error: true, message: "Server Error" });
    }
  }

  async fetchMenubyRestaurantId(req, res) {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurantAttributes = ["id", "name", "phone", "restaurantType"];
      const include = [
        {
          model: Menu,
          attributes: ["id", "name"], // Include only 'id' and 'name' from Menu
          include: {
            model: FoodItem,
            attributes: ["name", "price"], // Include only 'name' and 'price' from FoodItem
          },
        },
      ];
      // Check if the restaurant exists
      const restaurant = await RestaurantServices.searchByPk(
        restaurantId,
        restaurantAttributes,
        include
      );

      if (!restaurant) {
        return res.status(404).json({ error: "Restaurant not found" });
      }

      return res.status(200).json({ restaurant });
    } catch (error) {
      console.error("Errorin fetching menu by restaurant id:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async addMenuToRestaurant(req, res) {
    try {
      const restaurantId = req.params.restaurantId;
      const { menuName } = req.body;

      // Check if the restaurant exists
      const restaurant = await RestaurantServices.get({ id: restaurantId });
      if (!restaurant) {
        return res
          .status(404)
          .json({ error: true, message: "Restaurant not found!" });
      }

      // Create the menu and associate it with the restaurant
      const menu = await MenuServices.create({ name: menuName });
      let response = await restaurant.addMenu(menu);

      if (response) {
        return res
          .status(200)
          .json({ error: false, message: "Menu added to restaurant" });
      }
      return res
        .status(422)
        .json({ error: false, message: "Failed to add menu to restaurant" });
    } catch (error) {
      console.log("Error adding menu to restaurant", error);
      return res.status(501).json({ error: false, message: "Server Error" });
    }
  }

  async addFoodItemByMenuName(req, res) {
    try {
      const { menuName, foodItemData } = req.body;

      // Find all menus with the specified name
      const menus = await MenuServices.getMany({
        name: menuName,
      });

      if (!menus) {
        return res.status(404).json({
          error: true,
          message: `No menus found with name '${menuName}'`,
        });
      }

      // Create the food item and associate it with each menu
      for (const menu of menus) {
        const foodItem = await FoodItemServices.create({
          name: foodItemData.name,
          price: foodItemData.price,
        });
        await menu.addFoodItem(foodItem);
      }

      return res
        .status(201)
        .json({ error: false, message: "Items added to menus" });
    } catch (error) {
      console.error("Error adding menus:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async addFoodItemByMenuId(req, res) {
    try {
      const { menuId, foodItemData } = req.body;

      // Find all menus with the specified name
      const menu = await MenuServices.get({
        id: menuId,
      });

      if (!menu) {
        return res.status(404).json({
          error: true,
          message: `No menu found`,
        });
      }

      // Create the food item and associate it with each menu

      const foodItem = await FoodItemServices.create({
        name: foodItemData.name,
        price: foodItemData.price,
      });

      await menu.addFoodItem(foodItem);

      return res
        .status(201)
        .json({ error: false, message: "Items added to menu" });
    } catch (error) {
      console.error("Error adding menus:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async fetchRestaurantsByFoodItem(req, res) {
    try {
      const foodItemName = req.query.item;

      if (!foodItemName) {
        return res
          .status(400)
          .json({ error: "Food item name is required in the query parameter" });
      }
      let filter = {};
      let attributes = {};
      let includes = [
        {
          model: Menu,
          required: true, // Use required to perform an inner join
          include: {
            model: FoodItem,
            where: { name: foodItemName }, // Filter by the food item's name
            attributes: ["name", "price"], // Exclude other food item attributes from the response
          },
          attributes: ["id", "name"], // Include only menu's id and name
        },
      ];
      const restaurants = await RestaurantServices.getMany(
        filter,
        attributes,
        includes
      );

      // Return the list of restaurants offering the food item
      return res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}
module.exports = new RestaurantController();
