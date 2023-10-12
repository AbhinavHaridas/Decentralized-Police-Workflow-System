import { useState } from 'react';
import styles from './SingleEvidence.module.css';

export function SingleEvidence({evidence, ownerId, requestingId}) {

  const addRequest = (evidence_id, requesting_id, owner_id) => {

    const reqObj = {
      evidence_id: evidence_id,
      requesting_id: requesting_id,
      owner_id: owner_id
    }

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(reqObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch(
      "http://localhost:8000/requests/addRequest", requestOptions
    ).then((response) => response.json())
      .then((result) => {
        console.log(result);
		  alert(result.message);
        // setJsonData(result);
      });
  }


	return !evidence["is_accessible"] ? (
    <div className={styles.mainNotAllowed}>
      <p>
        <b>Access Not available</b>
      </p>
      <p>
        evidence: <b>{evidence["evidence"]}</b>
      </p>
      <button className="button-1" onClick={() => {addRequest(evidence["evidence_id"], requestingId, ownerId)}}>
        <div className="eff-1"></div>
        <span>Request Access</span>
      </button>
    </div>
  ) : (
    <a
      href={`https://gateway.pinata.cloud/ipfs/${evidence["evidence"]}`}
      target="_blank"
      rel="noopener"
    >
      <div className={styles.main}>
        <p>
          <b>Click to see evidence</b>
        </p>
        <p>
          evidence: <b>{evidence["evidence"]}</b>
        </p>
      </div>
    </a>
  );
}