import { useNavigate } from "react-router-dom";
import "./CreateAccount.css";
import axios from "axios";
import { useCallback, useState } from "react";

const CreateAccount = () => {

  const navigate = useNavigate();

  const onLogInTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password) {
      window.alert("Fill the reqired fields")
    }

    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      if (response.status === 201) {
        console.log('User registered successfully');
        alert('User registered successfully');
        navigate('/')
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  const [showPassword, setShowPassword] = useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmShowPassword = () => {
    setConfirmShowPassword(!confirmShowPassword);
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
          <div onClick={toggleShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon5" 
              alt="" 
              src={showPassword ? "/eye-icon.png" : "/mdieyeoff.svg"} 
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
          <div onClick={toggleConfirmShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon5" 
              alt="" 
              src={confirmShowPassword ? "/eye-icon.png" : "/mdieyeoff.svg"} 
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
          <img className="image-5-icon13" alt="" src="/image-52@2x.png" />
          {/* <div className="nourishing-lives-reducing7">
            Nourishing Lives, Reducing Waste
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
