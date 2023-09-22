// Module imports
const express = require("express");
const router = express.Router();

// Import Controllers
const firController = require("../controllers/firs");

// Define Routes
// API to insert a new FIR
router.post("/insertFir", firController.insertFir);

// API to view all firs of an officer
router.get("/viewFirs", firController.viewFirs);

module.exports = router;