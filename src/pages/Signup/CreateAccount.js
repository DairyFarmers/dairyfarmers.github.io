import React, { useCallback, useState } from "react";
import "./CreateAccount.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const onSignin = useCallback(() => {
    navigate("/");
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSignup = async () => {
    const { firstname, lastname, email, password, confirmPassword } = formData;

    if (!firstname || !lastname || !email || !password || !confirmPassword) {
      window.alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        firstname,
        lastname,
        email,
        password,
      });

      if (res.data.status === "success") {
        console.log("Signup successful:", res.data.message);
        navigate("/welcome"); // Navigate to a welcome or login page
      } else {
        window.alert("Signup failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error.response?.data?.message);
      window.alert("Error during signup");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="bg_black col-12">
          <div className="row">
            <div className="col-6">
              <div className="row bg_white">
                <div className="col-12">
                  <div className="row">
                    <span className="logtx01">Create Your Account</span>
                  </div>
                  <div className="row mt-1">
                    <span className="logtx02 mb-3">
                      Enter your details to create a new account
                    </span>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">First Name</label>
                        <input
                          className="loginput"
                          type="text"
                          name="firstname"
                          placeholder="Enter your First Name"
                          value={formData.firstname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Last Name</label>
                        <input
                          className="loginput"
                          type="text"
                          name="lastname"
                          placeholder="Enter your Last Name"
                          value={formData.lastname}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Email</label>
                        <input
                          className="loginput"
                          type="email"
                          name="email"
                          placeholder="Enter your Email"
                          value={formData.email}
                          onChange={handleChange}
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
                            type={passwordVisibility.password ? "text" : "password"}
                            name="password"
                            placeholder="Enter your Password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                      <button
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility("password")}>
                            <img
                              className="mdieye-off-icon5"
                              alt=""
                              src={
                                passwordVisibility.password
                                  ? "./Images/eye-icon.png"
                                  : "./Images/eyeoff.svg"
                              }
                            />
                      </button>
                          
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Confirm Password</label>
                          <input
                            className="loginput"
                            type={passwordVisibility.confirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm your Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                          <div
                            className="toggle-password"
                            onClick={() => togglePasswordVisibility("confirmPassword")}
                          >
                            <img
                              className="mdieye-off-icon6"
                              alt=""
                              src={
                                passwordVisibility.confirmPassword
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
                        <button className="btn btn-dark" id="button"  onClick={handleSignup}>
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="content">If you have already account? <span className="signin" onClick={onSignin}>Sign In</span></div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="row upbox">
                <span className="logotx">
                  <img className="me-2" src="./images/logo.png" alt="" />
                  DAIRY FARMER CO.
                </span>
              </div>
              <div className="row botbox">
                <span className="bottx">
                  Revolutionizing poultry farming with our non-invasive
                  pre-incubation gender determination system, utilizing machine
                  learning for efficient and ethical chick sexing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
