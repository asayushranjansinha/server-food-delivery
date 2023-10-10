module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      userType: {
        type: DataTypes.ENUM,
        values: ["customer", "store"],
        defaultValue: "customer",
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      lastLoginDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {}
  );
  User.associate = function (models) {
    //
  };
  return User;
};
