import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useCallback, useState } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

const Login = ({setUp}) => {

  const navigate = useNavigate();

  const onSignUpTextClick = useCallback(() => {
    navigate("/create-account");
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/login",formData)
      .then(res =>{
        if (res.data.status==="ok") {
          const decodedToken = jwtDecode(res.data.data);
          navigate('home1');
          setUp(decodedToken)
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
  
  return (
    <div className="login">
        <div className="rectangle-parent32">
        {/* <div className="freshsight15">
          <b className="freshsight16">DAIRY FARMER CO.</b>
        </div> */}
        <div className="earnings35" style={{left:'38.33%'}}>Admin Login</div>
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
            type="password"
            name="password" 
            value={formData.password} 
          />
          <img className="mdieye-off-icon4" alt="" src="/mdieyeoff.svg" />
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
      <div className="freshsight-group">
        <div className="freshsight3">
          <div className="freshsight4">DAIRY FARMER CO.</div>
          <img className="image-5-icon3" alt="" src="/image-52@2x.png" />
          {/* <div className="nourishing-lives-reducing1">
            Nourishing Lives, Reducing Waste
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
