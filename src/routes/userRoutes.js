const express = require("express");
const UserContoller = require("../controllers/UserControllers.js");
const router = express.Router();

router.post("/signup", UserContoller.signup);
router.post("/signin", UserContoller.signin);
router.post("/change-password", UserContoller.changePassword);

module.exports = router;
