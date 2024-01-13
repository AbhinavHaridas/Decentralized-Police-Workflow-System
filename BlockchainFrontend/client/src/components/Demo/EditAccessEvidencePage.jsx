import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditAccessEvidencePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const officerData = location?.state?.data ? location?.state.data : null;
  const evidenceId = location?.state?.evidence_id
    ? location?.state?.evidence_id
    : 0;
  const departmentId = officerData?.department_id
    ? officerData?.department_id
    : 1;
  const [dept, setDept] = useState(null);

  console.log("Officer Data:", officerData);
  console.log("Evidence ID:", evidenceId);
  console.log("Department ID:", departmentId);

  const departments = {
    1: "Crime Investigation",
    2: "Cyber Security",
    3: "Forensics",
    4: "Anti Narcotics",
    5: "Internal Affairs",
  };

  const addDept = (dept_id) => {
    if (!dept) setDept([dept_id]);
    else setDept([...dept, dept_id]);
  };

  const removeDept = (dept_id) => {
    const tmp = dept.filter((item) => item !== dept_id);
    setDept(tmp);
  };

  const handleCheck = (event, dept_id) => {
    const isNotChecked = event.target.checked;

    if (isNotChecked) {
      addDept(dept_id);
    } else {
      removeDept(dept_id);
    }
  };

  const sendAccess = async () => {
    if (!dept && !evidenceId) alert("Please enter departments or evidence");

    try {
      fetch("http://localhost:8000/evidence/addEvidenceAccess", {
        method: "POST",
        body: JSON.stringify({
          evidence_id: evidenceId,
          department_ids: dept,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.data) {
            alert("Access send successfully");
            navigate("/viewfir", {
              state: { ...officerData },
            });
          } else {
            alert("Access not send Try again");
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pb-8 pt-8">
      {/* Scrollable container for the form */}
      <div className="bg-white shadow-md rounded-md p-8 max-w-xl w-full overflow-y-auto ">
        <h1 className="pt-0 text-3xl font-bold mb-4 text-blue-700 text-center">
          Share Evidence
        </h1>
        <div className="checkBoxes">
                    {Object.keys(departments).map((department, index) => {
                        // Check if the departmentId is not the one to be excluded
                        if (departmentId !== parseInt(department)) {
                            return (
                                <div key={index} className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
                                >
                                    <input className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'type="checkbox"
                                        // onChange={(e) => handleCheck(e, parseInt(department))}
                                    />
                                    <h3>{departments[parseInt(department)]}</h3>
                                </div>
                            );
                        }
                        // Return null if the departmentId is the one to be excluded
                        return null;
                    })}
                </div>

        <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 ">
          <input
            id="bordered-checkbox-1"
            type="checkbox"
            value=""
            name="bordered-checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            for="bordered-checkbox-1"
            class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Default radio
          </label>
        </div>

        <div
          className="pt-4 flex items-center justify-center button-1"
          // onClick={sendAccess}
        >
          <button
            type="submit"
            class="text-white  bg-blue-700 hover:bg-white hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Send Access
          </button>
        </div>
      </div>
    </div>
  );

//   return (
//     <>
//       <style>
//         {`
// 			.main {
// 			display: flex;
// 			justify-content: center;
// 			align-items: center;
// 			height: 30em;
// 		}

// 		.container {
// 			display: flex;
// 			flex-direction: column;
// 			align-items: center;
// 			justify-content: space-around;
// 			height:25em;
// 			width: 50rem;
// 			background-color: #f3f4f6;
// 			border-radius: 2rem;
// 			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
// 		}

// 		h1, h3, .submit {
// 			font-family: 'Poppins', sans-serif;
// 		}

// 		h1 {
// 			font-size: 50px;
// 		}


// 		.checkBoxes {
// 			width: 25rem;
// 			display: flex;
// 			flex-direction: column;
// 			justify-content: space-around;
// 		}

// 		.checkBoxes input[type="checkbox"]{
// 			display:block;
// 		}

// 		.submit {
// 			margin: 1rem;
// 			width: 10rem;
// 			height: 2rem;
// 		}

// 		.checkbox-container{
// 			display: flex;
//     		align-items: center;
//     		gap: 15px;
// 		}
// `}
//       </style>
//       <div className="main">
//         <div className="container">
//           <h1>Share Evidence</h1>
//           <div className="checkBoxes">
//             {Object.keys(departments).map((department, index) => {
//               // Check if the departmentId is not the one to be excluded
//               if (departmentId !== parseInt(department)) {
//                 return (
//                   <div key={index} className="checkbox-container">
//                     <input
//                       type="checkbox"
//                       onChange={(e) => handleCheck(e, parseInt(department))}
//                     />
//                     <h3>{departments[parseInt(department)]}</h3>
//                   </div>
//                 );
//               }
//               // Return null if the departmentId is the one to be excluded
//               return null;
//             })}
//           </div>

//           <div className="button-1" onClick={sendAccess}>
//             <div className="eff-1"></div>
//             <span>Share Evidence</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
}

export default EditAccessEvidencePage;
