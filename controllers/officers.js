// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");
const { encryptPassword, comparePassword } = require("../utils/encrypt");

// ==== FUNCTIONS START HERE ==== //

// Function to insert a new officer
const insertOfficer = (req, res) => {
    const { full_name, dob, email, password, contact, city, status, zonal_code, rank } = req.body;

    // Encrypt password
    const encryptedPassword = encryptPassword(password);

    connection.query("INSERT INTO officers (full_name, dob, email, password, contact, city, status, zonal_code, rank) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [full_name, dob, email, encryptedPassword, contact, city, status, zonal_code, rank], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, true, "Success"));
    });
}

// Function to login an officer
const loginOfficer = (req, res) => {
    const { user_input, password } = req.body;

    // Check if user_input is email or contact using regex
    const emailRegex = /\S+@\S+\.\S+/;

    let query = "";
    if (emailRegex.test(user_input)) query = "SELECT * FROM officers WHERE email = ?";
    else query = "SELECT * FROM officers WHERE contact = ?";

    // If the User was found, return the User object
    connection.query(query, [user_input], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else {
            if (result.length > 0) {
                const officer = result[0];

                // Compare password
                const match = comparePassword(password, officer.password);

                if (match) {
                    // If password matches, return the User object
                    res.status(200).json(responseFormatter(200, officer, "Success"));
                } else {
                    // If password does not match, return an error
                    res.status(401).json(responseFormatter(401, false, "Wrong password"));
                }
            } else {
                // If User was not found, return an error
                res.status(404).json(responseFormatter(404, false, "User not found"));
            }
        }
    });
}

module.exports = {
    insertOfficer, loginOfficer
}