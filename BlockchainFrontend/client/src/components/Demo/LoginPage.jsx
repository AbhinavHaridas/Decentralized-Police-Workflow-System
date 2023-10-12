import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const toggleViewFIRStatus = (e) => {
    e.preventDefault();
    navigate("/viewstatus");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const officerObj = {
      user_input: phoneEmail,
      password: password,
    };

    var requestOptions = {
      method: "POST",
      body: JSON.stringify(officerObj),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    fetch("http://localhost:8000/officer/loginOfficer", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.data) {
          alert("Login Successful");
          navigate("/viewfir",{
            state: { ...result?.data },
          });
        } else {
          alert("Invalid Credentials");
        }
      });
  };

  const handlePhoneEmailChange = (event) => {
    setPhoneEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: 'Open Sans', sans-serif;
            background-color: aliceblue;
          }
          .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            position:relative;
          }
          .form-container {
            width: 600px;
            margin: 0 auto;
            padding: 50px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            color: black;
          }
          h1 {
            text-align: center;
            margin-bottom: 30px;
            font-size: 36px;
            color: #b38bff;
          }
          form {
            display: flex;
            flex-direction: column;
          }
          label {
            margin-bottom: 10px;
            font-size: 18px;
          }
          input {
            padding: 12px;
            border: none;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 16px;
            color: #000;
            background-color: aliceblue;
          }
          button {
            padding: 10px;
            background-color: #b38bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
            transition: background-color 0.2s ease-in-out;
          }
          button:hover {
            background-color: #8c5fb2;
          }
          a {
            text-decoration: none;
            color: #b38bff;
            font-size: 18px;
            cursor:pointer;
          }
          a:hover {
          }
          p {
            text-align: center;
            margin: 8px;
          }

          .viewfir{
            position:absolute;
            right:0px;
            bottom:0px;
            font-size:14px;
          }
        `}
      </style>

      <div className="container">
        <div className="form-container" style={{ display: "block" }}>
          <h1>Login</h1>
          <form>
            <label htmlFor="username">Email/Phone No.</label>
            <input
              type="text"
              id="username"
              name="username"
              value={phoneEmail}
              onChange={handlePhoneEmailChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button onClick={handleLogin}>Login</button>
          </form>
          <p>
            Don't have an account?{" "}
            <a href="/signup" onClick={toggleForm} id="signup-link">
              Sign up
            </a>
          </p>
          <p className="viewfir">
            Not an Officer?{" "}
            <a
              href="/signup"
              onClick={toggleViewFIRStatus}
              id="signup-link"
              style={{ fontSize: 14 }}
            >
              View FIR Status
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
