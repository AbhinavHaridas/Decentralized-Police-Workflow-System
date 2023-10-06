// Module imports
const express = require("express");
const router = express.Router();

// Import Controllers
const evidencesController= require("../controllers/evidences");

// Define Routes
// API to view all evidences
router.get("/allEvidences", evidencesController.viewAllEvidences);

module.exports = router;