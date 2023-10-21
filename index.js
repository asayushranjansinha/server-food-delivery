const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require("./src/routes/userRoutes.js");
const restaurantRoutes = require("./src/routes/restaurantRoutes.js");

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1 style='text-align: center'>Welcome to my API</h1>");
});

app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
