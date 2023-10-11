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
    },
    {}
  );
  Menu.associate = (models) => {
    Menu.belongsTo(models.Restaurant);

    Menu.hasMany(models.FoodItem);
  };
  return Menu;
};
