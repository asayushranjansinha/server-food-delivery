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

  async forgotPassword(req, res) {
    let { email, newPassword } = req.body;
    try {
      let newHashedPassword = bcryptjs.hashSync(newPassword, numSaltRounds);
      let user = await UserServices.update(
        {
          password: newHashedPassword,
        },
        { email: email }
      );
      if (user) {
        return res.status(200).json({
          error: false,
          message: "A mail containing your new password has been sent.",
        });
      }
      return res.status(401).json({
        error: true,
        message: "Error updating new password",
      });
    } catch (error) {
      console.log("Error updating new password", error);
      return res.status(501).json({ error: true, message: "Server Error" });
    }
  }

  async deleteAccount(req, res) {
    let userId = req.params.userId;
    try {
      let response = await UserServices.delete({
        userId: userId,
      });
      if (response) {
        return res.status(200).json({
          error: false,
          message: "User deleted successfully.",
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "Error deleting user.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: true,
        msg: "Internal server error. Unable to delete user.",
      });
    }
  }

  async accountExists(email) {
    try {
      // Retrieve user based on email
      const user = await User.get({ email: email });

      // Check if the user exists and is valid
      const isValidUser = !!Utils.isValid(user);

      return isValidUser;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async isActive(email) {
    try {
      // Retrieve user based on email
      const user = await User.get({ email: email });

      // Get the 'active' property from the user
      const active = user ? user.active : false;

      return active;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllUsers(req, res) {
    try {
      let users = await UserServices.getAllWithOrdered([["createdAt", "DESC"]]);

      let response = Object.assign({}, users);
      if (Utils.isValid(response)) {
        return res.status(200).json({ error: true, users: users });
      }
      return res.status(401).json({ error: true, message: "Users not found!" });
    } catch (error) {
      console.log("Failed to Fetch Users.", error);
      return res.status(501).json({ error: true, message: "Server Error" });
    }
  }

  async getProfile(req, res) {
    let userId = req.params.userId;
    try {
      const user = await UserServices.get({ userId: userId }, [
        "userId",
        "firstName",
        "lastName",
        "email",
        "phone",
        "userType",
      ]);

      let response = Object.assign({}, user);
      if (Utils.isValid(response)) {
        return res.status(200).json({ error: false, user: user });
      }
      return res.status(401).json({ error: true, message: "User not found." });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return res.status(501).json({
        error: true,
        message: "Internal server error.",
      });
    }
  }

  async updateProfile(req, res) {
    let userId = req.params.userId;
    let { firstName, lastName } = req.body;
    try {
      const user = await UserServices.get({ userId: userId }, [
        "id",
        "userId",
        "firstName",
        "lastName",
        "email",
      ]);
      let response = Object.assign({}, user);
      if (Utils.isValid(response)) {
        (user.firstName = firstName),
          (user.lastName = lastName),
          (user.updatedAt = Utils.getDate());
        user.save();

        return res.status(200).json({ error: false, user: user });
      }
      return res.status(401).json({
        error: true,
        message: "An error has occurred while updating profile.",
      });
    } catch (error) {
      console.log("Error while updating profile", error);
      return res.status(501).json({ error: true, message: "Server Error" });
    }
  }
}
module.exports = new UserContoller();
