import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Login = ({setUp, ...props}) => {

  useEffect(() => {
    props.onLogin();
  });

  const navigate = useNavigate();

  const onSignUpTextClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  // useEffect(() => {
  //   // Check if there's a token in localStorage
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     setUp(decodedToken);
  //     navigate('home');
  //   }
  // }, [navigate, setUp]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
     const res =  await axios.post("http://ec2-54-224-236-69.compute-1.amazonaws.com/api/v1/users/login",formData)
      .then(res =>{
        if (res.data.status==="ok") {
          const token = res.data.data;        
          localStorage.setItem('token', token);
          const decodedToken = jwtDecode(token);
          navigate('home');
          setUp(decodedToken);
        } else {
          console.error("Invalid response format:", res);
          window.alert("Invalid response format")
        }
      })
    
    } catch (error) {
      console.error("Error during login:", error.res?.data?.message);
      window.alert("Invalid credentials")

    }
  };

  const [showPassword, setShowPassword] = useState(false)
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <div className="rectangle-parent32">
          <div className="freshsight-group">
              <img className="image-5-icon3" alt="" src="./Images/logo.png" />
              <div className="freshsight4">DAIRY FARMER CO.</div>
          </div>
          <div className="earnings35">Login</div>
          <div className="earnings-parent12">
            <div className="earnings36">Email</div>
            <input 
              className="group-child68" 
              placeholder="Enter your email"
              onChange={handleChange}  
              type="email"
              name="email" 
              value={formData.email} 
            />
          </div>
        <div className="earnings-parent13">
          <div className="earnings36">Password</div>
          <input 
            className="group-child68" 
            placeholder="Enter your password"
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            name="password" 
            value={formData.password} 
          />
          <div onClick={toggleShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon4" 
              alt="" 
              src={showPassword ? "/Images/eye-icon.png" : "/Images/eyeoff.svg"} 
            />
          </div>
        </div>
        <div className="frame-wrapper5" onClick={handleLogin}>
          <div className="login-container">
            <div className="login2">Login</div>
          </div>
        </div>
        <div className="sign-up" onClick={onSignUpTextClick}>
          Sign Up
        </div>
      </div>
      
    </div>
  );
};

export default Login;
