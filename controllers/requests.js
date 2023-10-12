// Import Modules
const connection = require("../database");

// Import Utils
const { responseFormatter } = require("../utils/api");

// Function to Add Request
const addRequest = (req, res) => {
    const { evidence_id, requesting_id, owner_id } = req.body;

    // Handle missing fields
    if (!evidence_id || !requesting_id || !owner_id)
        return res.json(responseFormatter(400, null, "Missing fields"));

    // Make sure requesting_id and owner_id are different
    if (requesting_id === owner_id)
        return res.json(responseFormatter(400, null, "requesting_id and owner_id cannot be the same"));

    // Check if request already exists
    connection.query(
        "SELECT * FROM requests WHERE evidence_id = ? AND requesting_id = ? AND owner_id = ?",
        [evidence_id, requesting_id, owner_id],
        (err, result) => {
            if (err) {
                res.json(responseFormatter(500, err, "Error"));
                return;
            } else if (result.length > 0) {
                res.json(responseFormatter(400, null, "Request already exists"));
                return;
            } else {
                // Request doesn't exist, so add it
                connection.query(
                    "INSERT INTO requests (evidence_id, requesting_id, owner_id) VALUES (?, ?, ?)",
                    [evidence_id, requesting_id, owner_id],
                    (err, result) => {
                        if (err) {
                            res.json(responseFormatter(500, err, "Error"));
                            return;
                        } else {
                            res.json(responseFormatter(200, true, "Request added successfully"));
                        }
                    }
                );
            }
        }
    ); 
};

// Function to Accept Request
const acceptRequest = (req, res) => {
    const { evidence_id, requesting_id, owner_id } = req.body;

    // Handle missing fields
    if (!evidence_id || !requesting_id || !owner_id)
        return res.json(responseFormatter(400, null, "Missing fields"));

    // Make sure requesting_id and owner_id are different
    if (requesting_id === owner_id)
        return res.json(responseFormatter(400, null, "requesting_id and owner_id cannot be the same"));

    // Add requesting_id to access table
    connection.query(
        "INSERT INTO access (evidence_id, department_id) VALUES (?, ?)",
        [evidence_id, requesting_id],
        (err, result) => {
            if (err) {
                res.json(responseFormatter(500, err, "Error"));
                return;
            } else {
                // Delete request
                connection.query(
                    "DELETE FROM requests WHERE evidence_id = ? AND requesting_id = ? AND owner_id = ?",
                    [evidence_id, requesting_id, owner_id],
                    (err, result) => {
                        if (err) {
                            res.json(responseFormatter(500, err, "Error"));
                            return;
                        } else {
                            res.json(responseFormatter(200, true, "Request accepted successfully"));
                        }
                    }
                );
            }
        }  
    )
};

// Function to reject a request
const rejectRequest = (req, res) => {
    const { evidence_id, requesting_id, owner_id } = req.body;

    // Handle missing fields
    if (!evidence_id || !requesting_id || !owner_id)
        return res.json(responseFormatter(400, null, "Missing fields"));

    // Make sure requesting_id and owner_id are different
    if (requesting_id === owner_id)
        return res.json(responseFormatter(400, null, "requesting_id and owner_id cannot be the same"));

    // Delete request
    connection.query(
        "DELETE FROM requests WHERE evidence_id = ? AND requesting_id = ? AND owner_id = ?",
        [evidence_id, requesting_id, owner_id],
        (err, result) => {
            if (err) {
                res.json(responseFormatter(500, err, "Error"));
                return;
            } else {
                if (result.affectedRows === 0) {
                    res.json(responseFormatter(400, null, "Request does not exist"));
                    return;
                } else {
                    res.json(responseFormatter(200, true, "Request rejected successfully"));
                }
            }
        }
    );
};

// Function to view all requests
const viewRequests = (req, res) => {
    const { owner_id, requesting_id } = req.body;

    // Handle missing fields
    if (!owner_id)
        return res.json(responseFormatter(400, null, "Missing fields"));

    query = "SELECT `r`.`evidence_id`, `e`.`evidence`, `d`.`name` FROM `requests` `r` INNER JOIN evidences `e` ON `e`.`id` = `r`.`evidence_id` INNER JOIN departments `d` ON `d`.`id` = `r`.`requesting_id` WHERE `r`.`owner_id` = ?"

    // If requesting_id is not provided, return all requests for owner_id
    if (!requesting_id) {
        connection.query(
            query,
            [owner_id],
            (err, result) => {
                if (err) {
                    res.json(responseFormatter(500, err, "Error"));
                    return;
                } else {
                    res.json(responseFormatter(200, result, "Success"));
                    return;
                }
            }
        );
    } else {
        // If requesting_id is provided, return all requests for owner_id and requesting_id
        connection.query(
            query + " AND `r`.`requesting_id` = ?",
            [owner_id, requesting_id],
            (err, result) => {
                if (err) {
                    res.json(responseFormatter(500, err, "Error"));
                    return;
                } else {
                    res.json(responseFormatter(200, result, "Success"));
                    return;
                }
            }
        );
    }
};

module.exports = {
    addRequest, acceptRequest, rejectRequest, viewRequests
}