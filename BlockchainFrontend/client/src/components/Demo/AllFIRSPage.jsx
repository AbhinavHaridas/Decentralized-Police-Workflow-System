import styles from "./AllFIRSPage.module.css";
import { SingleFIR } from "./singleFIR.jsx";
import { useEffect, useState } from "react";
import "./AllFIRSPage.css";
import DatePicker from "./DatePicker";
import { useNavigate } from "react-router-dom";


function AllFIRSPage() {
  const navigate = useNavigate();
  const [jsonData, setJsonData] = useState(null);
  const [dropDownData, setDropDownData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [zonalCode, setZonalCode] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [ipcSection, setIpcSection] = useState("");
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [resetDatePicker, setResetDatePicker] = useState(false);


      const fetchAPI = async () => {
        const firObj = {
          officer_id: 1,
          status: status,
          start_date: selectedStartDate,
          end_date: selectedEndDate,
          zonal_code: zonalCode,
          crime_type: crimeType,
          ipc_section: ipcSection,
        };

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(firObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        };

        const response = await fetch(
          "http://localhost:8000/fir/viewFirs",
          requestOptions
        );
        const json = await response.json();
        setJsonData(json);
  };
  
  const getDropDownValues = async () => {
    const response = await fetch(
      "http://localhost:8000/fir/getDropDownValues"
    );
    const json = await response.json();
    console.log(json);
    setDropDownData(json?.data);
  };


      useEffect(() => {
        getDropDownValues();
        fetchAPI();
      }, []);

  useEffect(() => {
      if (resetDatePicker) {
        fetchAPI();
        setResetDatePicker(false); // Reset it here
      }
  }, [resetDatePicker]);
  

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setIsFilterApplied(true);
  };

  const handleZonalCodeChange = (event) => {
    setZonalCode(event.target.value);
    setIsFilterApplied(true);
  };

  const handleCrimeTypeChange = (event) => {
    setCrimeType(event.target.value);
    setIsFilterApplied(true);
  };

  const handleIpcSectionChange = (event) => {
    setIpcSection(event.target.value);
    setIsFilterApplied(true);
  };

  const handleResetFilters = () => {
    // Reset all filter values and set isFilterApplied to false
    setSelectedStartDate("");
    setSelectedEndDate("");
    setStatus("");
    setZonalCode("");
    setCrimeType("");
    setIpcSection("");
	  setIsFilterApplied(false);
    setResetDatePicker(true);
  };

  const applyFilters = () => {
    // Apply filters and fetch data
    fetchAPI();
  };


   const updateJsonData = (updatedData) => {
     setJsonData(updatedData);
  };
  
  const navigateToFileFir = (event) => {
    event.preventDefault();
    navigate("/filefir");
  }

  const navigateToEvidenceAccess = (event) => {
    event.preventDefault();
    navigate("/evidenceaccess");
  }

  return (
    <div className={styles.main}>
      <h1>FIRS for officer</h1>
      <div className="search-filter-container">
        <div className="row" id="search">
          <div className="search-form">
            <div className="form-group col-xs-3">
              <button
                onClick={applyFilters}
                className={`btn btn-block btn-primary ${
                  isFilterApplied ? "button-active" : "button-inactive"
                }`}
                disabled={!isFilterApplied}
              >
                Apply Filter
              </button>
            </div>
            <div className="form-group col-xs-3">
              <button
                onClick={handleResetFilters}
                className={`btn btn-block btn-primary ${
                  isFilterApplied ? "button-active" : "button-inactive"
                }`}
                disabled={!isFilterApplied}
              >
                Reset Filter
              </button>
            </div>
            <div className="form-group col-xs-3">
              <button
                onClick={navigateToFileFir}
                className={"btn btn-block btn-primary button-active"}
              >
                File FIR
              </button>
            </div>
            <div className="form-group col-xs-3">
              <button
                onClick={navigateToEvidenceAccess}
                className={"btn btn-block btn-primary button-active"}
              >
                Evidence Access
              </button>
            </div>
          </div>
        </div>
        <div className="row" id="filter">
          <div className="search-filter-form">
            <div className="form-group col-sm-3 col-xs-6">
              <select
                data-filter="make"
                className="filter-make filter form-control"
                onChange={handleStatusChange}
                value={status}
              >
                <option value="">Select Status</option>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
                <option value="-1">Rejected</option>
              </select>
            </div>
            <div className="form-group col-sm-3 col-xs-6">
              <select
                data-filter="type"
                className="filter-type filter form-control"
                onChange={handleZonalCodeChange}
                value={zonalCode}
              >
                <option value="">Select Zonal Code</option>
                {dropDownData
                  ? dropDownData["zones"].map((zones, key) => {
                      return (
                        <option value={zones["zonal_code"]} key={key}>
                          {zones["zonal_name"]}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="form-group col-sm-3 col-xs-6">
              <select
                data-filter="price"
                className="filter-price filter form-control"
                onChange={handleCrimeTypeChange}
                value={crimeType}
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
            <div className="form-group col-sm-3 col-xs-6">
              <select
                data-filter="type"
                className="filter-type filter form-control"
                onChange={handleIpcSectionChange}
                value={ipcSection}
              >
                <option value="">Select IPC Section</option>
                {dropDownData
                  ? dropDownData["ipc_sections"].map((ipcSection) => {
                      return (
                        <option value={ipcSection} key={ipcSection}>
                          {ipcSection}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <DatePicker
              placeholder="Enter Start date"
              onDateSelect={setSelectedStartDate}
              reset={resetDatePicker}
              setIsFilterApplied={setIsFilterApplied}
            />
            <DatePicker
              placeholder="Enter End date"
              onDateSelect={setSelectedEndDate}
              reset={resetDatePicker}
              setIsFilterApplied={setIsFilterApplied}
            />
          </div>
        </div>
      </div>
      {
        //Add a key in the map function
        jsonData
          ? jsonData["data"].map((FIR, key) => {
              return (
                <SingleFIR
                  key={key}
                  fir={FIR}
                  updateData={(updatedFIR) => {
                    // Create a copy of the current jsonData and update the relevant data
                    const updatedData = { ...jsonData };
                    updatedData.data[key] = updatedFIR;
                    updateJsonData(updatedData);
                  }}
                />
              );
            })
          : null
      }
    </div>
  );
}

export default AllFIRSPage;
