// Import Modules
const connection = require("../database");

// Import Utils

// ==== FUNCTIONS START HERE ==== //
// Test Function
const test = (req, res) => {
    res.send("Hello World");
}

const getAllUsers = (req, res) => {
    connection.query("SELECT * FROM users", (err, result) => {
        if (err) console.error(err);
        else res.send(result);
    });
}

module.exports = {
    test, getAllUsers
}