const express = require("express");
const UserContoller = require("../controllers/UserControllers.js");
const router = express.Router();

router.post("/signup", UserContoller.signup);
router.post("/signin", UserContoller.signin);
router.post("/change-password", UserContoller.changePassword);
router.post("/forgot-password", UserContoller.forgotPassword);
router.delete("/delete-account/:userId", UserContoller.deleteAccount);

module.exports = router;
