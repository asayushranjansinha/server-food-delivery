const User = require("../models").User;
const UserServices = require("../services")(User);

module.exports = UserServices;
