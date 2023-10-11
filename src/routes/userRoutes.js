const express = require("express");
const UserContoller = require("../controllers/UserControllers.js");
const router = express.Router();

router.patch("/profile/update/:userId", UserContoller.updateProfile);
router.get("/all", UserContoller.getAllUsers);
router.get("/profile/:userId", UserContoller.getProfile);

router.post("/signup", UserContoller.signup);
router.post("/signin", UserContoller.signin);
router.post("/change-password", UserContoller.changePassword);
router.post("/forgot-password", UserContoller.forgotPassword);

router.delete("/delete-account/:userId", UserContoller.deleteAccount);

module.exports = router;
