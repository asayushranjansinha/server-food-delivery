const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./src/routes/userRoutes.js");

// Middlewares
app.use(express.json());

// Routes
app.use("/api", router);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
