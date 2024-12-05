import React, { useCallback, useEffect, useState } from "react";
import "../Signin/SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!employeeId) {
        window.alert("Invalid credentials");
        return;
      }
      if (!password) {
        window.alert("Invalid password");
        return;
      }
      await axios.post("http://localhost:5000/api/login", {
        employeeId,
        password,
      })
        .then((res) => {
          if (res.data.status === "success") {
            console.log(res.data.message);
            navigate("/dashboard");
          } else if (res.data.status === "failure") {
            window.alert("Invalid Password");
            console.error("Invalid Password:", res.data.message);
          } else {
            console.error("Invalid response format:", res);
          }
        });
    } catch (error) {
      console.error("Error during login:", error.res?.data?.message);
      window.alert("Invalid credentials");
    }
  };

  const onSignUpTextClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <div>
      <div className="row">
        <div className="bg_black col-12">
          <div className="row">
            {/* Right Side Content */}
            <div className="col-6">
              <div className="row bg_white">
                <div className="col-12 ">
                  <div className="row">
                    <span className="logtx01">Login to Admin account</span>
                  </div>
                  <div className="row mt-1">
                    <span className="logtx02 mb-3">Enter your organizational credentials to proceed</span>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Employee ID</label>
                        <input className="loginput" type="text" placeholder="Enter your Employee ID"
                          value={employeeId} onChange={handleEmployeeIdChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Password</label>
                        <input 
                          className="loginput" 
                          type={passwordVisibility ? "text" : "password"}
                          name="password"
                          placeholder="Enter your Password" 
                          value={password} 
                          onChange={handlePasswordChange}
                        />
                         <div
                            className="toggle-password"
                            onClick={togglePasswordVisibility}
                          >
                            <img
                              className="mdieye-off-icon6"
                              alt=""
                              src={
                                passwordVisibility
                                  ? "./Images/eye-icon.png"
                                  : "./Images/eyeoff.svg"
                              }
                            />
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center mt-3">
                      <div className="col-7 space_bet">
                        <span className="fog_tx">Forgot password?</span>
                        <button className="btn btn-dark" onClick={handleLogin}>Login</button>
                      </div>
                    </div>
                  </div>
                  <div className="sign-up" onClick={onSignUpTextClick}>SignUp</div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row upbox">
                <span className="logotx"><img className="me-2" src="./images/logo.png" alt="" />DAIRY FARMER CO.</span>
              </div>
              <div className="row botbox">
                <span className="bottx ">Revolutionizing poultry farming with our non-invasive pre-incubation gender determination system, utilizing machine learning for efficient and ethical chick sexing.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
