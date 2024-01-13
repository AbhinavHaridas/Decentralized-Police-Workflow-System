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

// Function to insert a new user into the database
const insertUser = (req, res) => {
    const { full_name, dob, contact, nationality, email, city, state, country, passport_no, date_of_issue, place_of_issue, occupation, address, pincode } = req.body;
    
    connection.query("INSERT INTO users (full_name, dob, contact, nationality, email, city, state, country, passport_no, date_of_issue, place_of_issue, occupation, address, pincode) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[full_name, dob, contact, nationality, email, city, state, country, passport_no, date_of_issue, place_of_issue, occupation, address, pincode], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, true, "Success"));
    });
}

module.exports = {
    test, getAllUsers, insertUser
}