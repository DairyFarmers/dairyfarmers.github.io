import React, { useEffect, useState } from "react";
import "./SignIn.scss";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import { login_path } from "../../api/config";
import { login } from "../../redux/slices/userSlice";
import OrgIntro from "../../components/shared/OrgIntro";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isEmailVerified = useSelector((state) => state.user.is_verified);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmployeeIdChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!email) {
        window.alert("Invalid credentials");
        return;
      }
      if (!password) {
        window.alert("Invalid password");
        return;
      }

      const response = await axiosPrivate.post(login_path, {
        email: email,
        password: password
      });

      if (response.data.status) {
        dispatch(login(response.data.data));
        navigate("/dashboard");
      } else {
        navigate("/error", { replace: true });
      }
    } catch (error) {
      navigate("/error", { replace: true });
    }
  };

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const handlePassword = async () => {
    navigate("/forgotPassword")
  }

  return (
    <div className="container-fluid signin-container d-flex align-items-center justify-content-center">
      <div className="row signin-box shadow">
        {/* Left Side */}
        <div className="col-md-6 col-12 p-4 left-box">
          <div className="left-box-content">
            <h2 className="text-center fw-bold">
              Login
            </h2>
            <p className="text-center text-muted">
              Enter your credentials to login
            </p>

          <label className="form-label mt-3">Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form-label mt-3">Password</label>
          <div className="input-group">
            <input
              type={passwordVisibility ? "text" : "password"}
              className="form-control"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-outline-secondary" onClick={() => setPasswordVisibility(!passwordVisibility)}>
              <img
                src={passwordVisibility ? "./Images/eye-icon.png" : "./Images/eyeoff.svg"}
                alt="Toggle Password"
                width="20"
              />
            </button>
          </div>

          <div className="mt-3 text-end">
            <span className="text-primary forgot-password" onClick={() => navigate("/forgotPassword")}>
              Forgot password?
            </span>
          </div>

          <button className="btn btn-dark w-100 mt-4" onClick={handleLogin}>
            Login
          </button>
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

export default SignIn;
