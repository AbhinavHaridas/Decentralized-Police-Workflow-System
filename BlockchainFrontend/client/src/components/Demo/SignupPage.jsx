import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignupPage.css";

function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zonalCode, setZonalCode] = useState("");
  const [dob, setDob] = useState("");
  const [rank, setRank] = useState("");
  const [department, setDepartment] = useState(""); // ['Crime Investigation, Cyber Security, Anti Narcotics, Internal Affairs, Forensics]

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleZonalCodeChange = (e) => {
    setZonalCode(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const createAccount = async (e) => {
    e.preventDefault();

    const officerObj = {
      full_name: firstName + " " + lastName,
      dob: dob,
      email: email,
      password: password,
      contact: phoneNo,
      city: city,
      zonal_code: zonalCode,
      rank: rank,
      department_id: department,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(officerObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch("http://localhost:8000/officer/insertOfficer", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.data) {
          alert("Account Created Successfully");
          navigate("/login");
        } else {
          alert("Account Creation Failed");
        }
      });

  };


  return (
    <div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

:root {
    --main-color: #1A56DB;
    --background-color: aliceblue;
}

body {
    display: grid;
    place-items: center;
    height: 100vh;
    background: var(--background-color);
}

.container{
    width: 100%;
}

#FormContainer {
    background-color: #ffffffa1;
    backdrop-filter: blur(10px);
    border: 2px solid #ffffff6d;
    width: 760px;
    border-radius: 10px;
    box-shadow: 3px 3px 11px 1.5px #0000002b;
    padding: 10px;
    height: 665px;
    display: grid;
    grid-template-columns: 50% 50%;
}

h1 {
    padding: 20px;
    color: var(--main-color);
    font-weight: 800;
    grid-column: 1/span 2;
}

.ImgContainer {
    overflow: hidden;
    border-radius: 10px;
  background:url(https://wallpapercg.com/media/ts_sq/7898.webp);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 98%;
}



form {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    padding-left:5px;
}

.Name,
.password {
    display: grid;
    grid-template-columns: repeat(2, 50%);

}

form li {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    padding: 0px 5px;
    text-align: left;

}

form label {
    font-weight: 600;
    width: 100%;
    padding: 5px 15px;
    color: var(--main-color);
}

form input,
form select {
    padding: 10px;
    border-radius: 8px;
    border: none;
    background-color: aliceblue;
    width: 100%;
    outline: none;
    color: var(--main-color);
    margin-bottom: 10px;
}

form .Phone {
    display: grid;
    grid-template-columns: 35% 65%;
}

form select {
    width: 100%;
}

form .Phone input {
    flex: 1;
    width: 100%;
}

.Subscribe {
    display: flex;
    flex-direction: row;
    padding: 10px;
    align-items: center;
}

.CheckBoxCont {
    width: 25px;
    border-radius: 5px;
    height: 25px;
    position: relative;
    border: 1px solid var(--main-color);
    transition-duration: 0.2s;
}

.CheckBoxCont:hover {
    background-color: var(--main-color);
}

.CheckBoxCont:hover .Tickline2 {
    background-color: white;
}

.CheckBoxCont:hover .Tickline1 {
    background-color: white;
}


.Tickline2,
.Tickline1 {

    background-color: var(--main-color);
    border-radius: 20px;
    height: 3px;
    position: absolute;
    width: 20px;
    transition-duration: 0.3s;
    border: none;
    ;

}

.Tickline1 {
    rotate: -45deg;
    top: 10px;
    left: 5px;
    opacity: 0;
    width: 18px;
    animation: 1s car linear infinite;
}

.Tickline2 {
    rotate: 50deg;
    top: 12px;
    width: 8px;
    opacity: 0;
    left: 2px;
}

.Subscribe label {
    padding: 10px;
    width: fit-content;

}

form button {
    width: fit-content;
    border-radius: 5px;
    padding: 10px 20px;
    color: white;
    background-color: var(--main-color);
    border: none;
    cursor: pointer;
    margin: auto;
    margin-bottom: 7px;
}

@media (max-width:800px) {
    .ImgContainer {
        display: none;
    }

    #FormContainer {
        grid-template-columns: 100%;
        width: 380px;
    }


}

@media (max-width:430px) {
    #FormContainer {
        border-radius: 0px;
        width: 100%;
        padding: 5px;
        height: 100%;
    }

    .Name,
    .Phone,
    .password {
        display: block;
    }
}
          `}
      </style>
      <div id="FormContainer" className="FormContainer">
        <div className="ImgContainer"></div>
        <form id="Form">
          <h1 id="FormHeading">Sign Up</h1>
          <div className="Name">
            <li>
              <label>First Name:</label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </li>
            <li>
              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </li>
          </div>
          <li>
            <label>Email:</label>
            <input
              type="email"
              placeholder="johndoe123@gmail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </li>
          <div className="Phone">
            <li>
              <label>Phone No:</label>
              <input
                type="text"
                placeholder="123-456-789"
                maxLength={10}
                value={phoneNo}
                onChange={handlePhoneNoChange}
              />
            </li>
            <li>
              <label>Zonal Code: </label>
              <input
                type="text"
                value={zonalCode}
                onChange={handleZonalCodeChange}
              />
            </li>
          </div>
          <div className="Name">
            <li>
              <label>Date of Birth: </label>
              <input type="date" value={dob} onChange={handleDobChange} />
            </li>
            <li>
              <label>Rank: </label>
              <input type="text" value={rank} onChange={handleRankChange} />
            </li>
          </div>
          <li>
            <label>City: </label>
            <input
              type="text"
              placeholder="Mumbai"
              value={city}
              onChange={handleCityChange}
            />
          </li>
          <div className="Phone">
            <li>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </li>
            <li>
              <label>Department: </label>
              <select value={department} onChange={handleDepartmentChange}>
                <option value="Crime Investigation">Crime Investigation</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Anti Narcotics">Anti Narcotics</option>
                <option value="Internal Affairs">Internal Affairs</option>
                <option value="Forensics">Forensics</option>
              </select>
            </li>
          </div>
          <button onClick={createAccount}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
