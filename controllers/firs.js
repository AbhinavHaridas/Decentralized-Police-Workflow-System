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
    const { officer_id, status, start_date, end_date, place_of_offence, zonal_code, crime_type, ipc_section } = req.body;

    let query = "SELECT * FROM firs WHERE assigned_officer_id = ?";
    const queryParams = [officer_id];

    // Check if status is provided
    if (status) {
        query += " AND status = ?"
        queryParams.push(status);
    }

    // Check if start_date is provided
    if (start_date) {
        query += " AND date_of_offence >= ?"; 
        queryParams.push(start_date);
    }

    // // Check if end_date is provided
    if (end_date) {
        query += " AND date_of_offence <= ?"; 
        queryParams.push(end_date);
    }

    // // Check if place_of_offence is provided
    if (place_of_offence) {
        query += " AND LOWER(place_of_offence) = LOWER(?)"; 
        queryParams.push(place_of_offence);
    }

    // // Check if zonal_code is provided
    if (zonal_code) {
        query += " AND zonal_code = ?"; 
        queryParams.push(zonal_code);
    }

    // // Check if crime_type is provided
    if (crime_type) {
        query += " AND crime_type = ?";
        queryParams.push(crime_type);
    }

    // Check if ipc_section is provided
    if (ipc_section) {
        query += " AND ipc_section = ?"; 
        queryParams.push(ipc_section);
    }

    query += " ORDER BY date_of_offence DESC";

    connection.query(query, queryParams, (err, result) => {
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

        // Return inserted row id
        connection.query(query, [firId, data.data['IpfsHash']], (err, result) => {
            if (err) res.status(500).json(responseFormatter(500, err, "Error"));
            else {
                res.status(200).json(responseFormatter(
                    200,
                    result.insertId,
                    "Success"));
            }
        });
    } catch (error) {
        res.status(500).json(responseFormatter(500, "Error"));
    }

}

// Function to get all dropdown values
const getDropdownValues = (req, res) => {
    values = {}

    const query = "SELECT zonal_code as zonal_code, name as zonal_name FROM `zone` `z` INNER JOIN `firs` `f` ON `z`.`id` = `f`.`zonal_code` GROUP BY zonal_code";

    connection.query(query, (err, result) => {
        if (err) res.status(500).json(responseFormatter(500, err, "Error"));
        else {
            values["zones"] = result.map((value) => ({ zonal_code: value['zonal_code'], zonal_name: value['zonal_name'] }));
            
            const query = "SELECT DISTINCT ipc_section FROM firs";

            connection.query(query, (err, result) => {
                if (err) res.status(500).json(responseFormatter(500, err, "Error"));
                else {
                    values["ipc_sections"] = result.map((value) => value['ipc_section']);

                    res.status(200).json(responseFormatter(200, values, "Success"));
                }
            });
        }
    });
}

module.exports = {
    insertFir, viewFirs, insertFirFile, getDropdownValues
}