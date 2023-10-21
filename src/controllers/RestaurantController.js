const { Op } = require("sequelize");

const Utils = require("../Utils/utils.js");
const { Menu, FoodItem, sequelize } = require("../models");
const {
  RestaurantServices,
  MenuServices,
  FoodItemServices,
} = require("../services/RestaurantServices.js");

class RestaurantController {
  async fetchAllRestaurants(req, res) {
    try {
      let filters;
      let attributesToRetrieve;
      let includedModels = [
        {
          model: Menu,
          attributes: ["id", "name", "avgRating", "category"],
          include: {
            model: FoodItem,
            attributes: ["name", "price"],
          },
        },
      ];
      const restaurants = await RestaurantServices.getMany(
        filters,
        attributesToRetrieve,
        includedModels
      );
      if (restaurants) {
        return res.status(200).json({
          error: false,
          result: restaurants,
        });
      }
      return res
        .status(404)
        .json({ error: true, message: "Restaurants not found!" });
    } catch (error) {
      console.log("Error in getting restaurants", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  }

  async listRestaurant(req, res) {
    try {
      const { restaurantDetails, menus } = req.body;

      const restaurantInfo = {
        name: restaurantDetails.name,
        email: restaurantDetails.email,
        phone: restaurantDetails.phone,
        description: restaurantDetails.description,
        avgRating: restaurantDetails.avgRating,
        avgDeliveryTime: restaurantDetails.avgDeliveryTime,
        image: restaurantDetails.img,
      };

      const result = await sequelize.transaction(async (transaction) => {
        // Creating the restaurant
        const restaurant = await RestaurantServices.create(restaurantInfo);

        // Creating the menus and corresponding food items
        for (const menu of menus) {
          const menuInfo = {
            name: menu.name,
            category: menu.category,
            avgRating: menu.avgRating,
          };

          // Creating the menu
          const createdMenu = await MenuServices.create(menuInfo);
          await restaurant.addMenu(createdMenu);

          // Creating the food items for the menu
          for (const item of menu.items) {
            const foodItemInfo = {
              name: item.name,
              price: item.price,
            };

            const createdFoodItem = await FoodItemServices.create(foodItemInfo);
            await createdMenu.addFoodItem(createdFoodItem);
          }
        }
        return restaurant;
      });

      if (result) {
        return res
          .status(201)
          .json({ error: false, message: "Restaurant Listed" });
      } else {
        return res
          .status(201)
          .json({ error: true, message: "Restaurant Listing Failed" });
      }
    } catch (error) {
      console.log("Error in listing restaurant!", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  }

  async updateRestaurant(req, res) {
    try {
      let { restaurantId, updates } = req.body;

      // Search if the restaurant already exists or not
      const restaurant = await RestaurantServices.get({ id: restaurantId });
      if (!restaurant) {
        return res
          .status(404)
          .json({ error: true, message: "Restaurant Not Found." });
      }

      const result = await RestaurantServices.update(updates, {
        id: restaurantId,
      });

      // Send appropriate response
      if (result[0] === 1) {
        res.status(200).json({
          error: false,
          message: "Restaurant details updated successfully.",
        });
      } else {
        res
          .status(500)
          .json({ error: true, message: "Failed to update restaurant." });
      }
    } catch (error) {
      console.log("Error in updating restaurant", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
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
      let attributes;
      let includes = [
        {
          model: Menu,
          attributes: ["id", "name", "avgRating", "category"],
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
          result: restaurants,
        });
      }
      return res
        .status(404)
        .json({ error: true, message: "Restaurant not found!" });
    } catch (error) {
      console.log("Error in getting restaurant", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  }

  async fetchMenubyRestaurantId(req, res) {
    try {
      const restaurantId = req.params.restaurantId;
      const restaurantAttributes = [
        "id",
        "name",
        "phone",
        "restaurantType",
        "avgRating",
      ];
      const include = [
        {
          model: Menu,
          attributes: ["id", "name", "avgRating", "category"], // Include only 'id' and 'name' from Menu
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
        return res
          .status(404)
          .json({ error: true, message: "Restaurant not found!" });
      }

      return res.status(200).json({ error: false, result: restaurant });
    } catch (error) {
      console.error("Error in fetching menu by restaurant id:", error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server error" });
    }
  }

  async addMenuToRestaurant(req, res) {
    try {
      const restaurantId = req.params.restaurantId;
      const { menuName, menuCategory, menuAvgRating, menuItems } = req.body;

      let menuInfo = {
        name: menuName,
        category: menuCategory,
        avgRating: menuAvgRating,
      };

      const restaurant = await RestaurantServices.get({ id: restaurantId });
      if (!restaurant) {
        return res
          .status(404)
          .json({ error: true, message: "Restaurant not found!" });
      }

      const createdMenu = await MenuServices.create(menuInfo);
      let response = await restaurant.addMenu(createdMenu);

      for (const item of menuItems) {
        const foodItemInfo = {
          name: item.name,
          price: item.price,
        };

        const createdFoodItem = await FoodItemServices.create(foodItemInfo);
        await createdMenu.addFoodItem(createdFoodItem);
      }

      if (response) {
        return res
          .status(201)
          .json({ error: false, message: "Menu added to the restaurant" });
      }
      return res
        .status(422)
        .json({ error: true, message: "Failed to add menu to the restaurant" });
    } catch (error) {
      console.log("Error adding menu to the restaurant", error);
      return res.status(501).json({ error: true, message: "Server Error" });
    }
  }

  async addFoodItemByMenuName(req, res) {
    try {
      const { menuName, foodItemData } = req.body;

      const foundMenus = await MenuServices.getMany({ name: menuName });

      if (!foundMenus || foundMenus.length === 0) {
        return res.status(404).json({
          error: true,
          message: `No menus found with name '${menuName}'`,
        });
      }

      for (const menu of foundMenus) {
        const createdFoodItem = await FoodItemServices.create({
          name: foodItemData.name,
          price: foodItemData.price,
        });
        await menu.addFoodItem(createdFoodItem);
      }

      return res
        .status(201)
        .json({ error: false, message: "Items added to menus" });
    } catch (error) {
      console.error("Error adding food items to menus:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async addFoodItemByMenuId(req, res) {
    try {
      const menuId = req.params.menuId;
      const { foodItemData } = req.body;

      const menu = await MenuServices.get({ id: menuId });

      if (!menu) {
        return res.status(404).json({
          error: true,
          message: `No menu found with ID ${menuId}`,
        });
      }

      const createdFoodItem = await FoodItemServices.create({
        name: foodItemData.name,
        price: foodItemData.price,
      });

      await menu.addFoodItem(createdFoodItem);

      return res
        .status(201)
        .json({ error: false, message: "Item added to the menu" });
    } catch (error) {
      console.error("Error adding food item to the menu:", error);
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
      let attributesToRetrieve;
      let includedModels = [
        {
          model: Menu,
          required: true, // Use required to perform an inner join
          include: {
            model: FoodItem,
            where: {
              name: {
                [Op.like]: `%${foodItemName}%`,
              },
            }, // Filter by the food item's name
            attributes: ["name", "price"],
          },
          attributes: ["id", "name", "avgRating"], // Include only menu's id and name
        },
      ];

      const restaurants = await RestaurantServices.getMany(
        filter,
        attributesToRetrieve,
        includedModels
      );

      return res.status(200).json({ error: false, restaurants });
    } catch (error) {
      console.error("Error fetching restaurants by food item:", error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}
module.exports = new RestaurantController();
