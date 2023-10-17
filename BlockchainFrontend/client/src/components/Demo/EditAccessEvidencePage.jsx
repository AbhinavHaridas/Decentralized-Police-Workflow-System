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
  const [dept, setDept] = useState([departmentId]);

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
      fetch("http://localhost:8000/evidence/sendAccess", {
        method: "POST",
        body: JSON.stringify({
          evidence_id: evidenceId,
          dept_id: dept,
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
              state: {
                data: { ...officerData },
              },
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
    <>
      <style>
        {`
			.main {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30em;
		}

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			height:25em;
			width: 50rem;
			background-color: #f3f4f6;
			border-radius: 2rem;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}

		h1, h3, .submit {
			font-family: 'Poppins', sans-serif;
		}

		h1 {
			font-size: 50px;
		}


		.checkBoxes {
			width: 25rem;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
		}

		.checkBoxes input[type="checkbox"]{
			display:block;
		}

		.submit {
			margin: 1rem;
			width: 10rem;
			height: 2rem;
		}

		.checkbox-container{
			display: flex;
    		align-items: center;
    		gap: 15px;
		}
`}
      </style>
      <div className="main">
        <div className="container">
          <h1>Share Evidence</h1>
          <div className="checkBoxes">
            {Object.keys(departments).map((department, index) => {
              // Check if the departmentId is not the one to be excluded
              if (departmentId !== parseInt(department)) {
                return (
                  <div key={index} className="checkbox-container">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheck(e, parseInt(department))}
                    />
                    <h3>{departments[parseInt(department)]}</h3>
                  </div>
                );
              }
              // Return null if the departmentId is the one to be excluded
              return null;
            })}
          </div>

          <div className="button-1" onClick={sendAccess}>
            <div className="eff-1"></div>
            <span>Share Evidence</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditAccessEvidencePage;
