module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM,
        values: ["veg", "nonveg"],
        defaultValue: "veg",
      },
      avgRating: {
        type: DataTypes.FLOAT,
        defaultValue: 1.0,
      },
    },
    {}
  );
  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant);

    Menu.hasMany(models.FoodItem);
  };
  return Menu;
};
