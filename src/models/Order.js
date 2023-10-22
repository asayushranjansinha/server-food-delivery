module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        allowNull: false,
        defaultValue: "Pending",
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
