import styles from "./AllFIRSPage.module.css";
import { SingleFIR } from "./singleFIR.jsx";
import { useEffect, useState } from "react";
import "./AllFIRSPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "./DatePicker";
import { useLocation, useNavigate } from "react-router-dom";

function AllFIRSPage() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [firTransactionId, setFirTransactionId] = useState("");

  const officerId = location?.state?.id ? location?.state?.id : 1;
  const officerData = location?.state ? location?.state : null;
  const departmentId = location?.state?.department_id ? location?.state?.department_id : 1;
  console.log("Officer Data:", officerData);

  const fetchAPI = async () => {
    console.log(firTransactionId);
    const firObj = {
      transaction_id: firTransactionId,
      status: status,
      start_date: selectedStartDate,
      end_date: selectedEndDate,
      zonal_code: location?.state?.zonal_code ? location?.state?.zonal_code : 9,
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
    const response = await fetch("http://localhost:8000/fir/getDropDownValues");
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
      // fetchAPI(); ???? Check Later
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

  const handleFirTransactionIdChange = (event) => {
    setFirTransactionId(event.target.value);
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
    setFirTransactionId("");
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
    navigate("/filefir", {
      state: { ...location?.state },
    });
  };

  const navigateToEvidenceAccess = (event) => {
    event.preventDefault();
    navigate("/evidenceaccess", { state: { ...location?.state } });
  };

return (
  <div>
    <div className="search-filter-container">
      <nav class="bg-blue-500 border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-4 pt-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />{" "}
            {/* Adjust margin as needed */}
            FIRS for officer {location?.state?.full_name}
          </h1>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-dropdown">
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-200 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              <li>
                <button
                  onClick={applyFilters}
                  className={`btn btn-block btn-primary block px-4 py-2 hover:bg-gray-100 disabled:text-gray-700 disabled:hover:bg-blue-500 dark:hover:bg-gray-600 dark:hover:text-white}`}
                  disabled={!isFilterApplied}
                >
                  Apply Filters
                </button>
              </li>

              <li>
                <button
                  onClick={handleResetFilters}
                  className={`btn btn-block btn-primary block px-4 py-2 hover:bg-gray-100 disabled:text-gray-700 disabled:hover:bg-blue-500 dark:hover:bg-gray-600 dark:hover:text-white}`}
                  disabled={!isFilterApplied}
                >
                  Reset Filters
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToFileFir}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  File FIR
                </button>
              </li>
              <li>
                <button
                  onClick={navigateToEvidenceAccess}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Evidence Requests
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <div className="grid grid-cols-6 ">
      <div id="row1" className="pt-6 pl-6">
        <select
          data-filter="make"
          className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleStatusChange}
          value={status}
        >
          <option value="">Select Status</option>
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="-1">Rejected</option>
        </select>
      </div>

      <div id="row2" className="pt-6 pl-6">
        <select
          data-filter="price"
          className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div id="row3" className="pt-6 pl-6">
        <select
          data-filter="type"
          className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

      <div id="row4" className="pt-6 pl-6 pr-6">
        <input
          class="appearance-none block w-full bg-gray-50 text-gray-700 border rounded pb-3 pt-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border border-blue-700"
          id="grid-first-name"
          type="text"
          placeholder="Enter Transaction Id"
        ></input>
      </div>

      <div id="row1" className="pt-6 pl-6 pr-6">
        <DatePicker
          placeholder="Enter Start date"
          onDateSelect={setSelectedStartDate}
          reset={resetDatePicker}
          setIsFilterApplied={setIsFilterApplied}
        />
      </div>

      <div id="row1" className="pt-6 pl-6 pr-6">
        <DatePicker
          placeholder="Enter End date"
          onDateSelect={setSelectedEndDate}
          reset={resetDatePicker}
          setIsFilterApplied={setIsFilterApplied}
        />
      </div>
    </div>
    <div className="flex flex-col items-center justify-center">
      {
        //Add a key in the map function
        jsonData
          ? jsonData["data"].map((FIR, key) => {
              return (
                <SingleFIR
                  key={key}
                  fir={FIR}
                  department_id={departmentId}
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
  </div>
);
  
}

export default AllFIRSPage;
