import React, { useState } from "react";
import classes from "./FIRFormPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";


function FIRFormPage() {
    const {
      state: { contract, accounts },
    } = useEth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dateOfOffence, setDateOfOffence] = useState("");
  const [placeOfOffence, setPlaceOfOffence] = useState("");
  const [firContents, setfirContents] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [userEmail, setuserEmail] = useState("");
  const [crimeType, setCrimeType] = useState(0);
  const [ipcSection, setIpcSection] = useState("");
  const [suspectDetails, setSuspectDetails] = useState("");

  const officerData = location?.state ? location?.state : null;
  const officerId = officerData?.id ? officerData?.id : 1;
  const departmentId = officerData?.department_id
    ? officerData?.department_id
    : 1;

  console.log("Officer Data:", officerData);

  const handleDateOfOffenceChange = (e) => {
    setDateOfOffence(e.target.value);
  };

  const handlePlaceOfOffenceChange = (e) => {
    setPlaceOfOffence(e.target.value);
  };

  const handlefirContentsChange = (e) => {
    setfirContents(e.target.value);
  };

  const handleuserEmailChange = (e) => {
    setuserEmail(e.target.value);
  };

  const handleCrimeTypeChange = (e) => {
    setCrimeType(e.target.value);
  };

  const handleIpcSectionChange = (e) => {
    setIpcSection(e.target.value);
  };

  const handleSuspectDetailsChange = (e) => {
    setSuspectDetails(e.target.value);
  };

  const handleCvFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic here
    console.log("Date of ofeence:", dateOfOffence);
    console.log("Place Of offence:", placeOfOffence);
    console.log("FIR Contents:", firContents);
    console.log("CV File:", cvFile);
    console.log("User Email:", userEmail);
    console.log("Crime Type", crimeType);
    console.log("IPC Section", ipcSection);
    console.log("Suspect Details", suspectDetails);

    const firObj = {
      date_of_offence: dateOfOffence,
      place_of_offence: placeOfOffence,
      fir_contents: firContents,
      zonal_code: officerData?.zonal_code ? officerData?.zonal_code : 9,
      crime_type: crimeType,
      ipc_section: ipcSection,
      suspect_details: suspectDetails,
      user_id: 3,
      assigned_officer_id: officerId,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(firObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };



    fetch("http://localhost:8000/fir/insertFir", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        // alert(
        //   "FIR Submitted Successfully. Your FIR ID is: " +
        //     result?.data?.unique_hash
        // );

        const blockChainResult = await contract.methods
          .createFIR(
            result?.data?.["inserted_fir_id"],
            officerId,
            result?.data?.unique_hash,
            crimeType
          )
          .send({ from: accounts[0] });
        console.log(result);
        alert(blockChainResult?.events?.Result?.returnValues?.message + " Please check your email for an ID to track your FIR Status");
        
        const emailObj = {
          recipient: userEmail,
          subject: "FIR Logged",
          transaction_id: result?.data?.unique_hash,
        }

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(emailObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        };


        try {
          fetch("http://localhost:8000/fir/generateEmail", requestOptions).then((response) => response.json())
          .then((emailResult) => {
            console.log("Success:", emailResult);
            try {
              // Generating a formData object to store file and firId
              const formData = new FormData();
              formData.append("file", cvFile);
              formData.append("fir_id", result?.data["inserted_fir_id"]);
              formData.append("dept_id", departmentId);
    
              fetch("http://localhost:8000/fir/insertFirFile", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((result) => {
                  console.log("Success:", result);
                  navigate('/editaccess', {
                    state: {
                      data: { ...officerData },
                      evidence_id: result?.data,
                    }
                  })
                });
            } catch (e) {
              console.error(e);
            }
          });
        }
        catch (error) {
          console.error(error);
          throw error;
        }

      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className={classes.contractContainer}>
      <div className={classes.container}>
        <div className={classes.form}>
          <div className="col-lg-9 my-5">
            <h1 className={classes.header}>File FIR</h1>

            <form onSubmit={handleSubmit}>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>Date of offence</label>
                <input
                  type="date"
                  className={classes.datepicker}
                  id="fullName"
                  value={dateOfOffence}
                  onChange={handleDateOfOffenceChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>Place Of Offence</label>
                <input
                  type="text"
                  className={classes.placeofoffence}
                  id="placeofoffence"
                  value={placeOfOffence}
                  onChange={handlePlaceOfOffenceChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>User Email</label>
                <input
                  type="text"
                  className={classes.zonalcode}
                  id="zonalcode"
                  value={userEmail}
                  onChange={handleuserEmailChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>Crime Type</label>
                <select
                  className={classes.crimetypedropdown}
                  id="crimetype"
                  value={crimeType}
                  onChange={handleCrimeTypeChange}
                >
                  <option value="">Select Crime Type</option>
                  <option value="1">Murder</option>
                  <option value="2">Attempt to commit murder</option>
                  <option value="3">Dacoity</option>
                  <option value="4">Robbery (Excluding Chain Snatching)</option>
                  <option value="5">Robbery- Chain Snatching</option>
                  <option value="6">Extortion</option>
                  <option value="7">House Break in, Burglary, Theft</option>
                  <option value="8">Thefts</option>
                  <option value="9">Motor Vehicle Thefts</option>
                  <option value="10">Hurt</option>
                  <option value="11">Riots</option>
                  <option value="12">Rape</option>
                  <option value="13">Molestation</option>
                  <option value="14">Other</option>
                </select>
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>IPC Section</label>
                <input
                  type="text"
                  className={classes.zonalcode}
                  id="ipcsection"
                  value={ipcSection}
                  onChange={handleIpcSectionChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>FIR Contents</label>
                <textarea
                  className={classes.textarea}
                  id="firContents"
                  rows={2}
                  value={firContents}
                  onChange={handlefirContentsChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label className={classes.label}>Suspect Details</label>
                <textarea
                  className={classes.textarea}
                  id="suspectdetails"
                  rows={2}
                  value={suspectDetails}
                  onChange={handleSuspectDetailsChange}
                />
              </div>
              <div className={classes.formvaluecontainer}>
                <label htmlFor="cvFile" className={classes.label}>
                  Upload Evidence
                </label>
                <input
                  type="file"
                  className={classes.chooseFilebtn}
                  id="cvFile"
                  onChange={handleCvFileChange}
                />
              </div>
              {!cvFile && (
                <div className={classes.smallwarningtext}>
                  *Upload your Evidence here. Max file size 50 MB
                </div>
              )}
              <button type="submit" className={classes.button}>
                Send Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FIRFormPage;
