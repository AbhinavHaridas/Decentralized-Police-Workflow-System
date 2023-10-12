// Module imports
const express = require("express");
const router = express.Router();

// Import Controllers
const requestsController = require("../controllers/requests");

// Define Routes
// API to Add a request
router.post("/addRequest", requestsController.addRequest);

// API to Accept a request
router.post("/acceptRequest", requestsController.acceptRequest);

// API to reject a request
router.post("/rejectRequest", requestsController.rejectRequest);

// API to view all requests
router.post("/viewRequests", requestsController.viewRequests);

module.exports = router;