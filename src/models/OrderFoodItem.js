module.exports = (sequelize, DataTypes) => {
  const OrderFoodItem = sequelize.define("OrderFoodItem", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  });
  return OrderFoodItem;
};