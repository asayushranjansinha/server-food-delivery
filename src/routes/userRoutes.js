const express = require("express");
const UserContoller = require("../controllers/UserControllers.js");
const router = express.Router();

// To get all users
// http://localhost:3000/api/user/all
router.get("/all", UserContoller.getAllUsers);

// To get user profile
// http://localhost:3000/api/user/profile/:userId
router.get("/profile/:userId", UserContoller.getProfile);

// To get order by id
// http://localhost:3000/api/user/order/:orderId
router.get("/order/:id", UserContoller.getOrderById);

// To get orders by user id
// http://localhost:3000/api/user/:userId/orders
router.get("/:userId/orders",UserContoller.getOrdersByUserId)

// To update user
// http://localhost:3000/api/user/profile/update/:userId
router.patch("/profile/update/:userId", UserContoller.updateProfile);

// To update order status
// http://localhost:3000/api/user/order/update
router.put("/order/update", UserContoller.updateOrder);

// To signup new user
// http://localhost:3000/api/user/signup
router.post("/signup", UserContoller.signup);

// To signin user
// http://localhost:3000/api/user/signin
router.post("/signin", UserContoller.signin);

// To change password
// http://localhost:3000/api/user/change-password
router.post("/change-password", UserContoller.changePassword);

// To forgot password
// http://localhost:3000/api/user/forgot-password
router.post("/forgot-password", UserContoller.forgotPassword);

// To place order
// http://localhost:3000/api/user/order/create
router.post("/placeorder", UserContoller.createOrder);

// To delete user
// http://localhost:3000/api/user/delete-account/2e38f963-3687-4c9f-977c-ebed17f838f4
router.delete("/delete-account/:userId", UserContoller.deleteAccount);

module.exports = router;
