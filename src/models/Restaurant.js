const { Restaurant } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    "Restaurant",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avgRating: {
        type: DataTypes.FLOAT,
        defaultValue: 1,
      },
      restaurantType: {
        type: DataTypes.ENUM,
        values: [
          "Fine Dining",
          "Casual Dining",
          "Café",
          "Pizzeria",
          "Street Food",
          "Vegetarian/Vegan",
          "Family Restaurant",
          "Biryani Restaurant",
          "Indian Cuisine",
        ],
        defaultValue: "Casual Dining",
      },
      img: {
        type: DataTypes.STRING,
      },
      avgDeliveryTime: {
        type: DataTypes.INTEGER,
        default: 30,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {}
  );
  Restaurant.associate = (models) => {
    Restaurant.hasMany(models.Menu);
  };
  return Restaurant;
};
