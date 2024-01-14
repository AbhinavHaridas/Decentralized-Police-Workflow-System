import React, { useEffect, useState } from "react";
import "./EvidenceAccessPage.css";
import { useLocation } from "react-router-dom";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

    fetch("http://localhost:8000/requests/acceptRequest", requestOptions)
      .then((response) => response.json())
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

    fetch("http://localhost:8000/requests/rejectRequest", requestOptions)
      .then((response) => response.json())
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
  <>
    <h1 className="pt-6 text-2xl font mb-4 text-blue-500 text-center">
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      Evidence Access
    </h1>
    {jsonData && jsonData["data"]?.length > 0 ? (
      jsonData["data"].map((request, key) => (
        <div
          className="border border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal m-20 "
          key={key}
        >
          <div className="content">
            <h3 className="pt-2 text-2xl font mb-4 text-blue-500 text-center">
              Evidence Request
            </h3>
            <p className="pt-2 pb-2 text-lg font mb-4 text-blue-500 text-center">
              {request["name"]}
              Department has requested for this evidence
            </p>
            <div className="px-20 flex items-center justify-between">
              <div
                className="text-white bg-blue-700 hover:bg-white border border-blue-700 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer w-64"
                  onClick={() => acceptRequest(request['evidence_id'],request['requesting_id'])}
              >
                {/* <div className="eff-1"></div> */}
                <span>Accept</span>
              </div>
              <div
                className="text-white bg-blue-700 hover:bg-white border border-blue-700 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer w-64"
                  onClick={() => rejectRequest(request['evidence_id'],request['requesting_id'])}
              >
                {/* <div className="eff-1"></div> */}
                <span>Reject</span>
              </div>
              <div className="text-white bg-blue-700 hover:bg-white border border-blue-700 hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer w-64">
                <a href={`https://gateway.pinata.cloud/ipfs/${request["evidence"]}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* <div className="eff-1"></div> */}
                  <span>View Evidence</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        // <div className="card" key={key}>
        //   <div className="content">
        //     <h3>Evidence Request</h3>
        //     <p>{request["name"]} Department has requested for this evidence</p>
        //     <div className="fir-btns-container">
        //       <div
        //         className="button-1"
        //         onClick={() =>
        //           acceptRequest(
        //             request["evidence_id"],
        //             request["requesting_id"]
        //           )
        //         }
        //       >
        //         <div className="eff-1"></div>
        //         <span>Accept</span>
        //       </div>
        //       <div
        //         className="button-1"
        //         onClick={() =>
        //           rejectRequest(
        //             request["evidence_id"],
        //             request["requesting_id"]
        //           )
        //         }
        //       >
        //         <div className="eff-1"></div>
        //         <span>Reject</span>
        //       </div>
        //       <div className="button-1">
        //         <a
        //           href={`https://gateway.pinata.cloud/ipfs/${request["evidence"]}`}
        //           target="_blank"
        //           rel="noreferrer"
        //         >
        //           <div className="eff-1"></div>
        //           <span>View Evidence</span>
        //         </a>
        //       </div>
        //     </div>
        //   </div>
        // </div>
      ))
    ) : (
      <div className="bg-white flex flex-col items-center justify-center">
        <div className="bg-white flex items-center justify-center">
          <div className="max-w-xs rounded overflow-hidden">
            <img
              className="w-full"
              src="https://imgur.com/1TIyDJn.jpg"
              alt="Sample Image"
            />

            <div className="mb-2 text-center text-blue-500">
              No Evidence Requested
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);
  // return (
  //   <div>
  //     <h1>Evidence Requests Page</h1>
  //     {jsonData
  //       ? jsonData["data"].map((request, key) => {
  //           return (
  //             <div className="card" key={key}>
  //               <div className="content">
  //                 <h3>Evidence Request</h3>
  //                 <p>
  //                   {request["name"]} Department has requested for this evidence
  //                 </p>
  //                 <div className="fir-btns-container">
  //                   <div className="button-1" onClick={() => acceptRequest(request['evidence_id'],request['requesting_id'])}>
  //                     <div className="eff-1"></div>
  //                     <span>Accept</span>
  //                   </div>
  //                   <div className="button-1" onClick={() => rejectRequest(request['evidence_id'],request['requesting_id'])}>
  //                     <div className="eff-1"></div>
  //                     <span>Reject</span>
  //                   </div>
  //                   <div className="button-1">
  //                     <a
  //                       href={`https://gateway.pinata.cloud/ipfs/${request["evidence"]}`}
  //                       target="_blank"
  //                       rel="noreferrer"
  //                     >
  //                       <div className="eff-1"></div>
  //                       <span>View Evidence</span>
  //                     </a>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })
  //       : null}
  //   </div>
  // );
};

export default EvidenceAccessPage;
