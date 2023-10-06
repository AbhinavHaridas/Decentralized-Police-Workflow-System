// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");
const { generateHash } = require("../utils/hash");
const { file2ipfs } = require("../utils/file2ipfs");


// ==== FUNCTIONS START HERE ==== //
// Function to insert a new fir into the database 
const insertFir = (req, res) => {
    const { user_id, assigned_officer_id, date_of_offence, place_of_offence, zonal_code, crime_type, ipc_section, suspect_details, fir_contents } = req.body;

    // generating a unique hash for a fir entry
    const hash = generateHash({
        user_id,
        assigned_officer_id,
        crime_type,
        ipc_section,
        fir_contents,
        suspect_details
    });

    const query = "INSERT INTO firs (user_id, assigned_officer_id, date_of_offence, place_of_offence, transaction_id, zonal_code, crime_type, ipc_section, suspect_details, fir_contents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    connection.query(query, [user_id, assigned_officer_id, date_of_offence, place_of_offence, hash, zonal_code, crime_type, ipc_section, suspect_details, fir_contents], (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else {
            res.status(200).json(responseFormatter(
                200,
                {
                    success: true,
                    unique_hash: hash,
                    inserted_fir_id: result.insertId
                },
                "Success"));
        }
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

// Function in insert a fir file to IPFS using pinata
const insertFirFile = async (req, res) => {
    const filePath = req.file.path;
    const firId = req.body['fir_id'];

    try {
        const data = await file2ipfs(filePath);

        const query = "INSERT INTO evidences (fir_id, evidence) VALUES (?, ?)";

        connection.query(query, [firId, data.data['IpfsHash']], (err, result) => {
            if (err) res.status(500).json(responseFormatter(500, err, "Error"));
            else {
                res.status(200).json(responseFormatter(
                    200,
                    true,
                    "Success"));
            }
        });
    } catch (error) {
        res.status(500).json(responseFormatter(500, "Error"));
    }

}

module.exports = {
    insertFir, viewFirs, insertFirFile
}