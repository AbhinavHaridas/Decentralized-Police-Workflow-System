// Module imports
const express = require("express");
const router = express.Router();

// Import Controllers
const userController = require("../controllers/users");

// Define Routes
router.get("/test", userController.test);

router.get("/all", userController.getAllUsers);

module.exports = router;