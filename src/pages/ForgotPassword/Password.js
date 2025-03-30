import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./password.scss";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { forgot_password_path } from "../../api/config";
import OrgIntro from "../../components/shared/OrgIntro";

const Password = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await axiosPrivate.post(forgot_password_path, {
        email: email
      });
  
      if (response.data.status) {
        navigate("/dashboard");
      } else {
        navigate("/error", { replace: true });
      }
    } catch (error) {
      navigate("/error", { replace: true });
    }
  }

  return (
    <div className="container-fluid signin-container d-flex align-items-center justify-content-center">
      <div className="row signin-box shadow">
        {/* Left Side */}
        <div className="col-md-6 col-12 p-4 left-box">
          <div className="left-box-content">
            <h2 className="text-center fw-bold">
              Forgot Password
            </h2>
            <p className="text-center text-muted">
              Enter your email address to proceed...
            </p>

          <label className="form-label mt-3">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btn btn-dark w-100 mt-4" onClick={handleForgotPassword}>
            Send Password Reset Email
          </button>
          </div>

          <div className="mt-4 text-end">
            <span className="text-primary forgot-password" onClick={() => navigate("/")}>
              Try to Login
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-none d-md-block p-4 right-box">
          <OrgIntro />
        </div>
      </div>
    </div>
  );
};

export default Password;
