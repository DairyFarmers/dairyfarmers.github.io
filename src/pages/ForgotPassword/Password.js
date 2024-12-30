import React, { useState } from "react";
import "../Signin/SignIn.css";
import { useNavigate } from "react-router-dom";

const Password = () => {

  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handleSignin = async () => {
    navigate("/")
  }

  const handleSend = async () => {
    navigate("/verification")
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
                  <span className="logtx01">Forgot Password</span>
                </div>
                <div className="row mt-1">
                  <span className="logtx02 mb-3">Enter your organizational credentials to proceed</span>
                </div>
                <div className="row mt-4">
                  <div className="col-12 all_center">
                    <div className="row col-7">
                      <label className="loglab mb-1">Email</label>
                      <input className="loginput" type="text" placeholder="Enter your Email"
                        value={email} onChange={handleEmail}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 all_center mt-3">
                    <div className="col-7 space_bet">
                      <span className="fog_tx" onClick={handleSignin}>Back to SignIn</span>
                      <button className="btn btn-dark" onClick={handleSend}>Send</button>
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

export default Password;
