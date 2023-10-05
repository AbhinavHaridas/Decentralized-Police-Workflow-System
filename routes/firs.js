// Module imports
const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });

// Import Controllers
const firController = require("../controllers/firs");

// Define Routes
// API to insert a new FIR
router.post("/insertFir", firController.insertFir);

// API to view all firs of an officer
router.get("/viewFirs", firController.viewFirs);

// route to insert fir file to IPFS using pinata
router.post('/insertFirFile', upload.single('file'), firController.insertFirFile);

module.exports = router;