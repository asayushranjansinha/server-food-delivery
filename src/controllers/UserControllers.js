const bcryptjs = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const UserServices = require("../services/UserServices.js");
const Utils = require("../Utils/utils.js");

const numSaltRounds = 8;
class UserContoller {
  async signup(req, res) {
    let { email, phone, password, firstName, lastName, userType } = req.body;
    try {
      // Hash the password with 10 rounds of salt
      let hashedPassword = bcryptjs.hashSync(password, numSaltRounds);
      let userId = uuidv4();

      let user = await UserServices.create({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: hashedPassword,
        userType: userType,
      });
      if (user) {
        return res
          .status(200)
          .json({ error: false, message: "Signup Successful." });
      }
      return res.status(401).json({ error: true, message: "Signup Failure." });
    } catch (error) {
      console.log("Signup Error", error);
      return res.status(501).json({ error: true, message: "Server Error." });
    }
  }

  async signin(req, res) {
    let { email, password } = req.body;
    try {
      const user = await UserServices.get({ email: email });
      let response = Object.assign({}, user);

      if (Utils.isValid(response)) {
        let passwordIsValid = bcryptjs.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({
            error: true,
            accessToken: null,
            message: "Invalid Login Credentials",
          });
        }

        user.lasLoginDate = Utils.getDate();
        user.save();

        // todo:jwt token
        // let token = jwt.sign(
        //   {
        //     id: user.userId,
        //   },
        //   config.secret,
        //   {
        //     expiresIn: 86400, // expires in 24 hours
        //   }
        // );

        user.password = null;

        return res.status(200).send({
          error: false,
          //   accessToken: token,
          user: user,
          message: "Signin Successful",
        });
      }
      return res.status(200).json({
        error: true,
        message: "Error signing in user.",
      });
    } catch (error) {
      console.log("Signin Error", error);
      return res.status(501).json({ error: true, message: "Server Error." });
    }
  }

  async changePassword(req, res) {
    let { userId, password, newPassword } = req.body;
    try {
      const user = await UserServices.get(
        {
          userId: userId,
        },
        ["id", "password"]
      );

      let response = Object.assign({}, user);
      if (Utils.isValid(response)) {
        let passwordIsValid = bcryptjs.compareSync(password, user.password);
        if (!passwordIsValid) {
          return res.status(401).json({
            error: true,
            message: "Incorrect Credentials",
          });
        }

        let newHashedPassword = bcryptjs.hashSync(newPassword, numSaltRounds);

        user.password = newHashedPassword;
        user.save();

        return res.status(200).json({
          error: false,
          message: "Password Updated Succesfully",
        });
      }
    } catch (error) {
      console.log("Change Password Error", error);
      return res.status(501).json({ error: true, message: "Server Error." });
    }
  }
}
module.exports = new UserContoller();
