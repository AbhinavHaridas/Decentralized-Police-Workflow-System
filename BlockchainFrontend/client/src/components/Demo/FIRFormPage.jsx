import React, { useState } from "react";
import className from "./FIRFormPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import useEth from "../../contexts/EthContext/useEth";
import DatePicker from "./DatePicker";

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
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [resetDatePicker, setResetDatePicker] = useState(false);

  const officerData = location?.state ? location?.state : null;
  const officerId = officerData?.id ? officerData?.id : 1;
  const departmentId = officerData?.department_id
    ? officerData?.department_id
    : 1;

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
    // PerhtmlForm submission logic here
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
        alert(
          blockChainResult?.events?.Result?.returnValues?.message +
            " Please check your email htmlFor an ID to track your FIR Status"
        );

        const emailObj = {
          recipient: userEmail,
          subject: "FIR Logged",
          transaction_id: result?.data?.unique_hash,
        };

        var requestOptions = {
          method: "POST",
          body: JSON.stringify(emailObj),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        };

        try {
          fetch("http://localhost:8000/fir/generateEmail", requestOptions)
            .then((response) => response.json())
            .then((emailResult) => {
              console.log("Success:", emailResult);
              try {
                // Generating a htmlFormData object to store file and firId
                const htmlFormData = new FormData();
                htmlFormData.append("file", cvFile);
                htmlFormData.append("fir_id", result?.data["inserted_fir_id"]);
                htmlFormData.append("dept_id", departmentId);

                fetch("http://localhost:8000/fir/insertFirFile", {
                  method: "POST",
                  body: htmlFormData,
                })
                  .then((response) => response.json())
                  .then((result) => {
                    console.log("Success:", result);
                    navigate("/editaccess", {
                      state: {
                        data: { ...officerData },
                        evidence_id: result?.data,
                      },
                    });
                  });
              } catch (e) {
                console.error(e);
              }
            });
        } catch (error) {
          console.error(error);
          throw error;
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pb-8 pt-8">
        {/* Scrollable container for the form */}
        <div className="bg-white shadow-md rounded-md p-8 max-w-xl w-full overflow-y-auto ">
          <h1 className="pt-6 text-2xl font-bold mb-4 text-blue-700 text-center">
            File an FIR
          </h1>

          <form className="max-w-sm mx-auto pb-6">
            <div className={className.htmlFormvaluecontainer}>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-blue-700 dark:text-white"
              >
                Date of Offence
              </label>
              <DatePicker
                placeholder="Enter Start date"
                onDateSelect={setDateOfOffence}
                reset={resetDatePicker}
                setIsFilterApplied={setIsFilterApplied}
              />
            </div>
            <div className="mb-5">
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-blue-700 dark:text-white"
              >
                Place Of Offence
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder=""
                required
                type="text"
                // className={classNamees.placeofoffence}
                id="placeofoffence"
                value={placeOfOffence}
                onChange={handlePlaceOfOffenceChange}
              />
            </div>
            {/* <div className="mb-5">
              <label
                for="zonalcode"
                className="block mb-2 text-sm font-medium text-blue-700 dark:text-white"
              >
                Zonal Code
              </label>
              <input
                type="integer"
                className="shadow-sm bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div> */}
            <div className="mb-5">
              <label
                for="useremail"
                className="block mb-2 text-sm font-medium text-blue-700 dark:text-white"
              >
                Enter email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
                value={userEmail}
                onChange={handleuserEmailChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                Crime Type
              </label>
              <select
                id="crimetype"
                className="bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  // className={classNamees.crimetypedropdown}
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

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                IPC Section
              </label>
              <input
                className="shadow-sm bg-gray-50 border border-blue-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder=""
                required
                type="text"
                //   className={classNamees.zonalcode}
                id="ipcsection"
                  value={ipcSection}
                  onChange={handleIpcSectionChange}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                FIR Contents
              </label>
              <textarea
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                /* className={classNamees.textarea} */
                id="firContents"
                        value={firContents}
                        onChange={handlefirContentsChange}
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-blue-700 dark:text-white">
                Suspect Details
              </label>
              <textarea
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-blue-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                id="suspectdetails"
                //   rows={2}
                  value={suspectDetails}
                  onChange={handleSuspectDetailsChange}
              />
            </div>
            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                for="user_avatar"
              >
                Upload file
              </label>
              <input
                className="text-sm text-grey-500
                                      file:mr-5 file:py-2 file:px-6
                                      file:rounded-full file:border-0
                                      file:text-sm file:font-medium
                                    file:bg-blue-50 file:text-blue-700
                                      hover:file:cursor-pointer hover:file:text-blue-50
                                    hover:file:bg-blue-700"
                id="cvFile"
                type="file"
                onChange={handleCvFileChange}
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="user_avatar_help"
              >
                *Upload your Evidence here. Max file size 50 MB
              </div>
              {/* //   className={classNamees.chooseFilebtn} */}
              {/* id="cvFile" */}
              {/* /> */}
            </div>
            {/* { */}
            {/* !cvFile &&  */}
            {/* ( */}

            {/* ) */}
            {/* } */}
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Send Application
            </button>
          </form>
        </div>
      </div>
    </>
  );
  // return (
  //   <div className={className.contractContainer}>
  //     <div className={className.container}>
  //       <div className={className.htmlForm}>
  //         <div className="col-lg-9 my-5">
  //           <h1 className={className.header}>File FIR</h1>

  //           <htmlForm onSubmit={handleSubmit}>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>Date of offence</label>
  //               <input
  //                 type="date"
  //                 className={className.datepicker}
  //                 id="fullName"
  //                 value={dateOfOffence}
  //                 onChange={handleDateOfOffenceChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>Place Of Offence</label>
  //               <input
  //                 type="text"
  //                 className={className.placeofoffence}
  //                 id="placeofoffence"
  //                 value={placeOfOffence}
  //                 onChange={handlePlaceOfOffenceChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>User Email</label>
  //               <input
  //                 type="text"
  //                 className={className.zonalcode}
  //                 id="zonalcode"
  //                 value={userEmail}
  //                 onChange={handleuserEmailChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>Crime Type</label>
  //               <select
  //                 className={className.crimetypedropdown}
  //                 id="crimetype"
  //                 value={crimeType}
  //                 onChange={handleCrimeTypeChange}
  //               >
  //                 <option value="">Select Crime Type</option>
  //                 <option value="1">Murder</option>
  //                 <option value="2">Attempt to commit murder</option>
  //                 <option value="3">Dacoity</option>
  //                 <option value="4">Robbery (Excluding Chain Snatching)</option>
  //                 <option value="5">Robbery- Chain Snatching</option>
  //                 <option value="6">Extortion</option>
  //                 <option value="7">House Break in, Burglary, Theft</option>
  //                 <option value="8">Thefts</option>
  //                 <option value="9">Motor Vehicle Thefts</option>
  //                 <option value="10">Hurt</option>
  //                 <option value="11">Riots</option>
  //                 <option value="12">Rape</option>
  //                 <option value="13">Molestation</option>
  //                 <option value="14">Other</option>
  //               </select>
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>IPC Section</label>
  //               <input
  //                 type="text"
  //                 className={className.zonalcode}
  //                 id="ipcsection"
  //                 value={ipcSection}
  //                 onChange={handleIpcSectionChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>FIR Contents</label>
  //               <textarea
  //                 className={className.textarea}
  //                 id="firContents"
  //                 rows={2}
  //                 value={firContents}
  //                 onChange={handlefirContentsChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label className={className.label}>Suspect Details</label>
  //               <textarea
  //                 className={className.textarea}
  //                 id="suspectdetails"
  //                 rows={2}
  //                 value={suspectDetails}
  //                 onChange={handleSuspectDetailsChange}
  //               />
  //             </div>
  //             <div className={className.htmlFormvaluecontainer}>
  //               <label htmlhtmlFor="cvFile" className={className.label}>
  //                 Upload Evidence
  //               </label>
  //               <input
  //                 type="file"
  //                 className={className.chooseFilebtn}
  //                 id="cvFile"
  //                 onChange={handleCvFileChange}
  //               />
  //             </div>
  //             {!cvFile && (
  //               <div className={className.smallwarningtext}>
  //                 *Upload your Evidence here. Max file size 50 MB
  //               </div>
  //             )}
  //             <button type="submit" className={className.button}>
  //               Send Application
  //             </button>
  //           </htmlForm>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default FIRFormPage;
