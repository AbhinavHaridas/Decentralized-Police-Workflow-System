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
};

// Function to check if an evidence is accessible to a department
const viewCaseEvidence = (req, res) => {
  const { fir_id, dept_id } = req.body;

  // Handle missing parameters
  if (!fir_id || !dept_id) {
    res.status(400).json(responseFormatter(400, null, "Missing parameters"));
  }

  // Query to fetch all evidence id and is_accessible for a particular FIR and department
  const query = `
        SELECT evidences.id AS evidence_id,evidences.evidence as evidence, IF(access.department_id IS NOT NULL, 1, 0) AS is_accessible FROM evidences LEFT JOIN access ON evidences.id = access.evidence_id AND access.department_id = ? WHERE evidences.fir_id = ?;
    `;

  connection.query(query, [dept_id, fir_id], (err, result) => {
    if (err) {
      res.status(500).json(responseFormatter(500, null, "Database error"));
      return;
    }

    // Process the query result and send the response
    const evidenceArray = result.map((row) => ({
      evidence_id: row.evidence_id,
      is_accessible: !!row.is_accessible, // Convert to boolean
      evidence: row.evidence,
    }));

    res.status(200).json(responseFormatter(200, evidenceArray, "Success"));
  });
};

// Function to add access to an evidence for departments
const addEvidenceAccess = (req, res) => {
  const { evidence_id, department_ids } = req.body;

  // Handle missing parameters
  if (!evidence_id || !department_ids) {
    res.status(400).json(responseFormatter(400, null, "Missing parameters"));
  }

  // Create an array of arrays to be inserted
  const values = department_ids.map((department_id) => [
    evidence_id,
    department_id,
  ]);
  const query = "INSERT INTO access (evidence_id, department_id) VALUES ?";

  connection.query(query, [values], (err, result) => {
    if (err) {
      res.status(500).json(responseFormatter(500, null, "Database error"));
      return;
    }

    res.status(200).json(responseFormatter(200, true, "Success"));
  });
};

module.exports = {
  viewAllEvidences,
  viewCaseEvidence,
  addEvidenceAccess,
};
