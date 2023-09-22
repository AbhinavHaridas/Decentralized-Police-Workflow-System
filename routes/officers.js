// Module imports
const express = require("express");
const router = express.Router();

// Import Controllers
const officerController = require("../controllers/officers");

// Define Routes
// API to Insert an officer
router.post("/insertOfficer", officerController.insertOfficer);

// API to Login an officer
router.post("/loginOfficer", officerController.loginOfficer);

module.exports = router;