import React, { useState } from "react";
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
    <div className="create-account">
      <div className="rectangle-parent33">
        <div className="earnings40">Create Account</div>
        <div className="earnings-parent14">
          <div className="earnings41">Email</div>
          <input 
            className="group-child70" 
            placeholder="Enter your email"
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
          />
        </div>
        <div className="earnings-parent15">
          <div className="earnings41">First Name</div>
          <input 
            className="group-child70" 
            placeholder="Enter your first name"
            type="text" 
            name="firstname" 
            value={formData.firstname} 
            onChange={handleChange}  
          />
        </div>
        <div className="earnings-parent16">
          <div className="earnings41">Last Name</div>
          <input 
            className="group-child70" 
            placeholder="Enter your last name"
            type="text" 
            name="lastname" 
            value={formData.lastname} 
            onChange={handleChange}  
          />
        </div>
        <div className="earnings-parent17">
          <div className="earnings41">Password</div>
          <input 
            className="group-child70" 
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password} 
            onChange={handleChange}
          />
          <div onClick={toggleShowPassword} className="toggle-password-button1">
            <img 
              className="mdieye-off-icon5" 
              alt="" 
              src={showPassword ? "/Images/eye-icon.png" : "/Images/eyeoff.svg"} 
            />
          </div>
        </div>
        <div className="earnings-parent18">
          <div className="earnings41">Confirm Password</div>
          <input 
            className="group-child70" 
            placeholder="Enter your cofirm password"
            type={confirmShowPassword ? 'text' : 'password'}
            name="confirmpassword" 
            value={formData.confirmpassword} 
            onChange={handleChange}
          />
          <div onClick={toggleConfirmShowPassword} className="toggle-password-button1">
            <img 
              className="mdieye-off-icon5" 
              alt="" 
              src={confirmShowPassword ? "/Images/eye-icon.png" : "/Images/eyeoff.svg"} 
            />
          </div>
        </div>
        <div className="frame-wrapper6"  onClick={handleSubmit}>
          <div className="sign-up-wrapper">
            <div className="sign-up1">Sign Up</div>
          </div>
        </div>
        <div className="log-in" onClick={onLogInTextClick}>
          Log In
        </div>
        <div className="freshsight-parent3">
          <div className="freshsight20">
            <div className="freshsight21">DAIRY FARMER CO.</div>
          </div>
          <img className="image-5-icon13" alt="" src="/Images/logo.png" />
          {/* <div className="nourishing-lives-reducing7">
            Nourishing Lives, Reducing Waste
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
