module.exports = (sequelize, DataTypes) => {
  const FoodItem = sequelize.define(
    "FoodItem",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {}
  );
  FoodItem.associate = (models) => {
    FoodItem.belongsTo(models.Menu);
  };
  return FoodItem;
};
