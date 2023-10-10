import styles from "./AllFIRSPage.module.css";
import { SingleFIR } from "./singleFIR.jsx";
import { useEffect, useState } from "react";
import "./AllFIRSPage.css";
import DatePicker from "./DatePicker";

function AllFIRSPage() {
  const [jsonData, setJsonData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [placeOfOffence, setPlaceOfOffence] = useState("");
  const [zonalCode, setZonalCode] = useState("");
  const [crimeType, setCrimeType] = useState("");
  const [ipcSection, setIpcSection] = useState("");
	const [isFilterApplied, setIsFilterApplied] = useState(false);
	const [resetDatePicker, setResetDatePicker] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch(
        "http://localhost:8000/fir/viewFirs?officer_id=1"
      );
      const json = await response.json();
      setJsonData(json);
    };

    fetchAPI();
  }, []);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setIsFilterApplied(true);
  };

  const handlePlaceOfOffenceChange = (event) => {
    setPlaceOfOffence(event.target.value);
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
    setPlaceOfOffence("");
    setZonalCode("");
    setCrimeType("");
    setIpcSection("");
	  setIsFilterApplied(false);
	  setResetDatePicker(true);
  };

  const applyFilters = () => {
    // Apply filters
    console.log("Start Date:", selectedStartDate);
    console.log("End Date:", selectedEndDate);
    console.log("Status:", status);
    console.log("Place of Offence:", placeOfOffence);
    console.log("Zonal Code:", zonalCode);
    console.log("Crime Type:", crimeType);
    console.log("IPC Section:", ipcSection);
  };

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
              >
                Reset Filter
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
                <option value="1">Accepted</option>
                <option value="-1">Rejected</option>
              </select>
            </div>
            <div className="form-group col-sm-3 col-xs-6">
              <select
                data-filter="model"
                className="filter-model filter form-control"
							  onChange={handlePlaceOfOffenceChange}
							  value={placeOfOffence}
              >
                <option value="">Select Place of Offence</option>
                <option value="Mumbra">Mumbra</option>
                <option value="Thane">Thane</option>
                <option value="Kalyan">Kalyan</option>
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
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="4">4</option>
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
                <option value="">Show All</option>
                <option value="412">412</option>
                <option value="102">102</option>
                <option value="114">114</option>
              </select>
            </div>
            <DatePicker
              placeholder="Enter Start date"
						  onDateSelect={setSelectedStartDate}
						  reset={resetDatePicker}
            />
            <DatePicker
              placeholder="Enter End date"
						  onDateSelect={setSelectedEndDate}
						  reset={resetDatePicker}
            />
          </div>
        </div>
      </div>
      {
        //Add a key in the map function
        jsonData
          ? jsonData["data"].map((FIR, key) => {
              return <SingleFIR key={key} props={FIR} />;
            })
          : null
      }
    </div>
  );
}

export default AllFIRSPage;
