import React, { useState } from "react";
import classes from "./FIRFormPage.module.css";

function FIRFormPage() {
  const [dateOfOffence, setDateOfOffence] = useState("");
  const [placeOfOffence, setPlaceOfOffence] = useState("");
  const [firContents, setfirContents] = useState("");
    const [cvFile, setCvFile] = useState(null);
    const [zonalCode, setZonalCode] = useState(0);
    const [crimeType, setCrimeType] = useState(0);
    const [ipcSection, setIpcSection] = useState("");
    const [suspectDetails, setSuspectDetails] = useState("");

  const handleDateOfOffenceChange = (e) => {
    setDateOfOffence(e.target.value);
  };

  const handlePlaceOfOffenceChange = (e) => {
    setPlaceOfOffence(e.target.value);
  };

  const handlefirContentsChange = (e) => {
    setfirContents(e.target.value);
    };
    
    const handleZonalCodeChange = (e) => {
        setZonalCode(e.target.value);
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
    console.log("Zonal Code:", zonalCode);
    console.log("Crime Type", crimeType);
    console.log("IPC Section", ipcSection);
    console.log("Suspect Details", suspectDetails);
    
      const FIRObj = {
          date_of_offence: dateOfOffence,
          place_of_offence: placeOfOffence,
          fir_contents: firContents,
          zonal_code: zonalCode,
          crime_type: crimeType,
          ipc_section: ipcSection,
          suspect_details: suspectDetails,
          user_id: 3,
          assigned_officer_id: 1
        };

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(FIRObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        };

        fetch(
          "http://localhost:8000/fir/insertFir",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
          })
          .catch((error) => console.log("error", error));
    
    

  };

  return (
    <div className={classes.container}>
      <div className={classes.form}>
        <div className="col-lg-9 my-5">
          <h1 className={classes.header}>File FIR</h1>

          <form onSubmit={handleSubmit}>
            <div className={classes.formvaluecontainer}>
              <label className="form-label">Date of offence</label>
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
              <label className="form-label">Zonal Code</label>
              <input
                type="number"
                className={classes.zonalcode}
                id="zonalcode"
                value={zonalCode}
                onChange={handleZonalCodeChange}
              />
            </div>

            <div className={classes.formvaluecontainer}>
              <label className="form-label">Crime Type</label>
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
              <label className="form-label">IPC Section</label>
              <input
                type="text"
                className={classes.zonalcode}
                id="ipcsection"
                value={ipcSection}
                onChange={handleIpcSectionChange}
              />
            </div>

            <div className={classes.formvaluecontainer}>
              <label className="form-label">FIR Contents</label>
              <textarea
                className={classes.textarea}
                id="firContents"
                rows={2}
                value={firContents}
                onChange={handlefirContentsChange}
              />
            </div>

            <div className={classes.formvaluecontainer}>
              <label className="form-label">Suspect Details</label>
              <textarea
                className={classes.textarea}
                id="suspectdetails"
                rows={2}
                value={suspectDetails}
                onChange={handleSuspectDetailsChange}
              />
            </div>

            <div className={classes.formvaluecontainer}>
              <label htmlFor="cvFile" className="form-label">
                Upload Evidence
              </label>
              <input
                type="file"
                className={classes.chooseFilebtn}
                id="cvFile"
                onChange={handleCvFileChange}
                />
            </div>
            <div className={classes.smallwarningtext}>
              *Upload your Evidence here. Max file size 50 MB
            </div>

            <button type="submit" className={classes.button}>
              Send Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FIRFormPage;