// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");

// ==== FUNCTIONS START HERE ==== //
// Test Function
const test = (req, res) => {
    res.send("Hello World");
}

const getAllUsers = (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, result, "Success"));
    });
}

module.exports = {
    test, getAllUsers
}