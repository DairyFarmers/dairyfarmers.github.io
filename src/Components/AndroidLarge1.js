import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./AndroidLarge1.css";

const AndroidLarge1 = () => {
  const navigate = useNavigate();

  const onHomeTextClick = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onStatisticsTextClick = useCallback(() => {
    navigate("/wasted-item-mobile");
  }, [navigate]);

  const onAccountSettingsTextClick = useCallback(() => {
    navigate("/account-setting");
  }, [navigate]); 

  const onClose = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const onLogoutTextClick = useCallback(() => {
    navigate("/");
  }, [navigate]);


  return (
    <div className="android-large-3">
      <div className="android-large-3-child" />
      <div className="android-large-3-item"/>
      <div className="home-parent">
        <div className="home2" onClick={onHomeTextClick}>
          Home
        </div>
        <div className="statistics1" onClick={onStatisticsTextClick}>
         Wastage Tracker
        </div>
        <div className="account-settings" onClick={onAccountSettingsTextClick}>
          Account Settings
        </div>
        <div className="logout" onClick={onLogoutTextClick}>
          Logout
        </div>
      </div>
      <img className="icon-parkright" alt="" src="/mingcutedownfill.svg" />
      <img className="icon-parkright1" alt="" src="/mingcutedownfill.svg" />
      <img className="icon-parkright2" alt="" src="/mingcutedownfill.svg" />
      <div className="freshsight17" />
      <div className="image-5-group">
        <img className="close-icon" alt="" src="/mingcutecloseline.svg" onClick={onClose}/>
        <img className="image-5-icon15" alt="" src="/image-53@2x.png" />
        <div className="nourishing-lives-reducing9">
          Nourishing Lives, Reducing Waste
        </div>
        <div className="freshsight18">FreshSight</div>
      </div>
    </div>
  );
};

export default AndroidLarge1;
