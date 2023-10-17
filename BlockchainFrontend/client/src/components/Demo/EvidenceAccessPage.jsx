import React, { useEffect, useState } from "react";
import "./EvidenceAccessPage.css";
import { useLocation } from "react-router-dom";

const EvidenceAccessPage = () => {
  const location = useLocation();
  const departmentId = location?.state?.department_id
    ? location?.state?.department_id
    : 2;
  console.log(departmentId);
  const [jsonData, setJsonData] = useState(null);

  const fetchAPI = async () => {
    const evidenceRequestObj = {
      owner_id: departmentId,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(evidenceRequestObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:8000/requests/viewRequests",
      requestOptions
    );
    const json = await response.json();
    console.log(json);
    setJsonData(json);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const acceptRequest = async (evidenceId, requestingId) => {
    const evidenceRequestObj = {
      evidence_id: evidenceId,
      requesting_id: requestingId,
      owner_id: departmentId,
    };


    var requestOptions = {
      method: "POST",
      body: JSON.stringify(evidenceRequestObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8000/requests/acceptRequest",
      requestOptions
    ).then((response) => response.json())
      .then((result) => {
        if (result?.data) {
          alert("Request Accepted");
          fetchAPI();
        } else {
          alert("Invalid Credentials");
        }
      });
  };
  
  const rejectRequest = async (evidenceId, requestingId) => {
    const evidenceRequestObj = {
      evidence_id: evidenceId,
      requesting_id: requestingId,
      owner_id: departmentId,
    };


    var requestOptions = {
      method: "POST",
      body: JSON.stringify(evidenceRequestObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8000/requests/rejectRequest",
      requestOptions
    ).then((response) => response.json())
      .then((result) => {
        if (result?.data) {
          alert("Request Rejected");
          fetchAPI();
        } else {
          alert("Invalid Credentials");
        }
      });
  };

  return (
    <div>
      <h1>Evidence Requests Page</h1>
      {jsonData
        ? jsonData["data"].map((request, key) => {
            return (
              <div className="card" key={key}>
                <div className="content">
                  <h3>Evidence Request</h3>
                  <p>
                    {request["name"]} Department has requested for this evidence
                  </p>
                  <div className="fir-btns-container">
                    <div className="button-1" onClick={() => acceptRequest(request['evidence_id'],request['requesting_id'])}>
                      <div className="eff-1"></div>
                      <span>Accept</span>
                    </div>
                    <div className="button-1" onClick={() => rejectRequest(request['evidence_id'],request['requesting_id'])}>
                      <div className="eff-1"></div>
                      <span>Reject</span>
                    </div>
                    <div className="button-1">
                      <a
                        href={`https://gateway.pinata.cloud/ipfs/${request["evidence"]}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className="eff-1"></div>
                        <span>View Evidence</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default EvidenceAccessPage;
