const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./src/routes/userRoutes.js");
const restaurantRoutes = require("./src/routes/restaurantRoutes.js");

// Middlewares
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
