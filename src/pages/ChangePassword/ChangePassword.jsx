import React, { useState} from "react";
import { useDispatch } from "react-redux";
import "./ChangePassword.scss";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { change_password_path } from "../../api/config";
import OrgIntro from "../../components/shared/OrgIntro";

const Password = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { uid, token } = useParams();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    try {
      const response = await axiosPrivate.post(change_password_path, {
        uid: uid,
        token: token,
        password: password
      });
  
      if (response.data.status) {
        setIsSuccess(true);
        setStatusMessage("✅ Password changed successfully!");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      } else {
        setIsError(true);
        setStatusMessage("❌ Could not change the password");
      }
    } catch (error) {
      navigate("/error", { replace: true });
    }
  }

  return (
    <div className="container-fluid password-container d-flex align-items-center justify-content-center">
      <div className="row password-box shadow">
        {/* Left Side */}
        <div className="col-md-6 col-12 p-4 left-box">
          <div className="left-box-content">
            <h2 className="text-center fw-bold">
              Change Password
            </h2>
            <p className="text-center text-muted">
              {isSuccess ? "Password changed successfully!" : "Enter your new password to proceed"}
            </p>

            {statusMessage && (
              <div className={`alert alert-fgpassword ${isSuccess ? "alert-success" : "alert-danger"}`} role="alert">
                {statusMessage}
              </div>
            )}

            {!isSuccess && (
              <>
                <label className="form-label mt-3">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="form-label mt-3">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Your Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button className="btn btn-dark w-100 mt-4" onClick={handleChangePassword}>
                  Change Password
                </button>
              </>
            )}
          </div>

          <div className="mt-4 text-end">
            <span className="text-primary forgot-password" onClick={() => navigate("/login")}>
              Login
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
