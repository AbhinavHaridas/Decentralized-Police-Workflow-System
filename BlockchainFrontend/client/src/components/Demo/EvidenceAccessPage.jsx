import React from "react";
import "./EvidenceAccessPage.css";

const EvidenceAccessPage = () => {
  return (
    <div>
      <h1>Evidence Access Page</h1>
      {[1, 2, 3, 4].map((request, key) => {
        return (
          <div class="card">
            <div class="content">
              <h3>Evidence Request</h3>
              <p>Department has requested for this evidence</p>
              <div className="fir-btns-container">
                <div className="button-1">
                  <div className="eff-1"></div>
                  <span>Accept</span>
                </div>
                <div className="button-1">
                  <div className="eff-1"></div>
                  <span>Reject</span>
                </div>
                <div className="button-1">
                  <div className="eff-1"></div>
                  <span>View Evidence</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EvidenceAccessPage;
