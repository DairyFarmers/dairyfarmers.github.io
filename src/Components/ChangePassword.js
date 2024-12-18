import { useState } from "react";
import "./ChangePassword.css";
import axios from "axios";

const ChangePassword = ({onClose}) => {

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const update = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      window.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    try{
      const response = await axios.post('http://localhost:5000/update-user', formData);

      if (response.status === 200) {
        window.alert('Success', response.data.message);
      } else {
        window.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      window.alert('Error', 'An unexpected error occurred.');
    }
  };

  const [newShowPassword, setNewShowPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmShowPassword = () => {
    setConfirmShowPassword(!confirmShowPassword);
  };

  const toggleNewShowPassword = () => {
    setNewShowPassword(!newShowPassword);
  };

  return (
    <div className="change-password">
      <img
        className="mingcuteclose-line-icon3"
        alt=""
        src="/mingcutecloseline.svg"
        onClick={onClose}
      />
      <div className="change-password1">Change Password</div>
      <div className="earnings-parent9">
        <div className="earnings29">New Password</div>
        <input 
          className="group-child47" 
          placeholder="Enter your new password"
          type={newShowPassword ? 'text' : 'password'}
          onChange={handleChange}
          value={formData.newPassword}  
          name="newPassword"
        />
        <div onClick={toggleNewShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon1" 
              alt="" 
              src={newShowPassword ? "/eye-icon.png" : "/mdieyeoff.svg"} 
            />
        </div>
      </div>
      <div className="earnings-parent10">
        <div className="earnings29">Current Password</div> 
        <input 
          className="group-child47" 
          placeholder="Enter your current password"
          onChange={handleChange} 
          value={formData.currentPassword}
          type={showPassword ? 'text' : 'password'}
          name="currentPassword"
        />
        <div onClick={toggleShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon1" 
              alt="" 
              src={showPassword ? "/eye-icon.png" : "/mdieyeoff.svg"} 
            />
        </div>
      </div>
      <div className="earnings-parent11">
        <div className="earnings29">Confirm Password</div>
        <input 
          className="group-child47" 
          placeholder="Confirm your password"
          onChange={handleChange} 
          value={formData.confirmPassword}
          name="confirmPassword"
          type={confirmShowPassword ? 'text' : 'password'}
        />
        <div onClick={toggleConfirmShowPassword} className="toggle-password-button">
            <img 
              className="mdieye-off-icon1" 
              alt="" 
              src={confirmShowPassword ? "/eye-icon.png" : "/mdieyeoff.svg"} 
            />
          </div>
      </div>
      <div className="change-password-inner">
        <div className="update-password-wrapper">
          <div className="update-password" onClick={update}>Update Password</div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
