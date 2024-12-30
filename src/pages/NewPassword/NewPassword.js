import React, { useState } from "react";
import "../Signin/SignIn.css";
import "./NewPassword.css"
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

   const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  
    const toggleNewPasswordVisibility = () => {
      setNewPasswordVisibility((prev) => !prev);
    };

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility((prev) => !prev);
    }

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
                  <span className="logtx01">New Password</span>
                </div>
                <div className="row mt-1">
                  <span className="logtx02 mb-3">Enter your organizational credentials to proceed</span>
                </div>
                <div className="row mt-4">
                  <div className="col-12 all_center">
                    <div className="row col-7">
                      <label className="loglab mb-1">New Password</label>
                      <input 
                            className="loginput" 
                            type={newPasswordVisibility ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter your NewPassword" 
                            value={newPassword} 
                            onChange={handleNewPasswordChange}
                          />
                         <div
                            className="toggle-password"
                            onClick={toggleNewPasswordVisibility}
                          >
                            <img
                              className="mdieye-off-icon6"
                              alt=""
                              src={
                                newPasswordVisibility
                                  ? "./Images/eye-icon.png"
                                  : "./Images/eyeoff.svg"
                              }
                            />
                          </div>           
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Confirm Password</label>
                          <input 
                            className="loginput" 
                            type={passwordVisibility ? "text" : "password"}
                            name="password"
                            placeholder="Enter your Confirm Password" 
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
                    <div className="col-7 space_bet" id="send">
                      <button className="btn btn-dark" id="button">Send</button>
                    </div>
                  </div>
                </div>
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

export default NewPassword;
