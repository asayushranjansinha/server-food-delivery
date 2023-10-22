const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {}
  );
  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.belongsToMany(models.FoodItem, { through: models.OrderFoodItem });
  };
  return Order;
};
