// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");

// ==== FUNCTIONS START HERE ==== //
// Function to insert a new fir into the database 
const insertFir = (req, res) => {
    const { user_id, assigned_officer_id, date_of_offence, place_of_offence, transaction_id, status, zonal_code, crime_type, ipc_section, suspect_details, fir_contents } = req.body;

    const query = "INSERT INTO firs (user_id, assigned_officer_id, date_of_offence, place_of_offence, transaction_id, status, zonal_code, crime_type, ipc_section, suspect_details, fir_contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [user_id, assigned_officer_id, date_of_offence, place_of_offence, transaction_id, status, zonal_code, crime_type, ipc_section, suspect_details, fir_contents], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, true, "Success"));
    });
}

// Function to view all firs of an officer
const viewFirs = (req, res) => {
    const { officer_id, status } = req.query;

    let query = "SELECT * FROM firs WHERE assigned_officer_id = ?";

    // Check if status is provided
    if (status) query += " AND status = ?";

    connection.query(query, [officer_id, status], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else res.status(200).json(responseFormatter(200, result, "Success"));
    });
}

module.exports = {
    insertFir, viewFirs
}