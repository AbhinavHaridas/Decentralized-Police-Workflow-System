// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");

// Function to view all evidences
const viewAllEvidences = (req, res) => {
    connection.query("SELECT * FROM evidences", (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, result, "Success"));
    });
}

module.exports = {
    viewAllEvidences
}