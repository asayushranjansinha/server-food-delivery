const express = require("express");
const UserContoller = require("../controllers/UserControllers.js");
const router = express.Router();

router.patch("/user/profile/update/:userId", UserContoller.updateProfile);
router.get('/user/all',UserContoller.getAllUsers);
router.get('/user/profile/:userId',UserContoller.getProfile);

router.post("/user/signup", UserContoller.signup);
router.post("user/signin", UserContoller.signin);
router.post("user/change-password", UserContoller.changePassword);
router.post("user/forgot-password", UserContoller.forgotPassword);



router.delete("user/delete-account/:userId", UserContoller.deleteAccount);

module.exports = router;
