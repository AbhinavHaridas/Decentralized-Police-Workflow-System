// Module imports
const express = require("express");
const router = express.Router();
const multer = require('multer');

// getting file using this
const upload = multer({ dest: 'uploads' });

// Import Controllers
const firController = require("../controllers/firs");

// Define Routes
// API to insert a new FIR
router.post("/insertFir", firController.insertFir);

// API to view all firs of an officer
router.post("/viewFirs", firController.viewFirs);

// API to change status of an FIR
router.get("/changeFirStatus", firController.changeFirStatus);

// route to insert fir file to IPFS using pinata
router.post('/insertFirFile', upload.single('file'), firController.insertFirFile);

// API to get all the dropdown values
router.get("/getDropdownValues", firController.getDropdownValues);

module.exports = router;